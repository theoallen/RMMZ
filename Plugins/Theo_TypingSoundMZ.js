/*:
@target MZ
@plugindesc v1.0.0 - Typing Sound Effect MZ
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help 
♦ About:
Adds typing sound effect when using show text event command

♦ Plugin commands
Plugin Commands are available to change the sound effect during the game with 
the following commands are available:
- Activate/Deactivate typing sound during the game
- Change the sound effect setting
- Reset the sound effect settings

♦ Terms of Use:
https://github.com/theoallen/RMMZ/blob/master/README.md

 @command activate
 @text Activate Typing SE
 @desc Activate Typing SE
 
 @command deactivate
 @text Deactivate Typing SE
 @desc Deactivate Typing SE

 @command reset
 @text Reset Typing SE
 @desc Reset Typing SE property to the default property you have set em up in the plugin parameter

 @command change
 @text Change Typing SE
 @desc Change the typing sound

 @arg name
 @type file
 @dir audio/se/
 @text Name
 @desc Sound effect name
 @require 1
 @default Cursor1

 @arg vol
 @type number
 @min 0
 @max 100
 @default 100
 @text Volume
 @desc Volume of the sound

 @arg pitch
 @type number
 @min 1
 @max 150
 @default 100
 @text Pitch
 @desc Pitch of the sound
 
 @arg var
 @type number
 @min 0
 @max 20
 @default 0
 @text Pitch Variance
 @desc Pitch variance of the sound

 @param name
 @type file
 @dir audio/se/
 @text Name
 @desc Sound effect name
 @require 1
 @default Cursor1

 @param vol
 @type number
 @min 0
 @max 100
 @default 100
 @text Volume
 @desc Volume of the sound

 @param pitch
 @type number
 @min 1
 @max 150
 @default 100
 @text Pitch
 @desc Pitch of the sound
 
 @param var
 @type number
 @min 0
 @max 20
 @default 0
 @text Pitch Variance
 @desc Pitch variance of the sound

 @param delay
 @type number
 @min 1
 @text Sound effect delay
 @desc Sound effect delay
 @default 4
 */

var Theo = Theo || {}
Theo.TypingSound = function(){
    const $ = Theo.TypingSound
    const pluginName = document.currentScript.src.match(/.+\/(.+).js/)[1]
    $._params = PluginManager.parameters(pluginName)
    $._default = {
        name: $._params.name,
        volume: Number($._params.vol),
        pitch: Number($._params.pitch),
        variance: Number($._params.var),
        delay: Number($._params.delay)
    }
    $._delayTiming = 0

    Game_System.prototype._typingSe = Object.assign({}, $._default)
    Game_System.prototype._typingSeOn = true

    PluginManager.registerCommand(pluginName, "activate", () => {
        $gameSystem._typingSeOn = true;
    });

    PluginManager.registerCommand(pluginName, "deactivate", () => {
        $gameSystem._typingSeOn = false;
    });

    PluginManager.registerCommand(pluginName, "reset", () => {
        $gameSystem._typingSe = Object.assign({}, $._default)
    });

    PluginManager.registerCommand(pluginName, "change", (args) => {
        const o = $gameSystem._typingSe
        o.name = args.name
        o.volume = Number(args.vol)
        o.pitch = Number(args.pitch)
        o.variance = Number(args.var)
    });

    $.play = () => {
        if(!$gameSystem._typingSeOn){
            return
        }
        const variance = ((Math.random() >= 0.5 ? 1 : -1) * (Math.random() * $gameSystem._typingSe.variance))
        const se = {
            name: $gameSystem._typingSe.name,
            volume: $gameSystem._typingSe.volume,
            pitch: $gameSystem._typingSe.pitch + variance,
            pan: 0
        }
        AudioManager.playSe(se)
    }

    $.updateMsg = Window_Message.prototype.updateMessage
    Window_Message.prototype.updateMessage = function() {
        const updated = $.updateMsg.call(this)
        if(updated){
            if($._delayTiming-- <= 0){
                $.play()
                $._delayTiming = $gameSystem._typingSe.delay
            }
        }else{
            $._delayTiming = 0
        }
        return updated
    };
}
Theo.TypingSound()
