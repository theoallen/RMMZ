/*
Change log
version 1.0.0   = Finished the plugin
*/
/*:
@target MZ
@plugindesc v1.0.0 - Double Tap Dash MZ
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help 
♦ About:
You hate to press SHIFT and you prefer to tap twice to trigger dash.

♦ Terms of Use:
- https://github.com/theoallen/RMMZ/blob/master/README.md

 @param timing
 @text Tap Timing
 @default 30
 @desc Tap Timing Window
 @type number
 @min 0
*/
var Theo = Theo || {}
Theo.DoubleDash = function(){
    const $ = Theo.DoubleDash
    $._version = '1.0.0'
    $._pluginName = document.currentScript.src.match(/.+\/(.+)\.js/)[1]
    $._timingParam = Number(PluginManager.parameters($._pluginName).timing)

    $.init = function(){
        $._dashInput_1 = 0
        $._dashInput_2 = 0
        $._pressTiming = 0
    }

    $.updateDash = function(){
        if(!$.tapDashing()){
            $._pressTiming = Math.max($._pressTiming - 1, 0)
        }
        if((this.getInputDirection() === 0 && $.tapDashing()) || $._pressTiming === 0){
            $.init()
        }
        if($.isInputArrow() && !$.isDashImpossible() && !this.isDashing()){
            const dirInput = this.getInputDirection()
            if(dirInput > 0){
                if ($._dashInput_1 === dirInput){
                    $._dashInput_2 = dirInput
                }else{
                    $._dashInput_1 = dirInput
                    $._pressTiming = $._timingParam
                }
            }
        }
    }

    $.updateDashing = Game_Player.prototype.updateDashing
    Game_Player.prototype.updateDashing = function() {
        $.updateDashing.call(this)
        $.updateDash.call(this)
    };

    $.isDashing = Game_Player.prototype.isDashing
    Game_Player.prototype.isDashing = function() {
        return $.isDashing.call(this) || $.tapDashing();
    };

    $.tapDashing = function(){
        return $._dashInput_1 === $._dashInput_2 && $._dashInput_2 !== 0
    }

    $.isDashImpossible = function(){
        return $gamePlayer.isMoveRouteForcing() || $gameMap.isDashDisabled() || $gamePlayer.isInVehicle()
    }

    $.isInputArrow = function(){
        return  Input.isTriggered("down") ||
                Input.isTriggered("up") ||
                Input.isTriggered("right") ||
                Input.isTriggered("left")
    }
}
Theo.DoubleDash()
