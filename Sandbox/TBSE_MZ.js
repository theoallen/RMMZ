/*:
@target MZ
@plugindesc v0.1.0 - Theo's Battle Sequence Engine MZ.
@author TheoAllen
@help
TBSE is spritesheet-based animation sequence plugin aiming for a free-frame 
pick spritesheet animation sequencer. You are encouraged to use any kind 
of spritesheet you want instead of using the default MZ battle spritesheet 
format.

The animation sequencer forces you to define your own animation motion
instead of being spoiled by an auto-play motion. You also need to customize
the delay of each frame and all the timing on your own.

To do list
- Complete the roundtrip
- Projectile action sequence
- 
- Summon?

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

@command anchorHome
@text Anchor Position
@desc Anchor current position as the new home position

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

@command actionEffect
@text Action Effect
@desc Invoke item/skill effect to the target battler

@arg apply
@text Apply Effect
@desc Apply Skill/Item effect to the target
@type boolean
@on Yes
@off No
@default true

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

@command changeAction
@text Alter Skill
@desc Invoke a modified item/skill effect to the target battler

@arg skill
@text Skill ID
@desc Using a different skill id to damage/do something to the target. Selecting -1 will use/reset to the original used skill.
Use text input to put -1 as the parameter
@type skill
@default -1
@min -1

@arg scale
@text Scale
@desc Scale the output from the damage formula using a valid floating number. E.g, 1.5. JS Syntax is ok.
@type text
@default 1.0

@arg formula
@text Formula
@desc Change the skill formula
@type skill

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
@option Random Enemy
@option Random Ally
@option Next Enemy
@option Next Ally
@option Next Random
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
@desc Maximum sheet row (from top to bottom)

@param SheetColumn
@parent General Options
@type number
@min 1
@default 9
@text Max Sheet Column
@desc Maximum sheet Column (from left to right)

@param InvertX
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
const TBSE = {}

//-------------------------------------------------------------------------------------------------
// IIFE alternative, because I have encapsulation
// I know you hate this, but I do what I wanna do and I don't care
//-------------------------------------------------------------------------------------------------
TBSE.init = function(){
    this._pluginName = "TBSE_MZ"

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
            x: Number(pos.X),
            y: Number(pos.Y)
        }
        this._actorPos.push(obj);
     })

     this._maxRow = Number(this._params.SheetRow)
     this._maxCol = Number(this._params.SheetColumn)
     this._invertX = this._params.InvertX === "true"

     // Sequence template
     this._sequenceList = {
         idle: Number(this._params.Idle),
         damaged: Number(this._params.Damaged),
         pinch: Number(this._params.Pinch),
         evade: Number(this._params.Evade),
         post: Number(this._params.Return),
         dead: Number(this._params.Dead),
         victory: Number(this._params.Victory),
         escape: Number(this._params.Escape),
         intro: Number(this._params.Intro),
         preintro: Number(this._params.PreIntro),
         skill: Number(this._params.Skill),
         item: Number(this._params.Item),
         collapse: Number(this._params.Collapse)
         //motion: 0,
     }
    //#endregion
    //============================================================================================

    //============================================================================================
    //#region Notetag loading
    //--------------------------------------------------------------------------------------------
    this._tagMotion     = /<tbse[\s_]+motion\*s:\s*(.+)\s*>/i
    this._regexTag      = /<tbse[\s_]+(.+)\s*:\s*(.+)\s*>/i
    this._tagAnim       = /<animated>/i
    
    this.dbLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function(){
        if (!TBSE.dbLoaded.call(this)) {return false};
        if (!TBSE._isLoaded) {

            // Loading default motion
            [...$dataActors, ...$dataEnemies].forEach(db => {
                if(db){
                    db._sequenceList = Object.assign({},TBSE._sequenceList)
                    db.note.split(/[\r\n]+/).forEach(line => {
                        if(line.match(TBSE._regexTag)){
                            let name = String(RegExp.$1);
                            let seqName = Number(RegExp.$2);
                            if (seqName === NaN){
                                let commonEvent = $dataCommonEvents.filter(cmv => {return cmv.name === seqName})
                                if(commonEvent.lenght > 0){
                                    db._sequenceList[name] = commonEvent[0].id;
                                }
                            }else{
                                db._sequenceList[name] = seqName;
                            }
                        }else if(line.match(TBSE._tagAnim)){
                            db._isAnimated = true; // This is only for Enemies
                        }
                    })
                }
            });

            $dataSkills.forEach(db => {
                if(db){
                    db._motion = TSBS._sequenceList.skill
                    let effects = db.effects.filter(eff => { return eff.code === 44})
                    if(effects.length > 0){
                        db._motion = effects[0].dataId
                    }
                }
            });

            $dataItems.forEach(db => {
                if(db){
                    db._motion = TSBS._sequenceList.item
                    let effects = db.effects.filter(eff => { return eff.code === 44})
                    if(effects.length > 0){
                        db._motion = effects[0].dataId
                    }
                }
            });

            $dataStates.forEach(db => {
                if(db){
                    db.note.split(/[\r\n]+/).forEach(line => {
                        if(line.match(TBSE._tagMotion)){
                            db._motion = Number(RegExp.$1);
                        }
                    })
                }
            });

            TBSE._isLoaded = true;
        }
        return true;
    }

    //============================================================================================

    //============================================================================================
    //#region Global function
    //--------------------------------------------------------------------------------------------
    // Global function to check if any battler is doing action sequence
    this.isSequenceBusy = () => {
        return TBSE.allBattlers().some(battler => battler.doingAction())
    }

    // Function to get all battlers for convenience
    this.allBattlers = () => { 
        return [...$gameParty.allMembers(),...$gameTroop.members()] 
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
    this.linearFunc = (ori, target, time, maxTime) => {
        return ori + ((target - ori) * time/maxTime);
    }

    // Smooth movement function
    this.smoothFunc = function(ori, target, time, maxtime) {
        return target * Math.sqrt(1 - (time=time/maxtime.to_f-1)*time) + ori;
    }

    // Return a random element from an array
    this.sample = function(array){
        return array[Math.floor(Math.random() * array.length)]
    }

    // Clears sprite reference to freed up memories(?)
    this.clearSpriteReference = function(){
        TBSE._actorSprites = {}
        TBSE._enemySprites = {}
    }
    //#endregion
    //=============================================================================================

    //=============================================================================================
    //#region Sequence Functions  
    //---------------------------------------------------------------------------------------------
    // The function binds Game_Battler, so the keyword "this" will refers to Game_Battler object
    // If you want to make addon, make sure drop the function here (in TBSE._commands object)
    //
    // Example: TBSE._commands.cameraMove(args)
    //---------------------------------------------------------------------------------------------
    this._commands = {}
    let cmd = this._commands

    // Manual pose sequence
    cmd.pose = function(args){
        this.sequencer()._animCell = Number(args.frame);
        args.interpreter.wait(args.wait);
    }

    // Frame/Cell select pose
    cmd.cellPose = function(args){
        cell = 0;
        this.sequencer()._animCell = cell;
        args.interpreter.wait(args.wait);
    }

    // Move command
    cmd.move = function(args){
        if (args.who === "targets"){
            args.who = "self"
            this._targetArray.forEach(t => {
                cmd.move.call(t, args)
            })
            return
        }
        let spr = this.sprite();
        let targX = Number(args.x);
        let targY = Number(args.y);
        let targets = this.sequencer()._targetArray.length > 0 ? this._targetArray : TBSE._affectedBattlers
        switch(args.to){
            case "Target":
                targX += targets.reduce((total, trg)=>{ return trg.sprite().x + total}, 0)
                targY += targets.reduce((total, trg)=>{ return trg.sprite().y + total}, 0)
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

    // Set new home
    cmd.anchorHome = function(args){
        let spr = this.sprite();
        this._homeX = spr.x + Number(args.x)
        this._homeY = spr.y + Number(args.y)
    }

    cmd.showAnim = function(args){
        let animId = Number(args.anim);
        if (animId === 0){
            animId = this.sequencer()._itemInUse.animationId;
            if(animId === -1){
                animId = (this.isActor() ? this.attackAnimationId1() : 0)
            }
        }
        $gameTemp.requestAnimation(this.sequencer()._targetArray, animId);
    }

    cmd.cast = function(args){
        let animId = Number(args.anim);
        if (animId === 0){
            animId = this.sequencer()._itemInUse.animationId;
            if(animId === -1){
                animId = (this.isActor() ? this.attackAnimationId1() : 0)
            }
        }
        $gameTemp.requestAnimation([this], animId);
    }

    cmd.actionEffect = function(args){
        let seq = this.sequencer()
        seq._targetArray.forEach(target => {
            seq._action.apply(target);
            if (target.shouldPopupDamage()){
                target.startDamagePopup();
            }
        })
        if(this.shouldPopupDamage()){
            this.startDamagePopup();
        }
    }

    cmd.changeAction = function(args){
        id = Number(args.skill)
        if(id === -1){
            this.sequencer().restoreItem()
        } else if(id > 0){
            this.sequencer().setItemUse($dataSkills[id])
        }
        
    }

    cmd.forceResult = function(args){
        if (this.sequencer().noTarget()){
            return;
        }
        let result;
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
        const targets = this.sequencer()._targetArray
        let action = this.sequencer()._action
        switch(args.opt){
            case "Hit":
                if(result === 2){
                    let roll = Math.random() <= this.sequencer()._itemInUse.successRate *  0.01 * this.hit;
                    result = (roll ? 1 : -1 )
                }
                action._forceResult.hit = result;
                break
            case "Evade":
                if(result === 2){
                    if(targets.length > 1){
                        result = 0;
                    }else{
                        let t = targets[0];
                        let roll = this.sequencer()._action.aliasEva(t) >= Math.random;
                        result = (roll ? 1 : -1)
                    }
                }
                action._forceResult.evade = result;
                break
            case "Critical":
                if(result === 2){
                    if(targets.length > 1){
                        let roll = this.cri >= Math.random()
                        result = (roll ? 1 : -1 )
                    }else{
                        let t = targets[0];
                        let roll = action.aliasCri(t) >= Math.random;
                        result = (roll ? 1 : -1)
                    }
                }
                action._forceResult.critical = result;
                break;
            default:
                action.resetForcedResult();
                break;
        }
    }

    cmd.determineUnit = function(pov, isOpponent){
        if(pov === "First Person"){
            if(isOpponent){
                return this.opponentsUnit();
            }else{
                return this.friendsUnit();
            }
        }else{
            if(isOpponent){
                return $gameTroop
            }else{
                return $gameParty
            }
        }
    }

    cmd.changeTarget = function(args){
        let seq = this.sequencer()
        let newTargets = []
        switch(args.opt){
            case "Revert":
                newTargets = this._oriTargets;
                break;
            case "All":
                newTargets = $gameParty.members().concat($gameTroop.members())
                break;
            case "All (Except user)":
                newTargets = $gameParty.members().concat($gameTroop.members()).filter(t => {t !== this})
                break;
            case "All Enemies":
                newTargets = this.determineUnit(args.pov, true).members();
                break;
            case "All Allies":
                newTargets = this.determineUnit(args.pov, false).members();
                break;
            case "Other Enemies":
                newTargets = this.determineUnit(args.pov, true).members().filter(t => { return !seq._targetArray.includes(t)});
                break;
            case "Other Allies":
                newTargets = this.determineUnit(args.pov, false).members().filter(t => { return !seq._targetArray.includes(t)});
                break;
            case "Random Enemy":
                newTargets = [this.determineUnit(args.pov, true).randomTarget()];
                break;
            case "Random Ally":
                newTargets = [TBSE.sample(this.determineUnit(args.pov, false).members())] 
                break;
            case "Next Enemy":
                newTarget = TBSE.sample(this.determineUnit(args.pov, true).members().filter((m) => { return !this.sequencer()._victims.includes(m)}))
                newTargets = newTarget !== undefined ? [newTarget] : [];
            case "Next Ally":
                newTarget = TBSE.sample(this.determineUnit(args.pov, false).members().filter((m) => { return !this.sequencer()._victims.includes(m)}))
                newTargets = newTarget !== undefined ? [newTarget] : [];
            case "Next Random":
                newTarget = TBSE.sample($gameParty.members().concat($gameTroop.members()).filter((m) => {
                     return !this.sequencer()._victims.includes(m)
                    }));
                newTargets = newTarget !== undefined ? [newTarget] : [];
            case "Self":
                newTargets = [this];
                break;
        }
        if(args.dead === "false"){
            newTargets = newTargets.filter(t => { return t.isAlive() })
        }
        TBSE._affectedBattlers = TBSE._affectedBattlers.concat(newTargets);
        TBSE._affectedBattlers = TBSE.uniq.call(TBSE._affectedBattlers);
        seq._victims = seq._victims.concat(newTargets);
        seq._targetArray = newTargets;
    }
    //#endregion
    //=============================================================================================

    //=============================================================================================
    //#region TBSE Sequencer - Handles action sequence data
    // Handled as a separate object for better compatibility
    //---------------------------------------------------------------------------------------------
    TBSE.Sequencer = class {
        constructor(battler){
            this._isActor = battler.isActor()
            this._battlerID = this._isActor ? battler.actorId() : battler.index();
            this._action = new TBSE.Action(battler);
            this._interpreter = new TBSE.Sequence_Interpreter(battler, 0);
            this._actionRecord = new TBSE.ActionRecord();
            this.clear()
            this.startIdleMotion()
        }

        clear(){
            this._animCell = 0              // Store the current shown sheet frame
            this._itemInUse = null          // Store the currently used item/skill
            this._oriTargets = []           // Store the original target
            this._targetArray = []          // Store the current target
            this._flip = false              // Determine if the battler image is flipped
            this._originalItemUse = null    // Store the original item use
            this._victims = []              // All target victims (not necessarily a victim, it just a funny variable name)
        }

        // Avoiding circular reference
        battler(){
            if(this._isActor){
                return $gameActors.actor(this._battlerID)
            }else{
                return $gameTroop.members()[this._battlerID]
            }
        }

        update(){
            this._interpreter.update()
        }

        // Prepare for action
        actionPrepare(targets, item){
            this._targetArray = targets.concat()
            this._victims = targets.concat()
            this._oriTargets = targets
            this.setItemUse(item, true)
        }
        // ↓
        // ↓ -- Set item (before action)
        setItemUse(item, preserve = false){
            if(item){
                this._itemInUse = JsonEx.makeDeepCopy(item)
                this._itemInUse._dataClass = (DataManager.isSkill(item) ? "skill" : "item")
                if (preserve){
                    this._originalItemUse = item
                }
            }
        }
        // ↓
        // ↓ -- Perform action sequence
        performActionSequence(){
            if (this._itemInUse){
                const actionId = this._itemInUse._motion
                this._interpreter.setup(actionId, "action", this.postAction)
                this.clearActionData()
            } 
        }
        // ↓
        // ↓ -- Perform post action (ending sequence, for example, returning to the original position)
        postAction(){
            const endFunc = function() { this.startIdleMotion() };
            const actionId = this.dataBattler()._sequenceList.post
            this._interpreter.setup(actionId, "action", endFunc)
        }
        // ↓
        // ↓ -- Back to idle
        startIdleMotion(){
            this._interpreter.setup(this.idleMotion(), "idle", function() { this._index = 0} );
        }
        
        // Will be change later
        // Idle motion priority
        // Dead motion -- State affected -- Pinch -- Equipment(?) -- Class based -- Actor idle
        idleMotion(){
            return this.dataBattler()._sequenceList.idle;
        }

        clearActionData(){
            this._action.resetForcedResult()
            this._actionRecord.clear()
        }

        motionEvade(){
            const endFunc = function() { this.startIdleMotion() };
            const actionId = this.dataBattler()._sequenceList.evade
            this._interpreter.setup(actionId, "action", endFunc)
        }

        motionDamaged(){
            const endFunc = function() { this.startIdleMotion() };
            const actionId = this.dataBattler()._sequenceList.damage
            this._interpreter.setup(actionId, "action", endFunc)
        }

        // Currently unimplemented, trying to seek for the best way to implement intro sequence
        motionIntro(){
            const endFunc = function() { this.startIdleMotion() };
            const actionId = this.dataBattler()._sequenceList.intro
            this._interpreter.setup(actionId, "action", endFunc)
        }

        motionVictory(){
            const actionId = this.dataBattler()._sequenceList.victory
            this._interpreter.setup(actionId, "action")
        }

        motionEscape(){
            const actionId = this.dataBattler()._sequenceList.escape
            this._interpreter.setup(actionId, "action")
        }

        motionCollapse(){
            const endFunc = function() { this.startIdleMotion() };
            const actionId = this.dataBattler()._sequenceList.collapse
            this._interpreter.setup(actionId, "action", endFunc)
        }

        restoreItem(){
            this.setItemUse(this._originalItemUse)
        }

        noTarget(){
            return this._targetArray.length === 0
        }

        hasTarget(){
            return this._targetArray.length > 0
        }

        // Why there is no same function name to refers to the battler database for both actor and
        // enemy is beyond me, smh.
        dataBattler(){
            if (this._battler.isActor()){
                return this._battler.actor();
            }else{
                return this._battler.enemy();
            }
        }
    }
    //#endregion
    //=============================================================================================

    //=============================================================================================
    //#region TBSE.Sequence_Interpreter < Game_Interpreter
    //---------------------------------------------------------------------------------------------
    // Borrowing event interpreter for sequencer
    TBSE.Sequence_Interpreter = function(battler, depth){
        Game_Interpreter.prototype.initialize.call(this, depth);
        this._isActor = battler.isActor()
        this._battlerID = this._isActor ? battler.actorId() : battler.index();
    }
    TBSE.Sequence_Interpreter.prototype = Object.create(Game_Interpreter.prototype);
    TBSE.Sequence_Interpreter.prototype.constructor = TBSE.Sequence_Interpreter

    let seq = TBSE.Sequence_Interpreter.prototype;
    seq.setupChild = function(list, eventId) {
        this._childInterpreter = new TBSE.Sequence_Interpreter(this.battler(), this._depth + 1);
        this._childInterpreter.setup(eventId, this._phaseName);
    };

    // Avoiding circular reference
    seq.battler = function(){
        if(this._isActor){
            return $gameActors.actor(this._battlerID)
        }else{
            return $gameTroop.members()[this._battlerID]
        }
    }

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

    // Phase name is kinda useless for now.
    // I'm only using it if the name is "action" it means busy/wait till finish
    seq.setup = function(eventId, phaseName, endFunc = null) {
        const commonEvent = $dataCommonEvents[eventId];
        Game_Interpreter.prototype.setup.call(this, commonEvent.list, eventId);
        this._endFunc = endFunc;
        this._phaseName = phaseName;
    }

    seq.command357 = function(params) {
        TBSECommand = params[0] == TBSE._pluginName || TBSE._addons.some(a => a === params[0])
        if (TBSECommand){
            commandName = params[1]
            if (TBSE._commands[commandName] !== undefined){
                args = params[3];
                args.interpreter = this;
                TBSE._commands[commandName].call(this.battler(),(params[3]));
                return true
            }
        }
        args = params[3];
        args.battler = this.battler();
        return Game_Interpreter.prototype.command357.call(this, params);
    }
    //#endregion
    //=============================================================================================

    //=============================================================================================
    //#region TBSE.Action < Game_Action overrides
    // I'm doing this really just because I only need the apply function, and not the rest.
    //---------------------------------------------------------------------------------------------
    // Handles action effect application
    TBSE.Action = function() {
        Game_Action.prototype.initialize.call(this,null, false);
    }
    TBSE.Action.prototype = Object.create(Game_Action.prototype);
    TBSE.Action.prototype.constructor = TBSE.Action

    protoAct = Game_Action.prototype
    act = TBSE.Action.prototype

    act.initialize = function(subject) {
        protoAct.initialize.call(this, subject, false)
        this.resetForcedResult()
    };

    act.resetForcedResult = function(){
        this._forceResult = {           
            hit: 0,
            evade: 0,
            critical: 0
        }
    }
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
        const rsult = this._forceResult.hit
        if(rsult !== 0){
            return rsult;
        }
        return protoAct.itemHit.call(this, target)
    };
    
    // Force evasion, does not ignore force hit
    act.itemEva = function(target) {
        const rsult = this._forceResult.evade
        if(this._forceResult.hit !== 0){
            return 0;
        }else if (this._forceResult.evade !== 0){
            return rsult;
        }
        return protoAct.itemEva.call(this, target)
    };
    
    // Force critical, ignore if critical is checked or not 
    act.itemCri = function(target) {
        const rsult = this._forceResult.critical
        if(rsult !== 0){
            return rsult;
        }
        return protoAct.itemCri.call(this, target)
    };

    act.aliasEva = protoAct.itemEva
    act.aliasCri = protoAct.itemCri
    //#endregion
    //=============================================================================================

    //=============================================================================================
    //#region Action Record
    //---------------------------------------------------------------------------------------------
    TBSE.ActionRecord = class{
        constructor(){
            this.clearRecord()
        }

        clearRecord(){
            this.hitTimes = 0;
            this.hpDamage = 0;
            this.mpDamage = 0;
            this.tpDamage = 0;
            this.addedStates = [];
            this.removedStates = [];
            this.addedBuffs = [];
            this.addedDebuffs = [];
            this.removedBuffs = [];
        }

        restoreRecord(actionResult){
            Object.assign(this, actionResult)
        }

        addRecord(actionResult){
            this.hitTimes += 1
            this.hpDamage += actionResult.hpDamage;
            this.mpDamage += actionResult.mpDamage;
            this.tpDamage += actionResult.tpDamage;
            this.addedStates = [...this.addedStates,...actionResult.addedStates];
            this.removedStates = [...this.removedStates,...actionResult.removedStates];
            this.addedBuffs = [...this.addedBuffs, ...actionResult.addedBuffs];
            this.addedDebuffs = [...this.addedDebuffs, ...actionResult.addedDebuffs];
            this.removedBuffs = [...this.removedBuffs, ...actionResult.removedBuffs];
        }
    }

    //#endregion
    //=============================================================================================

    //=============================================================================================
    //#region Game_Battler 
    //---------------------------------------------------------------------------------------------
    TBSE.battler = {}
    let bb = Game_Battler.prototype;

    TBSE.battler.onBattleStart = bb.onBattleStart
    bb.onBattleStart = function(){
        _.battler.onBattleStart.call(this);
        this._sequencer = new TBSE.sequencer(this)
    }

    bb.sequencer = function(){
        return this._sequencer;
    }

    bb.homePos = function() {
        return {
            x: 0,
            y: 0
        }
    }

    bb.updateSequencer = function(){
        if(this._sequencer){
            this._sequencer.update();
        }
    }

    bb.sprite = function(){
        if (this.isActor()){
            return TBSE._actorSprites[this._actorId];
        }else{
            return TBSE._enemySprites[this.index()];
        }
    }

    bb.clearActionSequence = function(){
        this._sequencer = undefined
    }

    bb.doingAction = function(){
        const seq = this.sequencer()
        if (seq === undefined){
            return false
        }
        return seq._interpreter == "action" && !seq._interpreter.ending()
    }

    TBSE.battler.clearPopup = bb.clearDamagePopup
    bb.clearDamagePopup = function() {
        TBSE.battler.clearPopup.call(this)
        if(this.sequencer()){
            this.sequencer()._actionRecord.addRecord(this._result)
        }
    };

    bb.returnHome = function(){
        const home = this.homePos()
        this.sprite().goto(home.x, home.y, 10, 0)
    }

    bb.checkCollapse = function(){

    }
    //#endregion
    //=============================================================================================

    //=============================================================================================
    //#region Game_Actor
    //---------------------------------------------------------------------------------------------
    TBSE.actor = {}
    let ga = Game_Actor.prototype

    ga.initHomePos = function() {
        let pos = this.index()
        this._homeX = TBSE._actorPos[pos].x
        this._homeY = TBSE._actorPos[pos].y
    }

    ga.homePos = function() {
        return {
            x: this._homeX,
            y: this._homeY
        }
    }

    TBSE.actor.onBattleStart = ga.onBattleStart
    ga.onBattleStart = function(){
        this.initHomePos()
        TBSE.actor.onBattleStart.call(this)
    }
    //#endregion
    //=============================================================================================

    //=============================================================================================
    //#region Game_Enemy
    //---------------------------------------------------------------------------------------------
    TBSE.enemy = {}
    ge = Game_Enemy.prototype

    TBSE.enemy.setup = ge.setup
    ge.setup = function(enemyId, x, y) {
        TBSE.enemy.setup.call(this, enemyId, x, y);
        this.initHomePos();
    };

    ge.initHomePos = function() {
        this._homeX = this._screenX
        this._homeY = this._screenY
    }

    ge.homePos = function(){
        return {
            x: this._homeX,
            y: this._homeY
        }
    }

    //#endregion
    //=============================================================================================

    //=============================================================================================
    //#region Game_Party
    //---------------------------------------------------------------------------------------------
    TBSE.party = {}
    gpt = Game_Party.prototype

    TBSE.party.maxBattleMembers = gpt.maxBattleMembers
    gpt.maxBattleMembers = function() {
        if($gameSystem.isSideView()){
            return TBSE._actorPos.length
        }
        return TBSE.party.maxBattleMembers.call(this);
    };
    //#endregion
    //=============================================================================================

    //============================================================================================= 
    //#region Sprite_Battler
    //---------------------------------------------------------------------------------------------
    TBSE.spriteBattler = {}
    let sb = Sprite_Battler.prototype

    TBSE.spriteBattler.initMembers = sb.initMembers
    sb.initMembers = function(){
        TBSE.spriteBattler.initMembers.call(this)
        this._usedFunc = TBSE.linearFunc;   // Move function
        this._tbseMoveDuration = 0;         // Current duration (count down)
        this._maxDuration = 0;              // Maximum duration
        this._jumpPower = 0;                // Jump force
        this._displayX = 0;                 // Sprite current display X
        this._displayY = 0;                 // Sprite current display Y
        this._targX = 0;                    // Target X axis
        this._targY = 0;                    // Target Y axis
        this._oriX = 0;                     // Original X before moving
        this._oriY = 0;                     // Original Y before moving
    }

    TBSE.spriteBattler.setHome = sb.setHome
    sb.setHome = function(x, y) {
        this._displayX = x
        this._displayY = y
        TBSE.spriteBattler.setHome.call(this, x, y)
    };

    sb.updatePosition = function() {
        if (this._tbseMoveDuration > 0) {
            const time = this._maxDuration - this._tbseMoveDuration
            this._displayX = this._usedFunc(this._oriX, this._targX, time, this._maxDuration)
            this._displayY = this._usedFunc(this._oriY, this._targY, time, this._maxDuration)
            this._tbseMoveDuration -= 1;
            if (this._tbseMoveDuration === 0){
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
        this._tbseMoveDuration = duration;
        this._usedFunc = TBSE[funcName];
    }

    sb.jumpHeight = function(){
        if (this._tbseMoveDuration === 0) {
            return 0
        }
        let time = this._maxDuration - this._tbseMoveDuration
        let gravity = this._jumpPower/(this._maxDuration/2);
        let height = (this._jumpPower * time) - (gravity * time * (time + 1) / 2);
        return Math.max(0, height);
    }
    //#endregion
    //============================================================================================= 

    //============================================================================================= 
    //#region Sprite_Actor
    //---------------------------------------------------------------------------------------------
    TBSE.spriteActor = {}
    sa = Sprite_Actor.prototype

    TBSE.spriteActor.setBattler = sa.setBattler
    sa.setBattler = function(battler) {
        TBSE.spriteActor.setBattler.call(this, battler);
        if (battler !== undefined){
            TBSE._actorSprites[battler._actorId] = this;
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
            var cw = bitmap.width / TBSE._maxCol;
            var ch = bitmap.height / TBSE._maxRow;
            var cy = Math.floor(animCell / TBSE._maxRow) * ch
            var cx = (animCell % TBSE._maxCol) * cw
            this._mainSprite.setFrame(cx, cy, cw, ch);
        }
    };
    //#endregion
    //============================================================================================= 

    //============================================================================================= 
    //#region Sprite_Enemy
    //---------------------------------------------------------------------------------------------
    TBSE.spriteEnemy = {}
    se = Sprite_Enemy.prototype

    TBSE.spriteEnemy.setBattler = se.setBattler
    se.setBattler = function(battler) {
        TBSE.spriteEnemy.setBattler.call(this, battler);
        if (battler !== undefined){
            TBSE._enemySprites[battler.index()] = this;
        }
    };
    //#endregion
    //============================================================================================= 

    //============================================================================================= 
    //#region Spriteset_Battle
    //---------------------------------------------------------------------------------------------
    TBSE.sprset = {}
    sset = Spriteset_Battle.prototype

    TBSE.sprset.isBusy = sset.isBusy
    sset.isBusy = function() {
        return TBSE.sprset.isBusy.call(this) || TBSE.isSequenceBusy();
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
    TBSE.wblog = {}
    wb = Window_BattleLog.prototype;

    // Refactor start action with my own
    wb.startAction = function(subject, action, targets) {
        const item = action.item();
        this.displayAction(subject, item);
        this.push("tbse_actionMain", subject, targets, item);
        this.push("tbse_actionPost", subject, item);
        // this.push("tbse_actionEnd", subject, item);
    }

    wb.tbse_actionMain = function(subject, targets, item){
        // Apply target substitute here (later)
        if(targets.length == 1){
            // Substitute only possible if not AoE attack
            let t = targets[0]
        }
        // Copy array
        TBSE._affectedBattlers = targets.concat();
        // Probably roll the magic reflect here
        subject.actionPrepare(targets, item)
        subject.sequencer().performActionSequence();
        this.setWaitMode("Sequence");
    }

    wb.tbse_actionPost = function(subject, item){
        // TBSE._affectedBattlers.forEach(t => {
        //     let counter = subject.sequencer()._action.evaluateCounter(t);
        //     if (counter){
        //         this.push("tbse_actionCounter", counter)
        //     }    
        // })
        this.push("waitFor", 30);
        this.push("tbse_actionEnd", subject, item);
        //this.setWaitMode("Sequence");
    }

    wb.tbse_actionCounter = function(counter){
        this.setWaitMode("Sequence");
    }

    wb.tbse_actionEnd = function(subject, item){
        subject.clearActionSequence()
        for(var target of TBSE._affectedBattlers){
            target.startIdleMotion();
            target.returnHome();
            target.checkCollapse();
        }
        TBSE._affectedBattlers = [];
        BattleManager.endAction();
    }

    wb.waitFor = function(frame) {
        this._waitCount = frame;
    };

    TBSE.wblog.updateWait = wb.updateWaitMode
    wb.updateWaitMode = function(){
        if (this._waitMode === "Sequence"){
            return TBSE.isSequenceBusy();
        }
        return TBSE.wblog.updateWait.call(this);
    }
    //#endregion
    //=============================================================================================

    //============================================================================================= 
    // Scene Update
    //---------------------------------------------------------------------------------------------
    TBSE.scene_battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        TBSE.scene_battle_update.call(this);
        $gameParty.updateSequencer();
        $gameTroop.updateSequencer();
    };

    Game_Unit.prototype.updateSequencer = function(){
        this.members().forEach(m => m.updateSequencer());
    }
}

// Initialize
TBSE.init()
// TBSE.init = undefined
