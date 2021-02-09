/*:
@target MZ
@plugindesc v1.0.0 - Skill & Item Reordering
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help
♦ About:
You don't like how RPG Maker sort the item based on the ID and you want
to change that. But you have no idea how.

♦ How to use:
Tag your item/skill/weapons/armors with
<order: n>

The default weight of the order is 50 (customizable in the parameter).
If you want to put a certain item above others, the order must be smaller
than 50 (Because it is easier to think that bigger thing sinks deeper). 

When two item has the same order weight, it will use the id to
determine the sort priority.

♦ Terms of Use:
- https://github.com/theoallen/RMMZ/blob/master/README.md

@param weight
@text Default Order Weight
@type number
@min 0
@default 50
@desc Set up the default order weight here as you like.
*/

var Theo = Theo || {}
Theo.SkillAndItemReordering = function(){
    const $ = Theo.SkillAndItemReordering
    $._pluginName = document.currentScript.src.match(/.+\/(.+)\.js/)[1]
    $._version = '1.0.0'

    $._defaultWeight = Number(PluginManager.parameters($._pluginName).weight)

    $.dbLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function(){
        if (!$.dbLoaded.call(this)) {return false};
        if (!$._dbLoaded) {
            for(const db of $dataItems){
                if(db){
                    $.loadDefaultMeta(db)
                }
            }
            for(const db of $dataSkills){
                if(db){
                    $.loadDefaultMeta(db)
                }
            }
            for(const db of $dataWeapons){
                if(db){
                    $.loadDefaultMeta(db)
                }
            }
            for(const db of $dataArmors){
                if(db){
                    $.loadDefaultMeta(db)
                }
            }
            $._dbLoaded = true
        }
        return true;
    }

    $.loadDefaultMeta = (db) => {
        if(db.meta.order === undefined){
            db.meta.order = $._defaultWeight
        }else{
            db.meta.order = Number(db.meta.order)
        }
    }

    $.sorting = (a,b) => {
        if (a.meta.order === b.meta.order){
            return a.id - b.id
        }else{
            return a.meta.order - b.meta.order
        }
    }

    $.makeSkillList = Window_SkillList.prototype.makeItemList
    Window_SkillList.prototype.makeItemList = function() {
        $.makeSkillList.call(this)
        this._data = this._data.sort($.sorting)
    };

    $.makeItemList = Window_ItemList.prototype.makeItemList
    Window_ItemList.prototype.makeItemList = function() {
        $.makeItemList.call(this)
        this._data = this._data.sort($.sorting)
    };
}
Theo.SkillAndItemReordering()
