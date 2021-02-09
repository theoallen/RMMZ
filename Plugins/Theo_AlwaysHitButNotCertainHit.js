/*:
@target MZ
@plugindesc v1.0.0 - Always hit but without ignoring PDR/MDR
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help
♦ About:
I don't like how they implements "certain hit" type. Because it bypass
PDR and MDR. I want my skill to always hit (means, you can not dodge
this EVA or MEV) but without ignoring PDR or MDR.

♦ How to use:
Tag your physical/magical skill with
<always hit>

♦ Terms of Use:
- https://github.com/theoallen/RMMZ/blob/master/README.md
*/
var Theo = Theo || {}
Theo.AlwaysHit = function(){
    const $ = Theo.AlwaysHit
    $._version = '1.0.0'

    Game_Action.prototype.alwaysHit = function(){
        return this.item().meta["always hit"]
    }

    $.itemHit = Game_Action.prototype.itemHit
    $.itemEva = Game_Action.prototype.itemEva
    $.itemCnt = Game_Action.prototype.itemCnt
    $.itemMrf = Game_Action.prototype.itemMrf

    Game_Action.prototype.itemHit = function(target){
        if(this.alwaysHit()){
            return 1
        }
        return $.itemHit.call(this, target)
    }

    Game_Action.prototype.itemEva = function(target){
        if(this.alwaysHit()){
            return 0
        }
        return $.itemEva.call(this, target)
    }

    Game_Action.prototype.itemCnt = function(target){
        if(this.alwaysHit()){
            return 0
        }
        return $.itemCnt.call(this, target)
    }

    Game_Action.prototype.itemMrf = function(target){
        if(this.alwaysHit()){
            return 0
        }
        return $.itemMrf.call(this, target)
    }
}
Theo.AlwaysHit()
