/*:
@target MZ
@plugindesc v1.0.0 - You don't have time to watch the same scene 1000 times.
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help
♦ About:
You're getting tired of watching the same cut-scene 1000 times and you
want to skip or speed up the game and test the thing you want to test.

♦ How to use:
Press or toggle the button to speed up the game.
Configurable in the plugin parameter.

ASCII for the button code
https://theasciicode.com.ar/

Default keys
- Hold press (F) to speed up.
- Press (G) to trigger speed up on/off.

♦ Disclaimer:
This works by "overclocking" the update speed of your game which it may
also depends on your PC speed if it can handle the speed. Most of the time
it should run just fine, just please put a reasonable number and don't
put frame speed as insane as 1000.

♦ Terms of Use:
- https://github.com/theoallen/RMMZ/blob/master/README.md

@param speedsetting
@text ----- [Speed Setting] -----

@param frametoskip
@parent speedsetting
@text Frame Speed
@type number
@min 1
@default 7
@desc How many additional frames will be skipped when you press the button?

@param textspeed
@parent speedsetting
@text Message Speed
@type number
@min 2
@default 3
@desc How many letters will be drawn in the text window when you press the button?

@param buttonsetting
@text ----- [Button Setting] -----

@param pressKey
@parent buttonsetting
@text Key Press
@type number
@default 70
@desc When pressed, it skips the frames x times specified in Frame to Skip configuration

@param triggerKey
@parent buttonsetting
@text Key Trigger
@type number
@default 71
@desc When triggered, it skips the frames x times specified in Frame to Skip configuration. Press again to turn off.

@param skipsetting
@text ----- [Skip Setting] -----

@param skipse
@parent skipsetting
@text Skips Sound effect?
@type boolean
@default true
@desc When in speed up mode, do not play Sound Effect.

@param autoskiptext
@parent skipsetting
@text Skips Text Input?
@type boolean
@default true
@desc When in speed up mode, do not wait for input for show text.

@param skiptextwait
@parent skipsetting
@text Skips Text Wait?
@type boolean
@default true
@desc When in speed up mode, ignore wait imposed by the escape characters.

@param skipmovie
@parent skipsetting
@text Skips Play movie?
@type boolean
@default true
@desc When in speed up mode, do not play movie

@param skipcommandwait
@parent skipsetting
@text Skips Event Wait?
@type boolean
@default false
@desc When in speed up mode, do not execute event command wait. MAY THROW OFF YOUR EVENT TIMING.

@param skipanimation
@parent skipsetting
@text Skips Animation?
@type boolean
@default true
@desc When in speed up mode, do not play animation from the event command.

@param skipfade
@parent skipsetting
@text Skips Fadein/out?
@type boolean
@default true
@desc When in speed up mode, speed up fadein/fadeout from event commands.

@command triggeron
@text Speed up ON
@desc Speed up the game. Don't forget to turn it off. Will only work in playtest mode

@command triggeroff
@text Speed up OFF
@desc Turn off the Speed up.

*/

var Theo = Theo || {}
Theo.DebugFastforward = () => {
    const $ = Theo.DebugFastforward
    $._pluginName = document.currentScript.src.match(/.+\/(.+)\.js/)[1]
    $._params = PluginManager.parameters($._pluginName)
    $._version = '1.0.0'

    $._isSkipppingFrame = false
    $._frameToSkip = Number($._params.frametoskip)
    $._pressInput = Number($._params.pressKey)
    $._triggerInput = Number($._params.triggerKey)
    $._skipSe = $._params.skipse === "true"
    $._skipTextInput = $._params.autoskiptext === "true"
    $._skipTextWait = $._params.skiptextwait === "true"
    $._skipFade = $._params.skipfade === "true"
    $._textSpeed = Number($._params.textspeed) - 1
    $._letterCount = 0;

    PluginManager.registerCommand($._pluginName, "triggeron", () => {
        $._isSkipppingFrame = true
    });

    PluginManager.registerCommand($._pluginName, "triggeroff", () => {
        $._isSkipppingFrame = false
    });

    $.startWait = Window_Message.prototype.startWait
    Window_Message.prototype.startWait = function(count) {
        if($._skipTextWait && $.isSkippingFrame()){
            return
        }
        $.startWait.call(this, count)
    };

    // Overwrite update input
    Window_Message.prototype.updateInput = function() {
        if (this.isAnySubWindowActive()) {
            return true;
        }
        if (this.pause) {
            if (this.isTriggered() || ($._skipTextInput && $.isSkippingFrame())) {
                Input.update();
                this.pause = false;
                if (!this._textState) {
                    this.terminateMessage();
                }
            }
            return true;
        }
        return false;
    };

    $.msgCanBreakHere = Window_Message.prototype.canBreakHere
    Window_Message.prototype.canBreakHere = function(textState) {
        if(this.isEndOfText(textState)){
            $._letterCount = 0
            return true;
        } else if ($.isSkippingFrame()){
            $._letterCount--
            if($._letterCount <= 0){
                $._letterCount = $._textSpeed
                return $.msgCanBreakHere.call(this, textState)
            }
            return false
        }
        return $.msgCanBreakHere.call(this, textState)
    }

    $.msgStart = Window_Message.prototype.startMessage
    Window_Message.prototype.startMessage = function() {
        $._letterCount = 0
        $.msgStart.call(this)
    };

    Input.keyMapper[$._pressInput] = "frameSkip"
    Input.keyMapper[$._triggerInput] = "toggleFrameSkip"

    $._eventToSkip = []
    if($._params.skipmovie === "true"){
        $._eventToSkip.push(261)
    }

    if($._params.skipse === "true"){
        $._eventToSkip.push(250)
    }

    if($._params.skipcommandwait === "true"){
        $._eventToSkip.push(230)
    }

    if($._params.skipanimation === "true"){
        $._eventToSkip.push(212)
    }

    $.fadeSpeed = Game_Interpreter.prototype.fadeSpeed
    Game_Interpreter.prototype.fadeSpeed = function() {
        if ($.isSkippingFrame()){
            return 1
        }else{
            $.fadeSpeed.call(this)
        }
    };

    // Overwrite execute command
    Game_Interpreter.prototype.executeCommand = function() {
        const command = this.currentCommand();
        if (command) {
            this._indent = command.indent;
            const methodName = "command" + command.code;
            if(!$._eventToSkip.includes(command.code)){
                if (typeof this[methodName] === "function") {
                    if (!this[methodName](command.parameters)) {
                        return false;
                    }
                }
            }
            this._index++;
        } else {
            this.terminate();
        }
        return true;
    };

    $.repeatNum = SceneManager.determineRepeatNumber
    SceneManager.determineRepeatNumber = function(deltaTime) {
        return $.repeatNum.call(this, deltaTime) + $.frameSkip()
    };

    $.isSkippingFrame = () => {
        return ($gameTemp && $gameTemp.isPlaytest()) && ($._isSkipppingFrame || Input.isPressed("frameSkip"))
    }

    $.frameSkip = () => {
        if ($.isSkippingFrame()){
            return $._frameToSkip
        }
        return 0;
    }

    $.updateMain = SceneManager.updateMain
    SceneManager.updateMain = function() {
        $.updateMain.call(this)
        $.updateToggle()
    }

    $.updateToggle = () => {
        if(Input.isTriggered("toggleFrameSkip")){
            $._isSkipppingFrame = !$._isSkipppingFrame
        }
    }

    $.playSe = AudioManager.playSe
    AudioManager.playSe = function(se) {
        if(!$.isSkippingFrame()){
            $.playSe.call(this, se)
        }
    };
}
Theo.DebugFastforward()
