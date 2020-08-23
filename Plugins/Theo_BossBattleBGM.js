/*:@target MZ
@url https://github.com/theoallen/RMMZ
@plugindesc v1.0.0 - Troop specific BGM for your convenience
@author TheoAllen
@help
This plugin allow you to specify BGM for a certain troop to minimize
the usage of change battle BGM event for QoL

Specify the BGM list in the audioList plugin parameters

Terms of Use:
- Free for commercial
- Credit is optional

@param audioList
@type struct<audiolist>[]

*/

/*~struct~audiolist:
@param troopID
@text TroopID
@type troop

@param name
@text AudioFile
@type file
@dir audio/bgm/

@param pan
@text Pan
@type number
@default 0

@param pitch
@text Pitch
@type number
@default 100

@param volume
@text Volume
@type number
@default 100
*/

var Theo = Theo || {}
Theo.BossBGM = function(){
    const _ = Theo.BossBGM
    _.params = PluginManager.parameters('Theo_BossBattleBGM')
    _.list = []
    JSON.parse(_.params.audioList).forEach(e => {
        console.log(e)
        _.list.push(JSON.parse(e))
    });

    const $ = Game_System.prototype
    _.battleBgm = $.battleBgm
    $.battleBgm = function() {
        var id = $gameTroop._troopId;
        var bgm = _.list.find(item => item.troopID == id)
        if (bgm) {
            return bgm
        }else{
            return _.battleBgm.apply(this, arguments);
        }
    };
}
Theo.BossBGM()