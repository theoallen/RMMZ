/*:
@target MZ
@plugindesc Shake the target battler when they gets hit.
@author TheoAllen
@help 
Version 1.0

Shake the target battler in random directions when they gets hit.

Terms of Use:
- Free for commercial
- Credit is optional, just do not claim.

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
var Theo = Theo || {}

// I dont like IIFE notation
Theo.ShakeBattler = function(){
    let _ = Theo.ShakeBattler
    _.pluginName = "Theo_ShakeBattler"
    let params = PluginManager.parameters(_.pluginName)
    _.power = Number(params.pwr)
    _.duration = Number(params.dur)
    _.diminish = params.dur === "true"

    _.spritebattler_updatePos = Sprite_Battler.prototype.updatePosition;
    Sprite_Battler.prototype.updatePosition = function(){
        _.spritebattler_updatePos.call(this);
        if(this._shakeDur > 0){
            let rate = _.diminish ? this._shakeDur/_.duration : 1.0;
            this.x += Math.random() * _.power * rate * (Math.random() >= 0.5 ? 1 : -1);
            this.y += Math.random() * _.power * rate * (Math.random() >= 0.5 ? 1 : -1);
            this._shakeDur -= 1
        }
    }

    _.initMembers = Sprite_Battler.prototype.initMembers
    Sprite_Battler.prototype.initMembers = function(){
        _.initMembers.call(this)
        this._shakeDur = 0;
    }

    _.createDmgSpr = Sprite_Battler.prototype.createDamageSprite
    Sprite_Battler.prototype.createDamageSprite = function() {
        _.createDmgSpr.call(this)
        if(this._battler.result().isHit()){
            this._shakeDur = _.duration;
        }
    };
}

// Initialize
Theo.ShakeBattler();
