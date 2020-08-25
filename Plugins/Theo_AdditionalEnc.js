/*:@target MZ
@url https://github.com/theoallen/RMMZ
@plugindesc v1.0.0 - Additional Encounter
@author TheoAllen
@help
Additional & Conditional Random Encounter
This plugin allow you to add additional map random encounter to the list
using plugin commands.

How to use:
- Create an event in the map with autorun trigger
- Use plugin command to add additional random encounter
- Add erase event to make it only run once per map load

Terms of Use:
https://github.com/theoallen/RMMZ/blob/master/README.md

@command Encounters
@text Encounters
@desc Add additional encounter

@arg troopId
@text Troop ID
@type troop
@desc Troop ID to be added to the encounter list
@default 1

@arg weight
@text Weight
@type number
@desc Weight of the troop. The larger the weight, the higher probability to appear
@default 5

@arg regionSet
@text Regions
@type number[]
@default []
@desc Region where you may encounter the troop. Putting an empty [] means all region

@arg cond
@text Condition
@type text
@default true
@desc A valid JS code to be evaluated as a condition for this encounter to appear
*/

var Theo = Theo || {}
Theo.AddEnc = function(){
    "use strict";
    const _ = Theo.AddEnc
    _.pluginName = "Theo_AdditionalEnc"

    _.mapSetup = Game_Map.prototype.setup
    Game_Map.prototype.setup = function(mapId) {
        this._additionalEnc = []
        _.mapSetup.call(this, mapId)
    };

    _.encList = Game_Map.prototype.encounterList
    Game_Map.prototype.encounterList = function() {
        let elist = _.encList.call(this)
        return elist.concat(this._additionalEnc.filter(e => e.isValid()))
    };

    PluginManager.registerCommand(_.pluginName, "Encounters", args => {
        var enc = {}
        enc.troopId = Number(args.troopId)
        enc.weight = Number(args.weight)
        enc.regionSet = JSON.parse(args.regionSet).map(e => { return Number(e)})
        eval("enc.isValid = function() { return " + args.cond + " }")
        try {
            enc.isValid()
        } catch (error) {
            throw new SyntaxError("Conditional encounter has an invalid JS code → " + error.message)
        }
        $gameMap._additionalEnc.push(enc)
    });
}
Theo.AddEnc()
