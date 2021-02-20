/*:
@target MZ
@plugindesc v1.0.1 - Customize the drain amount
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help
♦ About:
You deal 100 damage, but you don't want to drain 100 HP.
Maybe you only want it only drains 25, or maybe twice of it.

♦ How to use:
Put tag <drain rate: n>
Replace n with numbers in percentage.

Putting <drain rate: 50> will drain the HP/MP based on the 50%
of the damage dealt.

♦ Thing to note:
The battle message log does not reflect this change. I don't
want to deal with it. Please, change the drain message into
something that makes sense such as 

"%1 took %3 damage!"

Or seek for a plugin that disables it all together.

♦ Terms of Use:
- https://github.com/theoallen/RMMZ/blob/master/README.md
*/
var Theo = Theo || {}
Theo.DrainRate = function(){
    const $ = Theo.DrainRate
    $._version = '1.0.1'

    $.actionDrainHP = Game_Action.prototype.gainDrainedHp
    Game_Action.prototype.gainDrainedHp = function(value) {
        const meta = this.item().meta["drain rate"]
        const realValue = meta ? (Number(meta)/100) * value : value
        $.actionDrainHP.call(this, Math.floor(realValue))
    };
    
    $.actionDrainMP = Game_Action.prototype.gainDrainedMp
    Game_Action.prototype.gainDrainedMp = function(value) {
        const meta = this.item().meta["drain rate"]
        const realValue = meta ? (Number(meta)/100) * value : value
        $.actionDrainMP.call(this, Math.floor(realValue))
    };
}
Theo.DrainRate()
