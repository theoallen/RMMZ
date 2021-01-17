/*:
@target MZ
@plugindesc v0.1.0 - Theolized Sideview Battle Sequence MZ.
@author TheoAllen
@help
TSBS is spritesheet-based animation sequence plugin aiming for a free-frame 
pick spritesheet animation sequencer. You are encouraged to use any kind 
of spritesheet you want instead of using the default MZ battle spritesheet 
format.

The animation sequencer forces you to define your own animation motion
instead of being spoiled by an auto-play motion. You also need to customize
the delay of each frame and all the timing on your own.

@command pose
@text Pose
@desc Set the battler pose using frame index from top left(0) to bottom right(max)

@arg frame
@text Frame
@type number
@default 0
@min 0
@desc Which frame you want to pick?

@arg wait
@text Wait
@type number
@default 5
@min 1
@desc How long (in frames) you want the battler to stay in that pose.

@command cellpose
@text Pose (Cell select)
@desc Set the battler pose using cell position

@arg x
@text x
@type number
@min = 0
@default 0

@arg x
@text x
@type number
@min 0
@default 0

@arg wait
@text Wait
@type number
@default 5
@min 1
@desc How long (in frames) you want the battler to stay in that pose.

@command move
@text Move
@desc Move the subject battler

@arg to
@type select
@option Target
@option Slide
@option Coordinate
@option Home
@text To
@default Target
@desc Where do you want to go?

@arg x
@text X-Axis
@type number
@default 0
@desc Relative X-Axis coordinate

@arg y
@text Y-Axis
@type number
@default 0
@desc Relative Y-Axis coordinate

@arg dur
@text Duration
@type number
@default 10
@min 0
@desc How many frames you need to wait until it completes its movement.

@arg jump
@text Jump Power
@type number
@default 0
@min 0
@desc Jump power. Higher number, higher jump.

@command showAnim
@text Play Animation
@desc Show animation on the target battler

@arg anim
@text Animatiomn ID
@type animation
@desc Select the animation file (Selecting 0 will use the skill animation)
@default 0
*/
// @arg type
// @text Type
// @type select
// @option Single
// @option Multiple
// @desc If targetting a multiple target. Selecting single will only play animation on the center of them.
// @default Multiple
/*
@command cast
@text Cast Animation
@desc Show animation on the subject battler (self)

@arg id
@text Animatiomn ID
@type animation
@desc Select the animation file (Selecting 0 will use the skill animation)
@default 0

@command actionEffect
@text Action Effect
@desc Invoke item/skill effect to the target battler

@command actionEffectMod
@text Action Effect (Modified)
@desc Invoke a modified item/skill effect to the target battler

@arg skill
@text Skill ID
@desc Using a different skill id to damage/do something to the target. Selecting 0 will use/reset to the default skill.
@type skill
@default 0

@arg scale
@text Scale
@desc Scale the output from the damage formula using a valid floating number. E.g, 1.5. JS Syntax is ok.
@type text
@default 1.0

@arg formula
@text Formula
@desc Change the skill formula
@type skill

@arg last
@text Last
@type select
@option Temporary
@option Permanent
@default Temporary
@desc Selecting permanent will make you use the modified item/skill effect for the rest of the sequence.

@command changeTarget
@text Change Target
@desc Change the target scope. Condition parameter requires a valid JS syntax.

@arg type
@type select
@default Absolute
@text Type
@option Relative
@option Absolute
@desc Relative = If you select allies while the sequence is used by enemy, it will select the troop.

@arg opt
@type select
@default Revert
@text Scope
@option Revert
@option All
@option All (Except user)
@option All Enemies
@option All Allies
@option Other Enemies
@option Other Allies
@option Random Enemy (w/ aggro)
@option Random Enemy (w/o aggro)
@option Random Ally
@option Self
@desc Switch the target

@arg cond
@type note
@text Condition
@desc Filters the target scope. Use 'target' to refers to the target candidate to filter. Must return true/false

@command state
@text Change State
@desc Change the target state

@arg operand
@type select
@option Add
@option Remove
@desc Add or Remove the state?
@default Add
@text Operand

@command targetAction
@text Target Force Action
@desc Force the target to do an action sequence by calling a common event

@arg action
@type common_event
@default 1
@text Action
@desc Select the common event for the target.

@command aftimage
@text Afterimage
@desc Toggle the ffterimage/mirage effect on the subject

@arg toggle
@text Toggle
@desc Toggle on/off
@type boolean

@command visible
@text Visible
@desc Toggle the subject to be visible or not

@arg toggle
@type boolean
@text toggle
@on Visible
@off Invisible

@command flip
@text Flip
@desc Flip the subject battler

@arg toggle
@type boolean
@text toggle
@on Flips
@off Unflips

@command rotation
@text Rotation
@desc Spin the battler

@arg type
@type select
@option Spin
@option Rotate
@default Spin
@desc Spin = continuous | Rotate = rotate to target angle

@arg power
@type number
@text Spin Power
@default 0
@desc Spin power/Target angle

@arg dur
@type number
@text Duration
@desc Duration of the spin/how much time required to rotate.
@min 0
@default 0

@command stopRotation
@text Stop Rotation
@desc Stop the rotation

@arg endAngle
@type number
@default 0
@text End Angle
@desc Set the ending angle of the battler

@command focus
@text Focus
@desc Hide the battlers other than the subject and the target.

@arg dur
@type number
@min 1
@default 0
@text Duration
@desc How many frames until it fully focused

@command unfocus
@text Unfocus
@desc Show the battlers after being hidden by Focus command.

@arg unfocus
@type number
@min 1
@default 0
@text Duration
@desc How many frames until it fully unfocused

@command check collapse
@text Check Collapse
@desc Perform collapse effect to the target if the target is defeated

@command collapse
@text Perform Collapse
@desc Perform collapse effect on the subject

@command Force Result
@text Force Result
@desc Force the result of the skill/item

@arg opt
@text Option
@type select
@option Default
@option Hit
@option Miss
@option Evade
@option Critical
@default Default
@desc Affect all the next attack regardless of hit/eva rate until you reset to the default.

@param div1
@text ---------------------------
@param General Options
@param Actor Pos
@parent General Options
@type struct<actorpos>[]
@text Actor Position
@desc This also determine the maximum battle members.
@default ["{\"X\":\"400\",\"Y\":\"350\"}","{\"X\":\"410\",\"Y\":\"375\"}","{\"X\":\"420\",\"Y\":\"390\"}"]

@param Sheet Row
@parent General Options
@type number
@min 1
@default 6
@text Max Sheet Row
@desc Maximum sheet row 

@param Sheet Column
@parent General Options
@type number
@min 1
@default 4
@text Max Sheet Row
@desc Maximum sheet row

@param div2
@text ---------------------------
@param Default Motion
@param Idle
@parent Default Motion
@text Idle Motion
@type common_event
@default 1

@param Damaged
@parent Default Motion
@text Damaged Motion
@type common_event
@default 2

@param Pinch
@parent Default Motion
@text Pinch Motion
@type common_event
@default 3

@param Evade
@parent Default Motion
@text Evade Motion
@type common_event
@default 4

@param Return
@parent Default Motion
@text Return Motion
@type common_event
@default 5

@param Dead
@parent Default Motion
@text Dead Motion
@type common_event
@default 6

@param Victory
@parent Default Motion
@text Victory pose
@type common_event
@default 7

@param Escape
@parent Default Motion
@text Escape
@type common_event
@default 8

@param Intro
@parent Default Motion
@text Intro sequence
@type common_event
@default 0

@param Pre-Intro
@parent Default Motion
@text Pre-intro
@type common_event
@default 0

@param Default skill action
@parent Default Motion
@text Default Skill motion
@type common_event
@default 10

@param Default item use
@parent Default Motion
@text Default Skill motion
@type common_event
@default 11

*/

/*~struct~actorpos:
@param X
@type number
@min 0
@text X
@desc X position of the n-th actor
@default 0

@param Y
@type number
@min 0
@text Y
@desc Y position of the n-th actor
@default 0
*/

var dbug = () => { console.log("debug")}
var TSBS = {}

TSBS.Sequence_Interpreter = function(battler, depth){
    Game_Interpreter.prototype.initialize.call(this, depth, phaseName);
    this._battler = battler;
}
TSBS.Sequence_Interpreter.prototype = Object.create(Game_Interpreter.prototype);
TSBS.Sequence_Interpreter.prototype.constructor = TSBS.Sequence_Interpreter
TSBS.init = function(){
    this.pluginName = "TSBS_MZ"
    this.params = PluginManager.parameters(this.pluginName)

    this.addons = []
    this.actorSprites = {} // Store actor sprite reference
    this.enemySprites = {} // Store enemy sprite reference

    let _ = this;
    let seq = TSBS.Sequence_Interpreter.prototype;

    //=============================================================================================
    //#region Sequence_Interpreter 
    //---------------------------------------------------------------------------------------------
    seq.setupChild = function(list, eventId) {
        this._childInterpreter = new TSBS.Sequence_Interpreter(this._battler, this._depth + 1);
        this._childInterpreter.setup(eventId, this._phaseName);
    };

    seq.terminate = function() {
        if(this._endFunc == null){
            Game_Interpreter.prototype.terminate.call(this);
        }else{
            this._endFunc.call(this);
        }
    };

    seq.setup = function(eventId, phaseName, endFunc = null) {
        const commonEvent = $dataCommonEvents[eventId];
        Game_Interpreter.prototype.setup.call(this, commonEvent.list, eventId);
        this._endFunc = endFunc;
        this._phaseName = phaseName;
    }

    seq.command357 = function(params) {
        TSBSCommand = params[0] == _.pluginName
        if (TSBSCommand && this._battler["TSBS_" + params[1]] !== undefined){
            args = params[3];
            args.sequencer = this;
            return this._battler["TSBS_" + params[1]](params[3]);
        }
        args = params[3];
        args.battler = this._battler;
        return Game_Interpreter.prototype.command357.call(this, params);
    }
    //#endregion
    //=============================================================================================

    //=============================================================================================
    //#region Game_Battler 
    //---------------------------------------------------------------------------------------------
    _.battler = {}
    bb = Game_Battler.prototype;

    _.battler.onBattleStart = bb.onBattleStart
    bb.onBattleStart = function(){
        _.battler.onBattleStart.call(this);
        this._sequencer = new TSBS.Sequence_Interpreter(this, 0);
        this.startIdleMotion();
    }

    _.battler.init = bb.initialize
    bb.initialize = function(){
        this._animMotion = {}
        _.battler.init.call(this)
    }

    _.battler.initMembers = bb.initMembers
    bb.initMembers = function() {
        _.battler.initMembers.call(this)
        this.clearTSBS()
    }

    bb.clearTSBS = function(){
        this._sequencer = null
        this._sprite = null
        this._animCell = 0
        this._sheetNum = 0
        this._itemInUse = null
        this._oriTargets = []
        this._targetArray = []
        this._flip = false
        this._forceResult = {
            "hit": false,
            "miss": false,
            "evade": false,
            "critical": false
        }
    }

    bb.homePos = function() {
        return {"x": 0, "y": 0};
    }

    bb.updateSequencer = function(){
        if(this._sequencer !== null){
            this._sequencer.update();
        }
    }

    bb.startIdleMotion = function(){
        this._sequencer.setup(1, "idle", function() { this._index = 0});
    }

    bb.sprite = function(){
        if (this.isActor()){
            return _.actorSprites[this._actorId];
        }else{
            return _.enemySprites[this.index()];
        }
    }

    bb.dataBattler = function(){
        if (this.isActor()){
            return this.actor();
        }else{
            return this.enemy();
        }
    }

    //#endregion
    //============================================================================================

    //============================================================================================
    //#region Sequence Functions 
    //---------------------------------------------------------------------------------------------
    bb.TSBS_pose = function(args){
        console.log(args)
        //this._sheetNum = parseInt(args.sheetnum);
        this._animCell = parseInt(args.frame);
        args.sequencer.wait(args.wait);
        return true;
    }

    bb.TSBS_move = function(args){
        var spr = this.sprite();
        var targX = parseInt(args.x);
        var targY = parseInt(args.y);
        switch(args.to){
            case "Target":
                targX += this._targetArray.reduce((total, trg)=>{ return trg.sprite().x + total}, 0)
                targY += this._targetArray.reduce((total, trg)=>{ return trg.sprite().y + total}, 0)
                break;
            case "Slide":
                targX += spr.x;
                targY += spr.y;
                break;
            case "Home":
                targX += this.homePos().x;
                targY += this.homePos().y;
                break;
        }
        spr.startMove(targX, targY, args.dur, args.jump)
    }

    bb.TSBS_showAnim = function(args){

    }

    bb.TSBS_cast = function(args){

    }

    bb.TSBS_actionEffect = function(args){

    }

    bb.TSBS_actionEffectMod = function(args){

    }

    bb.TSBS_changeTarget = function(args){

    }
    //#endregion
    //=============================================================================================

    //============================================================================================= 
    //#region Sprite_Battler
    //---------------------------------------------------------------------------------------------
    _.spriteBattler = {}
    let sb = Sprite_Battler.prototype

    _.spriteBattler.initMembers = sb.initMembers
    sb.initMembers = function(){
        _.spriteBattler.initMembers.call(this)
        this._maxDuration = 0;
        this._jumpPower = 0;
    }

    _.spriteBattler.startMove = sb.startMove
    sb.startMove = function(x, y, duration, jump = 0){
        this._maxDuration = duration;
        this._jumpPower = jump;
        _.spriteBattler.startMove.call(this,x,y,duration);
    }

    sb.jumpHeight = function(){
        if (this._movementDuration === 0) {
            return 0
        }
        let time = this._maxDuration - this._movementDuration;
        let gravity = this._jumpPower/(this._maxDuration/2);
        let height = (this._jumpPower * time) - (gravity * time * (time + 1) / 2);
        return Math.max(0, height);
    }

    _.spriteBattler.updatePos = sb.updatePosition
    sb.updatePosition = function() {
        _.spriteBattler.updatePos.call(this);
        this._y += jumpHeight()
    };
    //#endregion
    //============================================================================================= 

    //============================================================================================= 
    //#region Sprite_Actor
    //---------------------------------------------------------------------------------------------
    _.spriteActor = {}
    let sa = Sprite_Actor.prototype

    _.spriteActor.init = sa.initialize
    sa.initialize = function(battler) {
        _.spriteActor.init.call(this, battler);
        _.actorSprites[battler._actorId] = this;
    };
    
    // Delete update motion. I don't need it
    sa.updateMotion = function() {
    };
    
    // Overwrite update frame
    sa.updateFrame = function() {
        Sprite_Battler.prototype.updateFrame.call(this);
        var bitmap = this._mainSprite.bitmap;
        if (bitmap) {
            var animCell = this._battler._animCell;
            var cw = bitmap.width / 9;
            var ch = bitmap.height / 6;
            var cy = Math.floor(animCell / 6) * ch
            var cx = (animCell % 9) * cw
            this._mainSprite.setFrame(cx, cy, cw, ch);
        }
    };
    //#endregion
    //============================================================================================= 

    //============================================================================================= 
    // Scene Update
    //---------------------------------------------------------------------------------------------
    _.scene_battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _.scene_battle_update.call(this);
        $gameParty.updateSequencer();
        $gameTroop.updateSequencer();
    };

    Game_Unit.prototype.updateSequencer = function(){
        for(member in this.members()){
            member.updateSequencer();
        }
    }
}

// Initialize
TSBS.init()
