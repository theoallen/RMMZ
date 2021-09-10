/*:
@target MZ
@plugindesc Shake the target battler when they gets hit.
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help 
Version 1.0

Shake the target battler in random directions when they gets hit.

Terms of use:
https://github.com/theoallen/RMMZ/blob/master/README.md

 @param Shake
 @text Shake
 @desc Shake the screen
 
 @param pwr
 @parent Shake
 @type number
 @text Power
 @desc The power of the shake (Max: 10 recommended)
 @default 7

 @param dur
 @parent Shake
 @type number
 @text Duration
 @desc The duration of the shake in frames (60 frame = 1 sec)
 @default 30

 @param dim
 @parent Shake
 @type boolean
 @text Diminish
 @desc Will the shake power diminished over the time? (Getting slower overtime)
 @default true
 */
/*
Change log
version 1.0.0   = Finished the plugin
version 1.1.0   = Prevent shake for healing
*/
var Theo = Theo || {}

Theo.ShakeBattler = function(){
    const $ = Theo.ShakeBattler
    $._pluginName = document.currentScript.src.match(/.+\/(.+)\.js/)[1]
    const params = PluginManager.parameters($._pluginName)
    $._power = Number(params.pwr)
    $._duration = Number(params.dur)
    $._diminish = params.dim === "true"

    $.spritebattler_updatePos = Sprite_Battler.prototype.updatePosition;
    Sprite_Battler.prototype.updatePosition = function(){
        $.spritebattler_updatePos.call(this);
        if(this._shakeDur > 0){
            const rate = $._diminish ? this._shakeDur/$._duration : 1.0;
            this.x += Math.random() * $._power * rate * (Math.random() >= 0.5 ? 1 : -1);
            this.y += Math.random() * $._power * rate * (Math.random() >= 0.5 ? 1 : -1);
            this._shakeDur -= 1
        }
    }

    $.initMembers = Sprite_Battler.prototype.initMembers
    Sprite_Battler.prototype.initMembers = function(){
        $.initMembers.call(this)
        this._shakeDur = 0;
    }
    
    $.createDmgSpr = Sprite_Battler.prototype.createDamageSprite
    Sprite_Battler.prototype.createDamageSprite = function() {
        $.createDmgSpr.call(this)
        const res = this._battler.result()
        if(res.isHit() && (res.hpDamage > 0 || res.mpDamage > 0 || res.tpDamage > 0 || res.isStatusAffected())){
            this._shakeDur = $._duration;
        }
    };
}

// Initialize
Theo.ShakeBattler();
