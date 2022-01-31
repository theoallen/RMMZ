/*:
@target MZ
@plugindesc v1.1.0 - Target selection phase for area of effect skill/item
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help
♦ About:
Bringing back the target selection phase for area of effect skill/item.
As well as scope for the user. 

All of the affected battlers will blink for indication of being
selected for it.

Note that:
X random enemy/enemies is considered as an area attack.

♦ Terms of Use:
- https://github.com/theoallen/RMMZ/blob/master/README.md

@param options
@text [Text Settings]

@param everyone
@parent options
@type text
@text Term: Target Everyone
@desc The text when the skill/item scope is All Enemies & Allies
@default Everyone

@param allEnemies
@parent options
@type text
@text Term: Target Everyone
@desc The text when the skill/item scope is All Enemies
@default All Enemies

@param singularRandom
@parent options
@type text
@text Term: One Random Enemy
@desc The text when the skill/item scope is 1 Random Enemy. use %1 to show the number of targets.
@default %1 Random Enemy

@param pluralRandom
@parent options
@type text
@text Term: Many Random Enemies
@desc The text when the skill/item scope is 2-4 Random Enemies. use %1 to show the number of targets.
@default %1 Random Enemies
*/

var Theo = Theo || {}
Theo.SelectionConsistency = function(){
    const $ = Theo.SelectionConsistency
	$._pluginName = document.currentScript.src.match(/.+\/(.+)\.js/)[1]
    $._version = '1.1.0'
    $._params = PluginManager.parameters($._pluginName)
	
	$._textEveryone = $._params.everyone;
	$._textAllEnemies = $._params.allEnemies;
	$._textSingleRandom = $._params.singularRandom;
	$._textMultipleRandom = $._params.pluralRandom;

    Game_Unit.prototype.selectAll = function(){
        for (const member of this.members()) {
            member.select()
        }
    }

    // Temporary variables
    $._areaFlag = false
	$._userFlag = false

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
			$._userFlag = true
        }
    }
	
	// on user scope only allow click on user.
	$.wbaProcessTouch = Window_BattleActor.prototype.processTouch
	Window_BattleActor.prototype.processTouch = function() {
		if ($._userFlag) {
			const target = $gameTemp.touchTarget();
			if (target && target.isSelected()) {
				$.wbaProcessTouch.call(this); // actor hover.
			} else {
				Window_Selectable.prototype.processTouch.call(this); // we still need to do window hovers.
			}
		} else {
			$.wbaProcessTouch.call(this);
		}
	};

    $.wbaHide = Window_BattleActor.prototype.hide
    Window_BattleActor.prototype.hide = function() {
        $.wbaHide.call(this)
        this.setCursorFixed(false)
		$._userFlag = false
    };

    // Disable selection on hover
    $.sprBattlerOnMouseEnter = Sprite_Battler.prototype.onMouseEnter
    Sprite_Battler.prototype.onMouseEnter = function() {
		if ($._userFlag && this._battler.isSelected()) {
			$.sprBattlerOnMousePress.call(this)
		} else if(!$._userFlag && !$._areaFlag){
            $.sprBattlerOnMouseEnter.call(this)
        }
    };
    
    // Disable selection on press
    $.sprBattlerOnMousePress = Sprite_Battler.prototype.onPress
    Sprite_Battler.prototype.onPress = function() {
        if ($._userFlag && this._battler.isSelected()) {
			$.sprBattlerOnMousePress.call(this)
		} else if(!$._userFlag && !$._areaFlag){
            $.sprBattlerOnMouseEnter.call(this)
        }
    };
	
	Scene_Battle.prototype.startGroupTargetSelection = function() {
		this._groupTargetWindow.refresh();
		this._groupTargetWindow.show();
		this._groupTargetWindow.select(0);
		this._groupTargetWindow.activate();
		this._statusWindow.hide();
	};
	
	// use group window if needed.
	Scene_Battle.prototype.onSelectAction = function() {
		const action = BattleManager.inputtingAction();
		if (!action.needsSelection()) {
			this.selectNextCommand();
		} else if (action.isForEveryone()) {
			this._groupTargetWindow.setTargetText($._textEveryone);
			this.startGroupTargetSelection();
		} else if (action.isForRandom() && action.isForOpponent()) {
			const numTargets = action.numTargets();
			const targetText = numTargets == 1 ? $._textSingleRandom : $._textMultipleRandom;
			this._groupTargetWindow.setTargetText(targetText.replace("%1", numTargets));
			this.startGroupTargetSelection();
		} else if (action.isForAllEnemies()) {
			this._groupTargetWindow.setTargetText($._textAllEnemies);
			this.startGroupTargetSelection();
		} else if (action.isForOpponent()) {
			this.startEnemySelection();
		} else {
			this.startActorSelection();
		}
	};
	
	// set up group target window.
	$.scnBattleCreateEnemyWindow = Scene_Battle.prototype.createEnemyWindow;
	Scene_Battle.prototype.createEnemyWindow = function() {
		$.scnBattleCreateEnemyWindow.call(this);
		const rect = this.enemyWindowRect();
		this._groupTargetWindow = new Window_BattleGroupTarget(rect);
		this._groupTargetWindow.setHandler("ok", this.onGroupTargetOk.bind(this));
		this._groupTargetWindow.setHandler("cancel", this.onGroupTargetCancel.bind(this));
		this.addWindow(this._groupTargetWindow);
	};
	
	Scene_Battle.prototype.onGroupTargetOk = function() {
		Scene_Battle.prototype.onEnemyOk.call(this);
	};
	
	$.scnBattleOnEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
	Scene_Battle.prototype.onGroupTargetCancel = function() {
		this._groupTargetWindow.hide();
		$gameParty.select(null);
		
		$.scnBattleOnEnemyCancel.call(this);
	};
	
	$.scnBattleIsAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
	Scene_Battle.prototype.isAnyInputWindowActive = function() {
		const isActive = $.scnBattleIsAnyInputWindowActive.call(this);
		return (isActive || this._groupTargetWindow.active);
	};
	
	// hide group window.
	$.scnBattleHideSubInputWindows = Scene_Battle.prototype.hideSubInputWindows;
	Scene_Battle.prototype.hideSubInputWindows = function() {
		$.scnBattleHideSubInputWindows.call(this);
		this._groupTargetWindow.deactivate();
		this._groupTargetWindow.hide();
	};
	
	// === multitarget enemies / everyone window.
	function Window_BattleGroupTarget() {
		this.initialize(...arguments);
	}
	
	Window_BattleGroupTarget.prototype = Object.create(Window_Selectable.prototype);
	Window_BattleGroupTarget.prototype.constructor = Window_BattleGroupTarget;
	
	Window_BattleGroupTarget.prototype.initialize = function(rect) {
		this._enemies = [];
		Window_Selectable.prototype.initialize.call(this, rect);
		this._targetText = "All";
		this.refresh();
		this.hide();
	};
	
	Window_BattleGroupTarget.prototype.activate = function(){
        Window_Selectable.prototype.activate.call(this);
        this.createSelectionFlag();
    };
	
	Window_BattleGroupTarget.prototype.createSelectionFlag = function(){
        const action = BattleManager.inputtingAction();
        $._areaFlag = action.isForAllEnemies();
        this.setCursorAll($._areaFlag);
        if(this.cursorAll()){
            $gameTroop.selectAll();
        }
        if(action.isForEveryone()){
            $gameParty.selectAll();
        } 
    };
	
	Window_BattleGroupTarget.prototype.setTargetText = function(name) {
		this._targetText = name;
	};
	
	Window_BattleGroupTarget.prototype.maxCols = function() {
		return 2;
	};
	
	Window_BattleGroupTarget.prototype.maxItems = function() {
		return 1;
	};
	
	Window_BattleGroupTarget.prototype.drawItem = function(index) {
		this.resetTextColor();
		const name = this._targetText;
		const rect = this.itemLineRect(index);
		this.drawText(name, rect.x, rect.y, rect.width);
	};
	
	Window_BattleGroupTarget.prototype.show = function() {
		this.refresh();
		this.forceSelect(0);
		$gameTemp.clearTouchState();
		Window_Selectable.prototype.show.call(this);
	};
	
	Window_BattleGroupTarget.prototype.hide = function() {
		Window_Selectable.prototype.hide.call(this);
		$gameTroop.select(null);
	};
	
	Window_BattleGroupTarget.prototype.refresh = function() {
		this._enemies = $gameTroop.aliveMembers();
		Window_Selectable.prototype.refresh.call(this);
	};
	
	Window_BattleGroupTarget.prototype.select = function(index) {
		Window_Selectable.prototype.select.call(this, index);
	};
	
	Window_BattleGroupTarget.prototype.processTouch = function() {
		Window_Selectable.prototype.processTouch.call(this);
		const action = BattleManager.inputtingAction();
		if (this.isOpenAndActive()) {
			const target = $gameTemp.touchTarget();
			if (target) {
				if (this._enemies.includes(target) && action.isForOpponent()) {
					if ($gameTemp.touchState() === "click") {
						this.processOk();
					}
				}
				const members = $gameParty.battleMembers();
				if (members.includes(target) && action.isForFriend()) {
					this.select(members.indexOf(target));
					if ($gameTemp.touchState() === "click") {
						this.processOk();
					}
				}
				$gameTemp.clearTouchState();
			}
		}
	};
	
}
Theo.SelectionConsistency()
