/*:
@target MZ
@plugindesc v1.0.0 - Various functions for battle test
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help
♦ About:
- You want a kill switch for instant victory
- You want a single button to recover HP back to full
- You want a single button to set the HP to 1
- You want a single button to reset MP or fill TP
- You only want all of these button only valid in test mode.

♦ How to use:
Press the button.
Configurable in the plugin parameter

ASCII for the button code
https://theasciicode.com.ar/

Default keys
- Kill Switch   = (R)
- Recover all   = (T)
- Damage all    = (Y)
- Fill MP/TP    = (U)

♦ Terms of Use:
- https://github.com/theoallen/RMMZ/blob/master/README.md

@param buttonsetting
@text --- [Button Setting] ---

@param kill
@parent buttonsetting
@text Win Button
@type number
@desc Press button to kill all of the enemies. Instant victory.
@default 82

@param recover
@parent buttonsetting
@text Recover Button
@type number
@desc Press button to recover HP back to full
@default 84

@param damage
@parent buttonsetting
@text Damage button
@type number
@desc Press button damage your entire party, leaving it at 1 HP
@default 89

@param fill
@parent buttonsetting
@text Fill MP/TP Button
@type number
@desc Press button to fill the MP/TP
@default 85
*/
var Theo = Theo || {}
Theo.DebugBattle = function(){
    const $ = Theo.DebugBattle
    $._pluginName = document.currentScript.src.match(/.+\/(.+)\.js/)[1]
    $._version = '1.0.0'
    $._params = PluginManager.parameters($._pluginName)

    $._buttonNames = {
        kill: "kill",
        recovery: "recov",
        damage: "damage",
        fill: "refill"
    }

    $._buttonCodes = {
        kill: Number($._params.kill),
        recovery: Number($._params.recover),
        damage: Number($._params.damage),
        fill: Number($._params.fill)
    }

    Input.keyMapper[$._buttonCodes.kill] = $._buttonNames.kill
    Input.keyMapper[$._buttonCodes.recovery] = $._buttonNames.recovery
    Input.keyMapper[$._buttonCodes.damage] = $._buttonNames.damage
    Input.keyMapper[$._buttonCodes.fill] = $._buttonNames.fill

    // Taken from on-launch plugin
    BattleManager.forceVictory = function() {
        if (this.canExecuteBattleEndProcess()) {
            $gameTroop.members().forEach(function(enemy) {
                enemy.die()
                enemy.performCollapse()
                enemy.refresh()
            });
            this.processVictory();
        }
    };

    // Taken from on-launch plugin
    BattleManager.canExecuteBattleEndProcess = function() {
        return this._phase !== 'battleEnd';
    };

    $.sceneUpdate = Scene_Battle.prototype.update
    Scene_Battle.prototype.update = function(){
        $.sceneUpdate.call(this)
        $.debugBattle()
    }

    $.debugBattle = () => {
        if($.canDebug()){
            if(Input.isTriggered($._buttonNames.kill)){
                BattleManager.forceVictory()
            }
            if(Input.isTriggered($._buttonNames.recovery)){
                $.debugRecover()
            }
            if(Input.isTriggered($._buttonNames.damage)){
                $.debugDamage()
            }
            if(Input.isTriggered($._buttonNames.fill)){
                $.debugFillMPAndTP()
            }
        }
    }

    $.canDebug = () => {
        return $gameTemp.isPlaytest()
    }

    $.debugRecover = () => {
        for(const actor of $gameParty.members()){
            actor._hp = actor.mhp
        }
        SoundManager.playRecovery()
    }

    $.debugDamage = () => {
        for(const actor of $gameParty.members()){
            actor._hp = 1
            actor._tp = 0
            actor._mp = 0
        }
        SoundManager.playActorDamage()
    }

    $.debugFillMPAndTP = () => {
        for(const actor of $gameParty.members()){
            actor._mp = actor.mmp
            actor._tp = actor.maxTp()
        }
        SoundManager.playRecovery()
    }
}
Theo.DebugBattle()
