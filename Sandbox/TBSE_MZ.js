/*
To do list
- Projectile
- Zoom
- Summon?
*/

/*:
@target MZ
@plugindesc v0.1.0 - Theo's Battle Sequence Engine MZ.
@help
TBSE is spritesheet-based animation sequence plugin aiming for a free-frame 
pick spritesheet animation sequencer. You are encouraged to use any kind 
of spritesheet you want instead of using the default MZ battle spritesheet 
format.

The animation sequencer forces you to define your own animation motion
instead of being spoiled by an auto-play motion. You also need to customize
the delay of each frame and all the timing on your own.

@author TheoAllen

//========================================================================
// * Command - Set Pose
// - Unit Tested, worked
//========================================================================

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

@arg suffix
@text Suffix
@type combo
@option _2
@option _3
@option _4
@option _5
@desc Change the used spritesheet used by adding suffix. For example, Actor1_1_2 << added "_2"

//========================================================================
// * Command - Set Pose (Batch)
// - Draft
//========================================================================

@command batchpose
@text Pose (Batch)
@desc Set the battler pose using batches. To reduce the usage of event slot

@arg list
@text Pose List
@type struct<poselist>[]
@desc List of pose here

@arg note
@text Note
@desc This does not do anything. Just a note little box to put a note on
@type note

//========================================================================
// * Command - Set Pose (Cell Select)
// - Work in Progress
//========================================================================

@command cellpose
@text Pose (Cell select)
@desc Set the battler pose using cell position

@arg x
@text x
@type number
@min = 0
@default 0

@arg y
@text y
@type number
@min 0
@default 0

@arg wait
@text Wait
@type number
@default 5
@min 1
@desc How long (in frames) you want the battler to stay in that pose.

//========================================================================
// * Command - Move to position
// - Implemented, not yet tested
//========================================================================

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

//========================================================================
// * Command - Anchor Home
// - Changed, not yet implemented
//========================================================================

@command anchorHome
@text Anchor Position
@desc Anchor position as the new home position relative to ...

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

@arg pivot
@text Relative to
@type select
@option Current Position
@option Targets
@option Screen
@default Current Position
@desc Position relative to ...

//========================================================================
// * Command - Action Effect
// - Implemented, not yet tested
//========================================================================

@command actionEffect
@text Action Effect
@desc Invoke item/skill effect to the target battler

//========================================================================
// * Command - Play Animation
// - Changed, not yet implemented
// Probably needs one animation flag, idk
//========================================================================

@command anim
@text Play Animation
@desc Show animation on the battlers

@arg id
@text Animation ID
@type animation
@desc Select the animation file (Selecting 0 will use the skill animation)
@default 0

@arg target
@text To
@type select
@option Self
@option Targets
@default Target

@arg wait
@text Wait?
@type boolean
@on Yes
@off No
@default false
@desc Wait for animation?

//========================================================================
// * Command - Alter Effect
// - Not yet implemented
//========================================================================

@command changeAction
@text Alter Effect
@desc Modify item/skill effect carried by the subject battler. This will not invoke the effect to the target

@arg skill
@text Skill ID
@desc Change skill ID. Using -1 will not change the skill. Use text input to put -1 as the parameter.
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
@desc Change the skill formula manually

//========================================================================
// * Command - Change Target
// - Implemented, bug exists on POV
//========================================================================

@command changeTarget
@text Change Target
@desc Change the target scope. Condition parameter requires a valid JS syntax.

@arg pov
@type select
@default First Person
@text Point of View
@option First Person
@option Third Person
@desc First Person = If you select allies while the sequence is used by the enemy, it will select the troop member.

@arg opt
@type select
@default Revert
@text Scope
@option Revert
@option All
@option All (Except user)
@option All Opponents
@option All Allies
@option Other Opponents
@option Other Allies
@option Random Opponent
@option Random Ally
@option Next Opponent
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

//========================================================================
// * Command - Change Target
// - Not yet tested
//========================================================================

@command state
@text Change State
@desc Change the target state

@arg to
@text To
@type select
@option Targets
@option Self
@default Targets
@desc Target scope

@arg state
@text State ID
@type state
@default 1
@desc Select state iD

@arg operand
@type select
@option Add
@option Remove
@default Add
@text Operand
@desc Add or Remove the state?

//========================================================================
// * Command - Force Action
// - Not yet implemented
//========================================================================

@command targetAction
@text Force Action
@desc Force the targets to do an action sequence by calling a common event

@arg action
@type common_event
@default 1
@text Action
@desc Select the common event for the target.

//========================================================================
// * Command - Visible toggle
// - Not yet tested
//========================================================================

@command visible
@text Visible
@desc Toggle the subject to be visible or not

@arg toggle
@type boolean
@text toggle
@on Visible
@off Invisible
@default true
@desc Set toggles here

//========================================================================
// * Command - Flip Toggle
// - Not yet tested
//========================================================================

@command flip
@text Flip
@desc Flip the subject battler

@arg toggle
@type boolean
@text toggle
@on Flips
@off Unflips
@default false
@desc Set toggles here

//========================================================================
// * Command - Check collapse, check if the target dies
// - Not yet tested
//========================================================================

@command checkCollapse
@text Check Collapse
@desc Perform collapse effect to the target if the target is defeated

//========================================================================
// * Command - Perform collapse effect regardless of the state
// - Not yet tested
//========================================================================

@command collapse
@text Perform Collapse
@desc Perform collapse effect on the subject

//========================================================================
// * Command - Force result
// - Not yet tested
//========================================================================

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

//========================================================================
// * Plugin Parameters below
//========================================================================

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
@parent General Options
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

@param PostAction
@parent Default Motion
@text Post Action
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

/*~struct~poselist:
@param frame
@text Frame
@type number
@default 0
@min 0
@desc Which frame you want to pick?

@param wait
@text Wait
@type number
@default 5
@min 1
@desc How long (in frames) you want the battler to stay in that pose.

@param suffix
@text Suffix
@type combo
@option _2
@option _3
@option _4
@option _5
@desc Change the used spritesheet used by adding suffix. For example, Actor1_1_2 << added "_2"
*/
const TBSE = {}
//-------------------------------------------------------------------------------------------------
// IIFE alternative
//-------------------------------------------------------------------------------------------------
TBSE.init = function(){
    this._pluginName = document.currentScript.src.match(/.+\/(.+)\.js/)[1]

    this._addons = []        // Store addons name
    this._actorSprites = {}  // Store actor sprite reference
    this._enemySprites = {}  // Store enemy sprite reference
    this._targets = []       // Store all affected battlers
    this._actorPos = []      // Store actor home position parameter

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
         post: Number(this._params.PostAction),
         dead: Number(this._params.Dead),
         victory: Number(this._params.Victory),
         escape: Number(this._params.Escape),
         skill: Number(this._params.Skill),
         item: Number(this._params.Item),

         // Non default parameter
         collapse: 0, 
         intro: 0,
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

            let valid = "";
            if ($dataCommonEvents[TBSE._sequenceList.idle].list.length === 1)
                valid += "Idle motion is not configured\n";
            if ($dataCommonEvents[TBSE._sequenceList.damaged].list.length === 1)
                valid += "Damaged motion is not configured\n";
            if($dataCommonEvents[TBSE._sequenceList.pinch].list.length === 1)
                valid += "Crisis motion is not configured\n";
            if($dataCommonEvents[TBSE._sequenceList.evade].list.length === 1)
                valid += "Evade motion is not configured\n";
            if ($dataCommonEvents[TBSE._sequenceList.post].list.length === 1)
                valid += "Post action is not configured\n";
            if($dataCommonEvents[TBSE._sequenceList.dead].list.length === 1)
                valid += "Dead motion is not configured\n";
            if($dataCommonEvents[TBSE._sequenceList.skill].list.length === 1)
                valid += "Default skill action is not configured\n";
            if($dataCommonEvents[TBSE._sequenceList.item].list.length === 1)
                valid += "Default item action is not configured\n";

            if (valid.length > 0){
                const err = new Error(valid)
                err.name = "TBSE - Default Motion Config Error"
                throw err
            }

            // Loading default motion
            [...$dataActors, ...$dataEnemies].forEach(db => {
                if(db){
                    db._sequenceList = Object.assign({},TBSE._sequenceList)
                    db.note.split(/[\r\n]+/).forEach(line => {
                        if(line.match(TBSE._regexTag)){
                            const name = String(RegExp.$1);
                            const seqName = Number(RegExp.$2);
                            if (isNaN(seqName)){
                                const commonEvent = $dataCommonEvents.filter(cmv => {return cmv.name === seqName})
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
                    db._motion = TBSE._sequenceList.skill
                    const effects = db.effects.filter(eff => { return eff.code === 44})
                    if(effects.length > 0){
                        db._motion = effects[0].dataId
                    }
                }
            });

            $dataItems.forEach(db => {
                if(db){
                    db._motion = TBSE._sequenceList.item
                    const effects = db.effects.filter(eff => { return eff.code === 44})
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
    if(!Array.prototype.uniq){
        Array.prototype.uniq = function() {
            const copy = this.concat();
            const len = copy.length
            for(var i=0; i<len; ++i) {
                for(var j=i+1; j<len; ++j) {
                    if(copy[i] === copy[j])
                        copy.splice(j--, 1);
                }
            }
            return copy;
        };
    }

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
    // If you want to make addon, make sure drop the function here (in TBSE.COMMANDS object)
    //
    // Example: TBSE.COMMANDS.cameraMove(args)
    //---------------------------------------------------------------------------------------------
    this.COMMANDS = {}
    const cmd = this.COMMANDS

    // Manual pose sequence
    cmd.pose = function(args){
        this.sequencer()._animCell = Number(args.frame);
        this.sequencer()._suffix = args.suffix
        args.interpreter.wait(args.wait);
    }

    // Batch poses (WIP)
    cmd.batchpose = function(args){
        this.sequencer()._batchposes = JSON.parse(args.list)
    }

    // Frame/Cell select pose (WIP)
    cmd.cellPose = function(args){
        cell = 0;
        this.sequencer()._animCell = cell;
        args.interpreter.wait(args.wait);
    }

    // Move command
    cmd.move = function(args){
        const spr = this.sprite();
        let targX = Number(args.x);
        let targY = Number(args.y);
        if (this.isEnemy() && TBSE._invertX){
            targX *= -1
        }
        switch(args.to){
            case "Target":
                const seq = this.sequencer()
                const targets = seq._targetArray.length > 0 ? seq._targetArray : TBSE._affectedBattlers
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
        const spr = this.sprite();
        this._homeX = spr.x + Number(args.x)
        this._homeY = spr.y + Number(args.y)
    }

    // Show animation
    cmd.anim = function(args){
        const isWaiting = args.wait === "true"
        const seq = this.sequencer()
        let animId = Number(args.id);
        if (animId === 0){
            animId = this.sequencer()._itemInUse.animationId;
            if(animId === -1){
                animId = (this.isActor() ? this.attackAnimationId1() : 0)
            }
        }
        switch(args.target){
            case "Self": 
                $gameTemp.requestAnimation([this], animId);
                break;
            case "Target":
                $gameTemp.requestAnimation(seq._targetArray, animId);
                break;
        }
        if(isWaiting){
            // Later
        }
    }

    // Apply action effect
    cmd.actionEffect = function(args){
        const seq = this.sequencer()
        for(const target of seq._targetArray){
            seq._action.apply(target);
            if (target.shouldPopupDamage()){
                target.startDamagePopup();
                if (target.sequencer().canPlayEvadeMotion()){
                    target.sequencer().motionEvade()
                }else if (target.sequencer().canPlayDamagedMotion()){
                    target.sequencer().motionDamaged()
                }
            }
        }
        if(this.shouldPopupDamage()){
            this.startDamagePopup();
        }
    }

    // Change used skill
    cmd.changeAction = function(args){
        id = Number(args.skill)
        if(id === -1){
            this.sequencer().restoreItem()
        } else if(id > 0){
            this.sequencer().setItemUse($dataSkills[id])
        }
    }

    // Force the result 
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
        const action = this.sequencer()._action
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

    // Change the current target into something else
    cmd.changeTarget = function(args){
        const seq = this.sequencer()
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
            case "All Opponents":
                newTargets = this.determineUnit(args.pov, true).members();
                break;
            case "All Allies":
                newTargets = this.determineUnit(args.pov, false).members();
                break;
            case "Other Opponents":
                newTargets = this.determineUnit(args.pov, true).members().filter(t => { return !seq._targetArray.includes(t)});
                break;
            case "Other Allies":
                newTargets = this.determineUnit(args.pov, false).members().filter(t => { return !seq._targetArray.includes(t)});
                break;
            case "Random Opponent":
                newTargets = [this.determineUnit(args.pov, true).randomTarget()];
                break;
            case "Random Ally":
                newTargets = [TBSE.sample(this.determineUnit(args.pov, false).members())] 
                break;
            case "Next Opponent":
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
        TBSE._affectedBattlers = TBSE._affectedBattlers.uniq()
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
            this._suffix = ""
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
            this._oriTargets = []           // Store the original targets
            this._targetArray = []          // Store the current targets
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
                this._interpreter.setup(actionId, "action", this.postAction, this)
                this.clearActionData()
            } 
        }
        // ↓
        // ↓ -- Perform post action (ending sequence, for example, returning to the original position)
        postAction(){
            const endFunc = function() { this.startIdleMotion() };
            const actionId = this.dataBattler()._sequenceList.post
            this._interpreter.setup(actionId, "action", endFunc, this)
        }
        // ↓
        // ↓ -- Back to idle
        startIdleMotion(){
            this._interpreter.setup(this.idleMotion(), "idle", function() { this._index = 0} );
        }
        
        // Will be change later
        // Idle motion priority
        // Dead motion -- Casting -- State affected -- Pinch -- Equipment(?) -- Class based -- Actor idle
        idleMotion(){
            return this.dataBattler()._sequenceList.idle;
        }

        clearActionData(){
            this._action.resetForcedResult()
            this._actionRecord.clearRecord()
        }

        // Will be changed later
        canPlayEvadeMotion(){
            return this.battler()._result.evaded;
        }

        motionEvade(){
            const endFunc = function() { this.startIdleMotion() };
            const actionId = this.dataBattler()._sequenceList.evade
            this._interpreter.setup(actionId, "action", endFunc, this)
        }

        // Will be changed later
        canPlayDamagedMotion(){
            return this.battler()._result.hpDamage > 0 || this.battler()._result.mpDamage !== 0;
        }

        motionDamaged(){
            const endFunc = function() { this.startIdleMotion() };
            const actionId = this.dataBattler()._sequenceList.damaged
            this._interpreter.setup(actionId, "action", endFunc, this)
        }

        // Currently unimplemented, trying to seek for the best way to implement intro sequence
        motionIntro(){
            const endFunc = function() { this.startIdleMotion() };
            const actionId = this.dataBattler()._sequenceList.intro
            this._interpreter.setup(actionId, "action", endFunc, this)
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
            if (this._isActor){
                return this.battler().actor();
            }else{
                return this.battler().enemy();
            }
        }
    }
    //#endregion
    //=============================================================================================

    //=============================================================================================
    //#region TBSE.Sequence_Interpreter < Game_Interpreter
    //---------------------------------------------------------------------------------------------
    TBSE.Sequence_Interpreter = class extends Game_Interpreter{
        constructor(battler, depth){
            super(depth)
            this._isActor = battler.isActor()
            this._battlerID = this._isActor ? battler.actorId() : battler.index();    
        }

        setupChild(){
            const eventId = arguments[1]
            this._childInterpreter = new TBSE.Sequence_Interpreter(this.battler(), this._depth + 1);
            this._childInterpreter.setup(eventId, this._phaseName);
        }

        setup(eventId, phaseName, endFunc = null, binding = this){
            const commonEvent = $dataCommonEvents[eventId];
            Game_Interpreter.prototype.setup.call(this, commonEvent.list, eventId);
            this._endFunc = endFunc
            if (endFunc !== null){
                this._endFunc = endFunc.bind(binding);
            }
            this._phaseName = phaseName;
        }

        battler(){
            if(this._isActor){
                return $gameActors.actor(this._battlerID)
            }else{
                return $gameTroop.members()[this._battlerID]
            }
        }

        dataBattler(){
            if (this._isActor){
                return this.battler().actor();
            }else{
                return this.battler().enemy();
            }
        }

        terminate(){
            if(this._endFunc === null){
                Game_Interpreter.prototype.terminate.call(this);
            }else{
                //this._endFunc.call(this);
                this._endFunc();
            }
        }

        ending(){
            return this._list === null;
        }

        // Overwriten plugin command call
        command357(params){
            const TBSECommand = params[0] == TBSE._pluginName || TBSE._addons.some(a => a === params[0])
            if (TBSECommand){
                const commandName = params[1]
                if (TBSE.COMMANDS[commandName] !== undefined){
                    const args = params[3];
                    args.interpreter = this;
                    TBSE.COMMANDS[commandName].call(this.battler(),(params[3]));
                    return true
                }
            }
            const args = params[3];
            args.battler = this.battler();
            return Game_Interpreter.prototype.command357.call(this, params);
        }
    }
    //#endregion
    //=============================================================================================

    //=============================================================================================
    //#region TBSE.Action < Game_Action overrides
    // I'm doing this really just because I only need the apply function, and not the rest.
    //---------------------------------------------------------------------------------------------
    // Handles action effect application
    TBSE.Action = class extends Game_Action{
        constructor(battler){
            super(battler, false)
            this.resetForcedResult()
        }

        resetForcedResult(){
            this._forceResult = {           
                hit: 0,
                evade: 0,
                critical: 0
            }
        }

        item(){
            return this.subject().sequencer()._itemInUse
        }

        isSkill(){
            if(!this.item()){
                return false
            }
            return this.item()._dataClass === "skill"
        }

        isItem(){
            if(!this.item()){
                return false
            }
            return this.item()._dataClass === "item"
        }

        // Force hit, ignore evasion
        itemHit(target){
            const rsult = this._forceResult.hit
            if(rsult !== 0){
                return rsult;
            }
            return Game_Action.prototype.itemHit.call(this, target)
        }

        // Force evasion, does not ignore force hit
        itemEva(target){
            const rsult = this._forceResult.evade
            if(this._forceResult.hit !== 0){
                return 0;
            }else if (this._forceResult.evade !== 0){
                return rsult;
            }
            return Game_Action.prototype.itemEva.call(this, target)
        }

        
        itemCri(target){
            const rsult = this._forceResult.critical
            if(rsult !== 0){
                return rsult;
            }
            return Game_Action.prototype.itemCri.call(this, target)
        }

        aliasEva(){
            return Game_Action.prototype.itemEva.call(this, target)
        }

        aliasCri(){
            return Game_Action.prototype.itemCri.call(this, target)
        }
    }
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
            return Object.assign(this, actionResult)
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
    const bb = Game_Battler.prototype;

    TBSE.battler.onBattleStart = bb.onBattleStart
    bb.onBattleStart = function(){
        TBSE.battler.onBattleStart.call(this);
        this._sequencer = new TBSE.Sequencer(this)
    }

    // Sideview battler name suffix
    bb.svsuffix = function(){
        return this.sequencer()._suffix
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
        return seq._interpreter._phaseName == "action" && !seq._interpreter.ending()
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
    const ga = Game_Actor.prototype

    ga.initHomePos = function() {
        const pos = this.index()
        this._homeX = TBSE._actorPos[pos].x
        this._homeY = TBSE._actorPos[pos].y
    }

    ga.homePos = function() {
        return {
            x: this._homeX,
            y: this._homeY
        }
    }

    TBSE.actor.battleName = ga.battlerName
    ga.battlerName = function() {
        return TBSE.actor.battleName.call(this) + this.svsuffix();
    };

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
    const ge = Game_Enemy.prototype

    TBSE.enemy.setup = ge.setup
    ge.setup = function(enemyId, x, y) {
        TBSE.enemy.setup.call(this, enemyId, x, y);
        this.initHomePos();
    };

    ge.initHomePos = function() {
        this._homeX = this._screenX
        this._homeY = this._screenY
    }

    // TBSE.enemy.battleName = ge.battlerName
    // ge.battlerName = function() {
    //     return TBSE.enemy.battleName() + this.svsuffix();
    // };

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
    const gpt = Game_Party.prototype

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
    const sb = Sprite_Battler.prototype

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
        const time = this._maxDuration - this._tbseMoveDuration
        const gravity = this._jumpPower/(this._maxDuration/2);
        const height = (this._jumpPower * time) - (gravity * time * (time + 1) / 2);
        return Math.max(0, height);
    }
    //#endregion
    //============================================================================================= 

    //============================================================================================= 
    //#region Sprite_Actor
    //---------------------------------------------------------------------------------------------
    TBSE.spriteActor = {}
    const sa = Sprite_Actor.prototype

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
        const bitmap = this._mainSprite.bitmap;
        if (bitmap) {
            const animCell = this._battler.sequencer()._animCell;
            const cw = bitmap.width / TBSE._maxCol;
            const ch = bitmap.height / TBSE._maxRow;
            const cy = Math.floor(animCell / TBSE._maxCol) * ch
            const cx = (animCell % TBSE._maxCol) * cw
            this._mainSprite.setFrame(cx, cy, cw, ch);
        }
    };
    //#endregion
    //============================================================================================= 

    //============================================================================================= 
    //#region Sprite_Enemy
    //---------------------------------------------------------------------------------------------
    TBSE.spriteEnemy = {}
    const se = Sprite_Enemy.prototype

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
    const sset = Spriteset_Battle.prototype

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
    const wb = Window_BattleLog.prototype;

    // Refactor start action with my own
    wb.startAction = function(subject, action, targets) {
        const item = action.item();
        this.displayAction(subject, item);
        this.push("tbse_actionMain", subject, targets, item);
        this.push("tbse_actionPost", subject, item);
    }

    wb.tbse_actionMain = function(subject, targets, item){
        // WIP, Apply target substitute here (later)
        if(targets.length == 1){
            // Substitute only possible if not AoE attack
            let t = targets[0]
        }
        // Copy array
        TBSE._affectedBattlers = targets.concat();
        // Probably roll the magic reflect here
        subject.sequencer().actionPrepare(targets, item)
        subject.sequencer().performActionSequence();
        this.setWaitMode("Sequence");
    }

    wb.tbse_actionPost = function(subject, item){
        // Roll attack counter here later
        //this.setWaitMode("Sequence");
        //this.push("waitFor", 30);
        this.push("tbse_actionEnd", subject, item);
    }

    // WIP
    wb.tbse_actionCounter = function(counter){
        this.setWaitMode("Sequence");
    }

    wb.tbse_actionEnd = function(subject, item){
        for(var target of TBSE._affectedBattlers){
            //target.sequencer().startIdleMotion();
            target.returnHome();
            target.checkCollapse();
        }
        TBSE._affectedBattlers = [];
        BattleManager.endAction();
        this._waitMode = "";
        this._waitCount = 5;
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
        for(const member of this.members()){
            member.updateSequencer()
        }
    }
}

// Initialize
TBSE.init()
