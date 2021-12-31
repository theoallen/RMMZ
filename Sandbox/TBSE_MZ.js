/*:
@target MZ
@plugindesc v0.1.xx - Theo's Battle Sequence Engine MZ.
@help
TBSE is spritesheet-based animation sequence plugin aiming for a free-frame 
pick spritesheet animation sequencer. You are encouraged to use any kind 
of spritesheet you want instead of using the default MZ battle spritesheet 
format.

The animation sequencer forces you to define your own animation motion
instead of being spoiled by an auto-play motion. You also need to customize
the delay of each frame and all the timing on your own.

@author TheoAllen

@command divstart
@text <empty command>
@desc Please select command you want to use

@command div0
@text ---------< Sprite Animation >------------
@desc Please select command you want to use

//========================================================================
// * Command - Set Pose
//========================================================================

@command pose
@text Pose
@desc More info: https://github.com/theoallen/RMMZ/wiki/TBSE-Getting-Started#32-creating-idle-motion

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
// * Command - Move to position (Subject)
//========================================================================

@command move
@text Move (Subject/Caster)
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
@type text
@default 0
@desc Relative X-Axis coordinate. JS syntax is ok

@arg y
@text Y-Axis
@type text
@default 0
@desc Relative Y-Axis coordinate. JS syntax is ok

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
// * Command - Move to position (Target)
//========================================================================

@command moveTarget
@text Move (Target)
@desc Move the target battler

@arg to
@type select
@option Subject
@option Slide
@option Coordinate
@option Home
@text To
@default Subject
@desc Where do you want to go?

@arg scope
@type select
@option Individual
@option Center Mass
@text Scope
@default Individual
@desc Pick whether to move individual or center mass to the target location.

@arg x
@text X-Axis
@type text
@default 0
@desc Relative X-Axis coordinate. JS syntax is ok

@arg y
@text Y-Axis
@type text
@default 0
@desc Relative Y-Axis coordinate. JS syntax is ok

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
//========================================================================

@command anchorHome
@text Anchor Position
@desc Anchor position as the new home position relative to ...

@arg x
@text X-Axis
@type text
@default 0
@desc Relative X-Axis coordinate. JS syntax is ok

@arg y
@text Y-Axis
@type text
@default 0
@desc Relative Y-Axis coordinate. JS syntax is ok

@arg pivot
@text Relative to
@type select
@option Current Position
@option Targets
@option Screen
@default Current Position
@desc Position relative to ...

//========================================================================
// * Command - Force Action
//========================================================================

@command targetAction
@text Force Action
@desc Force the targets to do an action sequence by calling a common event. 

@arg action
@type common_event
@default 1
@text Action
@desc Select the common event for the target.

@command div1
@text ---------< Game Mechanics >-------------
@desc

//========================================================================
// * Command - Action Effect
//========================================================================

@command actionEffect
@text Action Effect
@desc Invoke item/skill effect to the target battler

//========================================================================
// * Command - Projectile
//========================================================================

@command projectile
@text Throw Projectile
@desc Throw a projectile to the targets. Action effect is applied as soon as it hits the target or as configured

@arg img
@text Projectile Image
@type struct<prjimg>
@desc Display of the projectile. (Icon, animation, custom image)
@default {"icon":"0","file":"","animation":"0","spin":"0"}

@arg duration
@type number
@text Duration
@default 10
@desc Travel duration

@arg jump
@type number
@text Jump / Arch power
@default 0
@desc Jump / Arch power

@arg type
@type select
@text Movement Type
@option Normal
@option Boomerang
@default Normal
@desc Select movement type. Boomerang means returning to the target afterward with negative arch value

@arg prjadv
@text ---------------
@type text
@default ---------------

@arg delay
@type number
@text Launch Delay
@default 0
@desc Wait time before launching the projectile

@arg effect
@type select
@text Invoke effect at
@option Reaching the target
@option The beginning
@option Do not invoke the effect
@default Reaching the target
@desc Invoke effect method you can select.

@arg startpoint
@text Start Point
@type struct<projectilepoints>
@desc Starting point of the projectile
@default {"X":"0","Y":"0","relativeto":"Self"}

@arg endpoint
@text End Point
@type struct<projectilepoints>
@desc End point of the projectile
@default {"X":"0","Y":"0","relativeto":"Each Target"}

@arg aftimg
@type struct<aftimg>
@text Afterimage Effect
@default {"Rate":"0","opacityEase":"20"}
@desc Afterimage effect for the projectile

@arg animsetup
@type struct<animationsetup>
@text Animation Setup
@default {"start":"0","ending":"-1","trail":"0"}
@desc Setup the start/ending animation and trailing animation

@arg movefunc
@type struct<movefunction>
@text Movement Function
@default {"moveX":"Linear","moveY":"Linear"}
@desc Movement function

//========================================================================
// * Command - Force result
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
// * Command - Alter Effect (May be changed for more versatility)
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
//========================================================================

@command changeTarget
@text Change Target
@desc Change the target scope. Filter field requires a valid JS syntax.

@arg pov
@type select
@default First Person
@text Point of View
@option First Person
@option Third Person
@desc First Person = If you select allies while the sequence is used by the enemy, it will select the troop member.

@arg opt
@type select
@default Original Targets
@text Target Scope
@option Original Targets
@option All
@option All (Except user)
@option All Opponents
@option All Allies
@option Other Opponents
@option Other Allies
@option Random Opponent
@option Random Ally
@option Random Any
@option Next Opponent
@option Next Ally
@option Next Random
@option Self
@option Unchanged
@desc Switch the target.

@arg aliveState
@text Alive State?
@type select
@option Alive Only
@option Dead Only
@option Both
@default Alive Only
@desc Determine if the scope also include dead battler.

@arg filter
@type note
@text Filter
@desc Filters the target scope. Use 'target' to refers to the target candidate to filter. Must return true/false. Not required to fill

//========================================================================
// * Command - Change state
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

@command div2
@text ---------< Visuals Effects >-----------
@desc

//========================================================================
// * Command - Play Animation
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
@text On
@type select
@option Self
@option Each Target
@option Center of all targets
@default Each Target
@desc Where to play the animation (Effekseer display type might override this)

@arg repos
@text Reposition
@type select
@option Fixed
@option Follow Sprite
@default Fixed
@desc Determine if the animation should follow the battler or fixed in place

@arg layer
@text Layer
@type select
@option Back
@option Front
@default Front
@desc Play the animation on the back/front of the sprite

@arg mirror
@type boolean
@text Mirror
@on true
@off false
@default false
@desc Set animation mirror here

//========================================================================
// * Command - Visible toggle
//========================================================================

@command visible
@text Visible
@desc Toggle the subject to be visible or not

@arg toggle
@type boolean
@text Set State
@on Visible
@off Invisible
@default true
@desc Set toggles here

//========================================================================
// * Command - Flip Toggle
//========================================================================

@command flip
@text Flip
@desc Flip the subject battler

@arg toggle
@type select
@text Set State
@option Flips
@option Unflips
@option Toggle
@option Reset
@default Toggle
@desc Set toggles here

//========================================================================
// * Command - Afterimage ON
//========================================================================

@command aftOn
@text Afterimage ON
@desc Toggle afterimage effect ON

@arg rate
@text Rate
@type number
@default 1
@desc Smaller number = more often the afterimage effect is displayed

@arg opacityEase
@text Ease
@type number
@default 20
@desc Bigger number = faster fading 

//========================================================================
// * Command - Afterimage OFF
//========================================================================

@command aftOff
@text Afterimage OFF
@desc Toggle afterimage effect OFF

//========================================================================
// * Command - Focus Effect ON
//========================================================================

@command focusOn
@text Focus Effect ON
@desc Enable focus effect. Hide all unaffected battlers.

@arg dim
@type number
@text Dimness
@min 0
@max 255
@default 128
@desc Set the dimness from 0 to 255

@arg duration
@type number
@text Fading out duration
@min 1
@default 35
@desc Duration to full dim

//========================================================================
// * Command - Focus Effect OFF
//========================================================================

@command focusOff
@text Focus Effect OFF
@desc Reset the focus effect to normal

@arg duration
@type number
@text Fading in duration
@min 1
@default 35
@desc Duration to full dim

//========================================================================
// * Command - Check collapse, check if the target dies
//========================================================================

@command checkCollapse
@text Check Collapse
@desc Perform collapse effect to the targets if the target is defeated

//========================================================================
// * Command - Perform collapse effect regardless of the state
// To be used in custom collapse motion.
//========================================================================

@command collapse
@text Perform Collapse
@desc Perform collapse effect on the subject. Used for collapse motion

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
@text Invert X
@desc Invert X axis for enemies (so that you could use the same sequence for enemies).

@param AutoMirror
@parent General Options
@type select
@default Disable
@option Disable
@option Mirror for Actors
@option Mirror for Enemies
@text Auto-mirror animation
@desc Turn ON/OFF automatic animation mirror

@param div2
@text ---------------------------
@param Default Motion
@param Idle
@parent Default Motion
@text Idle Motion
@type common_event
@default 1
@desc A motion that is played continuously when idle

@param Damaged
@parent Default Motion
@text Damaged Motion
@type common_event
@default 2
@desc A motion that is played once when gets damaged

@param Crisis
@parent Default Motion
@text In Crisis Motion
@type common_event
@default 3
@desc A motion that overrides idle motion when HP is low

@param Evade
@parent Default Motion
@text Evade Motion
@type common_event
@default 4
@desc A motion that is automatically played on evade

@param PostAction
@parent Default Motion
@text Post Action
@type common_event
@default 5
@desc A motion that is automatically played after doing an action

@param Dead
@parent Default Motion
@text Dead Motion
@type common_event
@default 6
@desc A motion that override when the character is dead

@param Victory
@parent Default Motion
@text Victory pose
@type common_event
@default 0
@desc A motion that is played on victory

@param Escape
@parent Default Motion
@text Escape (Success)
@type common_event
@default 0
@desc A motion that is played when successfully escape

@param EscapeFail
@parent Default Motion
@text Escape (Fail)
@type common_event
@default 0
@desc A motion that is played when failed to escape

@param Skill
@parent Default Motion
@text Default Skill motion
@type common_event
@default 10
@desc A default motion that is played when using skill

@param Item
@parent Default Motion
@text Default Item motion
@type common_event
@default 11
@desc A default motion that is played when using item
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

/*~struct~projectilepoints:
@param X
@text X-Axis
@type text
@text X
@desc X-axis. You can use a JS code here
@default 0

@param Y
@text Y-Axis
@type text
@text Y
@desc Y-axis. You can use a JS code here
@default 0

@param relativeto
@type select
@text Relative to
@option Each Target
@option Center of all targets
@option Self
@default Each target
*/

/*~struct~prjimg:
@param icon
@text Icon Index
@type number
@min 0
@default 0
@desc Use text input --> right click --> Insert icon index

@param file
@type file
@text Image File
@dir img/system/
@desc Load from file

@param animation
@type animation
@text Animation
@default 0
@desc Animation effect that is played in loop

@param spin
@type number
@text Spin speed
@default 0
@desc Spinning speed of the projectile
*/

/*~struct~aftimg:
@param Rate
@type number
@text Rate
@default 0
@desc Smaller number = more often the afterimage effect is displayed. Set this to 0 to disable

@param opacityEase
@text Ease
@type number
@default 20
@desc Bigger number = faster fading 
*/

/*~struct~movefunction:
@param moveX
@type select
@text X Function
@option Linear
@option Smoooth

@param moveY
@type select
@text Y Function
@option Linear
@option Smoooth
*/

/*~struct~animationsetup:
@param start
@type animation
@text Start Animation
@default 0
@desc Animation during the creation of the projectile

@param ending
@type animation
@text Ending Animation
@default -1
@desc Animation after the projectile reaches the target(s). Use -1 to use default skill/item animation

@param trail
@type animation
@text Trail
@default 0
@desc Trailing animation that the projectile left on its path
*/

const TBSE = {}
TBSE.init = function() {
    this._pluginName = document.currentScript.src.match(/.+\/(.+)\.js/)[1]
    this._version = '0.1.211231'  // <Major>.<Minor>.<YYMMDD>

    this._addons = []           // Store addons name
    this._battlerSprites = {}   // Store battler sprites
    this._affectedBattlers = [] // Store all affected battlers
    this._sequencer = {}        // Store sequencer
    this._actorPos = []         // Store actor initial home position

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
     this._autoMirror = this._params.AutoMirror

     // Sequence default template
     this._sequenceList = {
         idle: Number(this._params.Idle),
         damaged: Number(this._params.Damaged),
         crisis: Number(this._params.Crisis),
         evade: Number(this._params.Evade),
         post: Number(this._params.PostAction),
         dead: Number(this._params.Dead),
         victory: Number(this._params.Victory),
         escape: Number(this._params.Escape),
         escapefail: Number(this._params.EscapeFail),
         skill: Number(this._params.Skill),
         item: Number(this._params.Item),

         // Non default parameter
         collapse: 0, 
         intro: 0,  // Not-yet implemented
     }
    //#endregion
    //============================================================================================

    //============================================================================================
    //#region Notetag loading
    //--------------------------------------------------------------------------------------------
    this._tagMotion     = /<tbse[\s_]+motion\s*:\s*(.+)\s*>/i   // Specify motion to use for skills and states
    this._regexTag      = /<tbse[\s_]+(.+)\s*:\s*(.+)\s*>/i     // To customzize each motion for actors and enemies
    this._tagAnim       = /<animated\s*:\s*(.+)\s*>/i           // Animated flag for enemies
    this._tagFlip       = /<flip>/i                             // Default flip
    this._tagCounter    = /<counter skill\s*:\s*(.+)\s*>/i      // Counter Skill
    this._tagStateAnim  = /<animation\s*:\s*(\d+)\s*>/i         // Animation ID for state
    
    this.dbLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function(){
        if (!TBSE.dbLoaded.call(this)) {return false};
        if (!TBSE._isLoaded) {

            const motionList = [
                [TBSE._sequenceList.idle, "Idle motion"],
                [TBSE._sequenceList.damaged, "Damaged motion"],
                [TBSE._sequenceList.crisis, "Crisis motion"],
                [TBSE._sequenceList.evade, "Evade motion"],
                [TBSE._sequenceList.post, "Post action"],
                [TBSE._sequenceList.dead, "Dead action"],
                [TBSE._sequenceList.skill, "Default skill action"],
                [TBSE._sequenceList.item, "Default item action"],
            ]

            const invalid = motionList.reduce((r, m) => { return r + TBSE.isSequenceValid(...m)}, "")
            if (invalid.length > 0){
                const err = new Error(invalid)
                err.name = "TBSE - Default Motion Config Error"
                throw err
            }

            // Loading default motion
            for(const db of [...$dataActors, ...$dataEnemies].filter(database => database !== null)){
                db._sequenceList = Object.assign({},TBSE._sequenceList)
                for(const line of db.note.split(/[\r\n]+/)){
                    const match = line.match(TBSE._regexTag)
                    if(match){
                        const name = String(match[1]).toLowerCase();
                        const seqId = Number(match[2]);
                        if (isNaN(seqId)){
                            const seqNameStr = String(match[2]).toLowerCase().trim()
                            const commonEvent = $dataCommonEvents.find(cmv => {return cmv && cmv.name.toLowerCase().trim() === seqNameStr})
                            if(commonEvent){
                                db._sequenceList[name] = commonEvent.id;
                            }else{
                                console.log("WARNING: Common Event name " + seqNameStr + " is not found")
                            }
                        }else{
                            db._sequenceList[name] = seqId;
                        }
                    }else {
                        const match = line.match(TBSE._tagAnim)
                        if(match){
                            db._isAnimated = true; // This is only for Enemies
                            db._sprName = String(match[1])
                        }
                    }
                }
            }

            loadSkillItem = function(db){
                let regex = false
                // Load by tag (in case if you want to reorganize the common event DB structure)
                for(const line of db.note.split(/[\r\n]+/)){
                    const match = line.match(TBSE._tagMotion)
                    if(match){
                        regex = true
                        const seqId = Number(match[1]);
                        if (isNaN(seqId)){
                            const seqNameStr = String(match[1]).toLowerCase().trim()
                            const commonEvent = $dataCommonEvents.find(cmv => {return cmv && cmv.name.toLowerCase().trim() === seqNameStr})
                            if(commonEvent){
                                db._motion = commonEvent.id;
                            }else{
                                console.log("WARNING: Common Event name " + seqNameStr + " is not found for skill ID: " + db.id)
                            }
                        }else{
                            db._motion = seqId
                        }
                    }
                }
                if(regex)
                    return

                // Or if you prefer to use common event to pick
                const effects = db.effects.filter(eff => { return eff.code === 44})
                if(effects.length > 0){
                    db._motion = effects[0].dataId
                }
            }

            // Load motion setting for skills
            for(const db of $dataSkills.filter(database => database !== null)){
                db._motion = TBSE._sequenceList.skill
                loadSkillItem(db)
            }

            // Load motion setting for items
            for(const db of $dataItems.filter(database => database !== null)){
                db._motion = TBSE._sequenceList.item
                loadSkillItem(db)
            }

            for(const db of $dataStates.filter(database => database !== null)){
                db._motion = 0
                // Load by tag (in case if you want to reorganize the common event DB structure)
                for(const line of db.note.split(/[\r\n]+/)){
                    const match = line.match(TBSE._tagMotion)
                    if(match){
                        regex = true
                        const seqId = Number(match[1]);
                        if (isNaN(seqId)){
                            const seqNameStr = String(match[1]).toLowerCase().trim()
                            const commonEvent = $dataCommonEvents.find(cmv => {return cmv && cmv.name.toLowerCase().trim() === seqNameStr})
                            if(commonEvent){
                                db._motion = commonEvent.id;
                            }
                        }else{
                            db._motion = seqId
                        }
                    }
                }
            }
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
        return TBSE.allBattlers().some(battler => battler.isDoingAction())
    }

    // Function to get all battlers for convenience
    this.allBattlers = () => { 
        return [...$gameParty.allMembers(),...$gameTroop.members()] 
    }

    // Linear movement function
    this.linearFunc = (ori, target, time, maxTime) => {
        return ori + ((target - ori) * time/maxTime);
    }

    // Smooth movement function
    this.smoothFunc = function(ori, target, time, maxtime) {
        const t = time / maxtime
        const progress = Math.sin((t * Math.PI) / 2)
        return ori + ((target - ori) * progress);
    }

    // Return a random element from an array
    this.sample = function(array){
        return array[Math.floor(Math.random() * array.length)]
    }

    // Clears sprite reference
    this.clearSpriteReference = function(){
        TBSE._battlerSprites
    }

    // Get common event based on the name
    this.getAction = function(actionName){
        const cmev = $dataCommonEvents.find(cmv => {return cmv && cmv.name.toLowerCase().trim() === actionName.toLowerCase().trim()})
        return cmev ? cmev.id : 0
    }

    // Conditional eval for number
    this.evalNumber = function(num){
        return isNaN(num) ? eval(num) : Number(num)
    }

    // Check flip
    this.defaultFlip = function(db){
        return db._defaultFlip ||= db.note.match(TBSE._tagFlip)
    }

    // Idiot proof
    this.isSequenceValid = function(id, motionName){
        // Check if the common event exist
        if (id === 0 || $dataCommonEvents[id] === undefined){
            return `[${motionName}] There is no common event at ID = ${id}.\n`
        }
        // Check if there is a list
        if($dataCommonEvents[id].list.length === 1){
            return `[${motionName}] is not configured.\n`
        }
        const valid = $dataCommonEvents[id].list.find(TBSE.validCommandList)
        if(!valid){ // Check if the list is valid
            return `[${motionName}] is not configured correctly. Put at least one wait command or pose command.\n`
        }
        return ""
    }

    // For ever-growing valid list (in case of addon)
    this.validCommandList = function(li) {
        return li.code === 230 || (li.code === 357 && li.parameters[0] === TBSE._pluginName && li.parameters[1] === "pose")
    }

    // Gets overlay looped state animation id
    this.stateAnim = function(db){
        if(db._stateAnim === undefined){
            db._stateAnim = 0
            const match = db.note.match(TBSE._tagStateAnim)
            if(match){
                db._stateAnim = Number(match[1])
            }
        }
        return db._stateAnim
    }

    // Because === doesn't work. Like, javascript seriously?
    this.arrayEqual = function(a1, a2){
        if(a1.length !== a2.length){
            return false
        }
        let i = a1.length
        while (i--) {
            if (a1[i] !== a2[i]) return false;
        }
        return true;
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

    // Move command
    cmd.move = function(args){
        args.moveFuncX ||= "linearFunc"
        args.moveFuncY ||= "linearFunc"
        const spr = this.sprite();
        let targX = TBSE.evalNumber.call(this, args.x)
        let targY = TBSE.evalNumber.call(this, args.y)
        if (this.isEnemy() && TBSE._invertX){
            targX *= -1
        }
        switch(args.to){
            case "Target":
                const seq = this.sequencer()
                const targets = seq._targetArray.length > 0 ? seq._targetArray : TBSE._affectedBattlers
                targX += targets.reduce((total, trg)=>{ return trg.sprite().x + total}, 0) / targets.length
                targY += targets.reduce((total, trg)=>{ return trg.sprite().y + total}, 0) / targets.length
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
        spr.goto(targX, targY, args.dur, args.jump, args.moveFuncX, args.moveFuncY)
    }

    // Move command (target)
    cmd.moveTarget = function(args){
        args.moveFuncX ||= "linearFunc"
        args.moveFuncY ||= "linearFunc"
        const seq = this.sequencer()
        
        // Individual
        if(args.scope == "Individual"){
            for(const t of seq._targetArray){
                const spr = t.sprite()
                let targX = TBSE.evalNumber.call(this, args.x)
                let targY = TBSE.evalNumber.call(this, args.y)
                switch(args.to){
                    case "Subject":
                        targX += this.sprite().x
                        targY += this.sprite().y
                        break;
                    case "Slide":
                        targX += spr.x;
                        targY += spr.y;
                        break;
                    case "Home":
                        targX += t.homePos().x;
                        targY += t.homePos().y;
                        break;
                }
                spr.goto(targX, targY, args.dur, args.jump, args.moveFuncX, args.moveFuncY)
            }

        // Center Mass
        }else{
            const allTarget = seq._targetArray
            const centerX = allTarget.reduce((total, t) => { return t.sprite().x + total }, 0) / allTarget.length
            const centerY = allTarget.reduce((total, t) => { return t.sprite().y + total }, 0) / allTarget.length

            let targX = TBSE.evalNumber.call(this, args.x)
            let targY = TBSE.evalNumber.call(this, args.y)

            switch(args.to){
                case "Subject":
                    targX += this.sprite().x
                    targY += this.sprite().y
                    break;
                case "Slide":
                    targX += centerX;
                    targY += centerY;
                    break;
            }

            spr.goto(targX, targY, args.dur, args.jump, args.moveFuncX, args.moveFuncY)
        }
    }

    // Set new home Position
    cmd.anchorHome = function(args){
        const spr = this.sprite();
        switch(args.pivot){
            case "Current Position":
                this._homeX = spr.x + TBSE.evalNumber.call(this, args.x)
                this._homeY = spr.y + TBSE.evalNumber.call(this, args.y)
                break;
            case "Targets":
                this._homeX = targets.reduce((total, trg)=>{ return trg.sprite().x + total}, 0) + TBSE.evalNumber.call(this, args.x)
                this._homeY = targets.reduce((total, trg)=>{ return trg.sprite().y + total}, 0) + TBSE.evalNumber.call(this, args.y)
                break;
            case "Screen":
                this._homeX = TBSE.evalNumber.call(this, args.x)
                this._homeY = TBSE.evalNumber.call(this, args.y)
        }
    }

    // Show animation
    cmd.anim = function(args){
        const isWaiting = args.wait === "true"
        const seq = this.sequencer()
        const mirror = args.mirror === "true"
        let animId = Number(args.id);
        if (animId === 0){
            animId = this.sequencer()._itemInUse.animationId;
            if(animId === -1){
                animId = (this.isActor() ? this.attackAnimationId1() : 0)
            }
        }
        let arr = []
        switch(args.target){
            case "Self": 
                arr = [this]
                arr.fixed = args.repos === "Fixed"
                arr.layer = args.layer
                $gameTemp.requestAnimation(arr, animId, mirror);
                break;
            case "Each Target":
                arr = [...seq._targetArray]
                arr.fixed = args.repos === "Fixed"
                arr.layer = args.layer
                $gameTemp.requestAnimation(arr, animId, mirror);
                break;
            case "Center of all targets":
                arr = [...seq._targetArray]
                arr.center = true
                arr.layer = args.layer
                $gameTemp.requestAnimation(arr, animId, mirror);
                break;
        }
        if(isWaiting){
            // Maybe later, maybe not
        }
    }

    // Apply action effect
    cmd.actionEffect = function(args){
        const seq = this.sequencer()
        for(const target of seq._targetArray){
            seq._action.apply(target);
            if (target.shouldPopupDamage()){
                target.startDamagePopup();
                const tseq = target.sequencer()
                if (tseq.canPlayEvadeMotion()){
                    tseq._targetArray = [this]
                    tseq.motionEvade()
                }else if (tseq.canPlayDamagedMotion()){
                    tseq._targetArray = [this]
                    tseq.motionDamaged()
                }
            }
        }
        if(this.shouldPopupDamage()){
            this.startDamagePopup();
        }
    }

    // Change used skill
    cmd.changeAction = function(args){
        const id = Number(args.skill)
        if(id === -1){
            this.sequencer().restoreItem()
        } else if(id > 0){
            this.sequencer().setItemUse($dataSkills[id])
        }
        this.sequencer()._itemInUse.damage.scale = args.scale
        if (args.formula.length > 0){
            this.sequencer()._itemInUse.damage.formula = args.formula
        }
    }

    // Force the result (such as force hit, force evade, force critical)
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
    // Determine unit based on POV
    this.determineUnit = function(pov, isOpponent){
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
    // Must be called with binding first
    this.filterCandidate = function(candidates){
        let passedCandidates = candidates
        switch(this.aliveState){
            case "Alive Only":
                passedCandidates = passedCandidates.filter(t => { return t.isAlive() })
                break;
            case "Dead Only":
                passedCandidates = passedCandidates.filter(t => { return t.isDead() })
                break;
        }
        if (this.filter.length > 0){
            passedCandidates = passedCandidates.filter(c => eval(filter))
        }
        return passedCandidates
    }
    // Change the current target into something else
    cmd.changeTarget = function(args){
        const seq = this.sequencer()
        TBSE.filterCandidate.bind(args) // For convenience
        let newTargets = seq._targetArray
        switch(args.opt){
            // Revert to default target
            case "Original Targets":
                newTargets = seq._oriTargets;
                break;

            // All battlers without exception
            case "All":
                newTargets = TBSE.filterCandidate([...$gameParty.members(), ...$gameTroop.members()])
                break;

            // All battlers excluding the user/caster
            case "All (Except user)":
                newTargets = TBSE.filterCandidate([...$gameParty.members(), ...$gameTroop.members()].filter(t => {return t !== this}))
                break;

            // All opposite side of caster / troop
            case "All Opponents":
                newTargets = TBSE.filterCandidate(TBSE.determineUnit.call(this, args.pov, true).members())
                break;

            // All of caster's allies / party
            case "All Allies":
                newTargets = TBSE.filterCandidate(TBSE.determineUnit.call(this, args.pov, false).members())
                break;

            // All opposite side of caster / troop - exclude previous target
            case "Other Opponents":
                newTargets = TBSE.filterCandidate(
                    TBSE.determineUnit.call(this, args.pov, true)
                    .members()
                    .filter(t => { 
                        return !seq._targetArray.includes(t)
                    })
                )
                break;

            // All of caster's allies / party - exclude previous
            case "Other Allies":
                newTargets = TBSE.filterCandidate(
                    TBSE.determineUnit.call(this, args.pov, false)
                    .members()
                    .filter(t => { 
                        return !seq._targetArray.includes(t)
                    })
                )
                break;

            // Random select opposite side of the caster / troop - (may select the same unit twice)
            case "Random Opponent":
                newTargets = [TBSE.sample(
                    TBSE.filterCandidate(
                        TBSE.determineUnit.call(this, args.pov, true).members()
                    )
                )] 
                break;

            // Random select caster's ally / party - (may select the same unit twice)
            case "Random Ally":
                newTargets = [TBSE.sample(
                    TBSE.filterCandidate(
                        TBSE.determineUnit.call(this, args.pov, false).members()
                    )
                )] 
                break;

            // Random select everyone - (may select the same unit twice)
            case "Random Any":
                newTargets = TBSE.sample(TBSE.filterCandidate([...$gameParty.members(), ...$gameTroop.members()]))
                break;

            // Random select opposite side of the caster / troop - (Can only select one, empty target is possible)
            case "Next Opponent":
                nextTarget = TBSE.sample(
                    TBSE.filterCandidate(
                        TBSE.determineUnit.call(this, args.pov, true)
                        .members()
                        .filter((m) => { 
                            return !this.sequencer()._victims.includes(m)
                        })
                    )
                )
                newTargets = nextTarget !== undefined ? [nextTarget] : [];
                break;

            // Random select caster's ally / party - (Can only select one, empty target is possible)
            case "Next Ally":
                nextTarget = TBSE.sample(
                    TBSE.filterCandidate(
                        TBSE.determineUnit.call(this, args.pov, false)
                        .members()
                        .filter((m) => { 
                            return !this.sequencer()._victims.includes(m)
                        })
                    )
                )
                newTargets = newTarget !== undefined ? [nextTarget] : [];
                break;
                
            // Random select everyone - (Can only select one, empty target is possible)
            case "Next Random":
                nextTarget = TBSE.sample(
                    TBSE.filterCandidate(
                        [...$gameParty.members(), ...$gameTroop.members()]
                        .filter((m) => {
                            return !this.sequencer()._victims.includes(m)
                        })
                    )
                )
                newTargets = nextTarget !== undefined ? [nextTarget] : [];
                break;

            // Target self
            case "Self":
                newTargets = [this];
                break;

            // No change to the current target. But filters it based on the dead/alive state and JS filter
            case "Unchanged":
                newTargets = TBSE.filterCandidate(newTargets)
                break;
        }
        const newAffectedTarget = [...TBSE._affectedBattlers, ...newTargets].filter(t => {return !TBSE._affectedBattlers.includes(t)})
        TBSE._affectedBattlers = [...TBSE._affectedBattlers, ...newAffectedTarget]
        seq._victims = [...seq._victims, ...newTargets];
        seq._targetArray = newTargets;
    }

    cmd.flip = function(args){
        switch(args.toggle.toLowerCase()){
            case "flips":
                this.sequencer()._flip = true
                break;
            case "unflips":
                this.sequencer()._flip = false
                break;
            case "toggle":
                this.sequencer()._flip = !this.sequencer()._flip
                break;
            case "reset":
                this.sequencer()._flip = this.dataBattler()._defaultFlip
                break;
        }
    }

    cmd.visible = function(args){
        this.sequencer()._visible = "true" === args.toggle
    }

    cmd.state = function(args){
        const targets = (args.to === "Self" ? [this] : this.sequencer()._targetArray)
        for(const t of targets){
            if (args.operand === "Add"){
                t.addState(Number(args.state))
            }else{
                t.removeState(Number(args.state))
            }
        }
    }

    // Force the target to do action sequence
    cmd.targetAction = function(args){
        for(const t of this.sequencer()._targetArray){
            t.sequencer().actionPrepare([this], null) 
            t.sequencer().doAction(Number(args.action))
        }
    }

    cmd.collapse = function(){
        TBSE.battler.performCollapse.call(this)
    }

    cmd.checkCollapse = function(){
        for(const t of this.sequencer()._targetArray)
            t.checkCollapse()
    }

    cmd.aftOn = function(args){
        this.sequencer()._afterimage = {
            rate: args.rate,
            opacityEase: args.opacityEase
        }
    }

    cmd.aftOff = function(){
        this.sequencer()._afterimage = null
    }

    cmd.projectile = function(args){
        console.log(args)
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
            this._afterimage = null
            this.clear()
            this.startIdleMotion()
        }

        clear(){
            this._animCell = 0                                  // Store the current shown sheet frame
            this._itemInUse = null                              // Store the currently used item/skill
            this._oriTargets = []                               // Store the original targets
            this._targetArray = []                              // Store the current targets
            this._visible = true                                // Determine if the battler is visible
            this._originalItemUse = null                        // Store the original item use
            this._victims = []                                  // Record All target victims (not necessarily a victim, it just a funny variable name)
            this._flip = TBSE.defaultFlip(this.dataBattler())   // Determine if the battler image is flipped
        }

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
            this._targetArray = [...targets]
            this._victims = [...targets]
            this._oriTargets = targets
            this.setItemUse(item, true)
        }
        // ↓
        // ↓ -- Set item (before action)
        setItemUse(item, preserve = false){
            if(item){
                // Copied for alteration
                this._itemInUse = JsonEx.makeDeepCopy(item)
                this._itemInUse._dataClass = (DataManager.isSkill(item) ? "skill" : "item")
                this._itemInUse.damage.scale = "1.0" // Added for damage scaling
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
                this.clearActionRecord()
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
            this._targetArray = []
            this._interpreter.setup(this.idleMotion(), "idle", function() { this._index = 0} );
        }

        // Modular sequence trigger
        doAction(actionId, endFunc = function() { this.startIdleMotion() } ){
            if(isNaN(actionId)){
                const id = TBSE.getAction(String(actionId))
                if (id > 0){
                    this._interpreter.setup(id, "action", endFunc, this)
                }else{
                    console.log("WARNING: Common Event name " + actionId + " is not found. Skipping command")
                }
            }else{
                this._interpreter.setup(actionId, "action", endFunc, this)
            }
        }

        // Will be change later, probably
        // Idle motion priority
        // Dead motion -- Casting -- State affected -- Pinch -- Equipment(?) -- Class based -- Regular idle
        idleMotion(){
            // Is dead
            if(this.battler().isDead()){
                return this.dataBattler()._sequenceList.dead
            }
            // Is affected by state
            const stateIdle = this.getStateIdle()
            if(stateIdle > 0){
                return stateIdle
            }
            // Crisis
            if (this.inCrisis()){
                return this.dataBattler()._sequenceList.crisis
            }
            // Normal
            return this.dataBattler()._sequenceList.idle;
        }

        getStateIdle(){
            const b = this.battler()
            if (b === undefined)
                return 0
            const states = b.sortStates()
            if (states){
                const motionId = states.find(s => s._motion > 0)
                return motionId ? motionId : 0
            }
            return 0
        }

        inCrisis(){
            return this.battler().hpRate <= 0.25 // Might be parameterized
        }

        clearActionRecord(){
            this._action.resetForcedResult()
            this._actionRecord.clearRecord()
        }

        canPlayEvadeMotion(){
            return this.battler()._result.evaded;
        }

        motionEvade(){
            const endFunc = function() { this.startIdleMotion() };
            const actionId = this.dataBattler()._sequenceList.evade
            this._interpreter.setup(actionId, "action", endFunc, this)
        }

        canPlayDamagedMotion(){
            return this.battler()._result.hpDamage > 0 || this.battler()._result.mpDamage !== 0;
        }

        motionDamaged(){
            const endFunc = function() { this.startIdleMotion() };
            const actionId = this.dataBattler()._sequenceList.damaged
            this._interpreter.setup(actionId, "action", endFunc, this)
        }

        // Currently unimplemented
        motionIntro(){
            const endFunc = function() { this.startIdleMotion() };
            const actionId = this.dataBattler()._sequenceList.intro
            this._interpreter.setup(actionId, "action", endFunc, this)
        }

        motionVictory(){
            const actionId = this.dataBattler()._sequenceList.victory
            if (actionId > 0){
                this.doAction(actionId, null)
            }
        }

        motionEscape(success){
            const actionId = success ? this.dataBattler()._sequenceList.escape : this.dataBattler()._sequenceList.escapefail
            if (actionId > 0){
                if(success){
                    this.doAction(actionId, null)
                }else{
                    const endFunc = function() { 
                        this.battler().returnHome()
                        this.startIdleMotion() 
                    }
                    this.doAction(actionId, endFunc)
                }
            }
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

        // Overwrite command 117 for calling common event
        command117(params) {
            const commonEvent = $dataCommonEvents[params[0]];
            if (commonEvent) {
                this.setupChild(params[0]);
            }
            return true;
        }

        // Overwrite setup child event
        setupChild(eventId){
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
                    args.interpreter = this; // idk why you need to reference the interpreter tho, but just in case
                    TBSE.COMMANDS[commandName].call(this.battler(),args);
                    return true
                }else{
                    console.log("WARNING: Command name " + commandName + " is undefined. If this is a command addon, make sure that it is not a typo. Skipping instruction")
                }
            }
            const args = params[3];
            args.battler = this.battler();
            return Game_Interpreter.prototype.command357.call(this, params);
        }

        // Helper function for script call convenience
        hasTarget(){
            return this.battler().sequencer().hasTarget()
        }

        noTarget(){
            return this.battler().sequencer().noTarget()
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

        aliasEva(target){
            return Game_Action.prototype.itemEva.call(this, target)
        }

        aliasCri(target){
            return Game_Action.prototype.itemCri.call(this, target)
        }

        // Scaling damage formula
        evalDamageFormula(target){
            return Game_Action.prototype.evalDamageFormula.call(this, target) * eval(this.item().damage.scale)
        }
    }
    //#endregion
    //=============================================================================================

    //=============================================================================================
    //#region Action Record
    // Currently unused. Probably used for battle log or damage counter
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
        TBSE._sequencer[this.battlerKey()] = new TBSE.Sequencer(this)
    }

    bb.dataBattler = function(){
        if(this.isActor()){
            return $dataActors[this._actorId]
        }else{
            return $dataEnemies[this._enemyId]
        }
    }

    // Sideview battler name suffix
    bb.svsuffix = function(){
        return this.sequencer()._suffix
    }

    bb.sequencer = function(){
        return TBSE._sequencer[this.battlerKey()]
    }

    bb.homePos = function() {
        return {
            x: 0,
            y: 0
        }
    }

    bb.updateSequencer = function(){
        const seq = this.sequencer()
        if(seq){
            seq.update();
        }
    }

    bb.battlerKey = function(){
        if (this.isActor()){
            return `a${this._actorId}`
        }else{
            return `e${this.index()}`
        }
    }

    bb.sprite = function(){
        return TBSE._battlerSprites[this.battlerKey()]
    }

    bb.clearActionSequence = function(){
        delete TBSE._sequencer[this.battlerKey()]
    }

    // Check if the battler is busy doing action
    bb.isDoingAction = function(){
        const seq = this.sequencer()
        if (seq === undefined){
            return false
        }
        return seq._interpreter._phaseName == "action" && !seq._interpreter.ending()
    }

    // Record result while clearing the damage popup
    TBSE.battler.clearPopup = bb.clearDamagePopup
    bb.clearDamagePopup = function() {
        TBSE.battler.clearPopup.call(this)
        if(this.sequencer()){
            this.sequencer()._actionRecord.addRecord(this._result)
        }
    };

    // Return to original position
    bb.returnHome = function(){
        const home = this.homePos()
        this.sprite().goto(home.x, home.y, 10, 0)
    }

    // Check if elegible for collapse effect (i.e, dead)
    bb.checkCollapse = function(){
        if(TBSE.canCollapse.call(this)){
            this.performCollapse()
        }
    }

    // Probably changed later if there is a bug
    this.canCollapse = function(){
        if(!this.sequencer()){
            return false
        }
        return this.isDead() && !this._collapsed
    }

    // Refresh collapse state
    TBSE.battler.refresh = bb.refresh
    bb.refresh = function(){
        TBSE.battler.refresh.call(this)
        if(this.hp > 0){
            this._collapsed = false
        }
    }

    TBSE.battler.performCollapse = bb.performCollapse
    bb.performCollapse = function() {
        const collapseKeyId = this.dataBattler()._sequenceList.collapse
        if(collapseKeyId > 0){
            this.sequencer().doAction(collapseKeyId)
        }else{
            TBSE.battler.performCollapse.call(this)
        }
        this._collapsed = true
    };

    bb.counterSkill = function(){
        return $dataSkills[this.counterSkillId()]
    }
    
    bb.counterSkillId = function(){
        const db = this.dataBattler()
        if(db._counterSkillId === undefined){
            db._counterSkillId = this.attackSkillId()
            const match = db.note.match(TBSE._tagCounter)
            if(match){
                const id = Number(match[1])
                if(isNaN(id)){
                    const skill = $dataSkills.find(skill => {return skill && skill.name.toLowerCase().trim() === id})
                    if(skill){
                        db._counterSkillId = skill.id
                    }else{
                        console.log(`WARNING: Skill name "${id}" is not found. Set counter skill to normal attack id`)
                    }
                }else{
                    db._counterSkillId = id
                }
            }
        }
        return db._counterSkillId
    }

    // Might turn into ._states if too many plugins used states() function and causes a lot of complication
    bb.stateAnim = function(){
        return this.states().filter(s => TBSE.stateAnim(s) > 0).map(s => TBSE.stateAnim(s))
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

    TBSE.actor.battlerName = ga.battlerName
    ga.battlerName = function() {
        return TBSE.actor.battlerName.call(this) + this.svsuffix();
    };

    TBSE.actor.onBattleStart = ga.onBattleStart
    ga.onBattleStart = function(){
        this.initHomePos()
        TBSE.actor.onBattleStart.call(this)
    }

    // Overwrite
    ga.isSpriteVisible = function() {
        const seq = this.sequencer()
        if(seq){
            return seq._visible
        }
        return false
    };

    // Overwrite the victory motion
    ga.performVictory = function() {
        this.setActionState("done");
        if (this.canMove()) {
            this.sequencer().motionVictory()
        }
    };

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

    TBSE.enemy.battleName = ge.battlerName
    ge.battlerName = function() {
        if (this.dataBattler()._isAnimated){
            return this.dataBattler()._sprName + this.svsuffix()
        }
        return TBSE.enemy.battleName.call(this);
    };

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

    // Party size is based on the assigned coordinate in the actor pos configuration
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

    // Overwrite update visibility
    sb.updateVisibility = function() {
        Sprite_Clickable.prototype.updateVisibility.call(this);
        if (!this._battler) {
            this.visible = false;
        }else{
            this.visible = this._battler.isSpriteVisible()
        }
    };

    TBSE.spriteBattler.updateMain = sb.updateMain
    sb.updateMain = function(){
        TBSE.spriteBattler.updateMain.call(this)
        // This mirror function is kinda stupid.
        if(this._battler){
            this.scale.x = Math.abs(this.scale.x) * (this._battler.sequencer()._flip ? -1 : 1)
        }
    }

    // Overwrite update position
    sb.updatePosition = function() {
        if (this._tbseMoveDuration > 0) {
            const time = this._maxDuration - this._tbseMoveDuration
            this._displayX = this._usedFuncX(this._oriX, this._targX, time, this._maxDuration)
            this._displayY = this._usedFuncY(this._oriY, this._targY, time, this._maxDuration)
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

    // It is possible to use a different function, for example, if you want to use easing movement
    sb.goto = function(x, y, duration, jump = 0, funcNameX = "linearFunc", funcNameY = "linearFunc"){
        this._maxDuration = duration;
        this._jumpPower = jump;
        this._targX = x;
        this._targY = y;
        this._oriX = this._displayX;
        this._oriY = this._displayY;
        this._tbseMoveDuration = duration;
        this._usedFuncX = TBSE[funcNameX];
        this._usedFuncY = TBSE[funcNameY];
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
    //#region Afterimage
    //---------------------------------------------------------------------------------------------
    TBSE.Afterimages = class {
        constructor(ref){
            this.imagelist = []
            this.ref = ref
            this.counter = 0
        }
    
        update(){
            this.generateAfterimage()
            this.counter++
            for(const img of this.imagelist){
                if(img.opacity <= 0){
                    img.destroy()
                    this.imagelist.remove(img)
                }
            }
        }
    
        generateAfterimage(){
            const battler = this.ref._battler
            const aftOption = !!battler ? battler.sequencer()._afterimage : null
            if (!!aftOption && this.counter % aftOption.rate === 0){
                this.counter = 0
                const aftimg = new TBSE.Afterimage(this.ref, aftOption)
                this.imagelist.push(aftimg)
                TBSE.Afterimages._requestedImg.push({
                    spr: aftimg,
                    ref: this.ref
                })
            }
        }
    }

    TBSE.Afterimages._requestedImg = []

    TBSE.Afterimage = class extends Sprite{
        constructor(sprite, options){
            super()
            this.clone(sprite, options)
        }
    
        // Clone everything here
        clone(sprite, options){
            this._isActor = !!sprite._mainSprite
            const sprObj = this._isActor ? sprite._mainSprite : sprite
            this.sprite = sprObj
            this.options = options
            this.bitmap = sprObj.bitmap
            this.opacity = 255
            this.anchor.x = sprObj.anchor.x
            this.anchor.y = sprObj.anchor.y
            this.x = this._isActor ? sprObj.parent.x : sprObj.x
            this.y = this._isActor ? sprObj.parent.y : sprObj.y
            const frame = sprObj._frame
            this.setFrame(frame.x, frame.y, frame.width, frame.height)
        }
    
        update(){
            Sprite.prototype.update.call(this)
            this.opacity -= this.options.opacityEase
        }
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
            TBSE._battlerSprites[battler.battlerKey()] = this;
        }
    };
    
    // Inject afterimage handler
    TBSE.spriteActor.createMainSpr = sa.createMainSprite
    sa.createMainSprite = function() {
        TBSE.spriteActor.createMainSpr.call(this)
        this._afterimages = new TBSE.Afterimages(this)
    };

    // Delete update motion. I have my own
    sa.updateMotion = function() {
    };
    
    // Delete retreat. I have my own
    sa.retreat = function() {
    };

    sa.updateShadow = function() {
        this._shadowSprite.visible = !! this._actor;
        this._shadowSprite.y = -2 + this.jumpHeight();
        this._afterimages.update()
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
            this.setFrame(0, 0, cw, ch);
        }
    };

    // Overwrite set home
    sa.setActorHome = function(index) {
        this.setHome(TBSE._actorPos[index].x, TBSE._actorPos[index].y);
    };
    //#endregion
    //============================================================================================= 

    //============================================================================================= 
    //#region Sprite_Enemy
    //---------------------------------------------------------------------------------------------
    TBSE.spriteEnemy = {}
    const se = Sprite_Enemy.prototype

    TBSE.spriteEnemy.initMembers = se.initMembers
    se.initMembers = function() {
        TBSE.spriteEnemy.initMembers()
        this.createAfterimageHandler()
    };

    TBSE.spriteEnemy.setBattler = se.setBattler
    se.setBattler = function(battler) {
        TBSE.spriteEnemy.setBattler.call(this, battler);
        if (battler !== undefined){
            TBSE._battlerSprites[battler.battlerKey()] = this;
        }
    };

    TBSE.spriteEnemy.update = se.update
    Sprite_Enemy.prototype.update = function() {
        TBSE.spriteEnemy.update.call(this)
        this._afterimages.update()
    };

    // Lol I don't care about boss collapse effect
    TBSE.spriteEnemy.updateFrame = se.updateFrame
    se.updateFrame = function() {
        if (this._battler && this._battler.dataBattler()._isAnimated){
            Sprite_Battler.prototype.updateFrame.call(this); // Idk why I need this to be honest
            const bitmap = this.bitmap;
            if (bitmap) {
                const animCell = this._battler.sequencer()._animCell;
                const cw = bitmap.width / TBSE._maxCol;
                const ch = bitmap.height / TBSE._maxRow;
                const cy = Math.floor(animCell / TBSE._maxCol) * ch
                const cx = (animCell % TBSE._maxCol) * cw
                this.setFrame(cx, cy, cw, ch);
            }
        }else{
            TBSE.spriteEnemy.updateFrame.call(this)
        }
    };

    se.createAfterimageHandler = function(){
        this._afterimages = new TBSE.Afterimages(this)
    }
    //#endregion
    //============================================================================================= 

    //============================================================================================= 
    //#region Spriteset_Battle
    //---------------------------------------------------------------------------------------------
    TBSE.sprset = {}
    const sset = Spriteset_Battle.prototype

    TBSE.sprset.init = sset.initialize
    sset.initialize = function(){
        TBSE.sprset.init.call(this)
        this._fixedAnimeHandler = []
    }

    TBSE.sprset.isBusy = sset.isBusy
    sset.isBusy = function() {
        return TBSE.sprset.isBusy.call(this) || TBSE.isSequenceBusy();
    };

    // Delete delay
    sset.animationBaseDelay = function() {
        return 0;
    };

    // Delete delay
    sset.animationNextDelay = function() {
        return 0;
    };

    TBSE.sprset.update = sset.update
    sset.update = function() {
        TBSE.sprset.update.call(this)
        this.updateAfterimages()
    };

    sset.updateAfterimages = function(){
        for(const img of TBSE.Afterimages._requestedImg){
            const indexInsert = this._battleField.getChildIndex(img.ref)
            this._battleField.addChildAt(img.spr, indexInsert)
            TBSE.Afterimages._requestedImg.remove(img)
        }
    }

    // I don't agree with automatic mirror
    sset.animationShouldMirror = function(target) {
        if(!target || !target.sequencer){
            return false
        }
        let mirror = false;
        switch(TBSE._autoMirror){
            case "Mirror for Actors":
                mirror = target && target.isActor && target.isActor();
            case "Mirror for Enemies":
                mirror = target && target.isEnemy && target.isEnemy();
        }
        const seq = target.sequencer()
        if(seq && seq._flip){
            return !mirror
        }
        return mirror;
    };

    // Overwrite create animation. I see no other solution
    sset.createAnimation = function(request){
        const animation = $dataAnimations[request.animationId];
        const targets = request.targets;
        const mirror = request.mirror;
        let delay = this.animationBaseDelay();
        const nextDelay = this.animationNextDelay();
        if (this.isAnimationForEach(animation) && !targets.center) { // Lemme decide if it is center or not, dammit!
            for (const target of targets) {
                const arr = [target]
                arr.fixed = targets.fixed
                arr.layer = targets.layer   
                this.createAnimationSprite(arr, animation, mirror, delay);
                delay += nextDelay;
            }
        } else {
            this.createAnimationSprite(targets, animation, mirror, delay);
        }
    }

    TBSE.sprset.createAnimSpr = sset.createAnimationSprite
    sset.createAnimationSprite = function(targets, animation, mirror, delay) {
        TBSE.sprset.createAnimSpr.call(this, targets, animation, mirror, delay)
        // Reorder the child position
        if (targets.layer === "Back"){
            spr = this._animationSprites[this._animationSprites.length - 1]
            this._effectsContainer.removeChild(spr)
            this._effectsContainer.addChildAt(spr, 0)
        }
    };

    TBSE.sprset.makeTargetSprites = sset.makeTargetSprites
    sset.makeTargetSprites = function(targets) {
        const targetSprites = TBSE.sprset.makeTargetSprites.call(this, targets);
        if(targets.center){
            const centerSpr = this.makeCenterTarget(targetSprites)
            return [centerSpr]
        }
        if(targets.fixed){
            return this.makeFixedTarget(targetSprites)   
        }
        return targetSprites;
    };

    // Center mass
    sset.makeCenterTarget = function(targets){
        const spr = new Sprite()
        spr._trackThis = true 
        spr.x = targets.reduce((total, trg)=>{ return trg.x + total}, 0) / targets.length
        spr.y = targets.reduce((total, trg)=>{ return trg.y + total}, 0) / targets.length
        this._fixedAnimeHandler.push(spr)
        this._battleField.addChild(spr)
        const arrRef = [this._fixedAnimeHandler, this._battleField]
        spr.endAnimation = function(){
            arrRef[0].remove(spr)
            arrRef[1].removeChild(spr)
            spr.destroy()
        }
        return spr
    }

    // Animation do not follow
    sset.makeFixedTarget = function(targets){
        return targets.map(t => {
            const spr = new Sprite()
            spr._trackThis = true
            spr.x = t.x
            spr.y = t.y
            spr.setFrame(0, 0, t.width, t.height)
            this._fixedAnimeHandler.push(spr)
            this._battleField.addChild(spr)
            const arrRef = [this._fixedAnimeHandler, this._battleField]
            spr.endAnimation = function(){
                arrRef[0].remove(spr)
                arrRef[1].removeChild(spr)
                spr.destroy()
            }
            return spr
        })
    }

    TBSE.AnimLoopTracker = {}

    // Might be changed into flag based checker if it lags a lot
    TBSE.sprset.processAnimReq = sset.processAnimationRequests
    sset.processAnimationRequests = function(){
        TBSE.sprset.processAnimReq.call(this)
        for(const m of [...$gameParty.members(),...$gameTroop.members()]){
            const key = m.battlerKey()
            const stateAnim = m.stateAnim()
            TBSE.AnimLoopTracker[key] ||= []
            if(!TBSE.arrayEqual(TBSE.AnimLoopTracker[key], stateAnim)){
                TBSE.AnimLoopTracker[key] = stateAnim
                this.refreshLoopedAnimation(key, stateAnim, m)
            }
        }
    }

    sset.refreshLoopedAnimation = function(key, stateAnim, target){
        this._animLoop ||= {}
        this._animLoop2 ||= {} // For effekseer loop
        this._animLoop[key] ||= []
        this._animLoop2[key] ||= [] // For effekseer loop
        for(const anime of this._animLoop[key]){
            this._animLoop[key].remove(anime);
            this._effectsContainer.removeChild(anime);
            anime.destroy()
        }

        // For effekseer loop (this will be improved later)
        for(const anime of this._animLoop2[key]){
            this._animLoop[key].remove(anime);
            this._effectsContainer.removeChild(anime);
            anime.destroy()
        }

        for(const animeId of stateAnim){
            const animation = $dataAnimations[animeId]
            const mv = this.isMVAnimation(animation)
            const sprite = new (mv ? TBSE.AnimationLoop_MV : TBSE.AnimationLoop)()
            const targetSprite = this.makeTargetSprites([target]);
            if (mv){
                sprite.setup(targetSprite, animation, false, 0, 0);
            }else{
                const delay = TBSE.getEffekseerLoopDelay(animation)
                // This will be improved later
                // For example, instead of delay, it will be length. If length >= <number> play a new duplicated animation. Do not restart.
                if(delay > 0){
                    const sprite2 = new TBSE.AnimationLoop()
                    sprite2.setup(targetSprite, animation, false, delay, 0);
                    this._effectsContainer.addChild(sprite2);
                    this._animLoop2[key].push(sprite2);
                }
                sprite.setup(targetSprite, animation, false, 0, 0);
            }
            this._effectsContainer.addChild(sprite);
            this._animLoop[key].push(sprite);
        }
    }

    this.getEffekseerLoopDelay = function(db){
        db._nextDelay = 0
        const match = db.name.match(/<delay\s*:\s*(\d+)\s*>/i)
        if (match){
            db._nextDelay = Number(match[1])
        }
        return db._nextDelay
    }

    //#endregion
    //============================================================================================= 
    //#region Animation handler for looping
    //---------------------------------------------------------------------------------------------
    TBSE.AnimationLoop_MV = class extends Sprite_AnimationMV{
        // Restart on end
        onEnd(){
            this.setupDuration()
        }    
    }

    TBSE.AnimationLoop = class extends Sprite_Animation{
        // Restart on end
        checkEnd(){
            if (
                this._frameIndex > this._maxTimingFrames &&
                this._flashDuration === 0 &&
                !(this._handle && this._handle.exists)
            ) {
                this._frameIndex = 0
                this._handle = Graphics.effekseer.play(this._effect);
            }
        }
    }

    // These are kinda convoluted, blame the base code design
    TBSE.Animation = {}
    TBSE.Animation.setup = Sprite_Animation.prototype.setup
    Sprite_Animation.prototype.setup = function(){
        TBSE.Animation.setup.call(this, ...arguments)
        for(const t of this._targets){
            if(t && t._trackThis){
                this.targetObjects.push(t)
            }
        }
    }

    TBSE.Animation.setupMV = Sprite_AnimationMV.prototype.setup
    Sprite_AnimationMV.prototype.setup = function(){
        TBSE.Animation.setupMV.call(this, ...arguments)
        for(const t of this._targets){
            if(t && t._trackThis){
                this.targetObjects.push(t)
            }
        }
    }
    //#endregion
    //============================================================================================= 
    //#region Counter Handler

    TBSE.Counter = {} // CounterHandler
    TBSE.Counter.register = function(subject, targets) {
        this._subject = subject
        this._targets = targets
    }

    TBSE.Counter.clear = function(){
        this._subject = undefined
        this._targets = undefined
    }

    TBSE.Counter.getSubject = function(){
        const counterBattler = this._targets.shift()
        if(counterBattler){
            //if (true){
            if (Math.random() < this._subject.sequencer()._action.itemCnt(counterBattler)){
                counterBattler.sequencer().actionPrepare([this._subject], counterBattler.counterSkill())
            }else{
                return undefined
            }
        }
        return counterBattler
    }
    //#endregion
    //============================================================================================= 
    //#region Window_BattleLog (for sequence) 
    //---------------------------------------------------------------------------------------------
    TBSE.wblog = {}
    const wb = Window_BattleLog.prototype;

    // Refactor start action with my own
    wb.startAction = function(subject, action, targets) {
        const item = action.item();
        this.displayAction(subject, item);
        // <Intercept reaction here later>
        this.push("tbse_actionMain", subject, targets, item);
        this.push("tbse_actionCounter", subject, targets, item)
        this.push("tbse_actionEnd", subject, item);
    }

    // Main part of the action sequence
    wb.tbse_actionMain = function(subject, targets, item){
        // Probably substitute function here

        // Copy array (for record)
        TBSE._affectedBattlers = targets.concat();
        subject.sequencer().actionPrepare(targets, item)
        subject.sequencer().performActionSequence();
        this.setWaitMode("Sequence");
    }

    // Check counterattack
    wb.tbse_actionCounter = function(subject, targets, item){
        TBSE.Counter.register(subject, targets, item)
        this.setWaitMode("Counter")
    }

    // Conclusion
    wb.tbse_actionEnd = function(subject, item){
        for(const target of TBSE._affectedBattlers){
            target.returnHome();
            target.checkCollapse();
        }
        subject.returnHome()
        TBSE._affectedBattlers = [];
        BattleManager.endAction();
        this._waitMode = "";
        this._waitCount = 5;
    }

    TBSE.wblog.updateWait = wb.updateWaitMode
    wb.updateWaitMode = function(){
        // Update for main sequence
        if (this._waitMode === "Sequence"){
            return TBSE.isSequenceBusy();
        }
        // Update when counterattack is in action
        if(this._waitMode === "Counter"){
            if (TBSE.isSequenceBusy()){
                return true
            }else{
                const counterSubject = TBSE.Counter.getSubject()
                if(counterSubject){
                    this.clear()
                    this.addText(TextManager.counterAttack.format(counterSubject.name()))
                    counterSubject.sequencer().performActionSequence()
                    return true
                }
                TBSE.Counter.clear()
            }
        }
        return TBSE.wblog.updateWait.call(this);
    }
    //#endregion
    //=============================================================================================

    //============================================================================================= 
    // BattleManager
    //---------------------------------------------------------------------------------------------

    TBSE.bm = {}

    TBSE.bm.processEscape = BattleManager.processEscape
    BattleManager.processEscape = function() {
        const success = TBSE.bm.processEscape.call(this)
        for(const m of $gameParty.members()){
            m.sequencer().motionEscape(success)
        }
        return success;
    };

    //============================================================================================= 
    // Scene Update
    //---------------------------------------------------------------------------------------------
    TBSE.scene_battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        TBSE.scene_battle_update.call(this);
        $gameParty.updateSequencer();
        $gameTroop.updateSequencer();
    };

    TBSE.scene_battle_terminate = Scene_Battle.prototype.terminate
    Scene_Battle.prototype.terminate = function() {
        TBSE.scene_battle_terminate.call(this)
        TBSE.clearSpriteReference()
    };

    Game_Unit.prototype.updateSequencer = function(){
        for(const member of this.members()){
            member.updateSequencer()
        }
    }
}
TBSE.init()
