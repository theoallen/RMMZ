/*:
@target MZ
@plugindesc v1.0.0 - You hate emerged message on battle start and intro animation.
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help
♦ About:
You hate "enemy emerged" message
You want the battle start screen to just right goes to input.
You want to skip party command.
You don't want the actor sprite movement intro.

P.S:
If you want each of these to be configurable, do telle me. Otherwise I will
just leave this as is.

P.P.S:
This has been merged with my previous plugin "Skips Party Command".
https://github.com/theoallen/RMMZ/blob/master/Plugins/Theo_SkipPartyCommand.js

♦ Terms of Use:
- https://github.com/theoallen/RMMZ/blob/master/README.md

*/

var Theo = Theo || {}
Theo.InstantBattleStart = () => {
    const $ = Theo.InstantBattleStart
    $._version = '1.0.0'
    // Delete battle emerged message
    BattleManager.displayStartMessages = () => {
    };

    // Right goes to input
    $.startBattle = BattleManager.startBattle
    BattleManager.startBattle = function() {
        $.startBattle.call(this)
        this.updateStart()
    };
    
    // Skips sprite movement
    Sprite_Actor.prototype.moveToStartPosition = () => {}

    // Skips party command
    $.startInput = BattleManager.startInput
    BattleManager.startInput = function() {
        $.startInput.call(this)
        $.skipPartyCmd.call(this)
    };

    $.skipPartyCmd = function(){
        if(!this._surprise && $gameParty.canInput()){
            this.selectNextActor();
        }
    }
}
Theo.InstantBattleStart()
