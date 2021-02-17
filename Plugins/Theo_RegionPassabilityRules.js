/*:
@target MZ
@plugindesc v1.0.0 - Restrict events movement by region/terrain tag
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help
♦ About:
Restrict the event movement to a specific region or terrain tag.

♦ How to use:
Use plugin command to configure the passability of the event.
This plugin command will not be executed as an event command. But as a
page configuration when the event is loaded

♦ Terms of Use:
- https://github.com/theoallen/RMMZ/blob/master/README.md

@param noPassReg
@text Impassable Region
@desc No one can pass a tile tagged by this region id. Not even with through ON
@type number
@min 0
@max 255
@default 255

@param noPassTag
@text Impassable Terrain Tag
@desc No one can pass a tile tagged by this terrain tag. Not even with through ON
@min 0
@max 7
@default 0
@type number

@command localPass
@text [Page Setting] Set Passable
@desc Local page setting. The event will ONLY be able to move within these region

@arg type
@type select
@option Region
@option Terrain Tag
@text Tag Type
@desc Select the rules type
@default Region

@arg list
@type number[]
@min 0
@max 255
@text Tag ID

@command localImpass
@text [Page Setting] Set Impassable
@desc Local page setting. The event will NOT be able to move within these region

@arg type
@type select
@option Region
@option Terrain Tag
@text Tag Type
@desc Select the rules type
@default Region

@arg list
@type number[]
@min 0
@max 255
@text Tag ID

@arg list
@type number[]
@min 0
@max 255
@text Tag ID

*/
var Theo = Theo || {}
Theo.RegionRules = function(){
    const $ = Theo.RegionRules
    $._version = '1.0.0'
    $._pluginName = document.currentScript.src.match(/.+\/(.+)\.js/)[1]
    $._params = PluginManager.parameters($._pluginName)

    $._noPassRegion = Number($._params.noPassReg)
    $._noPassTag = Number($._params.noPassTag)

    // Name too common, avoiding conflict
    $.isRestricted = function(character, x, y){
        if(!$gameMap.isValid(x, y)){
            return true;
        }
        if(character.isDebugThrough()){
            return false;
        }
        return (
            ($._noPassRegion > 0 && $gameMap.regionId(x, y) === $._noPassRegion) ||
            ($._noPassTag > 0 && $gameMap.terrainTag(x, y) === $._noPassTag)
        )
    }

    $.characterResticted = (char, x, y) => {
        return (
            char._noPassRegion.includes($gameMap.regionId(x, y)) || char._noPassTag.includes($gameMap.terrainTag(x, y))
        )
    }

    $.gcCanPass = Game_Character.prototype.canPass
    Game_Character.prototype.canPass = function(x, y, d) {
        const x2 = $gameMap.roundXWithDirection(x, d);
        const y2 = $gameMap.roundYWithDirection(y, d);
        if($.isRestricted(this, x2, y2)){
            return false
        }
        return $.gcCanPass.call(this, x, y, d) && !$.characterResticted(this, x2, y2)
    };

    $.gcIsMapPassable = Game_Character.prototype.isMapPassable
    Game_Character.prototype.isMapPassable = function(x, y, d) {
        if(this.hasCustomPassability()){
            const x2 = $gameMap.roundXWithDirection(x, d);
            const y2 = $gameMap.roundYWithDirection(y, d);
            const regId = $gameMap.regionId(x2, y2)
            const tag = $gameMap.terrainTag(x2, y2)
            return this._passRegion.includes(regId) || this._passTag.includes(tag)
        }        
        return $.gcIsMapPassable.call(this, x, y, d)
    };

    Game_Character.prototype.hasCustomPassability = function(){
        return (
            this._passRegion.length > 0 ||
            this._passTag.length > 0
        )
    }

    $.gcInitMembers = Game_Character.prototype.initMembers
    Game_Character.prototype.initMembers = function() {
        $.gcInitMembers.call(this)
        this.initPassabilityRules()
    };

    Game_Character.prototype.initPassabilityRules = function(){
        this._noPassRegion = []
        this._noPassTag = []
        this._passRegion = []
        this._passTag = []
    }

    $.eventSetupPageSetting = Game_Event.prototype.setupPageSettings
    Game_Event.prototype.setupPageSettings = function(){
        $.eventSetupPageSetting.call(this)
        this.initPassabilityRules()
        this.loadPassabilityRules()
    }

    Game_Event.prototype.loadPassabilityRules = function(){
        for(const command of this.list()){
            if(command.code === 357 && command.parameters[0] === $._pluginName){
                const args = command.parameters[3]
                const list = JSON.parse(args.list).map(Number)
                switch(command.parameters[1]){
                    case "localPass":
                        if(args.type === "Region"){
                            this._passRegion = list
                        }else{
                            this._passTag = list
                        }
                        break;
                    case "localImpass":
                        if(args.type === "Region"){
                            this._noPassRegion = list
                        }else{
                            this._noPassTag = list
                        }
                        break;
                }
            }
        }
    }
}
Theo.RegionRules()
