/*:
@target MZ
@plugindesc v1.0 - State Damage Using Skill.
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help 
Version 1.0

Terms of use:
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
        state._skillDmg = 0
        const notedata = db.note.split(/[\r\n]+/)
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

    $.onTurnEnd = gb.onTurnEnd
    gb.onTurnEnd = function() {
        if(this.isAlive()){
           $.performSlipDamageFormula.call(this)
        }
        $.onTurnEnd.call(this)
    };

    $.performSlipDamageFormula = function(){
        for(const stateId of this._states){
            if($dataStates[stateId]._skillDmg > 0 && this._stateBattler[stateId]){
                const skill = $dataSkills[$dataStates[stateId]._skillDmg]
                const user = this._stateBattler[stateId]
                const action = new Game_Action(user, false)
                action.setSkill(skill)
                action.apply(this)
                $gameTemp.requestAnimation([this], skill.animationId);
                // in RGSS3 version of the plugin, there is a delay here, but javascript is such a mess so I aint adding delay
                BattleManager._logWindow.displayActionResult(user, this)
            }
        }
    }

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
                id: this.subject().isActor() ? subject.actorId() : subject.index()
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
                        id: this.subject().isActor() ? subject.actorId() : subject.index()
                    }
                    target._stateBattler[stateId] = objBattler
                }
            }
        }

    };

}
Theo.StateDamageUsingSkill()
