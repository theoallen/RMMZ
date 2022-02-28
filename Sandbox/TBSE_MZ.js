/*:
@target MZ
@plugindesc v0.1.20220228 - Theo's Battle Sequence Engine MZ.
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
@text Pose - Select Frame
@desc Select frame

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
// * Command - Set Pose
//========================================================================

@command poserepeat
@text Pose - Repeat Frame
@desc Repeat the pose frames automatically

@arg frames
@text Frames
@type struct<poseframe>[]
@default []
@desc Put the frame to repeat here

@arg repeatmode
@text Repeat
@type combo
@option Indefinitely
@option Once
@default Indefinitely
@desc Set whether to repeat indefinitely or once, or put your own number.

@arg wait
@text Wait for finish?
@type boolean
@on Yes
@off No
@default No
@desc Set whether to wait till finish or animate in parallel. Deadlock if used with repeat indefinitely (duh)

//========================================================================
// * Command - Move to position (Subject)
//========================================================================

@command move
@text Movement - Subject/Caster
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
@text Jump (Max Height)
@type number
@default 0
@min 0
@desc Maximum height of the jump

@arg fn
@type combo
@text Function
@option Linear
@option Smooth-Out
@option Smooth-In
@option Smooth-InOut
@default Linear
@desc You can also type, for example 'inSine' to get specific function from https://easings.net/

//========================================================================
// * Command - Move to position (Target)
//========================================================================

@command moveTarget
@text Movement - Target
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
@text Jump (Max Height)
@type number
@default 0
@min 0
@desc Maximum height of the jump

@arg fn
@type combo
@text Function
@option Linear
@option Smooth-Out
@option Smooth-In
@option Smooth-InOut
@default Linear
@desc You can also type, for example 'inSine' to get specific function from https://easings.net/

//========================================================================
// * Command - Anchor Home
//========================================================================

@command anchorHome
@text Position - Set New Home
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
@text Target - Force Action
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
@text Action - Invoke Effect
@desc Invoke item/skill effect to the target battler

//========================================================================
// * Command - Alter Effect (May be changed for more versatility)
//========================================================================

@command changeAction
@text Action - Alter Effect
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
// * Command - Projectile
//========================================================================

@command projectile
@text Action - Throw Projectile
@desc Throw a projectile to the targets. Action effect is applied as soon as it hits the target or as configured

@arg prjbasic
@text Basic setting
@default ---------------

@arg img
@parent prjbasic
@text Projectile Image
@type struct<prjimg>
@desc Display of the projectile. (Icon, animation, custom image)
@default {"icon":"0","file":"","animation":"0","animfollow":"true","spin":"0","autoAngle":"true"}

@arg duration
@parent prjbasic
@type Text
@text Duration
@default 10
@desc Travel duration. JS code is ok!

@arg jump
@parent prjbasic
@type Text
@text Jump (Max Height)
@default 0
@desc Maximum height of the arc path. JS code is ok!

@arg type
@parent prjbasic
@type select
@text Movement Type
@option Normal
@option Boomerang
@default Normal
@desc Select movement type. Boomerang means returning to the target afterward with negative arch value

@arg prjadv
@text Advanced setting
@default ---------------

@arg delay
@parent prjadv
@type number
@text Launch Delay
@default 0
@desc Wait time before launching the projectile

@arg effect
@parent prjadv
@type select
@text Invoke effect at
@option Reaching the target
@option The beginning
@option Do not invoke the effect
@default Reaching the target
@desc Invoke effect method you can select.

@arg startpoint
@parent prjadv
@text Start Point
@type struct<projectilepoints>
@desc Starting point of the projectile
@default {"x":"0","y":"0","relativeto":"Self","position":"Middle"}

@arg endpoint
@parent prjadv
@text End Point
@type struct<projectilepoints>
@desc End point of the projectile
@default {"y":"0","x":"0","relativeto":"Each Target","position":"Middle"}

@arg aftimg
@parent prjadv
@type struct<aftimg>
@text Afterimage Effect
@default {"rate":"0","opacityEase":"20","startOpacity":"100","blendmode":"Follow Sprite"}
@desc Afterimage effect for the projectile

@arg animsetup
@parent prjadv
@type struct<animationsetup>
@text Animation Setup
@default {"start":"0","ending":"-1","trail":"0"}
@desc Setup the start/ending animation and trailing animation

@arg fn
@type combo
@parent prjadv
@text Function
@option Linear
@option Smooth-Out
@option Smooth-In
@option Smooth-InOut
@default Linear
@desc You can also type, for example 'inSine' to get specific function from https://easings.net/

//========================================================================
// * Command - Force result
//========================================================================

@command forceResult
@text Action - Force Result
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
// * Command - Change Target
//========================================================================

@command changeTarget
@text Action - Change Target
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
@text Action - Change State
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
// * Command - Change state
//========================================================================

@command state
@text Action - Change HP/MP/TP
@desc Change the target stats

@arg to
@text To
@type select
@option Targets
@option Self
@default Targets
@desc Target scope

@arg flat
@text Flat Changes

@arg flathp
@parent flat
@text Flat HP
@type number
@default 0
@desc Change HP (Flat) to the target scope. JS code is ok!

@arg flatmp
@parent flat
@text Flat MP
@type number
@default 0
@desc Change MP (Flat) to the target scope. JS code is ok!

@arg flattp
@parent flat
@text Flat TP
@type number
@default 0
@desc Change TP (Flat) to the target scope. JS code is ok!

@arg rate
@text Percentage Changes

@arg ratehp
@parent rate
@text Rate HP
@type number
@default 0
@desc Change HP (percentage) to the target scope. JS code is ok!

@arg ratemp
@parent rate
@text Rate MP
@type number
@default 0
@desc Change MP (percentage) to the target scope. JS code is ok!

@arg ratetp
@parent rate
@text Rate TP
@type number
@default 0
@desc Change TP (percentage) to the target scope. JS code is ok!

@arg popup
@text Shows Popup?
@type select
@option Yes
@option No
@default Yes

@command div2
@text ---------< Visual Effects >-----------
@desc

//========================================================================
// * Command - Play Animation
//========================================================================

@command anim
@text Animation - Play
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
@option Fixed Point
@default Each Target
@desc Where to play the animation (Effekseer display type might override this)

@arg repos
@text Reposition
@type select
@option Fixed
@option Follow Sprite
@default Fixed
@desc Determine if the animation should follow the battler or fixed in place. Fixed point will always fixed.

@arg layer
@text Layer
@type select
@option Front
@option Dynamic (Follow Sprite's Z index)
@option Back
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
// * Command - Camera Move
//========================================================================

@command cam
@text Camera - Move
@desc Move the camera

@arg to
@type select
@option User
@option Target
@option Center Screen
@text Relative to
@default Center Screen
@desc Where do you want to shoot?

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

@arg zoom
@text Zoom
@type text
@default 1.0
@desc Use decimal number on this one. JS code is ok!

@arg dur
@text Duration
@type number
@default 10
@min 0
@desc How many frames you need to wait until it completes its movement.

@arg fn
@type combo
@text Function
@option Linear
@option Smooth-Out
@option Smooth-In
@option Smooth-InOut
@default Linear
@desc You can also type, for example 'inSine' to get specific function from https://easings.net/

//========================================================================
// * Command - Visible toggle
//========================================================================

@command visible
@text Sprite - Visible
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
@text Sprite - Flip
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
// * Command - Blend Mode
//========================================================================

@command blend
@text Sprite - Blend Mode
@desc Set blend mode to the sprite

@arg mode
@type select
@text Mode
@option Normal
@option Add
@option Sub
@default Normal
@desc Select the mode

//========================================================================
// * Command - Scale
//========================================================================

@command scale
@text Sprite - Scale/Zoom
@desc Scale the subject sprite

@arg size
@type text
@text Target Size
@default 1.0
@desc Use decimal number on this one. JS code is ok!

@arg dur
@type number
@text Duration
@default 35
@desc Duration to complete the resize. JS code is ok!

@arg fnName
@type combo
@text Function
@option Linear
@option Smooth-Out
@option Smooth-In
@option Smooth-InOut
@default Linear
@desc You can also type, for example 'inSine' to get specific function from https://easings.net/

//========================================================================
// * Command - Rotation
//========================================================================

@command rotate
@text Sprite - Rotate
@desc Rotate the subject sprite

@arg angle
@type text
@text Target Angle
@default 0
@desc Use degree. JS code is ok!

@arg dur
@type number
@text Duration
@default 35
@desc Duration to complete the resize. JS code is ok!

@arg reset
@type boolean
@on Yes
@off no
@default true
@text Reset on finish?
@desc Reset to 0 degree on finish.

@arg fnName
@type combo
@text Function
@option Linear
@option Smooth-Out
@option Smooth-In
@option Smooth-InOut
@default Linear
@desc You can also type, for example 'inSine' to get specific function from https://easings.net/

//========================================================================
// * Command - Spinning
//========================================================================

@command spinStart
@text Sprite - Spin Start
@desc Spin the battler

@arg startspd
@type number
@text Spin Speed 
@default 1
@desc Starting spinning speed. JS code is ok!

@arg accelspd
@type number
@text Acceleration
@default 0
@desc Acceleration Speed. Use 0 to disable. JS code is ok!

@arg maxspd
@type number
@text Max Speed
@default 0
@desc Maximum speed. Use it only when you also have acceleration. JS code is ok!

//========================================================================
// * Command - Spinning
//========================================================================

@command spinEnd
@text Sprite - Spin Stop
@desc Instantly stop spinning and reset the angle

//========================================================================
// * Command - Afterimage ON
//========================================================================

@command aftOn
@text Afterimage - ON
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

@arg startOpacity
@text Starting Opacity (%)
@type number
@min 1
@max 100
@default 100
@desc Starting opacity at percentage. 100 = full

@arg blendmode
@text Blend Mode
@type select
@option Follow Sprite
@option Normal
@option Add
@option Sub
@default Follow Sprite
@desc Select blend mode.

//========================================================================
// * Command - Afterimage OFF
//========================================================================

@command aftOff
@text Afterimage - OFF
@desc Toggle afterimage effect OFF

//========================================================================
// * Command - Focus Effect ON
//========================================================================

@command focusOn
@text Focus Effect - ON
@desc Enable focus effect. Hide all unaffected battlers.

@arg dim
@type number
@text Dimness
@min 0
@max 255
@default 128
@desc Set the dimness from 0 to 255 (complete dark)

@arg target
@type select
@text Target Focus
@option Current Targets
@option All opponents unit
@option All friends units
@option Everyone
@option Self
@default Current Targets
@desc Select the focus scope

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
@text Focus Effect - OFF
@desc Reset the focus effect to normal

@arg duration
@type number
@text Fading in duration
@min 1
@default 35
@desc Duration to restore

//========================================================================
// * Command - Check collapse, check if the target dies
//========================================================================

@command checkCollapse
@text Collase VFX - Check Collapse
@desc Perform collapse effect to the targets if the target is defeated

//========================================================================
// * Command - Perform collapse effect regardless of the state
// To be used in custom collapse motion.
//========================================================================

@command collapse
@text Collase VFX - Perform
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
@param x
@text X-Axis
@type text
@text X
@desc Relative X-axis. You can use a JS code here
@default 0

@param y
@text Y-Axis
@type text
@text Y
@desc Relative Y-axis. You can use a JS code here
@default 0

@param relativeto
@type select
@text Relative to
@option Each Target
@option Center of all targets
@option Self
@option Exact Point
@default Each target
@desc Pick the target point

@param position
@type select
@text Position
@option Top-Left
@option Top-Mid
@option Top-Right
@option Mid-Left
@option Middle
@option Mid-Right
@option Bottom-Left
@option Bottom-Mid
@option Bottom-Right
@default Middle
@desc
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

@param animfollow
@type boolean
@text Follow Rotation?
@on Yes
@off No
@default true
@desc Enable the animation rotation to follow the projectile rotation.

@param spin
@type number
@text Spin speed
@default 0
@desc Spinning speed of the projectile (Doesn't work together with auto angle)

@param autoAngle
@text Auto Rotation?
@type boolean
@on Yes
@off No
@default false
@desc Angle follow projectile trajectory. Enable auto rotation (Does not work together with spin)
*/

/*~struct~aftimg:
@param rate
@type number
@text Rate
@default 0
@desc Smaller number = more often the afterimage effect is displayed. Set this to 0 to disable

@param opacityEase
@text Ease
@type number
@default 20
@desc Bigger number = faster fading 

@param startOpacity
@text Starting Opacity (%)
@type number
@min 1
@max 100
@default 100
@desc Starting opacity at percentage. 100 = full

@param blendmode
@text Blend Mode
@type select
@option Follow Sprite
@option Normal
@option Add
@option Sub
@default Follow Sprite
@desc Select blend mode.
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

/*~struct~poseframe:
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
TBSE.init = function() {
    this._pluginName = document.currentScript.src.match(/.+\/(.+)\.js/)[1]
    this._version = '0.1.220228'  // <Major>.<Minor>.<YYMMDD>

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

    //#endregion
    //============================================================================================

    //============================================================================================
    //#region Global function
    //--------------------------------------------------------------------------------------------
    // Global function to check if any battler is doing action sequence
    this.isSequenceBusy = () => {
        return TBSE.allBattlers().some(battler => battler.isDoingAction()) || SceneManager._scene._spriteset.doProjectilesExist()
    }

    // Function to get all battlers for convenience
    this.allBattlers = () => { 
        return [...$gameParty.allMembers(),...$gameTroop.members()] 
    }

    // Return a random element from an array
    this.sample = function(array){
        return array[Math.floor(Math.random() * array.length)]
    }

    // Clears sprite reference
    this.clearSpriteReference = function(){
        TBSE._battlerSprites = {}
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
        return db._defaultFlip ||= !!db.note.match(TBSE._tagFlip)
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

    // https://easings.net/
    // Might add more later if requested and I'm not too lazy.
    this.Easings = {
        linear: t => t, // Tbh this is stupid, but this is here for "modularity"
        
        // Out
        outSine: t => Math.sin((t * Math.PI) / 2),
        outQuad: t => 1 - (1 - t) * (1 - t),
        outCubic: t => 1 - Math.pow(1 - t, 3),
        outQuart: t => 1 - Math.pow(1 - t, 4),
        outQuint: t => 1 - Math.pow(1 - t, 5),
        outExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
        outCirc: t => Math.sqrt(1 - Math.pow(t - 1, 2)),
        outBack: t => {
            const c1 = 1.70158;
            const c3 = c1 + 1;
            return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
        },

        // In
        inSine: t => 1 - Math.cos((t * Math.PI) / 2),
        inQuad: t => t * t,
        inCubic: t => t * t * t,
        inQuart: t => t * t * t * t,
        inQuint: t => t * t * t * t * t,
        inExpo: t => t === 0 ? 0 : Math.pow(2, 10 * t - 10),
        inCirc: t => 1 - Math.sqrt(1 - Math.pow(t, 2)),
        inBack: t => {
            const c1 = 1.70158;
            const c3 = c1 + 1;
            return c3 * t * t * t - c1 * t * t
        },

        // In-Out Mix
        inOutSine: t => -(Math.cos(Math.PI * t) - 1) / 2,
        inOutQuad: t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
        inOutCubic: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
        inOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
        inOutQuint: t => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2,
        inOutExpo: t => x === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2,
        inOutCirc: t => x < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2,
        inOutBack: t => {
            const c1 = 1.70158; const c2 = c1 * 1.525;

            return x < 0.5 
            ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
            : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;},
        
    }

    // Map the function here
    this.Easings.getFunction = str => {
        const nameMap = {
            "Smooth-Out": TBSE.Easings.outSine,
            "Smooth-In": TBSE.Easings.inSine,
            "Smooth-InOut": TBSE.Easings.inOutSine,
        }
        return nameMap[str] || TBSE.Easings[str] || TBSE.Easings.linear
    }

    // Easing function that returns the actual value
    this.Easings.fn = (ori, target, time, maxTime, fnName) => {
        const t = time / maxTime
        const progress = TBSE.Easings.getFunction(fnName)(t)
        return ori + ((target - ori) * progress);
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
        this._repeatFrames = null // Delete repeat frames
        this.sequencer()._animCell = Number(args.frame);
        this.sequencer()._suffix = args.suffix
        args.interpreter.wait(args.wait);
    }

    cmd.poserepeat = function(args){
        const obj = {
            list: JSON.parse(args.frames).map(o => JSON.parse(o)),
            index: -1,
            delay: 0,
        }
        obj.max = args.repeatmode === "Indefinitely" ? 
            Infinity : 
            (args.repeatmode === "Once" ? obj.list.length : TBSE.evalNumber(args.repeatmode) * obj.list.length)
        
        this.sequencer()._repeatFrames = obj
        if(args.wait === "true"){
            args.interpreter._waitMode = "repeatFrame"
        }
    }

    // Move command
    cmd.move = function(args){
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
                targX += targets.reduce((total, trg)=>{ return trg.sprite()._realX + total}, 0) / targets.length
                targY += targets.reduce((total, trg)=>{ return trg.sprite()._realY + total}, 0) / targets.length
                break;
            case "Slide":
                targX += spr._realX;
                targY += spr._realY;
                break;
            case "Home":
                targX += this.homePos().x;
                targY += this.homePos().y;
                break;
        }
        spr.goto(targX, targY, TBSE.evalNumber(args.dur), TBSE.evalNumber(args.jump), args.fn, args.fn)
    }

    // Move command (target)
    cmd.moveTarget = function(args){
        const seq = this.sequencer()
        // Individual
        if(args.scope == "Individual"){
            for(const t of seq._targetArray){
                const spr = t.sprite()
                let targX = TBSE.evalNumber.call(this, args.x)
                let targY = TBSE.evalNumber.call(this, args.y)
                switch(args.to){
                    case "Subject":
                        targX += this.sprite()._realX
                        targY += this.sprite()._realY
                        break;
                    case "Slide":
                        targX += spr._realX;
                        targY += spr._realY;
                        break;
                    case "Home":
                        targX += t.homePos().x;
                        targY += t.homePos().y;
                        break;
                }
                spr.goto(targX, targY, TBSE.evalNumber(args.dur), TBSE.evalNumber(args.jump), args.fn, args.fn)
            }

        // Center Mass
        }else{
            const allTarget = seq._targetArray
            const centerX = allTarget.reduce((total, t) => { return t.sprite()._realX + total }, 0) / allTarget.length
            const centerY = allTarget.reduce((total, t) => { return t.sprite()._realY + total }, 0) / allTarget.length

            let targX = TBSE.evalNumber.call(this, args.x)
            let targY = TBSE.evalNumber.call(this, args.y)

            switch(args.to){
                case "Subject":
                    targX += this.sprite()._realX
                    targY += this.sprite()._realY
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
                this._homeX = targets.reduce((total, trg)=>{ return trg.sprite()._realX + total}, 0) + TBSE.evalNumber.call(this, args.x)
                this._homeY = targets.reduce((total, trg)=>{ return trg.sprite()._realY + total}, 0) + TBSE.evalNumber.call(this, args.y)
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
    cmd.actionEffect = function(){
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
        const aft = {
            rate: Number(args.rate),
            opacityEase: Number(args.opacityEase),
            startOpacity: Number(args.startOpacity)
        }
        switch(args.blendmode){
            case "Follow Sprite":
                aft.blendMode = -1
                break;
            case "Normal":
                aft.blendMode = 0
                break;
            case "Add":
                aft.blendMode = 1
                break;
            case "Sub":
                aft.blendMode = 2
                break;
        }
        this.sequencer()._afterimage = aft
    }

    cmd.aftOff = function(){
        this.sequencer()._afterimage = null
    }
    
    cmd.focusOn = function(args){
        TBSE.Focus.duration = Number(args.duration)
        TBSE.Focus.maxDuration = Number(args.duration)
        TBSE.Focus.startOp = 0
        TBSE.Focus.targetOp = Number(args.dim)

        if(args.target !== "Everyone"){
            let fn;
            switch(args.target){
                case "Current Targets":
                    fn = t => this.sequencer()._targetArray.includes(t)
                    break;
                case "All opponents unit":
                    fn = t => this.opponentsUnit().members().includes(t)
                    break;
                case "All friends units":
                    fn = t => this.friendsUnit().members().includes(t)
                    break;
                case "Self":
                    fn = () => false
                    break;
            }
            for(const battler of [...$gameTroop.members(), ...$gameParty.battleMembers()]){
                if(battler !== this && (battler.isActor() ? true : battler.isAlive())){
                    const check = fn(battler)
                    if(!check && battler.sprite()){
                        battler.sprite().startFade("out", args.duration)
                    }
                }
            }
        }
    }

    cmd.focusOff = function(args){

        TBSE.Focus.duration = Number(args.duration)
        TBSE.Focus.maxDuration = Number(args.duration)
        TBSE.Focus.startOp = Number(TBSE.Focus.targetOp)
        TBSE.Focus.targetOp = 0

        for(const battler of [...$gameParty.battleMembers(), ...$gameTroop.members()]){
            if((battler.isActor() || battler.isAlive()) && battler.sprite()){
                battler.sprite().startFade("in", args.duration)
            }
        }
    }

    cmd.blend = function(args){
        switch(args.mode){
            case "Normal":
                this.sequencer()._blendMode = 0
                break;
            case "Add":
                this.sequencer()._blendMode = 1
                break;
            case "Sub":
                this.sequencer()._blendMode = 2
                break;
        }
    }

    cmd.spinStart = function(args){
        const spinning = {
            curRotation: this.sprite().sudut * 180 / Math.PI,
            initSpeed: TBSE.evalNumber.call(this, args.startspd),
            accel: TBSE.evalNumber.call(this, args.accelspd),
            max: TBSE.evalNumber.call(this, args.maxspd),
            fnName: args.fnName
        }
        spinning.speed = spinning.initSpeed
        this.sequencer()._spinning = spinning
    }

    cmd.spinEnd =  function(){
        this.sequencer()._spinning = null
        this.sprite().sudut = 0
    }

    cmd.rotate = function(args){
        const rotation = {
            maxDuration: TBSE.evalNumber.call(this, args.dur),
            duration: TBSE.evalNumber.call(this, args.dur),
            initRotation: this.sprite().sudut * 180 / Math.PI,
            targetRotation: TBSE.evalNumber.call(this, args.angle),
            reset: args.reset === "true",
            fnName: args.fnName
        }
        this.sequencer()._rotation = rotation
    }

    cmd.scale = function(args){
        const scaling = {
            maxDuration: TBSE.evalNumber.call(this, args.dur),
            duration: TBSE.evalNumber.call(this, args.dur),
            initValue: (this.sprite().scale.x + this.sprite().scale.y) / 2,
            targetValue: TBSE.evalNumber.call(this, args.size),
            reset: args.reset === "true",
            fnName: args.fnName
        }
        this.sequencer()._scaling = scaling
    }

    cmd.projectile = function(args){
        const opt = Object.assign({}, args)

        //console.log(opt)

        // Parse object
        opt.aftimg = JSON.parse(args.aftimg)
        opt.animsetup = JSON.parse(args.animsetup)
        opt.img = JSON.parse(args.img)
        opt.startpoint = JSON.parse(args.startpoint)
        opt.endpoint = JSON.parse(args.endpoint)
        opt.movefn = args.fn
        opt.user = this
        opt.itemInUse = JsonEx.makeDeepCopy(this.sequencer()._itemInUse)

        // Interpret number
        opt.duration = TBSE.evalNumber.call(this, args.duration)
        opt.jump = TBSE.evalNumber.call(this, args.jump)
        opt.delay = TBSE.evalNumber.call(this, args.delay)

        // {"y":"0","x":"0","relativeto":"Each Target","position":"Middle"}
        opt.startpoint.x = TBSE.evalNumber.call(this, opt.startpoint.x)
        opt.startpoint.y = TBSE.evalNumber.call(this, opt.startpoint.y)

        // {"y":"0","x":"0","relativeto":"Each Target","position":"Middle"}
        opt.endpoint.x = TBSE.evalNumber.call(this, opt.endpoint.x)
        opt.endpoint.y = TBSE.evalNumber.call(this, opt.endpoint.y)

        // {"icon":"0","file":"","animation":"0","animfollow":"true","spin":"0","autoAngle":"true"}
        opt.img.icon = Number(opt.img.icon)
        opt.img.animation = Number(opt.img.animation)
        opt.img.spin = Number(opt.img.spin)

        // {"rate":"0","opacityEase":"20", "startOpacity": "100", "blendmode": "Normal"}
        opt.aftimg.rate = Number(opt.aftimg.rate)
        opt.aftimg.opacityEase = Number(opt.aftimg.opacityEase)
        opt.aftimg.startOpacity = Number(opt.aftimg.startOpacity)

        // {"start":"0","ending":"-1","trail":"0"}
        opt.animsetup.start = Number(opt.animsetup.start)
        opt.animsetup.ending = Number(opt.animsetup.ending)
        opt.animsetup.trail = Number(opt.animsetup.trail)

        const sprList = []
        sprList.push = function(e) {
            Array.prototype.push.call(this, e)
            e.setup(opt)
        }
        let spr;

        const determineTarget = (sprPrj) => {
            sprPrj._invokeTargets = [...this.sequencer()._targetArray]
            switch(opt.endpoint.relativeto){
                case "Center of all targets":
                    sprPrj._targets = [...this.sequencer()._targetArray]
                    break;
                case "Self":
                    sprPrj._targets = [this]
                    break;
                case "Fixed Point":
                    sprPrj._target = [new Point()]
                    break;
            }
            sprPrj._targets.position = opt.endpoint.position
            sprPrj._targets.x = opt.endpoint.x
            sprPrj._targets.y = opt.endpoint.y
            sprPrj.setup(opt)
        }

        // From each target to each target makes this code convoluted :/
        switch(opt.startpoint.relativeto){
            case "Each Target":
                for(const t of this.sequencer()._targetArray){
                    // This is dumb actually
                    if(opt.endpoint.relativeto == "Each Target"){
                        for(const trg of this.sequencer()._targetArray){
                            const spr = new TBSE.Projectile()
                            spr._start = [t]
                            spr._start.position = opt.startpoint.position
                            spr._start.x = opt.startpoint.x
                            spr._start.y = opt.startpoint.y

                            spr._invokeTargets = [trg]
                            spr._targets = [trg]
                            spr._targets.position = opt.endpoint.position
                            spr._targets.x = opt.endpoint.x
                            spr._targets.y = opt.endpoint.y
                            sprList.push(spr)
                        }
                    }else{
                        const spr = new TBSE.Projectile()
                        spr._start = [t]
                        spr._start.position = opt.startpoint.position
                        spr._start.x = opt.startpoint.x
                        spr._start.y = opt.startpoint.y
                        determineTarget(spr)
                        sprList.push(spr)
                    }
                }
                break;
            case "Center of all targets":
                if(opt.endpoint.relativeto == "Each Target"){
                    for(const trg of this.sequencer()._targetArray){
                        const spr = new TBSE.Projectile()
                        spr._start = [...this.sequencer()._targetArray]
                        spr._start.position = opt.startpoint.position

                        spr._invokeTargets = [trg]
                        spr._targets = [trg]
                        spr._targets.position = opt.endpoint.position
                        spr._targets.x = opt.endpoint.x
                        spr._targets.y = opt.endpoint.y
                        sprList.push(spr)
                    }
                }else{
                    spr = new TBSE.Projectile()
                    spr._start = [...this.sequencer()._targetArray]
                }
                break;
            case "Self":
                if(opt.endpoint.relativeto == "Each Target"){
                    for(const trg of this.sequencer()._targetArray){
                        const spr = new TBSE.Projectile()
                        spr._start = [this]
                        spr._start.position = opt.startpoint.position

                        spr._invokeTargets = [trg]
                        spr._targets = [trg]
                        spr._targets.position = opt.endpoint.position
                        sprList.push(spr)
                    }
                }else{
                    spr = new TBSE.Projectile()
                    spr._start = [this]
                }
                break;
            case "Fixed Point":
                if(opt.endpoint.relativeto == "Each Target"){
                    for(const trg of this.sequencer()._targetArray){
                        const spr = new TBSE.Projectile()
                        spr._start = [new Point()]
                        spr._start.position = opt.startpoint.position

                        spr._invokeTargets = [trg]
                        spr._targets = [trg]
                        spr._targets.position = opt.endpoint.position
                        sprList.push(spr)
                    }
                }else{
                    spr = new TBSE.Projectile()
                    spr._start = [new Point()]
                }
                break;
        }
        if(spr){
            spr._start.position = opt.startpoint.position
            spr._start.x = opt.startpoint.x
            spr._start.y = opt.startpoint.y
            determineTarget(spr)
            sprList.push(spr)
        }
        TBSE.Projectile._queue = [...TBSE.Projectile._queue, ...sprList]
    }

    cmd.cam = function(args){
        const spr = this.sprite();
        let targX = TBSE.evalNumber.call(this, args.x)
        let targY = TBSE.evalNumber.call(this, args.y)
        if (this.isEnemy() && TBSE._invertX){ // necessary?
            targX *= -1
        }
        switch(args.to){
            case "Target":
                const seq = this.sequencer()
                const targets = seq._targetArray.length > 0 ? seq._targetArray : TBSE._affectedBattlers
                targX += targets.reduce((total, trg)=>{ return trg.sprite().camRelativeX() + total}, 0) / targets.length
                targY += targets.reduce((total, trg)=>{ return trg.sprite().camRelativeY() + total}, 0) / targets.length
                break;
            case "User":
                targX += spr.camRelativeX();
                targY += spr.camRelativeY();
                break;
        }
        TBSE.Cam.startMove(targX, targY, TBSE.evalNumber(args.zoom), TBSE.evalNumber(args.dur), args.fn)
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
            this.initProperties()
            this.startIdleMotion()
        }

        initProperties(){
            this._animCell = 0                                  // Store the current shown sheet frame
            this._itemInUse = null                              // Store the currently used item/skill
            this._oriTargets = []                               // Store the original targets
            this._targetArray = []                              // Store the current targets
            this._visible = true                                // Determine if the battler is visible
            this._originalItemUse = null                        // Store the original item use
            this._victims = []                                  // Record All target victims (not necessarily a victim, it just a funny variable name)
            this._flip = TBSE.defaultFlip(this.dataBattler())   // Determine if the battler image is flipped
            this._blendMode = 0                                 // Store the blend mode
            this._afterimage = null                             // Store the afterimage data
            this._repeatFrames = null                           // Store the repeated frames
            this._spinning = null                               // Store the spinning handler
            this._rotation = null                               // Handles rotation
            this._scaling = null                                // Store scaling
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
            if(this._repeatFrames && this._repeatFrames.delay-- <= 0){
                this.updateRepeatedFrames()
            }
            if(this._spinning){
                this.updateSpin()
            }
            if(this._rotation && this._rotation.duration-- > 0){
                this.updateRotating()
            }
            if(this._scaling && this._scaling.duration-- > 0) {
                this.updateScaling()
            }
        }

        updateScaling(){
            const tMax = this._scaling.maxDuration
            const t = tMax - this._scaling.duration
            const init = this._scaling.initValue
            const target = this._scaling.targetValue
            const fn = this._scaling.fnName
            const scale = TBSE.Easings.fn(init, target, t, tMax, fn)
            this.battler().sprite().scale.x = scale
            this.battler().sprite().scale.y = scale
            if(this._scaling.duration <= 0){
                this._scaling = null
            }
        }

        updateRepeatedFrames(){
            this._repeatFrames.index += 1
            if(this._repeatFrames.index >= this._repeatFrames.max){
                this._repeatFrames = null
                return
            }
            const list = this._repeatFrames.list[this._repeatFrames.index % this._repeatFrames.list.length]
            this._repeatFrames.delay = list.wait
            this._animCell = list.frame
            this._suffix = list.suffix
        }

        updateSpin(){
            this._spinning.curRotation += this._spinning.speed
            this._spinning.curRotation %= 360
            this._spinning.speed = (this._spinning.speed + this._spinning.accel).clamp(this._spinning.initSpeed, this._spinning.max)
            this.battler().sprite().sudut = (this._spinning.curRotation * Math.PI) / 180
        }

        updateRotating(){
            const tMax = this._rotation.maxDuration
            const t = tMax - this._rotation.duration
            const initR = this._rotation.initRotation
            const trgR = this._rotation.targetRotation
            const fn = this._rotation.fnName
            const curRotation = TBSE.Easings.fn(initR, trgR, t, tMax, fn)
            this.battler().sprite().sudut = (curRotation * Math.PI) / 180
            if(this._rotation.duration <= 0){
                if(this._rotation.reset){
                    this.battler().sprite().sudut = 0
                }
                this._rotation = null
            }
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
                this._interpreter.setup(actionId, "skill", this.postAction, this)
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

        updateWaitMode(){
            if(this._waitMode === "repeatFrame"){
                return !!this.battler().sequencer()._repeatFrames
            }
            return Game_Interpreter.prototype.updateWaitMode.call(this)
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
            return !!this._itemInUse ? this._itemInUse : this.subject().sequencer()._itemInUse
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
    const gb = Game_Battler.prototype;

    TBSE.battler.onBattleStart = gb.onBattleStart
    gb.onBattleStart = function(){
        TBSE.battler.onBattleStart.call(this);
        TBSE._sequencer[this.battlerKey()] = new TBSE.Sequencer(this)
    }

    gb.dataBattler = function(){
        if(this.isActor()){
            return $dataActors[this._actorId]
        }else{
            return $dataEnemies[this._enemyId]
        }
    }

    // Sideview battler name suffix
    gb.svsuffix = function(){
        return this.sequencer()._suffix
    }

    gb.sequencer = function(){
        return TBSE._sequencer[this.battlerKey()]
    }

    gb.homePos = function() {
        return {
            x: 0,
            y: 0
        }
    }

    gb.updateSequencer = function(){
        const seq = this.sequencer()
        if(seq){
            seq.update();
        }
    }

    gb.battlerKey = function(){
        if (this.isActor()){
            return `a${this._actorId}`
        }else{
            return `e${this.index()}`
        }
    }

    gb.sprite = function(){
        return TBSE._battlerSprites[this.battlerKey()]
    }

    gb.clearActionSequence = function(){
        delete TBSE._sequencer[this.battlerKey()]
    }

    // Check if the battler is busy doing action
    gb.isDoingAction = function(){
        const seq = this.sequencer()
        if (seq === undefined){
            return false
        }
        return (seq._interpreter._phaseName == "action" || seq._interpreter._phaseName == "skill") && !seq._interpreter.ending()
    }

    // Record result while clearing the damage popup
    TBSE.battler.clearPopup = gb.clearDamagePopup
    gb.clearDamagePopup = function() {
        TBSE.battler.clearPopup.call(this)
        if(this.sequencer()){
            this.sequencer()._actionRecord.addRecord(this._result)
        }
    };

    // Return to original position
    gb.returnHome = function(){
        const home = this.homePos()
        this.sprite().goto(home.x, home.y, 10, 0)
    }

    // Check if elegible for collapse effect (i.e, dead)
    gb.checkCollapse = function(){
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
    TBSE.battler.refresh = gb.refresh
    gb.refresh = function(){
        TBSE.battler.refresh.call(this)
        if(this.hp > 0){
            this._collapsed = false
        }
    }

    TBSE.battler.performCollapse = gb.performCollapse
    gb.performCollapse = function() {
        const collapseKeyId = this.dataBattler()._sequenceList.collapse
        if(collapseKeyId > 0){
            this.sequencer().doAction(collapseKeyId)
        }else{
            TBSE.battler.performCollapse.call(this)
        }
        this._collapsed = true
    };

    gb.counterSkill = function(){
        return $dataSkills[this.counterSkillId()]
    }
    
    gb.counterSkillId = function(){
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
    gb.stateAnim = function(){
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
        this._tbseMoveDuration = 0;         // Current duration (count down)
        this._maxDuration = 0;              // Maximum duration
        this._jumpPower = 0;                // Jump force
        this._realX = 0;                    // Sprite current display X
        this._realY = 0;                    // Sprite current display Y
        this._targX = 0;                    // Target X axis
        this._targY = 0;                    // Target Y axis
        this._oriX = 0;                     // Original X before moving
        this._oriY = 0;                     // Original Y before moving
    }

    TBSE.spriteBattler.setHome = sb.setHome
    sb.setHome = function(x, y) {
        this._realX = x
        this._realY = y
        TBSE.spriteBattler.setHome.call(this, x, y)
    };

    // Redirect rotation because different way to handle sprite
    // sudut is ID term for angle, to avoid name clash
    Object.defineProperty(sb, "sudut", {
        get: function(){
            return this._mainSprite ? this._mainSprite.rotation : this.rotation
        },
        set: function(value){
            if(this._mainSprite) 
                this._mainSprite.rotation = value
            else
                this.rotation = value
        },
        configurable: false,
    })

    // Overwrite update visibility
    sb.updateVisibility = function() {
        Sprite_Clickable.prototype.updateVisibility.call(this);
        if (!this._battler) {
            this.visible = false;
        }else{
            this.visible = this._battler.isSpriteVisible()
        }
    };

    TBSE.spriteBattler.createDamageSpr = sb.createDamageSprite
    sb.createDamageSprite = function() {
        TBSE.spriteBattler.createDamageSpr.call(this)
        this._damages[this._damages.length - 1].zIndex = Graphics.height * 3 + 100
    };

    TBSE.spriteBattler.updateMain = sb.updateMain
    sb.updateMain = function(){
        TBSE.spriteBattler.updateMain.call(this)
        if(this._battler){
            this.updateTBSE()
        }
    }

    sb.updateTBSE = function(){
        this.scale.x = Math.abs(this.scale.x) * (this._battler.sequencer()._flip ? -1 : 1)
        this.zIndex = this.zFormula()
        if (this._updateFading){
            if(this._updateFading.duration > 0){
                this._updateFading.duration--
                const t = this._updateFading.maxDuration - this._updateFading.duration
                const oriOp = this._updateFading.start
                const trgOp = this._updateFading.end
                this.opacity = TBSE.Easings.fn(oriOp, trgOp, t, this._updateFading.maxDuration, this._updateFading.fnName)
            }else{
                this.opacity = this._updateFading.end
                this._updateFading = undefined
            }
        }
    }

    sb.zFormula = function(){
        return this._realY * 2 + (this._battler.sequencer()._interpreter._phaseName == "skill" ? 1 : 0)
    }
    // Fadein
    sb.startFade = function(mode, dur, fn = "Linear"){
        this._updateFading = {
            maxDuration: dur,
            duration: dur,
            start: this.opacity,
            end: (mode === "out" ? 0 : 255),
            fnName: fn
        }
    }
    // Overwrite update position
    sb.updatePosition = function() {
        if (this._tbseMoveDuration > 0) {
            this._tbseMoveDuration -= 1;
            const time = this._maxDuration - this._tbseMoveDuration
            this._realX = TBSE.Easings.fn(this._oriX, this._targX, time, this._maxDuration, this._fnX)
            this._realY = TBSE.Easings.fn(this._oriY, this._targY, time, this._maxDuration, this._fnY)
        }
        // Offset is preserved for the default move function (step forward for selecting)
        // Home position is not used
        this.x = this._realX + this._offsetX;
        this.y = this._realY + this._offsetY - this.jumpHeight();
    };

    // It is possible to use a different function, for example, if you want to use easing movement
    sb.goto = function(x, y, duration, jump = 0, fnX = "Linear", fnY = "Linear"){
        this._maxDuration = duration;
        this._jumpPower = jump;
        this._targX = x;
        this._targY = y;
        this._oriX = this._realX;
        this._oriY = this._realY;
        this._tbseMoveDuration = duration;
        this._fnX = fnX;
        this._fnY = fnY;
    }

    sb.jumpHeight = function(){
        if (this._tbseMoveDuration === 0) {
            return 0
        }    

        const maxHeight = this._jumpPower
        const halfTime = this._maxDuration/2
        const g = maxHeight / (0.5 * Math.pow(halfTime, 2))
        const v0 = ((0.5 * g * Math.pow(halfTime, 2)) + maxHeight)/halfTime

        const time = (this._maxDuration - this._tbseMoveDuration) - 1
        const height = (v0 * time) - (g * time * (time + 1) / 2);
        return Math.max(0, height);
    }

    // Relative X position for camera
    sb.camRelativeX = function(){
        return this.x - Graphics.boxWidth/2
    }

    // Relative Y position for camera
    sb.camRelativeY = function(){
        return this.y - Graphics.boxHeight/2
    }
    //#endregion
    //============================================================================================= 

    //=============================================================================================
    //#region Afterimage
    //---------------------------------------------------------------------------------------------
    TBSE.Afterimages = class {//class extends Sprite{
        constructor(ref){
            this.imagelist = []
            this.ref = ref
            this.counter = 0
        }
    
        update(){
            this.zIndex = this.ref.zIndex - 1
            this.generateAfterimage()
            this.counter++
            for(const img of this.imagelist){
                if(img.opacity <= 0){
                    this.imagelist.remove(img)
                    TBSE.Afterimages._expiredImg.push(img)
                }
            }
        }
    
        generateAfterimage(){
            const aftOption = this.aftOption()
            if (!!aftOption && this.counter % aftOption.rate === 0){
                this.counter = 0
                const aftimg = new TBSE.Afterimage(this.ref, aftOption)
                aftimg.zIndex = this.zIndex
                this.imagelist.push(aftimg)
                TBSE.Afterimages._requestedImg.push({
                    spr: aftimg,
                    ref: this.ref
                })
            }
        }

        aftOption(){
            const battler = this.ref._battler
            return !!battler ? battler.sequencer()._afterimage : null
        }
    }

    TBSE.Afterimages._requestedImg = []
    TBSE.Afterimages._expiredImg = []

    TBSE.Afterimage = class extends Sprite{
        constructor(sprite, options){
            super()
            this.clone(sprite, options)
        }
    
        // Clone everything here
        clone(sprite, options){
            const isActor = !!sprite._mainSprite
            const sprObj = isActor ? sprite._mainSprite : sprite
            this.sprite = sprObj
            this.options = options
            this.bitmap = sprObj.bitmap
            this.opacity = sprObj.opacity * (options.startOpacity / 100)
            this.anchor.x = sprObj.anchor.x
            this.anchor.y = sprObj.anchor.y
            this.scale.x = isActor ? sprObj.parent.scale.x : sprObj.scale.x
            this.scale.y = isActor ? sprObj.parent.scale.y : sprObj.scale.y
            this.rotation = sprObj.rotation
            this.blendMode = options.blendMode === -1 ? sprObj.blendMode : options.blendMode
            this.x = isActor ? sprObj.parent.x : sprObj.x
            this.y = isActor ? sprObj.parent.y + (sprObj.y * this.scale.y) : sprObj.y
            const frame = sprObj._frame
            this.setFrame(frame.x, frame.y, frame.width, frame.height)
        }
    
        update(){
            Sprite.prototype.update.call(this)
            this.opacity -= this.options.opacityEase
            this.zIndex -= 1
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
        this._mainSprite.anchor.y = 0.5 // Rewrite anchor for spinning
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
    };

    sa.updateTBSE = function(){
        sb.updateTBSE.call(this)
        // Asynchronous handler
        if(this._mainSprite.bitmap.height > 0)
            this._mainSprite.y = -(this._mainSprite.height/2) //* this.scale.y
        this._afterimages.update()
        this._mainSprite.blendMode = this._battler.sequencer()._blendMode
    }
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
        TBSE.spriteEnemy.initMembers.call(this)
        this.anchor.y = 0.5 // For spinning
        this._afterimages = new TBSE.Afterimages(this)
    };

    TBSE.spriteEnemy.setBattler = se.setBattler
    se.setBattler = function(battler) {
        TBSE.spriteEnemy.setBattler.call(this, battler);
        if (battler !== undefined){
            TBSE._battlerSprites[battler.battlerKey()] = this;
        }
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

    TBSE.spriteEnemy.updatePos = se.updatePosition
    se.updatePosition = function() {
        TBSE.spriteEnemy.updatePos.call(this)
        this.y -= this.height/2
    };

    se.updateTBSE = function(){
        sb.updateTBSE.call(this)
        // this.rotation += 0.01
        this._afterimages.update()
        this.blendMode = this._battler.sequencer()._blendMode
    }

    TBSE.spriteEnemy.updateStateSpr = se.updateStateSprite
    se.updateStateSprite = function(){
        if(this._battler.dataBattler()._isAnimated){
            this._stateIconSprite.y = -Math.round((this.height + 40) * 0.9);
        } else {
            TBSE.spriteEnemy.updateStateSpr.call(this);
        }
    }


    //#endregion
    //============================================================================================= 
    //#region Focus
    TBSE.Focus = {
        Sprite: class extends ScreenSprite{
            constructor(){
                super()
                this.setBlack()
            }

            update(){
                Sprite.prototype.update.call(this)
                if(TBSE.Focus.duration > 0){
                    TBSE.Focus.duration--
                    const t = TBSE.Focus.maxDuration - TBSE.Focus.duration
                    const oriOp = TBSE.Focus.startOp
                    const trgOp = TBSE.Focus.targetOp
                    this.opacity = TBSE.Easings.fn(oriOp, trgOp, t, TBSE.Focus.maxDuration, TBSE.Focus.fnName)
                }
            }
        },

        duration: 0,
        maxDuration: 0,
        startOp: 0,
        targetOp: 180,
        fnName: "Linear",
    }
    //#endregion
    //============================================================================================= 
    //#region Projectile
    TBSE.Projectile = class extends Sprite{
        constructor(){
            super(...arguments)
            this.init()
        }

        init(){
            this._returning = false
            this._piercing = false // Later
        }

        setup(options){
            this._opt = options
            this._delay = options.delay
            this.loadImage()
            this.loadAnimation()
            this.loadAfterimage()
            this.updateDelay()
            if(this._opt.effect === "The beginning"){
                this.invokeEffect()
            }
        }

        loadImage(){
            this.anchor.x = 0.5
            this.anchor.y = 0.5
            // Image takes priority
            if(this._opt.img.file.length > 0){
                // TODO
            }else if(this._opt.img.icon > 0){
                const iconIndex = this._opt.img.icon
                const bitmap = ImageManager.loadSystem("IconSet");
                const pw = ImageManager.iconWidth;
                const ph = ImageManager.iconHeight;
                const sx = (iconIndex % 16) * pw;
                const sy = Math.floor(iconIndex / 16) * ph;
                this.bitmap = bitmap
                this.setFrame(sx, sy, pw, ph)                
            }
        }

        loadAfterimage(){
            if(this._opt.aftimg.rate > 0){
                this._afterimages = new TBSE.Afterimages(this)
                this._afterimages.aftOption = function() {
                    this._opt.aftimg
                }.bind(this)
            }
        }

        loadAnimation(){
            // Load looped animation
            const animloop = $dataAnimations[this._opt.img.animation]
            if (animloop){
                const mv = Spriteset_Base.prototype.isMVAnimation(animloop)
                this._animloop = new (mv ? TBSE.AnimationLoop_MV : TBSE.AnimationLoop)()
                this._animloop.setup([this], animloop, false, 0, 0);
                //this.addChild(sprLoop)
            }
        }

        startMove(duration, jump, startTarget, endTargets, onEnd){
            const point = this.makeTargetPoint(startTarget)
            this._movement = {
                maxDuration: duration,
                duration: duration,
                jump: jump,
                startX: point.x,
                startY: point.y,
                endtargets: endTargets,
                onEnd: onEnd
            }
        }

        update(){
            Sprite.prototype.update.call(this)
            this.updateDelay()
            this.updateMove()
            this.updateSpin()
            if(this._animloop){
                TBSE.updateZindex(this._animloop)
            }
            if(this._afterimages){
                this._afterimages.update()
            }
        }

        updateDelay(){
            if(this._delay !== null && this._delay-- <= 0){
                if(this._opt.type === "Boomerang"){
                    const fnEnd = this.onBoomerangEnding.bind(this)
                    this.startMove(this._opt.duration, this._opt.jump, this._start, this._targets, fnEnd)
                }else if(this._opt.type === "Piercing"){ // TODO
                    const fnEnd = this.onPiercingEnding.bind(this)
                    this.startMove(this._opt.duration, this._opt.jump, this._start, this._targets, fnEnd)
                }else{
                    const fnEnd = this.onEnding.bind(this)
                    this.startMove(this._opt.duration, this._opt.jump, this._start, this._targets, fnEnd)
                }
                this._delay = null                
            }
        }

        updateSpin(){
            if(this._opt){
                this.rotation += (this._opt.img.spin * Math.PI) / 180
            }
        }

        updateMove(){
            this.zIndex = Graphics.width * 3
            if(this._movement && this._movement.duration > 0){
                const t = this._movement.maxDuration - this._movement.duration
                this._movement.duration -= 1;

                // Homing to the target
                const point = this.makeTargetPoint(this._movement.endtargets)
                const trgx = point.x
                const trgy = point.y

                const lastx = this.x
                const lasty = this.y

                this.x = TBSE.Easings.fn(this._movement.startX, trgx, t, this._movement.maxDuration, this._opt.movefn)
                this.y = TBSE.Easings.fn(this._movement.startY, trgy, t, this._movement.maxDuration, this._opt.movefn) - this.jumpHeight()

                if(this._opt.img.autoAngle === "true"){
                    const diffx = this.x - lastx
                    const diffy = this.y - lasty
                    const angle = Math.atan(diffy / diffx)
                    this.rotation = -angle 
                }

                this.createTrailingAnimation()

                if(this._movement.duration === 0){
                    this._movement.onEnd()
                }
            }
        }

        makeTargetPoint(targets){
            targets.x ||= 0
            targets.y ||= 0

            targets.position ||= "Middle"
            const x = targets.reduce((total, t) => {
                if(t.sprite){
                    const spr = t.sprite()
                    switch(targets.position){
                        case "Top-Left":
                        case "Mid-Left":
                        case "Bottom-Left":
                            return -(spr.width/2) + spr._realX + total
                            
                        case "Top-Mid":
                        case "Middle":
                        case "Bottom-Mid":
                            return spr._realX + total
                            
                        case "Top-Right":
                        case "Mid-Right":
                        case "Bottom-Right":
                            return (spr.width/2) + spr._realX + total
                    }
                }else{
                    return t.x + total
                }
            }, 0) / targets.length + targets.x

            const y = targets.reduce((total, t) => {
                if(t.sprite){
                    const spr = t.sprite()
                    switch(targets.position){
                        case "Top-Left":
                        case "Top-Mid":
                        case "Top-Right":
                            return -spr.height + spr._realY + total - spr.jumpHeight()
                            
                        case "Mid-Left":
                        case "Middle":
                        case "Mid-Right":
                            return -(spr.height/2) + spr._realY + total - spr.jumpHeight()
                            
                        case "Bottom-Left":
                        case "Bottom-Mid":
                        case "Bottom-Right":
                            return spr._realY + total - spr.jumpHeight()
                    }
                }else{
                    return t.y + total
                }
            }, 0) / targets.length + targets.y
            return new Point(x, y)
        }

        jumpHeight(){
            if (this._movement.duration === 0) {
                return 0
            }

            const maxHeight = this._movement.jump
            const halfTime = this._movement.maxDuration/2
            const g = maxHeight / (0.5 * Math.pow(halfTime, 2))
            const v0 = ((0.5 * g * Math.pow(halfTime, 2)) + maxHeight)/halfTime
            
            const time = (this._movement.maxDuration - this._movement.duration) - 1
            const height = (v0 * time) - (g * time * (time + 1) / 2);
            return height
        }

        invokeEffect(){
            for(const target of this._invokeTargets){

                // Creating a new action means it may skip force result. Will fix that later if someone complains :v
                const action = new TBSE.Action(this._opt.user)
                action._itemInUse = this._opt.itemInUse
                action.apply(target);
                if (target.shouldPopupDamage()){
                    target.startDamagePopup();
                    const tseq = target.sequencer()
                    if (tseq.canPlayEvadeMotion()){
                        tseq._targetArray = [this._opt.user]
                        tseq.motionEvade()
                    }else if (tseq.canPlayDamagedMotion()){
                        tseq._targetArray = [this._opt.user]
                        tseq.motionDamaged()
                    }
                }
            }
            if(this._opt.user.shouldPopupDamage()){
                this._opt.user.startDamagePopup();
            }
        }

        createTrailingAnimation(){
            if(this._opt.animsetup.trail > 0){
                // TODO
            }
        }

        onBoomerangEnding(){
            this._returning = true
            if(this._opt.effect === "Reaching the target"){
                this.invokeEffect()
            }
            this.startMove(this._opt.duration, this._opt.jump * -1, this._targets, this._start, this.onEnding.bind(this))
        }

        onPiercingEnding(){
            // TODO
        }

        onEnding(){
            if(!this._returning && this._opt.effect === "Reaching the target"){
                this.invokeEffect()
                const arr = this._targets
                arr.fixed = true          

                const animsetup = this._opt.animsetup.ending
                if(animsetup == -1){
                    $gameTemp.requestAnimation(arr, this._opt.itemInUse.animation_id, false);
                }else if(animsetup > 0){
                    $gameTemp.requestAnimation(arr, animsetup, false);
                }
            }            
            this._movement = null
            TBSE.Projectile._expired.push(this)
        }
    }

    TBSE.Projectile._queue = []
    TBSE.Projectile._onGoing = []
    TBSE.Projectile._expired = []

    //#endregion
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

    TBSE.sprset.createbb = sset.createBattleback
    sset.createBattleback = function() {
        TBSE.sprset.createbb.call(this)
        this._focusBG = new TBSE.Focus.Sprite()
        this._baseSprite.addChild(this._focusBG)
    };

    TBSE.sprset.createbf = sset.createBattleField
    Spriteset_Battle.prototype.createBattleField = function() {
        TBSE.sprset.createbf.call(this)
        this._battleField.sortableChildren = true
    };


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
        this.updateTBSE()
    };

    sset.updateTBSE = function(){
        for(const spr of this._animationSprites){
            TBSE.updateZindex(spr)
        }
        this.updateAfterimages()
        this.updateProjectiles()
    }

    sset.updateAfterimages = function(){
        for(const img of [...TBSE.Afterimages._requestedImg]){
            this._battleField.addChild(img.spr)
            TBSE.Afterimages._requestedImg.remove(img)
        }
        for(const img of [...TBSE.Afterimages._expiredImg]){
            img.destroy()
            TBSE.Afterimages._expiredImg.remove(img)
        }
    }

    sset.doProjectilesExist = function(){
        return TBSE.Projectile._onGoing.length > 0
    }

    sset.updateProjectiles = function(){
        for(const prj of [...TBSE.Projectile._queue]){
            this._battleField.addChild(prj)
            if (prj._animloop){
                this._battleField.addChild(prj._animloop)
            }
            TBSE.Projectile._queue.remove(prj)
            TBSE.Projectile._onGoing.push(prj)
        }
        for(const prj of [...TBSE.Projectile._expired]){
            if (prj._animloop){
                prj._animloop.destroy()
            }
            prj.destroy()
            TBSE.Projectile._expired.remove(prj)
            TBSE.Projectile._onGoing.remove(prj)
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
        if (this.isAnimationForEach(animation) && !targets.center) { // Lemme decide if it is center or not
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
        const spr = this._animationSprites[this._animationSprites.length - 1]
        spr._layer = targets.layer // Update layer information
        TBSE.updateZindex(spr)
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

    // Also look for the sprites
    TBSE.sprset.findTargetSpr = sset.findTargetSprite
    sset.findTargetSprite = function(target) {
        const trgSpr = TBSE.sprset.findTargetSpr.call(this, target)
        if(!!trgSpr === false){
            return this._battleField.children.find(spr => target === spr)
        }
        return trgSpr
    };

    // Center mass
    sset.makeCenterTarget = function(targets){
        const spr = new Sprite()
        spr._trackThis = true 
        spr.x = targets.reduce((total, trg)=>{ return (trg._realX ? trg._realX : trg.x) + total}, 0) / targets.length
        spr.y = targets.reduce((total, trg)=>{ return (trg._realY ? trg._realY : trg.y) + total}, 0) / targets.length
        spr.zIndex = targets.reduce((total, trg)=>{ return trg.zIndex + total}, 0) / targets.length
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
            spr.x = t._realX ? t._realX : t.x
            spr.y = t._realY ? t._realY : t.y
            spr.zIndex = t.zIndex
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
                // But I don't even use effekseer, so maybe far in the future.
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

    TBSE.updateZindex = (sprAnimation) => {
        if(sprAnimation._layer === "Back"){
            sprAnimation.zIndex = 0
        }else if (sprAnimation._layer === "Front"){
            sprAnimation.zIndex = Graphics.height * 3
        }else{
            sprAnimation.zIndex = (sprAnimation._targets.reduce((total, trg)=>{ return trg.zIndex + total}, 0) / sprAnimation._targets.length) + 1
        }
    }
    
    // Overwrite
    sset.updatePosition = function() {
        const cam = TBSE.Cam;
        const scale = TBSE.Cam._zoom;
        this.scale.x = scale;
        this.scale.y = scale;
        this.x = cam.x()
        this.y = cam.y()

        // Compatibility patch (Requires Shake Screen v1.0.220228)
        if(Theo && Theo.Shake){
            const shake = Theo.Shake
            if(shake.dur > 0){
                let rate = shake.diminish ? shake.dur/shake.maxdur : 1.0;
                this.x += Math.random() * shake.power * rate * (Math.random() >= 0.5 ? 1 : -1);
                this.y += Math.random() * shake.power * rate * (Math.random() >= 0.5 ? 1 : -1);
                shake.dur -= 1
            }
        }
    };

    TBSE.Camera = class {
        constructor(){
            this.clear()
        }
        
        clear(){
            this._camX = 0
            this._camY = 0
            this._zoom = 1
            this._maxDuration = 0
            this._duration = 0
            this._camStartX = 0
            this._camStartY = 0
            this._camTargetX = 0
            this._camTargetY = 0
            this._fn = "Linear"
        }

        update(){
            if(this._duration > 0){
                this._duration -= 1;
                const t = this._maxDuration - this._duration
                this._camX = TBSE.Easings.fn(this._camStartX, this._camTargetX, t, this._maxDuration, this._fn)
                this._camY = TBSE.Easings.fn(this._camStartY, this._camTargetY, t, this._maxDuration, this._fn)
                this._zoom = TBSE.Easings.fn(this._camStartZoom, this._camTargetZoom, t, this._maxDuration, this._fn)
            }
        }

        startMove(x, y, zoom, duration, fn = "Linear"){
            this._camStartX = this._camX
            this._camStartY = this._camY
            this._camTargetX = x
            this._camTargetY = y
            this._camStartZoom = this._zoom
            this._camTargetZoom = zoom
            this._maxDuration = this._duration = duration
            this._fn = fn
        }

        x(){
            return (-this._camX * this._zoom) + Math.round(-(Graphics.boxWidth/2) * (this._zoom - 1))
        }

        y(){
            return (-this._camY * this._zoom) + Math.round(-(Graphics.boxHeight/2) * (this._zoom - 1))
        }
    }
    TBSE.Cam = new TBSE.Camera()

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

    // Overwrite to fix the pivot reposition
    Sprite_AnimationMV.prototype.updatePosition = function() {
        if (this._animation.position === 3) {
            this.x = this.parent.width / 2;
            this.y = this.parent.height / 2;
        } else if (this._targets.length > 0) {
            const target = this._targets[0];
            const parent = target.parent;
            const grandparent = parent ? parent.parent : null;
            this.x = target._realX ? target._realX : target.x;
            this.y = target._realY ? target._realY : target.y;
            this.x += target._offsetX ? target._offsetX : 0
            this.y += target._offsetY ? target._offsetY : 0
            if (this.parent === grandparent) {
                this.x += parent.x;
                this.y += parent.y;
            }
            if (this._animation.position === 0) {
                this.y -= target.height;
            } else if (this._animation.position === 1) {
                this.y -= target.height / 2;
            }
        }
    };

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
    //#region BattleManager & Scene
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

    TBSE.bm.setup = BattleManager.setup
    BattleManager.setup = function(troopId, canEscape, canLose) {
        TBSE.bm.setup.call(this, troopId, canEscape, canLose)
        TBSE.Cam.clear()
    };

    //============================================================================================= 
    // Scene Update
    //---------------------------------------------------------------------------------------------
    TBSE.scene_battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        TBSE.scene_battle_update.call(this);
        $gameParty.updateSequencer();
        $gameTroop.updateSequencer();
        TBSE.Cam.update()
    };

    TBSE.scene_battle_terminate = Scene_Battle.prototype.terminate
    Scene_Battle.prototype.terminate = function() {
        TBSE.scene_battle_terminate.call(this)
        TBSE.clearSpriteReference()
        TBSE.AnimLoopTracker = {}
    };

    Game_Unit.prototype.updateSequencer = function(){
        for(const member of this.members()){
            member.updateSequencer()
        }
    }
    //#endregion
    //============================================================================================= 
}
TBSE.init()
