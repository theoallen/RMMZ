/*:
@target MZ
@plugindesc v1.0.0 - Change the tone when you're about to die
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help
♦ About:
You want a more dramatic effect on battle when you're about to
die. Such as the screen become grayscaled or darker.

♦ How to use:
Change the parameter as you like.
And that it is ...

♦ Terms of Use:
- https://github.com/theoallen/RMMZ/blob/master/README.md

@param options
@text [General Setting]

@param iscrisis
@parent options
@type combo
@option All party members' HP below x%
@option Average party member's HP below x%
@text Crisis When =
@desc Determine the crisis. Or determine your own (write a code)
@default All party members' HP below x%

@param cval
@parent options
@type number
@min 1
@max 100
@text Crisis Value %
@desc Crisis when below this number
@default 20

@param blank1
@text ----------------------------------------------

@param tonesetting
@text [Tone Setting]
@default Color tint when entering crisis

@param tred
@parent tonesetting
@min -255
@max 255
@type number
@text Red
@desc Red color factor
@default -85

@param tgreen
@parent tonesetting
@min -255
@max 255
@type number
@text Green
@desc Green color factor
@default -85

@param tblue
@parent tonesetting
@min -255
@max 255
@type number
@text Blue
@desc Blue color factor
@default -85

@param gray
@parent tonesetting
@min 0
@max 255
@type number
@text Gray
@desc Gray factor
@default 255

@param tdur
@parent tonesetting
@min 1
@type number
@text Change tone duration
@default 60

@param blank2
@text ----------------------------------------------

@param flashsetting
@text [Flash Setting]
@default A flash when entering crisis

@param fred
@parent flashsetting
@min 0
@max 255
@type number
@text Red
@desc Red color factor
@default 255

@param fgreen
@parent flashsetting
@min 0
@max 255
@type number
@text Green
@desc Green color factor
@default 255

@param fblue
@parent flashsetting
@min 0
@max 255
@type number
@text Blue
@desc Blue color factor
@default 255

@param str
@parent flashsetting
@min 0
@max 255
@type number
@text Strength
@desc Flash Strength
@default 100

@param fdur
@parent flashsetting
@min 1
@type number
@text Flash Duration
@default 10

@param blank3
@text ----------------------------------------------

@param se
@text [Sound Effect Setting]
@default Play sound effect when entering crisis

@param sname
@parent se
@type file
@dir audio/se/
@text Name
@desc Sound effect name
@require 1
@default Bell1

@param svol
@parent se
@type number
@min 0
@max 100
@default 100
@text Volume
@desc Volume of the sound

@param spitch
@parent se
@type number
@min 1
@max 150
@default 50
@text Pitch
@desc Pitch of the sound

*/

var Theo = Theo || {}
Theo.CrisisTone = function(){
    const $ = Theo.CrisisTone
    $._pluginName = document.currentScript.src.match(/.+\/(.+)\.js/)[1]
    $._version = '1.0.0'
    $._params = PluginManager.parameters($._pluginName)

    $._durFlash = Number($._params.fdur)
    $._durTone = Number($._params.tdur)

    $._crisisTone = []
    $._crisisTone[0] = Number($._params.tred)
    $._crisisTone[1] = Number($._params.tgreen)
    $._crisisTone[2] = Number($._params.tblue)
    $._crisisTone[3] = Number($._params.gray)

    $._crisisFlash = []
    $._crisisFlash[0] = Number($._params.fred)
    $._crisisFlash[1] = Number($._params.fgreen)
    $._crisisFlash[2] = Number($._params.fblue)
    $._crisisFlash[3] = Number($._params.str)

    $._crisisSe = {
        name: $._params.sname,
        volume: Number($._params.svol),
        pitch: Number($._params.spitch),
        pan: 0
    }

    $._crisisValue = Number($._params.cval)
    const value = $._crisisValue
    switch($._params.iscrisis){
        case "All party members' HP below x%":
            Game_Party.prototype.isOnCrisis = function(){
                return this.members().every(m => m.hpRate() <= value/100)
            }
            break;
        case "Average party member's HP below x%":
            Game_Party.prototype.isOnCrisis = function(){
                return this.hpRate() <= value/100
            }
            break;
        default:
            Game_Party.prototype.isOnCrisis = eval("function() { return " + $._params.iscrisis + " }")
            break;
    }
    //---------------------------
    // Temporary variables

    $._needRefresh = false
    $._lastTone = [0,0,0,0]
    $._lastCrisis = false
    
    // Temporary variables
    //---------------------------

    $.actorRefresh = Game_Actor.prototype.refresh
    Game_Actor.prototype.refresh = function(){
        $.actorRefresh.call(this)
        $._needRefresh = true
    }

    Game_Party.prototype.hpRate = function(){
        return this.members().reduce((result,m) => { result + m.hpRate()}, 0) / this.members().length
    }
    
    $.sceneBattleUdate = Scene_Battle.prototype.update
    Scene_Battle.prototype.update = function(){
        $.sceneBattleUdate.call(this)
        $.updateBattleTone()
    }

    $.updateBattleTone = () => {
        if($._needRefresh){
            $._needRefresh = false
            $.changeCrisisTone()
        }
    }

    $.changeCrisisTone = () => {
        const crisis = $gameParty.isOnCrisis()
        const tone = crisis ? $._crisisTone : $._lastTone
        if($.isDifferentTone(tone, $gameScreen.tone())){
            if(crisis){
                if(!$._lastCrisis){
                    $._lastCrisis = true
                    $gameScreen.startFlash($._crisisFlash, $._durFlash)
                    AudioManager.playSe($._crisisSe)
                }
                $.screenTint.call($gameScreen, $._crisisTone, $._durTone)
            }else{
                $._lastCrisis = false
                $.screenTint.call($gameScreen, $._lastTone, $._durTone)
            }
        }
    }

    $.isDifferentTone = (tone1, tone2) => {
        return (
            tone1[0] !== tone2[0] ||
            tone1[1] !== tone2[1] ||
            tone1[2] !== tone2[2] ||
            tone1[3] !== tone2[3]
        )
    }

    $.screenTint = Game_Screen.prototype.startTint
    Game_Screen.prototype.startTint = function(tone, duration) {
        $._lastTone = this._tone.clone()
        $.screenTint.call(this, tone, duration)
    };
}
Theo.CrisisTone()
