/*:
@target MZ
@plugindesc v1.0 - State Damage Using Skill.
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help 
Version 1.0

♦ About:
Allow you to use skill as slip damage instead of percentage using health/mp 
regen rate. In this way, you could make it a flat damage, damage based on 
user's attack, and even adding element to the damage. Or maybe, you want 
to make the battle grow stronger each turn by adding growth effect from the 
skill effect?

♦ How to use:
Use this notetag in the state notebox <skill damage: id> 
Change the ID to the skill ID you want to use as the slip damage.
 
Ex :
<skill damage: 10>

♦ Terms of Use:
https://github.com/theoallen/RMMZ/blob/master/README.md
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
                const animId = $dataSkills[skill].animationId
                const user = $.subjectBattler(this._stateBattler[stateId])
                const action = new Game_Action(user, false)
                action.setSkill(skill)
                action.apply(this)
                if (animId > 0){
                    $gameTemp.requestAnimation([this], animId);
                }
                BattleManager._logWindow.push("waitForAnimation_StateSkill")
                BattleManager._logWindow.displayActionResults(user, this)
                BattleManager._logWindow.push("wait");
                BattleManager._logWindow.push("clear");
            }
        }
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
