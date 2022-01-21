/*:
@target MZ
@plugindesc v1.1 - Random Event Starting Placement (Based on Region ID)
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help 
Version 1.1

♦ About:
Randomly place the event start position based on the region id.

♦ How to use:
Use plugin command to configure the event placement.
This plugin command will not be executed as an event command. But as a
page configuration when the event is loaded

If you want to relocate the event or character, use 
--> move route
--> script
--> write the following

this.randomRegionPlacement(region_id)
this.randomRegionPlacement(region_id1, region_id2, region_id3)

You can supply the region id as many as you want

♦ Terms of Use:
https://github.com/theoallen/RMMZ/blob/master/README.md

@command pageRandom
@text [Page Setting] Random Start Placement
@desc Local page setting. The event placement will be randomized when this page is loaded.

@arg list
@type number[]
@min 0
@max 255
@text Region ID
*/

/*
Version 1.1.20220122 - Added a check to see if the tile is already occupied
*/

var Theo = Theo || {}
Theo.RandomEventPlacement = function(){
    const $ = Theo.RandomEventPlacement

    $._version = '1.1.20220122'
    $._pluginName = document.currentScript.src.match(/.+\/(.+)\.js/)[1]

    // Precache map region
    // Might not work with a plugin that changes the region on the run, but eh...
    $._mapRegions = {}
    $.getRegionLocation = function(mapId, regionId){
        if (!$._mapRegions[mapId]){
            $._mapRegions[mapId] = {
                list: {},
                set: function(x, y, id) { 
                    this.list[id] ||= []
                    this.list[id].push({x: x, y: y})
                },
                regionList: function() { 
                    let list = []
                    for(const region of arguments){
                        list = list.concat(this.list[region] || [])
                    }
                    return list
                }
            }
            for (const x of [...Array($gameMap.width()).keys()]){
                for (const y of [...Array($gameMap.height()).keys()]){
                    const region = $gameMap.regionId(x, y)
                    $._mapRegions[mapId].set(x, y, region)
                }
            }
        }
        return $._mapRegions[mapId].regionList(...regionId)
    }

    // Array sample
    $.sample = function(){
        const allChars = [$gamePlayer, ...$gameMap.events()]
        for(const pos of this){
            if(allChars.some(c => c.x == pos.x && c.y == pos.y)){
                this.remove(pos)
            }
        }
        return this[Math.floor(Math.random()*this.length)];
    }

    // Pass using arguments
    Game_Character.prototype.randomRegionPlacement = function(){
        const locationList = $.getRegionLocation($gameMap.mapId(), arguments)
        const location = $.sample.call(locationList)
        if (location){
            this.setPosition(location.x, location.y)
        }
    }

    $.eventSetupPageSetting = Game_Event.prototype.setupPageSettings
    Game_Event.prototype.setupPageSettings = function(){
        $.eventSetupPageSetting.call(this)
        $.checkPlacement.call(this)
    }

    $.checkPlacement = function(){
        for(const command of this.list()){
            if(command.code === 357 && command.parameters[0] === $._pluginName && command.parameters[1] === "pageRandom"){
                const args = command.parameters[3]
                const list = JSON.parse(args.list).map(Number)
                this.randomRegionPlacement(...list)
            }
        }
    }

    // Reshuffle initial position (because events weren't registered at the start)
    $.setupEvents = Game_Map.prototype.setupEvents
    Game_Map.prototype.setupEvents = function() {
        $.setupEvents.call(this)
        for(const ev of this.events()){
            $.checkPlacement.call(ev)
        }
    };

}
Theo.RandomEventPlacement()
