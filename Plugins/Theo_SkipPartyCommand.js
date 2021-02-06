/*:
@target MZ
@plugindesc v1.0.0 - Skip Party Command (Fight/Escape)
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help 
♦ About:
This plugin skips party command window. The one that has fight/escape
options. You can still access the command by using cancel button.

Currently only works for default turn-based, not time-progress battle.
May add TPB support later in the future when I know how.

♦ Terms of Use:
https://github.com/theoallen/RMMZ/blob/master/README.md
*/

var Theo = Theo || {}
Theo.SkipPartyCommand = () => {
    const $ = Theo.SkipPartyCommand

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
