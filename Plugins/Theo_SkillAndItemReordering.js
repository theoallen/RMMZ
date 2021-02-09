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

By default, the value of the order is same as the ID.
So, if you want to put a certain item above others, the order must be smaller
than the other item's id

♦ Terms of Use:
- https://github.com/theoallen/RMMZ/blob/master/README.md
*/

var Theo = Theo || {}
Theo.SkillAndItemReordering = function(){
    const $ = Theo.SkillAndItemReordering
    $._version = '1.0.0'

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
            db.meta.order = db.id
        }else{
            db.meta.order = Number(db.meta.order)
        }
    }

    $.sorting = (a,b) => {
        return a.meta.order - b.meta.order
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
