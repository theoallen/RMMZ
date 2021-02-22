/*:
@target MZ
@plugindesc v1.0.0 - Target selection phase for area of effect skill/item
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help
♦ About:
Bringing back the target selection phase for area of effect skill/item.
As well as scope for the user. 

A window will not be displayed for these scopes
- Area attack for the enemies (selection cursor is a buggy mess when I do it)
- Target everyone (there is no selection window for target everyone)

But all of the affected battlers will blink for indication of being
selected for it.

Note that:
X random enemy/enemies is considered as an area attack.

♦ Terms of Use:
- https://github.com/theoallen/RMMZ/blob/master/README.md
*/

var Theo = Theo || {}
Theo.SelectionConsistency = function(){
    const $ = Theo.SelectionConsistency

    Game_Unit.prototype.selectAll = function(){
        for (const member of this.members()) {
            member.select()
        }
    }

    // Temporary variables
    $._areaFlag = false

    // Selection consistency
    Game_Action.prototype.needsSelection = function() {
        return this.checkItemScope([1,2,3,4,5,6,7,8,9,10,11,12,13,14]);
    };

    // Triggers selection mark for all enemies
    Game_Action.prototype.isForAllEnemies = function(){
        return this.checkItemScope([2,3,4,5,6,14]);
    }

    // Triggers selection mark for all actors
    Game_Action.prototype.isForAllActors = function(){
        return this.checkItemScope([8,10,13,14]);
    }

    $.wbeActivate = Window_BattleEnemy.prototype.activate
    Window_BattleEnemy.prototype.activate = function(){
        $.wbeActivate.call(this)
        this.createSelectionFlag()
    }

    // Determine if area selection
    Window_BattleEnemy.prototype.createSelectionFlag = function(){
        const action = BattleManager.inputtingAction()
        $._areaFlag = action.isForAllEnemies()
        this.setCursorAll($._areaFlag)
        if(this.cursorAll()){
            this.hide()
            $gameTroop.selectAll()
        }
        if(action.isForEveryone()){
            $gameParty.selectAll()
        } 
    }

    // Deselect party member, for everyone target scope
    $.wbeHide = Window_BattleEnemy.prototype.hide
    Window_BattleEnemy.prototype.hide = function() {
        $.wbeHide.call(this)
        $gameParty.select(null)
    };
    
    // Deselect party member, for everyone target scope
    $.wbaActivate = Window_BattleActor.prototype.activate
    Window_BattleActor.prototype.activate = function(){
        $.wbaActivate.call(this)
        this.createSelectionFlag()
    }

    // Determine if area selection
    Window_BattleActor.prototype.createSelectionFlag = function(){
        const action = BattleManager.inputtingAction()
        $._areaFlag = action.isForAllActors()
        this.setCursorAll($._areaFlag)
        if(this.cursorAll()){
            $gameParty.selectAll()
            this.refreshCursor()
        }
        this.setCursorFixed(action.isForUser())
        if(this.cursorFixed()){
            const actor = BattleManager._currentActor
            this.select(actor.index())
        }
    }

    $.wbaHide = Window_BattleActor.prototype.hide
    Window_BattleActor.prototype.hide = function() {
        $.wbaHide.call(this)
        this.setCursorFixed(false)
    };

    // Disable selection on hover
    $.sprBattlerOnMouseEnter = Sprite_Battler.prototype.onMouseEnter
    Sprite_Battler.prototype.onMouseEnter = function() {
        if(!$._areaFlag){
            $.sprBattlerOnMouseEnter.call(this)
        }
    };
    
    // Disable selection on press
    $.sprBattlerOnMousePress = Sprite_Battler.prototype.onPress
    Sprite_Battler.prototype.onPress = function() {
        if(!$._areaFlag){
            $.sprBattlerOnMousePress.call(this)
        }
    };

    // Ignore visibility
    Window_BattleEnemy.prototype.isOpenAndActive = function() {
        return this.isOpen() && this.active;
    };

    // Ignore visibility
    Window_BattleActor.prototype.isOpenAndActive = function() {
        return this.isOpen() && this.active;
    };
}
Theo.SelectionConsistency()
