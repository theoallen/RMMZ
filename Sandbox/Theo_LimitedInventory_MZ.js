/*:
@target MZ
@plugindesc Limits carrying capacity like in many popular games.
Version 0.1
@author TheoAllen
@help
This script allow you to limit your inventory by overall possesed 
items instead of individual items.

IMPORTANT NOTE:
Name the file of this plugin literally as
"Theo_LimitedInventory.js"
	
Notetags:
Write down these notetags to the notebox in your database
	  
<inv size: n>
Use this notetag where the n is a numeric value which is determine 
the size of item. Use 0 for unlimited item. Only works for item 
and equipment such as weapon or armor.

<inv plus: n>
Use this notetag to determine the additional avalaible free 
inventory slot. This notetag avalaible for Actor, Class, Equip, 
and States. If it's for actor, avalaible inventory slot will 
increase when a new actor entered party. If it's for equip, the 
avalaible slot will be increase if the certain equip is equipped. 
And so do states.

This value can be changed plugin commands

<inv minus: n>
Inverse of <inv plus>. It will decrease the avalaible inventory 
slot. Should be self explanatory

Terms of use :
Credit me, TheoAllen. You are free to edit this script by your own. 
As long as you don't claim it yours. For commercial purpose, don't 
forget to give me a free copy of the game.

@param Preferences
	
@param dynamic
@parent Preferences
@text Dynamic Slot
@type boolean
@default true
@desc If set to true, then total avalaible inventory slot depends on actor, states, total party members, etc ...
 
@param displayItem
@parent Preferences
@text Display Item Size
@type boolean
@default true
@desc Diplay item size in item menu
 
@param includeEquip
@parent Preferences
@text Include Equip
@type boolean
@default false
@desc Total used inventory slot will also include actor equipment.

@param drawTotalSize
@parent Preferences
@text Draw Total Size
@type boolean
@default true
@desc If true, item size window will show total weight of specified item. 10 potions with 3 weight each = show 30 instead of 3

@param forceGain
@parent Preferences
@text Force Gain Item
@type boolean
@default false
@desc Force gain item even if inventory full. (Recommended to set some penalties if inventory is full)

@param fullDisableDash
@parent Preferences
@text Disable Dash at Full
@type boolean
@default false
@desc When the inventory is at full, disable dashing

@param fullSlowDown
@parent Preferences
@text Slowdowns at full
@type boolean
@default false
@desc When the inventory is at full, slow down the movement

@param Numeric Setting

@param defaultFree
@parent Numeric Setting
@text Default Free Slot
@type number
@default 20
@desc Default free slot provided by each actor. If Dynamic slot set to false. It will be use this setting for the free slot

@param nearMaxPercent
@parent Numeric Setting
@text Near Maximum Percentage
@type number
@default 25
@desc Remain avalaible slot percentage to determine if the inventory is almost maxed out or not.

@param nearMaxColor
@parent Numeric Setting
@text Near Maximum Color ID
@type number
@default 21
@desc Color ID to draw the number

@param commandSize
@parent Numeric Setting
@text Use Command Size
@type number
@default 340
@desc The width of use item command window

@param Vocab Settings

@param invSlotVocab
@parent Vocab Settings
@text Inventory Slot
@default Inventory:
@desc Vocab for inventory

@param invSizeVocab
@parent Vocab Settings
@text Size Vocab
@default Size:
@desc Vocab for Size

@param slotShort
@parent Vocab Settings
@text Inventory Slot (Short)
@default Inv:
@desc Vocab for inventory (short)

@param useVocab
@parent Vocab Settings
@text Use Vocab
@default Use Item
@desc Vocab for using an item

@param discardVocab
@parent Vocab Settings
@text Discard Vocab
@default Discard
@desc Vocab for discarding an item

@param cancelVocab
@parent Vocab Settings
@text Cancel Vocab
@default Cancel
@desc Vocab for canceling

*/ 

var Theo = Theo || {}
Theo.LINV = function(){
    //===================================================================
    // Constant
    //-------------------------------------------------------------------
    var li = this.LINV
    li.pluginName = 'Theo_LimitedInventory_MZ'
    li.Params = PluginManager.parameters(li.pluginName)
    li.invSizeREGX = /<inv[\s_]+size\s*:\s*(\d+)>/i
    li.invPlusREGX = /<inv[\s_]+plus\s*:\s*(\d+)>/i
    li.invMinsREGX = /<inv[\s_]+minus\s*:\s*(\d+)/i

    //===================================================================
    // New methods
    //-------------------------------------------------------------------
    li.loadActorDefault = (actors) => {
        actors.forEach(function(actor){
            if(!actor){return};
            actor.invMod = Number(li.Params['defaultFree']);
        })
    }

    li.loadData = (db) => {
        if (!db.invMod){
            db.invMod = 0
        };
        db.invSize = 1;
        let notedata = db.note.split(/[\r\n]+/);
        notedata.forEach(function(line){
            if(line.match(li.invSizeREGX)){
                db.invSize = Number(RegExp.$1);
            }else if(line.match(li.invPlusREGX)){
                db.invMod = Number(RegExp.$1);
            }else if(line.match(li.invMinsREGX)){
                db.invMod = Number(RegExp.$1) * -1;
            }
        });
    }

//===================================================================
// DataManager
//-------------------------------------------------------------------
    li.dbLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function(){
        if (!li.dbLoaded.call(this)) {return false};
        if (!li.invLoaded) {
            li.loadActorDefault($dataActors);
            let database =  [$dataActors, $dataClasses, $dataWeapons, $dataArmors, $dataStates, $dataItems];
            database.forEach(function(data){
                data.forEach(function(db){
                    if(db === null){return};
                    li.loadData(db);
                })
            })
            li.invLoaded = true;
        }
        return true;
    }
//===========================================================================
//  #endregion
//---------------------------------------------------------------------------

//===========================================================================
//  #region Game_Actor
//-------------------------------------------------------------------
    let actor = Game_Actor.prototype

    li.actorSetup = actor.setup;
    actor.setup = function(actorId) {
        li.actorSetup.call(this, actorId);
        this._baseInv = $dataActors[actorId].invMod;
    };

    // New function
    actor.equipSize = function(){
        if (li.Params['includeEquip'] === 'false'){return 0};

        // Ruby equal method => inject(0) {|r, eq| ... }
        return this.equips().reduce(function(total, eq){
            if(eq === null){return total + 0};
            return total + eq.invSize;
        },0);

    }

    // New function (maximum inventory)
    actor.invMax = function(){
        var size = this._baseInv;
        size += $dataClasses[this._classId].invMod;
        size += this.states().reduce(function(total, state){total + state.invMod}, 0);
        size += this.equips().reduce(function(total, eq){
            if(!eq){return total + 0};
            return total + eq.invMod;
        },0);
        return Number(size);
    }

    // Overwrite function
    actor.tradeItemWithParty = function(newItem, oldItem) {
        if (newItem && !$gameParty.hasItem(newItem)) {
                return false;
        }else{
                $gameParty.forceGainItem(oldItem, 1);
                $gameParty.forceGainItem(newItem, -1);
                return true;
        }
    }
//===========================================================================
//  #endregion
//---------------------------------------------------------------------------

//===========================================================================
//  #region Game_Party
//---------------------------------------------------------------------------
    party = Game_Party.prototype

    li.partyInit = party.initialize;
    party.initialize = function(){
        this._baseInv = (li.Params['dynamic'] === 'true' ? 0 : Number(li.Params['defaultFree']))
        li.partyInit.call(this);
    }

    // New function
    // Determine the maximum inventory the party could hold
    party.invMax = function(){
        if(li.Params['dynamic'] === 'false'){return this._baseInv};
        return this.members().reduce(function(total, member){
            return total + member.invMax();
        }, 0) + this._baseInv;
    }

    // New function
    // Is inventory full?
    party.isInvFull = function(){
        return this.invMax() <= this.totalInvSize();
    }

    // New function
    // Total inventory size
    party.totalInvSize = function(){
        var numitem = this.numItems.bind(this);
        var size = this.allItems().reduce(
            (total, item) => {
                if(!item){
                    return total + 0
                };
                return total + item.invSize * numitem(item);
            },0);

        size += this.members().reduce(
            (total, member) => {
                return total + member.equipSize();
            }, 0);
        return size
    }

    // Overwrite
    li.partyMaxItem = party.maxItems;
    party.maxItems = function(item) {
        if (DataManager.isBattleTest()){
            return li.partyMaxItem.call(this, item)
        }else{
            return this.invMaxItem(item) + this.numItems(item);
        };
    };

    // New function
    // Determine the maximum amount of each item
    party.invMaxItem = function(item){
        if(!item || item === null || item.invSize === 0){return 999999};
        return Math.floor(this.freeSlot() / item.invSize);
    }

    // New function
    // How much is the free slot
    party.freeSlot = function(){
        return this.invMax() - this.totalInvSize();
    }

    // Overwrite
    // Determine if the item is at maximum
    li.partyHasMaxItem = party.hasMaxItems;
    party.hasMaxItems = function(item) {
        if (DataManager.isBattleTest()){
            return li.partyHasMaxItem.call(this, item)
        }else{
            return this.isInvFull();
        };
    };

    party.almostFull = function(){
        return this.freeSlot() / this.invMax() <= Number(li.Params['nearMaxPercent'])/100
    }

    // New function
    // Item size in the inventory
    party.itemSize = function(item){
        if(!item){return 0};
        return item.invSize * this.numItems(item);
    }

    // New function
    // Force gain item (because I don't feel like overwriting)
    party.forceGainItem = function(item, amount, includeEquip){
        var container = this.itemContainer(item);
        if (container) {
            var lastNumber = this.numItems(item);
            var newNumber = lastNumber + amount;
            container[item.id] = Math.max(newNumber, 0);
            if (container[item.id] === 0) {
            delete container[item.id];
            }
            if (includeEquip && newNumber < 0) {
                this.discardMembersEquip(item, -newNumber);
            }
            $gameMap.requestRefresh();
    }
    }

    // Overwrite
    party.loseItem = function(item, amount, includeEquip) {
        this.forceGainItem(item, -amount, includeEquip);
    };

    // Overwrite
    li.partyGainItem = party.gainItem;
    party.gainItem = function(item, amount, includeEquip) {
        if(li.Params['forceGain'] === 'true'){
            this.forceGainItem(item, amount, includeEquip);
        }else{
            li.partyGainItem.call(this, item, amount, includeEquip);
        }
    };
//===========================================================================
//  #endregion
//---------------------------------------------------------------------------

//===========================================================================
//  #region Game_Player
//---------------------------------------------------------------------------
    player = Game_Player.prototype
    li.playerIsDashing = player.isDashing;
    player.isDashing = function() {
        if(li.Params['fullDisableDash'] === 'true' && $gameParty.isInvMaxed()){
            return false
        };
        return li.playerIsDashing.call(this);
    };

    // This need confirmation if it's okay
    li.playerRealSpeed = Game_CharacterBase.prototype.realMoveSpeed;
    player.realMoveSpeed = function() {
        return li.playerRealSpeed.call(this) - this.movePenalty();
    };

    player.movePenalty = function(){
        return (li.Params['fullSlowDown'] === 'true' && $gameParty.isInvMaxed() ? 1 : 0);
    }
//===========================================================================
//  #endregion
//---------------------------------------------------------------------------

//===========================================================================
//  #region Window_Base
//---------------------------------------------------------------------------
    wbase = Window_Base.prototype
    wbase.drawInvSlot = function(x, y, width, align = 'right'){
        let total = String($gameParty.totalInvSize());
        let invmax = String($gameParty.invMax());
        let txt = total + "/" + invmax;
        let colorId = Number(li.Params['nearMaxColor']);
        if ($gameParty.almostFull()){
            this.changeTextColor(ColorManager.textColor(colorId));
        }else{
            this.changeTextColor(ColorManager.normalColor());
        }
        this.drawText(txt,x,y,width,align)
        this.changeTextColor(ColorManager.normalColor())
    }

    wbase.drawInvInfo = function(x,y,width){
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(li.Params['invSlotVocab'],x,y,width,0);
        this.changeTextColor(ColorManager.normalColor());
        this.drawInvSlot(x, y, width);
    }

    wbase.drawItemSize = function(item, x, y, width){
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(li.Params['invSizeVocab'], x, y, width);
        this.changeTextColor(ColorManager.normalColor());
        let num = (!item ? 0 : (item.invSize || 0)) // (li.Params['drawTotalSize'] === 'true') ? $gameParty.itemSize(item) : (!item ? 0 : item.invSize);
        // console.log(num);
        this.drawText(num, x, y, width, 'right');
    }
//===========================================================================
//  #endregion
//---------------------------------------------------------------------------

//===========================================================================
// #region Limited Inventory - Window_MainMenu
//---------------------------------------------------------------------------
    li.Window_MainMenu = class extends Window_Base {
        constructor(width){
            let rect = new Rectangle(0,0,width,wbase.fittingHeight(1))
            super(rect)
        }

        refresh(){
            this.contents.clear();
            this.changeTextColor(this.systemColor());
            let txt = li.Params['slotShort'];
            this.drawText(txt, 0, 0, this.contents.width);
            this.drawInvSlot(0, 0, this.contents.width);
        }
    }
//===========================================================================
//  #endregion
//---------------------------------------------------------------------------

//===========================================================================
// #region Limited Inventory - Scene Menu
//---------------------------------------------------------------------------
    mainmenu = Scene_Menu.prototype
    li.sceneMenuCreate = mainmenu.create;
    mainmenu.create = function(){
        li.sceneMenuCreate.call(this);
        this.createLinvWindow();
    }

    mainmenu.createLinvWindow = function(){
        this._limvWindow = new li.Window_MainMenu(this._goldWindow.width);
        this._limvWindow.x = this._commandWindow.x;
        this._limvWindow.y = Graphics.boxHeight - (this._goldWindow.height + this._limvWindow.height);
        this._commandWindow.height -= this._limvWindow.height
        this._limvWindow.refresh();
        this.addWindow(this._limvWindow);
    }
//===========================================================================
//  #endregion
//---------------------------------------------------------------------------

//===========================================================================
// #region Limited Inventory - Window_InventorySize
//---------------------------------------------------------------------------
    li.Window_InventorySize = class extends Window_Base {
        constructor(rect){
            super(rect)
            this.refresh()
        }

        setItem(item){
            this.item = item;
            this.refresh();
        }

        refresh(){
            this.contents.clear();
            this.drawInvInfo(0,0,this.contents.width/2 - 10);
            this.drawItemSize(this.item,this.contents.width/2,0,this.contents.width/2 - 20);
        }
    }
//===========================================================================
//  #endregion
//---------------------------------------------------------------------------

//===========================================================================
// #region Limited Inventory - Window_ItemUse
//---------------------------------------------------------------------------
    li.Window_ItemUse = class extends Window_Command{
        constructor(rect){
            super(rect)
            this._openness = 0;
            this.deactivate();
        }

        setItem(item){
            this._item = item;
            this.refresh();
        }

        makeCommandList(){
            this.addCommand(li.Params['useVocab'], 'use', $gameParty.canUse(this._item));
            this.addCommand(li.Params['discardVocab'], 'discard', this.disposeAble(this._item));
            this.addCommand(li.Params['cancelVocab'], 'cancel');
        }

        disposeAble(item){
            if(!item) {
                return false
            }
            if(item.itypeId) {
                return item.itypeId !== 2
            } else {
                return true
            };
        }
    }
    
//===========================================================================
//  #endregion
//---------------------------------------------------------------------------
    
//===========================================================================
// #region Limited Inventory - Window_Discard
//---------------------------------------------------------------------------
    li.Window_Discard = class extends Window_Base{
        constructor(rect){
            super(rect)
            this._openness = 0;
            this._amount = 0;
            this.setCursorRect(0, 0, this.contents.width, this.contents.height);
            this.active = true;
        }

        setItem(item){
            this._item = item;
            this._amount = 0;
            this.refresh();
        }

        refresh(){
            this.contents.clear();
            if(!this._item){
                return
            }
            this.drawItemName(this._item, 2, 2, this.contents.width);
            let txt = String(this._amount)+"/"+String($gameParty.numItems(this._item));
            this.drawText(txt,0,1,this.contents.width-2,'right')
        }

        drawItemName(item, x, y, width){
            if(!item){
                return
            };
            this.drawIcon(item.iconIndex, x, y);
            this.drawText(item.name + ":",x + 36, y, width);
        }

        update(){
            Window_Base.prototype.update.call(this);
            if (!this.isOpen()){return};
            if (Input.isRepeated('right')) {this.changeAmount(1)};
            if (Input.isRepeated('left')) {this.changeAmount(-1)};
            if (Input.isRepeated('up')) {this.changeAmount(10)};
            if (Input.isRepeated('down')) {this.changeAmount(-10)};
            if (Input.isTriggered('ok')){this.loseItem()};
            if (Input.isTriggered('cancel')){this.closeWindow()};
        }

        changeAmount(amount){
            this._amount = (this._amount + amount).clamp(0,$gameParty.numItems(this._item));
            SoundManager.playCursor();
            this.refresh();
        }

        loseItem(){
            $gameParty.loseItem(this._item,this._amount);
            this.itemList.redrawCurrentItem();
            this.invSize.refresh();
            if($gameParty.numItems(this._item) === 0){
                SoundManager.playOk();
                this.itemList.activate();
                this.itemList.refresh();
                this.itemList.updateHelp();
                this.commandWindow.close();
                this.commandWindow.deactivate();
                this.close();
            }else{
                this.closeWindow();
            }
        }

        closeWindow(){
            this.close()
            this.commandWindow.activate();
            SoundManager.playOk();
        }
    }
    
//===========================================================================
//  #endregion
//---------------------------------------------------------------------------

//===========================================================================
// #region Window_ItemList
//---------------------------------------------------------------------------
    itemlist = Window_ItemList.prototype
    itemlist.itemSizeWindow = function(window){
        this._itemSizeWindow = window;
        this._itemSizeWindow.setItem(this.item);
    }
    
    li.itemList_updateHelp = itemlist.updateHelp;
    itemlist.updateHelp = function(){
        li.itemList_updateHelp.call(this);
        if (!this._itemSizeWindow){return};
        item = this.item()
        console.log(item)
        this._itemSizeWindow.setItem(item);
    }
    
    // Overwrite
    itemlist.isEnabled = function(item) {
        if (item) {
            return true
        } else {
            return false
        };
    };
//===========================================================================
//  #endregion
//---------------------------------------------------------------------------

//===========================================================================
// #region Scene_Item
//---------------------------------------------------------------------------
    menuitem = Scene_Item.prototype
    li.sceneItemCreate = menuitem.create;
    menuitem.create = function(){
        li.sceneItemCreate.call(this);
        this.resizeItemWindow();
        this.createInventoryWindow();
        this.createUpperLayer();
        this.createUsecommandWindow();
        this.createDiscardAmount();
        this.reoderChilds();
    }

    menuitem.resizeItemWindow = function(){
        if(Theo.NoTouchUI){
            this._itemWindow.height -= this._itemWindow.lineHeight() * 2;
        }
    }

    if(!Theo.NoTouchUI){
        menuitem.buttonAreaHeight = function() {
            return this.calcWindowHeight(1,false);
        };
    }

    menuitem.reoderChilds = function(){
        this._windowLayer.children.forEach(element => {
            if (element === this._actorWindow){
                this._windowLayer.removeChild(element);
                this._windowLayer.addChild(element);
            }  
        })
    }

    menuitem.createUpperLayer = function(){
        let x = (Graphics.width - Graphics.boxWidth) / 2;
        let y = (Graphics.height - Graphics.boxHeight) / 2;
        this._useLayer = new WindowLayer();
        this._useLayer.x = x
        this._useLayer.y = y 
        this.addChild(this._useLayer);
    }

    menuitem.addUpperWindow = function(window){
        this._useLayer.addChild(window);
    }

    menuitem.createInventoryWindow = function(){
        let wy = 0
        let ww = Graphics.boxWidth - 135
        let wh = this.calcWindowHeight(1, false)
        let rect = new Rectangle(0,wy,ww,wh)
        this._invWindow = new li.Window_InventorySize(rect);
        this._itemWindow.itemSizeWindow(this._invWindow)
        this._windowLayer.addChildAt(this._invWindow, 0)
    }

    menuitem.createUsecommandWindow = function(){
        let w = Number(li.Params['commandSize'])
        let h = this.calcWindowHeight(3, true)
        let x = Graphics.boxWidth/2 - w/2
        let y = Graphics.boxHeight/2 - h/2 - 20
        let rect = new Rectangle(x,y,w,h)
        this._useCommand = new li.Window_ItemUse(rect)
        this._useCommand.setHandler('use', this.useCommandOk.bind(this))
        this._useCommand.setHandler('discard', this.onDiscardOk.bind(this))
        this._useCommand.setHandler('cancel', this.onUseCancel.bind(this))
        this.addUpperWindow(this._useCommand)
    }

    menuitem.createDiscardAmount = function(){
        let x = this._useCommand.x
        let y = this._useCommand.y + this._useCommand.height
        let w = this._useCommand.width
        let h = this.calcWindowHeight(1, false)
        let rect = new Rectangle(x,y,w,h)
        this._discardWindow = new li.Window_Discard(rect)
        this._discardWindow.commandWindow = this._useCommand
        this._discardWindow.itemList = this._itemWindow
        this._discardWindow.invSize = this._invWindow
        this.addUpperWindow(this._discardWindow)
    }

    // Overwrite
    li.sceneItem_OnItemOk = menuitem.onItemOk;
    menuitem.onItemOk = function(){
        this._useCommand.setItem(this.item())
        this._useCommand.open()
        this._useCommand.activate()
        this._useCommand.select(0)
    }

    li.sceneItem_UseItem = menuitem.useItem;
    menuitem.useItem = function(){
        this._useCommand.close()
        li.sceneItem_UseItem.call(this)
        this._invWindow.refresh();
    }

    menuitem.useCommandOk = function(){
        li.sceneItem_OnItemOk.call(this);
        this._useCommand.close();
    }

    menuitem.onDiscardOk = function(){
        this._discardWindow.setItem(this.item())
        this._discardWindow.open()
    }

    menuitem.onUseCancel = function(){
        this._itemWindow.activate()
        this._useCommand.close()
        this._useCommand.deactivate()
    }
    
//===========================================================================
//  #endregion
//---------------------------------------------------------------------------

//===========================================================================
// #region Window_ShopNumber
//---------------------------------------------------------------------------
    shopnum = Window_ShopNumber.prototype
    li.shopNumInit = shopnum.initialize;
    shopnum.initialize = function(rect){
        shopnum.initialize.call(this, rect);
        this._mode = 'buy';
    }

    li.shopNumRefresh = shopnum.refresh;
    shopnum.refresh = function(){
        Theo.LINV.shopNumRefresh.call(this);
        this.drawItemSize();
    }
//===========================================================================
//  #endregion
//---------------------------------------------------------------------------

//===========================================================================
// #region Window_ShopStatus
//---------------------------------------------------------------------------
    if (li.Params['displayItem'] === 'true'){
        shopstatus = Window_ShopStatus.prototype
        li.shopStatusPossession = shopstatus.drawPossession;
        shopstatus.drawPossession = function(x, y){
            li.shopStatusPossession.call(this, x, y);
            y += this.lineHeight();
            this.drawItemSize(this._item, x, y, this.contents.width - (x*2));
            this.drawInvInfo(x, this.contents.height - 10 - this.lineHeight()*2, this.contents.width - (x*2))
        }

        li.drawEquipInfo = Window_ShopStatus.prototype.drawEquipInfo
        shopstatus.drawEquipInfo = function(x, y) {
            y += Math.floor(this.lineHeight() * 0.75)
            li.drawEquipInfo.call(this, x, y)
        };
    }
//===========================================================================
//  #endregion
//---------------------------------------------------------------------------

}
Theo.LINV()
