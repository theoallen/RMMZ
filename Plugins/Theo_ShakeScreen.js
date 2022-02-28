/*:
@target MZ
@plugindesc Shake the screen in random directions.
@author TheoAllen
@help 
Version 1.0.220228

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
    const $ = Theo.Shake
    $._pluginName = document.currentScript.src.match(/.+\/(.+)\.js/)[1]

    PluginManager.registerCommand($._pluginName, "Shake", args => {
        $.dur = args.dur
        $.maxdur = args.dur
        $.power = args.pwr
        $.diminish = args.dim
        $.loop = args.loop
    });

    $.spritesetBase_updatePos = Spriteset_Base.prototype.updatePosition;
    Spriteset_Base.prototype.updatePosition = function(){
        $.spritesetBase_updatePos.call(this);
        if($.dur > 0){
            let rate = $.diminish ? $.dur/$.maxdur : 1.0;
            this.x += Math.random() * $.power * rate * (Math.random() >= 0.5 ? 1 : -1);
            this.y += Math.random() * $.power * rate * (Math.random() >= 0.5 ? 1 : -1);
            $.dur -= 1
        }
    }
}

// Initialize
Theo.Shake();
