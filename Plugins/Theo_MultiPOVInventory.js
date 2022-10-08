/*:
@target MZ
@plugindesc v1.0.3 - Multiple Party POV Inventory System
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help

♦ About:
Suppose that you want to change the point of view for narrative reasons.
You changed all the party members, but the inventory item from the previous party 
stays. And you don't want that.

This plugin let you save the inventory data from the party and reload
it later in time for the purpose of changing point of view.

May or may not work with item related plugin such as individual/instance item
plugins. But I don't know.

♦ Terms of Use:
- https://github.com/theoallen/RMMZ/blob/master/README.md

@command save
@text Save Inventory
@desc Save the current inventory. Recommended to use when you are about to change POV.

@arg name
@type combo
@option Slot 1
@option Slot 2
@option Slot 3
@option Slot 4
@default Slot 1
@text Slot
@desc Save the inventory to slot x (or define your own).

@arg clear
@type boolean
@default true
@text Clear current inventory?
@desc if set to true, it will clear the current inventory

@command load
@text Load inventory
@desc Load other inventory data (from other POV). Recommended to use after you change the POV.

@arg name
@type combo
@option Slot 1
@option Slot 2
@option Slot 3
@option Slot 4
@default Slot 1
@text Slot
@desc Load the inventory from slot x (or your own slot name).

@arg merge
@type boolean
@default false
@text Merge Inventory?
@desc Merge to the current inventory. Any excess item will not be merged. For example, you can not have more than 99 potions.
*/

var Theo = Theo || {}
Theo.MultiPOVInv = function(){
    const $ = Theo.MultiPOVInv
    $._version = '1.0.3'
    $._pluginName = document.currentScript.src.match(/.+\/(.+)\.js/)[1]
	
	function Inventory() {
        this.initialize(...arguments);
    }

    Inventory.prototype.initialize = function(){
        this._items = {}
        this._weapons = {}
        this._armors = {}
        this._gold = 0
    }

    Inventory.prototype.saveInventory = function(clear){
        this._items = Object.assign({}, $gameParty._items)
            this._weapons = Object.assign({}, $gameParty._weapons)
            this._armors = Object.assign({}, $gameParty._armors)
            this._gold = $gameParty._gold
            if(clear){
                $gameParty._items = {}
                $gameParty._weapons = {}
                $gameParty._armors = {}
                $gameParty._gold = 0
            }
    }

    Inventory.prototype.loadInventory = function(merge){
        if(merge){
            for(const key of Object.keys(this._items)){
                const item = $dataItems[key]
                const sum = ($gameParty._items[key] !== undefined ? $gameParty._items[key] : 0) + this._items[key]
                $gameParty._items[key] = Math.min(sum, $gameParty.maxItems(item))
            }
            for(const key of Object.keys(this._weapons)){
                const item = $dataWeapons[key]
                const sum = ($gameParty._weapons[key] !== undefined ? $gameParty._weapons[key] : 0) + this._weapons[key]
                $gameParty._weapons[key] = Math.min(sum, $gameParty.maxItems(item))
            }
            for(const key of Object.keys(this._armors)){
                const item = $dataArmors[key]
                const sum = ($gameParty._armors[key] !== undefined ? $gameParty._armors[key] : 0) + this._armors[key]
                $gameParty._armors[key] = Math.min(sum, $gameParty.maxItems(item))
            }
            $gameParty.gainGold(this._gold)
        }else{
            $gameParty._items = Object.assign({}, this._items)
            $gameParty._weapons = Object.assign({}, this._weapons)
            $gameParty._armors = Object.assign({}, this._armors)
            $gameParty._gold = this._gold
        }
    }

    $.Inventory = Inventory

    PluginManager.registerCommand($._pluginName, "save", args => {
        const name = args.name
        const clear = args.clear === "true"
		const inv = $.getInventory.call($gameParty, name)
		inv.prototype = Object.create($.Inventory.prototype)
        inv.prototype.saveInventory.call(inv, clear)
    });

    PluginManager.registerCommand($._pluginName, "load", args => {
        const name = args.name
        const merge = args.merge === "true"
		const inv = $.getInventory.call($gameParty, name)
		inv.prototype = Object.create($.Inventory.prototype)
        inv.prototype.loadInventory.call(inv, merge)
    });

    $.getInventory = function(name){
        if(this._multiInventories === undefined){
            this._multiInventories = {}
        }
        if(!this._multiInventories[name]){
            this._multiInventories[name] = new $.Inventory()
        }
        return this._multiInventories[name]
    }
}
Theo.MultiPOVInv()
