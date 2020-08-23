/*:@target MZ
@url https://github.com/theoallen/RMMZ
@plugindesc v1.0.0 - Play battle BGM based on various condition
@author TheoAllen
@url https://github.com/theoallen/RMMZ
@help
This plugin allow you to specify BGM for a certain troop to minimize
the usage of change battle BGM event for QoL

Specify the BGM list in the audioList plugin parameters

Known issue:
- Audio delay when switching to a different BGM and I can not
  figure it out why.

@command Toggle
@text Toggle
@desc Turn ON/OFF the conditional battle BGM and let you use the standard BGM

@arg toggle
@type boolean
@text Toggle
@default true

@param BGMList
@type struct<audiolist>[]
@decs Put all of your BGM list here
@default []
*/

/*~struct~audiolist:
@param name
@text AudioFile
@type file
@dir audio/bgm/

@param cond
@text Condition
@type text
@default true
@desc A text to be evaluated as a valid javascipt code 
(it must only contain a single line/statement)

@param volume
@text Volume
@type number
@default 100

@param pan
@text Pan
@type number
@default 0

@param pitch
@text Pitch
@type number
@default 100
*/

var Theo = Theo || {}
Theo.CondBGM = function(){
    "use strict";
    const _ = Theo.CondBGM
    const $ = Game_System.prototype

    _.pluginName = "Theo_ConditionalBattleBGM"
    _.params = PluginManager.parameters(_.pluginName)
    _.list = []

    JSON.parse(_.params.BGMList).forEach(e => {

        // I don't like eval. So I make it only evaled once
        var bgm = JSON.parse(e)
        eval("bgm.isValid = function() { return " + bgm.cond + " }")
        _.list.push(bgm)

    });

    _.sample = function(){
        return this[Math.floor(Math.random()*this.length)];
    }

    PluginManager.registerCommand(_.pluginName, "Toggle", args => {
        $._toggleConditionalBGM = args.toggle === 'true'
    });

    _.battleBgm = $.battleBgm
    $.battleBgm = function() {
        if (this._toggleConditionalBGM === undefined){
            this._toggleConditionalBGM = true
        }
        if(this._toggleConditionalBGM){
            var bgms = _.list.filter(item => item.isValid())
            var bgm = _.sample.call(bgms)
            if (bgm){
                return bgm
            }
        }
        return _.battleBgm.call(this)
    };
}
Theo.CondBGM()