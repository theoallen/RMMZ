/*:
@target MZ
@plugindesc v1.0.1 - State Damage Using Skill.
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help 
Version 1.0.1

♦ About:
Allow you to use a skill as slip damage instead of percentage using health/mp 
regen rate. In this way, you could make it flat damage, damage based on the 
user's stat, and even add elements to the damage. Or maybe, you want to make 
the battler grow stronger each turn by adding a growth effect from the skill 
effect? Of course, you can!

♦ How to use:
Use this notetag in the state notebox <skill damage: id> 
Change the ID to the skill ID you want to use as the slip damage.

♦ Requirement:
The state has to be added by the item/skill effect. Not anywhere else, such
as from the script call or change the state using eventing.

Ex :
<skill damage: 10>

♦ Terms of Use:
https://github.com/theoallen/RMMZ/blob/master/README.md
*/

/*
Change log: dd/mm/yyyy
v1.0.1 - 5/11/2021 - Fixed display handler for multiple state skill.
*/

var Theo = Theo || {}

Theo.StateDamageUsingSkill = function(){
    const $ = Theo.StateDamageUsingSkill
    $.SKILL_DAMAGE_REGEX = /<skill[\s_]+damage\s*:\s*(\d+)\s*>/i;

    $.dbLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function(){
        if (!$.dbLoaded.call(this)) {return false};
        if (!$.stateSkillDmg) {
            $dataStates.forEach(function(db){
                if(db === null){return}
                $.loadDB(db)
            })
            $.stateSkillDmg = true
        }
        return true;
    }

    $.loadDB = (state) => {
        console.log()
        state._skillDmg = 0
        const notedata = state.note.split(/[\r\n]+/)
        for(const line of notedata){
            if(line.match($.SKILL_DAMAGE_REGEX)){
                state._skillDmg = Number(RegExp.$1)
            }
        }
    }

    $.subjectBattler = function(obj){
        if(obj.type === "actor"){
            return $gameActors.actor(obj.id)
        }else{
            return $gameTroop.members()[obj.id];
        }
    }

    //=============================================
    // Game Battler
    //=============================================
    gb = Game_Battler.prototype
    $.clearStates = gb.clearStates
    gb.clearStates = function() {
        $.clearStates.call(this)
        this._stateBattler = {}
    };
    
    $.eraseState = gb.eraseState
    gb.eraseState = function(stateId) {
        $.eraseState.call(this, stateId)
        delete this._stateBattler[stateId]
    };

    $.updateStateTurns = gb.updateStateTurns
    gb.updateStateTurns = function() {
        if(this.isAlive()){
           $.performSlipDamageFormula.call(this)
        }
        $.updateStateTurns.call(this)
    };

    $.performSlipDamageFormula = function(){
        for(const stateId of this._states){
            if($dataStates[stateId]._skillDmg > 0 && this._stateBattler[stateId]){
                const skill = $dataStates[stateId]._skillDmg
                const user = $.subjectBattler(this._stateBattler[stateId])
                const guid = $.guid()
                BattleManager._logWindow.push("performStateSkill", user, this, skill, guid)
                BattleManager._logWindow.push(guid) // Placeholder, because the entire JS and window battle log are stupid
            }
        }
    }

    // https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
    $.guid = function uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    //=============================================
    // Battle Log
    //=============================================
    Window_BattleLog.prototype.waitForAnimation_StateSkill = function(){
        this._waitMode = "animation state skill"
    }

    $.logUpdateWait = Window_BattleLog.prototype.updateWaitMode
    Window_BattleLog.prototype.updateWaitMode = function() {
        if(this._waitMode === "animation state skill"){
            const waiting = this._spriteset.isAnimationPlaying();
            if (!waiting) {
                this._waitMode = "";
            }
            return waiting
        }
        return $.logUpdateWait.call(this)
    };

    Window_BattleLog.prototype.performStateSkill = function(user, target, skill, guid){
        if (target.isAlive()){
            const action = new Game_Action(user, false)
            const animId = $dataSkills[skill].animationId
            action.setSkill(skill)
            action.apply(target)
            let index = this._methods.findIndex(e => e.name === guid);

            // Temporary change the method for compatibility
            // Redirect queue to the designated GUID index
            const oriPush = this.push
            this.push = function(methodName){
                const methodArgs = Array.prototype.slice.call(arguments, 1);
                this._methods.splice(index, 0, { name: methodName, params: methodArgs });
                index += 1
            }

            if (animId > 0){
                BattleManager._logWindow.push("showNormalAnimation", [target], animId, false)
                BattleManager._logWindow.push("waitForAnimation_StateSkill")
            }

            this.displayActionResults(user, target)

            BattleManager._logWindow.push("wait");
            BattleManager._logWindow.push("clear");

            this.push = oriPush
        }
        const removeGuid = this._methods.findIndex(e => e.name === guid);
        this._methods.splice(removeGuid, 1)
    }

    Window_BattleLog.prototype.callNextMethod = function() {
        if (this._methods.length > 0) {
            const method = this._methods.shift();
            if (method.name && this[method.name]) {
                this[method.name].apply(this, method.params);
            } else {
                console.log(this._methods)
                throw new Error("Method not found: " + method.name);
            }
        }
    };

    //=============================================
    // Game Action
    //=============================================
    ga = Game_Action.prototype
    $.addNormalState = ga.itemEffectAddNormalState
    ga.itemEffectAddNormalState = function(target, effect) {
        $.addNormalState.call(this, target, effect)

        if (target.result().success && target._states.includes(effect.dataId)){
            const objBattler = {
                type: this.subject().isActor() ? "actor" : "enemy", 
                id: this.subject().isActor() ? this.subject().actorId() : this.subject().index()
            }
            target._stateBattler[effect.dataId] = objBattler
        }
    };

    $.addAttackState = ga.itemEffectAddAttackState
    ga.itemEffectAddAttackState = function(target, effect) {
        $.addAttackState.call(this, target, effect)

        if (target.result().success){
            for (const stateId of this.subject().attackStates()){
                if (target._states.includes(stateId)){
                    objBattler = {
                        type: this.subject().isActor() ? "actor" : "enemy", 
                        id: this.subject().isActor() ? this.subject().actorId() : this.subject().index()
                    }
                    target._stateBattler[stateId] = objBattler
                }
            }
        }

    };
}
Theo.StateDamageUsingSkill()
