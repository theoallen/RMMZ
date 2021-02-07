/*:
@target MZ
@plugindesc v1.0.0 - Taunt and Hide traits. 
Force target to the taunting target and exclude hiding battlers
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help 
♦ About:
Adds taunt and hide mechanics.

When the actor is taunting, all single attack is directly aimed to them
When the actor is hiding, no single attack will target them
When the enemy is taunting, you can only target them
When the enemy is hiding, you can not target them

All of those mechanic is ignored when the skill is an area effect

♦ How to use
Put <taunt> or <hide> in the notebox.
You can use it literally anywhere. From states, equip, class, actor/enemy notes.
Do note that if you put them in the actor/class notebox, they will always 
taunt/hide with no way of removing it.

♦ Some things to note:
Q: What if the battler has both <taunt> and <hide>?
A: The hide tag takes priority

Q: What if there is more than one battler that is taunting.
A: The random target will be rolled based on their TGR.

Q: What if all the battlers are hidden?
A: If there is no target (due to being hidden), all of them will be 
   automatically exposed and will be targetable

Q: How do I tell if the battler is taunting/hiding? They don't have a visual
   indication, explanation or anything
A: That is your problem. Go seek a plugin that does the thing. This plugin
   only deal with the mechanic. Not visual, or the user interface.

Q: Is this plugin compatible with <insert any target manager plugin>
A: Maybe, maybe not. I only overwrite random target function. If the plugin 
   does the similar thing, then it probably won't work. I might want to 
   take a look and see if I can do something for compatibility as long as
   I could see the code (it is not paywalled/obfuscated)

♦ Terms of Use:
https://github.com/theoallen/RMMZ/blob/master/README.md
*/
var Theo = Theo || {}
Theo.TauntHide = function(){
    const $ = Theo.TauntHide
    $._version = '1.0.0'

    // I'm just gonna overwrite this shitty function. May interfere with other target manager plugin, but meh.
    Game_Unit.prototype.randomTarget = function() {
        const targetCandidates = $.targetCandidates.call(this)
        const tgrSum = $.tgrSum(targetCandidates)
        let tgrRand = Math.random() * tgrSum;
        let target = null;
        for (const member of targetCandidates) {
            tgrRand -= member.tgr;
            if (tgrRand <= 0 && !target) {
                target = member;
            }
        }
        return target;
    };

    $.targetCandidates = function(){
        const candidates = this.aliveMembers()
        const exposed = candidates.filter(m => !$.isHiding.call(m))
        const taunting = exposed.filter(m => $.isTaunting.call(m))
        // Prioritize taunting target
        if (taunting.length > 0){
            return taunting
        // Prioritize exposed targets
        }else if (exposed.length > 0){
            return exposed
        }
        // If all targets are hidden, expose them anyway.
        return candidates
    }

    $.tgrSum = function(targets){
        return targets.reduce((r, member) => r + member.tgr, 0);
    }

    $.isHiding = function(){
        return this.traitObjects().some(t => t.meta.hide)
    }

    $.isTaunting = function(){
        return this.traitObjects().some(t => t.meta.taunt)
    }

    // Overwrite
    Window_BattleEnemy.prototype.isCurrentItemEnabled = function() {
        const viableTargets = $.targetCandidates.call($gameTroop)
        return viableTargets.includes(this.enemy())
    };

}
Theo.TauntHide()
