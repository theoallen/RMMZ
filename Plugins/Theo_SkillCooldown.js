/*:@target MZ
@url https://github.com/theoallen/RMMZ
@plugindesc v1.0.0 - Simple Skill Cooldown
@author TheoAllen
@help
This plugin allow you to specify cooldown for skills. The cooldown is
updated every turn end.

How to use:
Put <cooldown: x> tag in your skill notebox to determine the cooldown.

Next plan:
- Customizable CD text in the skill window
- Give me more ideas...

Terms of Use:
- Free for commercial
*/
var Theo = Theo || {}
Theo.SkillCD = function(){
    const _ = Theo.SkillCD
    const $ = Game_Battler.prototype

    _.version = '1.0.0'
    _.cooldownRGX = /<cooldown[\s_]*:\s*(\d+)>/i
    $._cooldowns = {}

    _.skillInCooldown = function(skillId){
        return this._cooldowns[String(skillId)] && this._cooldowns[String(skillId)] > 0
    }

    _.resetCooldown = function(){
        this._cooldowns = {}
    }

    _.updateCooldown = function(){
        Object.keys(this._cooldowns).forEach(cd => {
            this._cooldowns[cd] -= 1
        });
    }

    _.setCooldown = function(skillId, turn){
        this._cooldowns[String(skillId)] = turn
    }

    _.initMembers = $.initMembers
    $.initMembers = function(){
        _.initMembers.call(this)
        _.resetCooldown.call(this)
    }

    _.onTurnEnd = $.onTurnEnd
    $.onTurnEnd = function() {
        _.onTurnEnd.call(this)
        _.updateCooldown.call(this)
    }

    _.onBattleStart = $.onBattleStart
    $.onBattleStart = function(advantageous) {
        _.resetCooldown.call(this)
        _.onBattleStart.call(this, advantageous)
    }

    _.onBattleEnd = $.onBattleEnd
    $.onBattleEnd = function() {
        _.resetCooldown.call(this)
        _.onBattleEnd.call(this)
    }

    _.paySkillCost = $.paySkillCost
    $.paySkillCost = function(skill) {
        _.paySkillCost.call(this, skill)
        _.setCooldown.call(this, skill.id, skill._skillCD)
    };

    _.canPaySkillCost = $.canPaySkillCost
    $.canPaySkillCost = function(skill) {
        return _.canPaySkillCost.call(this, skill) && !_.skillInCooldown.call(this, skill.id)
    };

    wskill = Window_SkillList.prototype
    _.drawSkillCost = wskill.drawSkillCost
    wskill.drawSkillCost = function(skill, x, y, width) {
        if(_.skillInCooldown.call(this._actor, skill.id)){
            this.changeTextColor(ColorManager.textColor(8))
            let text = this._actor._cooldowns[String(skill.id)] + " CD"
            this.drawText(text, x, y, width, "right")
            return 
        }
        _.drawSkillCost.call(this, skill, x, y, width)
    };

    _.dbLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function(){
        if (!_.dbLoaded.call(this)) {return false};
        if (!_.skillCDLoaded) {
            $dataSkills.forEach(function(db){
                if(db === null){return}
                _.loadDB(db)
            })
            _.skillCDLoaded = true
        }
        return true;
    }

    _.loadDB = function(db){
        if(db._skillCD){
            db._skillCD = 0
        }
        let notedata = db.note.split(/[\r\n]+/)
        notedata.forEach(function(line){
            if(line.match(_.cooldownRGX)){
                db._skillCD = Number(RegExp.$1)
            }
        });
    }
}
Theo.SkillCD()
