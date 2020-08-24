/*:@target MZ
@url https://github.com/theoallen/RMMZ
@plugindesc v1.0.1 - Play battle BGM based on various condition
@author TheoAllen
@url https://github.com/theoallen/RMMZ
@help
This plugin allow you to specify BGM for a certain troop to minimize
the usage of change battle BGM event for QoL

Specify the BGM list in the audioList plugin parameters

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

@param pitch
@text Pitch
@type number
@default 100

@param pan
@text Pan
@type number
@default 0
*/

var Theo = Theo || {}
Theo.CondBGM = function(){
    "use strict";
    const _ = Theo.CondBGM
    const $ = Game_System.prototype

    _.pluginName = "Theo_ConditionalBattleBGM"
    _.params = PluginManager.parameters(_.pluginName)
    _.list = []
    _.rollNewBGM = true

    JSON.parse(_.params.BGMList).forEach(e => {

        // I don't like eval. So I make it only evaled once
        var bgm = JSON.parse(e)
        eval("bgm.isValid = function() { return " + bgm.cond + " }")
        _.list.push(bgm)

    });

    _.sample = function(){
        if (_.rollNewBGM){
            let bgms = _.list.filter(item => item.isValid())
            _.rolledBGM = bgms[Math.floor(Math.random()*bgms.length)]
            _.rollNewBGM = false
        }
    }

    PluginManager.registerCommand(_.pluginName, "Toggle", args => {
        $._toggleConditionalBGM = args.toggle === 'true'
    });

    _.playBattleBGM = BattleManager.playBattleBgm
    BattleManager.playBattleBgm = function() {
        _.sample()
        _.playBattleBGM()
    };

    _.battleBgm = $.battleBgm
    $.battleBgm = function() {
        if (this._toggleConditionalBGM === undefined){
            this._toggleConditionalBGM = true
        }
        if(this._toggleConditionalBGM && _.rolledBGM){
            return _.rolledBGM
        }
        return _.battleBgm.call(this)
    };

    var map = Scene_Map.prototype
    _.mapInit = map.initialize
    map.initialize = function() {
        _.rollNewBGM = true
        _.mapInit.call(this)
    };
}
Theo.CondBGM()
