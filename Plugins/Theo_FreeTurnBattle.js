/*:
@target MZ
@plugindesc v0.1.0 - Command the actor in any order
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Sandbox
@help
♦ About:
Free Turn Battle is a type of turn system that you command your
party member in any order that you want until all of them acts.

♦ In development:
This plugin is in development. Expect some bugs sprawling around.
And a major change in the future. 

This plugin will be developed based on my needs and liking. If I
see a certain feature unnecessary, I may not want to implement it.

However, you can use the plugin as is or edit it to your liking. 
Just remember the terms of use.

♦ Terms of Use:
- https://github.com/theoallen/RMMZ/blob/master/README.md
*/
var Theo = Theo || {}
Theo.FreeTurnBattle = function(){
    const $ = Theo.FreeTurnBattle
    $._version = '1.0.0'

    // FTB is not TPB
    BattleManager.isTpb = function() {
        return false;
    };

    // FTB is not TPB
    BattleManager.isActiveTpb = function() {
        return false;
    };

    // If actor doesn't exist, start turn
    BattleManager.selectNextActor = function() {
        this.changeCurrentFTBActor(true);
        if (!this._currentActor) {
            this.startTurn();
        }
    };

    // Custom update phase for FTB
    $.BMUpdatePhase = BattleManager.updatePhase
    BattleManager.updatePhase = function(timeActive) {
        switch (this._phase) {
            case "FTBAction":
                this.updateFTBAction.call(this)
                break;
            case "FTBActionEnd":
                this.updateFTBActionEnd.call(this)
                break;
            default:
                $.BMUpdatePhase.call(this, timeActive) // timeActive is actually useless
                break;
        }
    };

    BattleManager.updateEvent = function() {
        switch (this._phase) {
            case "start":
            case "turn":
            case "turnEnd":
            case "FTBActionEnd":
                if (this.isActionForced()) {
                    this.processForcedAction();
                    return true;
                } else {
                    return this.updateEventMain();
                }
        }
        return this.checkAbort();
    };

    // Overwrite end action, it depends on unit type
    BattleManager.endAction = function() {
        this._logWindow.endAction(this._subject);
        this._phase = this._subject.isActor() ? "FTBActionEnd" : "turn";
        if (this._subject.numActions() === 0) {
            this.endBattlerActions(this._subject);
            this._subject = null;
        }
    };

    // Next command actually executes action
    BattleManager.selectNextCommand = function() {
        this._phase = "FTBAction"
    };

    // Execute update FTB action
    BattleManager.updateFTBAction = function(){
        this._subject = this._currentActor
        this._inputting = false
        this.startAction()
        this._subject.removeCurrentAction(); // Remove current action queue
    }

    // Execute FTB action end
    BattleManager.updateFTBActionEnd = function(){
        this._phase = "input"
        this.changeFTBActor(true)
    }

    // Overwrite action order. Action order only valid for enemies.
    BattleManager.makeActionOrders = function() {
        const battlers = [];
        battlers.push(...$gameTroop.members());
        for (const battler of battlers) {
            battler.makeSpeed();
        }
        battlers.sort((a, b) => b.speed() - a.speed());
        this._actionBattlers = battlers;
    };

    // Exclusive iteration method to search for valid FTB actor
    BattleManager.changeCurrentFTBActor = function(forward) {
        const members = $gameParty.battleMembers();
        const lastActor = this._currentActor;
        let actor = this._currentActor;
        for (;;) {
            const currentIndex = members.indexOf(actor);
            actor = members[currentIndex + (forward ? 1 : -1)];
            if (!actor || actor.canInput()) {
                break;
            }
        }
        this._currentActor = actor ? actor : null;
        if(this._currentActor === null && lastActor && lastActor.canInput()){
            this._currentActor = lastActor
        }
        this.startActorInput();
    };
    
    // Iteration method to search for valid FTB actor
    // Includes forward and backward search
    // Start troop turn when nothing is valid.
    BattleManager.changeFTBActor = function(forward) {
        const actor = this._currentActor;
        this.changeCurrentFTBActor(forward)
        let nextActor = this._currentActor;
        if(nextActor === null){
            this._currentActor = actor
            this.changeCurrentFTBActor(!forward)
            nextActor = this._currentActor;
            if(nextActor === null){
                this.startTurn()
            }
        }
        if (this._currentActor !== actor && actor.canInput()){
            actor.setActionState("undecided");
        }
    };

    // Direct designation
    BattleManager.changeFTBActorFixed = function(index){
        for(const member of $gameParty.battleMembers()){
            member.setActionState("undecided")
        }
        this._currentActor = $gameParty.battleMembers()[index]
        this.startActorInput()
    }

    // Inputable now includes if it has action remaining.
    $.actorCanInput = Game_Actor.prototype.canInput
    Game_Actor.prototype.canInput = function() {
        return $.actorCanInput.call(this) && this._actions.length > 0
    };

    // Adds left/right inputable
    $.wbsUpdate = Window_BattleStatus.prototype.update
    Window_BattleStatus.prototype.update = function() {
        $.wbsUpdate.call(this)
        this.handleFTBDirection()
    };

    // Left/right inputable handlers
    Window_BattleStatus.prototype.handleFTBDirection = function() {
        if(this.canSwitchActor()){
            if(Input.isRepeated("right")){
                BattleManager.changeFTBActor(true)
                this.playCursorSound();
            }else if(Input.isRepeated("left")){
                BattleManager.changeFTBActor(false)
                this.playCursorSound();
            }
        }
    }

    // Undo this change in its sub class because fragile base class design suck
    Window_BattleActor.prototype.handleFTBDirection = () => {}

    // Overwrite process touch. Now you can click.
    $.wbsProcessTouch = Window_BattleStatus.prototype.processTouch
    Window_BattleStatus.prototype.processTouch = function() {
        if(TouchInput.isTriggered() && this.canSwitchActor()){
            this.onTouchSelect();
        }
    };
    // Undo this change in its sub class because fragile base class design suck
    Window_BattleActor.prototype.processTouch = $.wbsProcessTouch

    // Determine if you can switch the actor
    Window_BattleStatus.prototype.canSwitchActor = function(){
        return BattleManager._inputting && !SceneManager._scene.isSubWindowActive()
    }
    
    // Touch handler
    $.wbsOnTouchSelect = Window_BattleStatus.prototype.onTouchSelect
    Window_BattleStatus.prototype.onTouchSelect = function() {
        const hitIndex = this.hitIndex()
        const lastIndex = this.index()
        if(hitIndex >= 0){
            if($gameParty.battleMembers()[hitIndex].canInput()){
                BattleManager.changeFTBActorFixed(hitIndex)
                if(hitIndex !== lastIndex){
                    this.playCursorSound();
                }
            }
        }
    };
    // Undo this change in its sub class because fragile base class design suck
    Window_BattleActor.prototype.onTouchSelect = $.wbsOnTouchSelect

    // Overwrite party command fight
    Scene_Battle.prototype.commandFight = function() {
        BattleManager.changeCurrentFTBActor(true)
    };

    // Is any sub window actove
    Scene_Battle.prototype.isSubWindowActive = function(){
        return (
            this._enemyWindow.isOpenAndActive() ||
            this._skillWindow.isOpenAndActive() ||
            this._actorWindow.isOpenAndActive() ||
            this._itemWindow.isOpenAndActive() ||
            this._messageWindow.isOpen()
        );
    }
}
Theo.FreeTurnBattle()
