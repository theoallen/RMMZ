/*:
@target MZ
@plugindesc v1.0.1 - Animation FPS and Offset Control
@url https://github.com/theoallen/RMMZ
@author TheoAllen
@help
♦ What it does?
Set the frame rate for each MV-Style animation
Set the offset X and Y for each MV-Style animation

♦ How to use:
Use <rate: x> in the animation name to determine the rate. 
<rate: 1> = 60 FPS
<rate: 2> = 30 FPS
<rate: 3> = 20 FPS (This plugin default)
<rate: 4> = 15 FPS (Default RPG Maker)

Use <x:n> and <y:n> to determine the central offset.
Negative value such as <x:-100> is also allowed.

♦ Terms of Use:
MIT

@param defrate
@type number
@min 1
@default 3
@text Default Rate
@desc Default frame rate for the animation
*/

// Screen Default
// 816
// 624

var Theo = Theo || {}
Theo.AnimControl = function(){
    const $ = Theo.AnimControl
    $._pluginName = document.currentScript.src.match(/.+\/(.+)\.js/)[1]
    $._version = '1.0.1'

    $._params = PluginManager.parameters($._pluginName)
    $._defaultRate = Number($._params.defrate)

    $._tagRate = /<rate\s*:\s*(\d+)\s*>/i
    $._tagOffsetX = /<x:(-|\+*)(\d+)>/
    $._tagOffsetY = /<y:(-|\+*)(\d+)>/i

    $.getFrameRate = function(anim){
        if(!anim._rate){
            anim._rate = $._defaultRate
            const match = anim.name.match(Theo.AnimControl._tagRate)
            if(match){
                anim._rate = Number(match[1])
            }
        }
        return anim._rate
    }

    $.getOffsetX = function(anim){
        if(!anim._offsetX){
            anim._offsetX = 0
            const match = anim.name.match(Theo.AnimControl._tagOffsetX)
            if(match){
                anim._offsetX = Number(match[2]) * (String(match[1]) === "-" ? -1 : 1)
            }
        }
        return anim._offsetX
    }

    $.getOffsetY = function(anim){
        if(!anim._offsetY){
            anim._offsetY = 0
            const match = anim.name.match(Theo.AnimControl._tagOffsetY)
            if(match){
                anim._offsetY = Number(match[2]) * (String(match[1]) === "-" ? -1 : 1)
            }
        }
        return anim._offsetY
    }

    // Overwrite setup rate
    Sprite_AnimationMV.prototype.setupRate = function() {
        this._rate = Theo.AnimControl.getFrameRate(this._animation);
    };

    $.updatePosAlias = Sprite_AnimationMV.prototype.updatePosition
    Sprite_AnimationMV.prototype.updatePosition = function() {
        Theo.AnimControl.updatePosAlias.call(this)
        // just in case
        if(this._animation){
            x = Theo.AnimControl.getOffsetX(this._animation)
            console.log(x)
            this.x -= Theo.AnimControl.getOffsetX(this._animation)
            this.y -= Theo.AnimControl.getOffsetY(this._animation)
        }
    };
}
Theo.AnimControl()
