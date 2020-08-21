/*:
@target MZ
@plugindesc Shake the screen in random directions.
@author TheoAllen
@help 
Version 1.0

Shake the screen in random directions. Provides a better shake effect than 
the vanilla shake screen.

Terms of Use:
- Free for commercial
- Credit is optional, just do not claim.

 @command Shake
 @text Shake
 @desc Shake the screen
 
 @arg pwr
 @type number
 @text Power
 @desc The power of the shake (Max: 10 recommended)
 @default 7

 @arg dur
 @type number
 @text Duration
 @desc The duration of the shake in frames (60 frame = 1 sec)
 @default 60

 @arg dim
 @type boolean
 @text Diminish
 @desc Will the shake power diminished over the time? (Getting slower overtime)
 @default true

 */
var Theo = Theo || {}

// I dont like IIFE notation
Theo.Shake = function(){
    this.pluginName = "Theo_ShakeScreen"
    let shake = this;

    PluginManager.registerCommand(shake.pluginName, "Shake", args => {
        shake.dur = args.dur
        shake.maxdur = args.dur
        shake.power = args.pwr
        shake.diminish = args.dim
        shake.loop = args.loop
    });

    shake.spritesetBase_updatePos = Spriteset_Base.prototype.updatePosition;
    Spriteset_Base.prototype.updatePosition = function(){
        shake.spritesetBase_updatePos.call(this);
        if(shake.dur > 0){
            let rate = shake.diminish ? shake.dur/shake.maxdur : 1.0;
            this.x += Math.random() * shake.power * rate * (Math.random() >= 0.5 ? 1 : -1);
            this.y += Math.random() * shake.power * rate * (Math.random() >= 0.5 ? 1 : -1);
            shake.dur -= 1
        }
    }
}

// Initialize
Theo.Shake();
