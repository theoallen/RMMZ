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

@arg pov
@type select
@default First Person
@text Point of View
@option First Person
@option Third Person
@desc First Person = If you select allies while the sequence is used by enemy, it will select the troop.

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

@arg dead
@type boolean
@text Include dead battler?
@default false
@desc Determine if the scope also include dead battler.

@arg filter
@type note
@text Filter
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

@command checkCollapse
@text Check Collapse
@desc Perform collapse effect to the target if the target is defeated

@command collapse
@text Perform Collapse
@desc Perform collapse effect on the subject

@command forceResult
@text Force Result
@desc Force the result of the skill/item

@arg opt
@text Option
@type select
@option Default
@option Hit
@option Evade
@option Critical
@default Default
@desc Affect all the next action effect regardless of hit/eva/cri rate until you reset to the default.

@arg value
@text Result
@type select
@option Roll
@option Success
@option Fail
@default Roll
@desc Determine the action result whether it is success or not or roll based on RNG.
If roll success/fail, it will affect all the next action effect until you reset to the default.

@param div1
@text ---------------------------
@param General Options
@param ActorPos
@parent General Options
@type struct<actorpos>[]
@text Actor Position
@desc This also determine the maximum battle members.
@default ["{\"X\":\"600\",\"Y\":\"280\"}","{\"X\":\"632\",\"Y\":\"368\"}","{\"X\":\"664\",\"Y\":\"446\"}"]

@param SheetRow
@parent General Options
@type number
@min 1
@default 6
@text Max Sheet Row
@desc Maximum sheet row 

@param SheetColumn
@parent General Options
@type number
@min 1
@default 4
@text Max Sheet Row
@desc Maximum sheet row

@param ReverseCoordinate
@parent General Option
@type boolean
@default true
@text Reverse Coordinate
@desc Reverse coordinate for enemies (so that you could use the same sequence for enemies).
If set to true, negative coordinate (for slide command) means it goes to the right.

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

@param PreIntro
@parent Default Motion
@text Pre-intro
@type common_event
@default 0

@param Skill
@parent Default Motion
@text Default Skill motion
@type common_event
@default 10

@param Item
@parent Default Motion
@text Default Item motion
@type common_event
@default 11

@param Collapse
@parent Default Motion
@text Collapse Motion
@type common_event
@default 0

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
const TSBS = {}

// Borrowing event interpreter for sequencer
TSBS.Sequence_Interpreter = function(battler, depth){
    Game_Interpreter.prototype.initialize.call(this, depth);
    this._battler = battler;
}
TSBS.Sequence_Interpreter.prototype = Object.create(Game_Interpreter.prototype);
TSBS.Sequence_Interpreter.prototype.constructor = TSBS.Sequence_Interpreter

// Handles action effect application
TSBS.Action = function() {
    Game_Action.prototype.initialize.call(this,null, false);
}
TSBS.Action.prototype = Object.create(Game_Action.prototype);
TSBS.Action.prototype.constructor = TSBS.Action

//-------------------------------------------------------------------------------------------------
// IIFE alternative, because I have encapsulation
// I know you hate this, but I do what I wanna do and I don't care
//-------------------------------------------------------------------------------------------------
TSBS.init = function(){
    this._pluginName = "TSBS_MZ"

    this._addons = []        // Store addons name
    this._actorSprites = {}  // Store actor sprite reference
    this._enemySprites = {}  // Store enemy sprite reference
    this._targets = []       // Store all affected battlers
    this._actorPos = []      // Store actor home position parameter

    let _ = this;
    //=============================================================================================
    //#region Loading parameters
    //---------------------------------------------------------------------------------------------
    this._params = PluginManager.parameters(this._pluginName)
    JSON.parse(this._params.ActorPos).forEach(innerJson => {
        pos = JSON.parse(innerJson)
        obj = {
            x: parseInt(pos.X),
            y: parseInt(pos.Y)
        }
        this._actorPos.push(obj);
     })

     this._maxRow = parseInt(this._params.SheetRow)
     this._maxCol = parseInt(this._params.SheetColumn)
     this._sequenceList = {
         idle: parseInt(this._params.Idle),
         damaged: parseInt(this._params.Damaged),
         pinch: parseInt(this._params.Pinch),
         evade: parseInt(this._params.Evade),
         return: parseInt(this._params.Return),
         dead: parseInt(this._params.Dead),
         victory: parseInt(this._params.Victory),
         escape: parseInt(this._params.Escape),
         intro: parseInt(this._params.Intro),
         preintro: parseInt(this._params.PreIntro),
         skill: parseInt(this._params.Skill),
         item: parseInt(this._params.Item),
         collapse: parseInt(this._params.Collapse)
     }
     //#endregion
     //============================================================================================

     //============================================================================================
     //#region Global function
     //---------------------------------------------------------------------------------------------
    // Global function to check if any battler is doing action sequence
    this.isSequenceBusy = function(){
        let allBattlers = $gameParty.allMembers().concat($gameTroop.members())
        return allBattlers.some(battler => battler.doingAction())
    }

    // Array function, to remove duplicate, use it with binding.
    // Shamelessly taken from stackoverflow
    this.uniq = function() {
        var a = this.concat();
        for(var i=0; i<a.length; ++i) {
            for(var j=i+1; j<a.length; ++j) {
                if(a[i] === a[j])
                    a.splice(j--, 1);
            }
        }
        return a;
    };

    // Linear movement function
    this.linearFunc = function(ori, target, time, maxTime){
        return ori + ((target - ori) * time/maxTime);
    }

    this.sample = function(array){
        return array[Math.floor(Math.random() * array.length)]
    }
    //#endregion
    //=============================================================================================

    //=============================================================================================
    //#region Sequence Functions  
    //---------------------------------------------------------------------------------------------
    // The function binds Game_Battler, so the keyword "this" will refers to Game_Battler object
    // If you want to make addon, make sure drop the function here (in TSBS.cmd object)
    //
    // Example: TSBS.cmd.cameraMove(args)
    //---------------------------------------------------------------------------------------------
    this._cmd = {}
    let cmd = this._cmd

    cmd.pose = function(args){
        this._animCell = parseInt(args.frame);
        args.sequencer.wait(args.wait);
    }

    cmd.move = function(args){
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
        spr.goto(targX, targY, args.dur, args.jump)
    }

    cmd.showAnim = function(args){
        let animId = parseInt(args.anim);
        if (animId === 0){
            animId = this._itemInUse.animationId;
            if(animId === -1){
                animId = (this.isActor() ? this.attackAnimationId1() : 0)
            }
        }
        console.log(animId);
        $gameTemp.requestAnimation(this._targetArray, animId);
    }

    cmd.cast = function(args){
        let animId = parseInt(args.anim);
        if (animId === 0){
            animId = this._itemInUse.animationId;
            if(animId === -1){
                animId = (this.isActor() ? this.attackAnimationId1() : 0)
            }
        }
        console.log(animId);
        $gameTemp.requestAnimation([this], animId);
    }

    cmd.actionEffect = function(args){
        console.log(this)
        this._targetArray.forEach(target => {
            TSBS._action.setSubject(this);
            TSBS._action.apply(target);
            if (target.shouldPopupDamage()){
                target.startDamagePopup();
            }
            if(this.shouldPopupDamage()){
                this.startDamagePopup();
            }
        })
    }

    cmd.actionEffectMod = function(args){
        
    }

    cmd.forceResult = function(args){
        var result;
        switch(args.value){
            case "Roll":
                result = 2;
                break;
            case "Success":
                result = 1;
                break;
            case "Fail":
                result = -1
                break;
        }
        switch(args.opt){
            case "Hit":
                if(result === 2){
                    let roll = Math.random() <= this.item().successRate *  0.01 * this.subject().hit;
                    result = (roll ? 1 : -1 )
                }
                this._forceResult.hit = result;
                break
            case "Evade":
                this._forceResult.evade = result;
                break
            case "Critical":
                this._forceResult.critical = result;
                break;
            default:
                this.resetForceResult();
                break;
        }
    }

    cmd.changeTarget = function(args){
        subj = this
        var determineUnit = (isOpponent) => {
            if(args.pov === "First Person"){
                if(isOpponent){
                    return subj.opponentsUnit();
                }else{
                    return subj.friendsUnit();
                }
            }else{
                if(isOpponent){
                    return $gameTroop
                }else{
                    return $gameParty
                }
            }
        }
        switch(args.opt){
            case "Revert":
                this._targetArray = this._oriTargets;
                this._newTargetValid = true;
                break;
            case "All":
                this._targetArray = $gameParty.members().concat($gameTroop.members())
                this._newTargetValid = true; 
                break;
            case "All (Except user)":
                this._targetArray = $gameParty.members().concat($gameTroop.members()).filter(t => {t !== this})
                this._newTargetValid = true; 
                break;
            case "All Enemies":
                this._targetArray = determineUnit(true).members();
                this._newTargetValid = true; 
                break;
            case "All Allies":
                this._targetArray = determineUnit(false).members();
                this._newTargetValid = true; 
                break;
            case "Other Enemies":
                this._targetArray = determineUnit(true).members().filter(t => { return !this._targetArray.includes(t)});
                this._newTargetValid = this._targetArray.length > 0; 
                break;
            case "Other Allies":
                this._targetArray = determineUnit(false).members().filter(t => { return !this._targetArray.includes(t)});
                this._newTargetValid = this._targetArray.length > 0; 
                break;
            case "Random Enemy (w/ aggro)":
                this._targetArray = [determineUnit(true).randomTarget()];
                this._newTargetValid = true; 
                break;
            case "Random Enemy (w/o aggro)":
                this._targetArray = [TSBS.sample(determineUnit(true).members())]
                this._newTargetValid = true; 
                break;
            case "Random Ally":
                this._targetArray = [TSBS.sample(determineUnit(false).members())]
                this._newTargetValid = true; 
                break;
            case "Self":
                this._targetArray = [this];
                this._newTargetValid = true;
                break;
        }
        // if(args.dead === "false"){
        //     this._targetArray = this._targetArray.filter(t => {t.isAlive()})
        //     this._newTargetValid = this._targetArray.length > 0
        // }
        TSBS._targets = TSBS._targets.concat(this._targetArray);
        TSBS._targets = TSBS.uniq.call(TSBS._targets);
    }
    //#endregion
    //=============================================================================================

    //=============================================================================================
    //#region Sequence_Interpreter 
    //---------------------------------------------------------------------------------------------
    let seq = TSBS.Sequence_Interpreter.prototype;
    seq.setupChild = function(list, eventId) {
        this._childInterpreter = new TSBS.Sequence_Interpreter(this._battler, this._depth + 1);
        this._childInterpreter.setup(eventId, this._phaseName);
    };

    seq.terminate = function() {
        if(this._endFunc === null){
            Game_Interpreter.prototype.terminate.call(this);
        }else{
            this._endFunc.call(this);
        }
    };

    seq.ending = function(){
        return this._list === null;
    }

    seq.setup = function(eventId, phaseName, endFunc = null) {
        const commonEvent = $dataCommonEvents[eventId];
        Game_Interpreter.prototype.setup.call(this, commonEvent.list, eventId);
        this._endFunc = endFunc;
        this._phaseName = phaseName;
        this._ending = false;
    }

    seq.command357 = function(params) {
        TSBSCommand = params[0] == TSBS._pluginName || TSBS._addons.some(a => a === params[0])
        if (TSBSCommand){
            commandName = params[1]
            if (TSBS._cmd[commandName] !== undefined){
                args = params[3];
                args.sequencer = this;
                TSBS._cmd[commandName].call(this._battler,(params[3]));
                return true
            }
        }
        args = params[3];
        args.battler = this._battler;
        return Game_Interpreter.prototype.command357.call(this, params);
    }
    //#endregion
    //=============================================================================================

    //=============================================================================================
    //#region Game_Action overrides
    // I'm doing this really just because I only need the apply function, and not the rest.
    //---------------------------------------------------------------------------------------------
    protoAct = Game_Action.prototype
    act = TSBS.Action.prototype

    // Subject is going to be determined later
    act.setSubject = function(subject){
        if(subject !== null){
            protoAct.setSubject.call(this, subject)
        }
    }
    this._action = new TSBS.Action();

    // Yeah, I don't want my item being controlled by ID. Why not an actual item rather than id?
    act.item = function() {
        var subj = this.subject();
        if (subj._itemInUse !== null){
            return subj._itemInUse
        }
        return protoAct.item.call(this);
    };
    
    act.isSkill = function() {
        var subj = this.subject();
        if (subj._itemInUse !== null){
            return subj._itemInUse._dataClass === "skill"
        }
        return protoAct.isSkill.call(this);
    };
    
    act.isItem = function() {
        var subj = this.subject();
        if (subj._itemInUse !== null){
            return subj._itemInUse._dataClass === "item"
        }
        return protoAct.isItem.call(this);
    };

    // Force hit, ignore evasion
    act.itemHit = function(target) {
        const rsult = this.subject()._forceResult.hit
        if(rsult !== 0){
            return rsult;
        }
        return protoAct.itemHit.call(this, target)
    };
    
    // Force evasion, does not ignore force hit
    act.itemEva = function(target) {
        const rsult = this.subject()._forceResult.evade
        if(this.subject()._forceResult.hit !== 0){
            return 0;
        }else if (this.subject()._forceResult.evade !== 0){
            return rsult;
        }
        return protoAct.itemEva.call(this, target)
    };
    
    // Force critical, ignore if critical is checked or not 
    act.itemCri = function(target) {
        const rsult = this.subject()._forceResult.critical
        if(rsult !== 0){
            return rsult;
        }
        return protoAct.itemCri.call(this, target)
    };
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

    bb.actionPrepare = function(targets, item){
        this._targetArray = targets
        this._oriTargets = targets
        this._itemInUse = JsonEx.makeDeepCopy(item)
    }

    bb.clearTSBS = function(){
        this._sequencer = null          // Store the animation sequencer
        this._animCell = 0              // Store the current shown sheet frame
        this._itemInUse = null          // Store the currently used item/skill
        this._oriTargets = []           // Store the original target
        this._targetArray = []          // Store the current target
        this._flip = false              // Determine if the battler image is flipped
        this._newTargetValid = false    // Determine if getting a new target is success
        this.resetForceResult()
    }

    bb.resetForceResult = function() {
        this._forceResult = {           
            hit: 0,
            evade: 0,
            critical: 0
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
            return TSBS._actorSprites[this._actorId];
        }else{
            return TSBS._enemySprites[this.index()];
        }
    }

    bb.dataBattler = function(){
        if (this.isActor()){
            return this.actor();
        }else{
            return this.enemy();
        }
    }

    bb.clearActionSequence = function(){
        this._itemInUse = null
        this._oriTargets = []
        this._targetArray = []
    }

    bb.performActionSequence = function(commonEvent, endFunc = null){
        this._sequencer.setup(commonEvent, "action", endFunc)
    }

    bb.doingAction = function(){
        return this._sequencer._phaseName == "action" && !this._sequencer.ending()
    }
    //#endregion
    //============================================================================================

    //============================================================================================
    //#region Game_Actor
    //---------------------------------------------------------------------------------------------
    _.actor = {}
    let ga = Game_Actor.prototype

    ga.initHomePos = function() {
        let pos = this.index()
        this._homeX = _._actorPos[pos].x
        this._homeY = _._actorPos[pos].y
    }

    ga.homePos = function() {
        return {
            x: this._homeX,
            y: this._homeY
        }
    }

    _.actor.onBattleStart = ga.onBattleStart
    ga.onBattleStart = function(){
        this.initHomePos()
        _.actor.onBattleStart.call(this)
    }
    //#endregion
    //============================================================================================

    //============================================================================================= 
    //#region Sprite_Battler
    //---------------------------------------------------------------------------------------------
    _.spriteBattler = {}
    let sb = Sprite_Battler.prototype

    _.spriteBattler.initMembers = sb.initMembers
    sb.initMembers = function(){
        _.spriteBattler.initMembers.call(this)
        this._usedFunc = _.linearFunc;  // Move function
        this._tsbsMoveDuration = 0;     // Current duration (count down)
        this._maxDuration = 0;          // Maximum duration
        this._jumpPower = 0;            // Jump force
        this._displayX = 0;             // Sprite current display X
        this._displayY = 0;             // Sprite current display Y
        this._targX = 0;                // Target X axis
        this._targY = 0;                // Target Y axis
        this._oriX = 0;                 // Original X before moving
        this._oriY = 0;                 // Original Y before moving
    }

    _.spriteBattler.setHome = sb.setHome
    sb.setHome = function(x, y) {
        this._displayX = x
        this._displayY = y
        _.spriteBattler.setHome.call(this, x, y)
    };

    sb.updatePosition = function() {
        if (this._tsbsMoveDuration > 0) {
            const time = this._maxDuration - this._tsbsMoveDuration
            this._displayX = this._usedFunc(this._oriX, this._targX, time, this._maxDuration)
            this._displayY = this._usedFunc(this._oriY, this._targY, time, this._maxDuration)
            this._tsbsMoveDuration -= 1;
            if (this._tsbsMoveDuration === 0){
                this._displayX = this._targX;
                this._displayY = this._targY;
            }
        }
        // Offset is preserved for the default move function
        // Home position is not used
        this.x = this._displayX + this._offsetX;
        this.y = this._displayY + this._offsetY - this.jumpHeight();
    };

    sb.goto = function(x, y, duration, jump = 0, funcName = "linearFunc"){
        this._maxDuration = duration;
        this._jumpPower = jump;
        this._targX = x;
        this._targY = y;
        this._oriX = this._displayX;
        this._oriY = this._displayY;
        this._tsbsMoveDuration = duration;
        this._usedFunc = _[funcName];
    }

    sb.jumpHeight = function(){
        if (this._tsbsMoveDuration === 0) {
            return 0
        }
        let time = this._maxDuration - this._tsbsMoveDuration
        let gravity = this._jumpPower/(this._maxDuration/2);
        let height = (this._jumpPower * time) - (gravity * time * (time + 1) / 2);
        return Math.max(0, height);
    }
    //#endregion
    //============================================================================================= 

    //============================================================================================= 
    //#region Sprite_Actor
    //---------------------------------------------------------------------------------------------
    _.spriteActor = {}
    sa = Sprite_Actor.prototype

    _.spriteActor.setBattler = sa.setBattler
    sa.setBattler = function(battler) {
        _.spriteActor.setBattler.call(this, battler);
        if (battler !== undefined){
            _._actorSprites[battler._actorId] = this;
        }
    };
    
    // Delete update motion. I don't need it
    sa.updateMotion = function() {
    };
    
    sa.updateShadow = function() {
        this._shadowSprite.visible = !! this._actor;
        this._shadowSprite.y = -2 + this.jumpHeight();
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
    //#region Sprite_Enemy
    //---------------------------------------------------------------------------------------------
    _.spriteEnemy = {}
    se = Sprite_Enemy.prototype

    _.spriteEnemy.setBattler = se.setBattler
    se.setBattler = function(battler) {
        _.spriteEnemy.setBattler.call(this, battler);
        if (battler !== undefined){
            _._enemySprites[battler.index()] = this;
        }
    };
    //#endregion
    //============================================================================================= 

    //============================================================================================= 
    //#region Spriteset_Battle
    //---------------------------------------------------------------------------------------------
    _.sprset = {}
    sset = Spriteset_Battle.prototype

    _.sprset.isBusy = sset.isBusy
    sset.isBusy = function() {
        return _.sprset.isBusy.call(this) || _.isSequenceBusy();
    };

    // Delays are silly, why would they do this smh ...
    sset.animationBaseDelay = function() {
        return 0;
    };

    sset.animationNextDelay = function() {
        return 0;
    };
    //#endregion
    //============================================================================================= 

    //============================================================================================= 
    //#region Window_BattleLog (for sequence) 
    //---------------------------------------------------------------------------------------------
    _.wblog = {}
    wb = Window_BattleLog.prototype;

    // Refactor start action with my own
    wb.startAction = function(subject, action, targets) {
        const item = action.item();
        this.displayAction(subject, item);
        this.push("tsbs_actionMain", subject, targets, item);
        this.push("tsbs_actionPost", subject, item);
        this.push("tsbs_actionEnd", subject, item);
    }

    wb.tsbs_actionMain = function(subject, targets, item){
        _._targets = targets.clone();

        // Apply target substitute here (later)
        if(targets.length == 1){
            // Substitute only possible if not AoE attack
            let t = targets[0]

        }
        // Probably roll the magic reflect here
        subject.actionPrepare(targets, item)
        subject.performActionSequence(10, null);
        this.setWaitMode("Sequence");
    }

    wb.tsbs_actionPost = function(subject, item){
        // Probably, apply magic reflect here
        var endFunc = function() { this.startIdleMotion() }.bind(subject)
        subject.performActionSequence(5, endFunc);
        this.setWaitMode("Sequence");
    }

    wb.tsbs_actionEnd = function(subject, item){
        subject.clearActionSequence()
        for(var target of _._targets){
            target.startIdleMotion();
            //target.returnHome();
            //target.checkCollapse();
        }
        _.target = [];
    }

    _.wblog.updateWait = wb.updateWaitMode
    wb.updateWaitMode = function(){
        if (this._waitMode === "Sequence"){
            return _.isSequenceBusy();
        }
        return _.wblog.updateWait.call(this);
    }
    //#endregion
    //=============================================================================================

    //============================================================================================= 
    // Scene Update
    //---------------------------------------------------------------------------------------------
    _.scene_battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _.scene_battle_update.call(this);
        //$gameActors.actor(1).updateSequencer();
        $gameParty.updateSequencer();
        $gameTroop.updateSequencer();
    };

    Game_Unit.prototype.updateSequencer = function(){
        this.members().forEach(m => m.updateSequencer());
    }
}

// Initialize
TSBS.init()
TSBS.init = undefined
