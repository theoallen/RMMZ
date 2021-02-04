/*:
@target MZ
@plugindesc v1.0.0 - Theo Enemy HP Gauge | Visual HP gauge for the enemies
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help 
♦ About:
This plugin adds a HP gauge bar to the enemy.
This plugin is strictly designed for RPG Maker MZ and will likely not work 
if used for RPG Maker MV

♦ Configuration:
Configure the HP gauge to your liking in the plugin parameters.
If you want to override the configuration for certain enemies. you could
use notetag in the enemy notebox as follow.

♦ Force Hide/Show
  <hide gauge>
  <show gauge>
  Will force the gauge to either hide or show regardless of the condition

♦ Gauge width/height
  <gauge width: n>
  <gauge height: n>
  Define the gauge width/height for individual enemy.
  Override the plugin parameter

♦ Change HP gauge color
  <gauge color1: n>
  <gauge color2: n>
  Override the gauge color from the plugin parameter.
  Replace n with number represent text color.

♦ Gauge offset
  <gauge offset x: n>
  <gauge offset x: -n>
  <gauge offset y: n>
  <gauge offset y: -n>
  Reposition the gauge X/Y position. 
  Negative number is usable

♦ Gauge segments
  <gauge segments: n>
  Override the segments value in the plugin parameter
  When the value is above 1, the gauge bar will be divided based on the number

♦ Terms of Use:
- https://github.com/theoallen/RMMZ/blob/master/README.md

 @param option
 @text General Option

 @param pos
 @parent option
 @text Position
 @option Bottom
 @option Top
 @default Bottom
 @desc The position of the HP bar
 @type select

 @param defeat
 @parent option
 @text Defeat First?
 @type boolean
 @default false
 @desc Defeat the enemy to show the HP bar next time you encountered the same enemy.

 @param alwaysShown
 @parent option
 @text Always Shown
 @type boolean
 @default false
 @desc Make the gauge always shown. Otherwise it will only shown on select or on damage.
 
 @param prop
 @text Gauge Properties

 @param width
 @parent prop
 @text HP bar width
 @type number
 @min 10
 @default 100
 @desc the width of the HP gauge

 @param height
 @parent prop
 @text HP bar height
 @type number
 @min 6
 @default 11
 @desc The height of the HP gauge

 @param animeDur
 @parent prop
 @text Animation Duration
 @type number
 @min 1
 @max 9999
 @default 45
 @desc The duration of the gauge animation when changing its value

 @param displayDur
 @parent prop
 @text Display Duration
 @type number
 @min 0
 @max 9999
 @default 25
 @desc Display duration before the gauge vanishes after animation

 @param border
 @parent prop
 @text Border Thickness
 @type number
 @min 1
 @max 4
 @default 2
 @desc The thickness of the border

 @param segments
 @parent prop
 @text Gauge Segmentation
 @type number
 @min 1
 @max 99
 @default 1
 @desc HP gauge segmentation. If the value is above 1, the hp gauge will be divided into segments

 @param gaugecolor
 @text Default Color

 @param lcolorindex
 @parent gaugecolor
 @text Left Gradient Color
 @type number
 @default 20
 @min 0
 @desc Color index for left gradient. Same as text color

 @param rcolorindex
 @parent gaugecolor
 @text Right Gradient Color
 @type number
 @default 21
 @min 0
 @desc Color Index for right gradient. Same as text color

 @param bcolorindex
 @parent gaugecolor
 @text Gauge Back Color
 @type number
 @default 15
 @min 0
 @desc Color index for background. Same as text color
 
 */
var Theo = Theo || {}
Theo.EnemyHPGauge = function(){
    const pluginName = "Theo_EnemyHPGauge"
    const $ = Theo.EnemyHPGauge
    $._tagHide = /<hide\s+gauge>/i
    $._tagShow = /<show\s+gauge>/i
    $._tagWidth = /<gauge\s+ width\s*:\s*(\d+)>/i
    $._tagHeight = /<gauge\s+height\s*:\s*(\d+)>/i
    $._tagColor1 = /<gauge\s+color1\s*:\s*(\d+)>/i
    $._tagColor2 = /<gauge\s+color2\s*:\s*(\d+)>/i
    $._tagOffsetX = /<gauge\s+offset\s+x\s*:\s*(-|\+*)(\d+)>/i
    $._tagOffsetY = /<gauge\s+offset\s+y\s*:\s*(-|\+*)(\d+)>/i
    $._tagSegment = /<gauge\s+segments\s*:\s*(\d+)>/
    $._params = PluginManager._parameters[pluginName.toLowerCase()]

    if($._params === undefined){
        const message = "Enemy HP Gauge was failed to load. Did you save the plugin name correctly? It should be named as \"" + pluginName + ".js\""
        const err = new Error(message)
        Graphics.printError("Plugin Load Error", message, err);
        return
    }

    $.dbLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function(){
        if (!$.dbLoaded.call(this)) {return false};
        if (!$._isLoaded) {
            for(const enemy of $dataEnemies){
                if(enemy){
                    $.loadDB.call(enemy)
                }
            }
            $._isLoaded = true;
        }
        return true;
    }

    $.loadDB = function(){
        const gauge = new $.GaugeDB()
        gauge.loadOptions(this.note)
        this._visualGauge = gauge
    }

    $.GaugeDB = class {
        constructor(){
            this.color1 = Number($._params.lcolorindex)
            this.color2 = Number($._params.rcolorindex)
            this.backColor = Number($._params.bcolorindex)
            this.width = Number($._params.width)
            this.height = Number($._params.height)
            this.pos = $._params.pos,
            this.thickness = Number($._params.border)
            this.displayType = $._params.defeat === "true" ? "defeat" : "show"
            this.alwaysShown = $._params.alwaysShown === "true"
            this.offsetX = 0
            this.offsetY = 0
            this.animeDuration = Number($._params.animeDur)
            this.displayDuration = Number($._params.displayDur)
            this.segments = Number($._params.segments)
        }

        loadOptions(notes){
            const lines = notes.split(/[\r\n]+/)
            for(const line of lines){
                if(line.match($._tagHide)){
                    this.displayType = "hide"
                }else if(line.match($._tagShow)){
                    this.displayType = "show"
                }else if(line.match($._tagWidth)){
                    this.width = Number(RegExp.$1)
                }else if(line.match($._tagHeight)){
                    this.height = Number(RegExp.$1)
                }else if(line.match($._tagColor1)){
                    this.color1 = Number(RegExp.$1)
                }else if(line.match($._tagColor2)){
                    this.color2 = Number(RegExp.$1)
                }else if(line.match($._tagOffsetX)){
                    this.offsetX = Number(RegExp.$2) * (RegExp.$1 === "-" ? -1 : 1)
                }else if(line.match($._tagOffsetY)){
                    this.offsetY = Number(RegExp.$2) * (RegExp.$1 === "-" ? -1 : 1)
                }else if(line.match($._tagSegment)){
                    this.segments = Number(RegExp.$1)
                }
            }
        }

        createGaugeBitmap(){
            const bmp = new Bitmap(this.width - this.thickness*2, this.height - this.thickness*2)
            const gradleft = ColorManager.textColor(this.color1)
            const gradright = ColorManager.textColor(this.color2)
            bmp.gradientFillRect(0, 0, bmp.width, bmp.height, gradleft, gradright)
            return bmp
        }

        createBackBitmap(){
            const bmp = new Bitmap(this.width, this.height)
            const color = ColorManager.textColor(this.backColor)
            bmp.fillRect(0, 0, bmp.width, bmp.height, color)
            return bmp
        }

        createSegmentBitmap(){
            const bmp = new Bitmap(this.width, this.height)
            const color = ColorManager.textColor(this.backColor)
            for(let i = 0; i < this.segments; i++){
                const segmentPos = (i/this.segments) * this.width
                bmp.fillRect(segmentPos, 0, this.thickness, bmp.height, color)
            }
            return bmp
        }

    }

    $.GaugeBar = class extends Sprite {
        constructor(refSprite){
            super()
            this._refSprite = refSprite
            this._gaugeOpt = this.battler().enemy()._visualGauge
            this.createBackSprite()
            this.createGaugeSprite()
            this.createSegmentSprite()
            this._animDuration = 0;
            this._rate = this.battler().hpRate()
            this._oldRate = this.battler().hpRate()
            this._gauge.width = this._gauge._bitmap.width * this._rate;
        }

        gaugeOpt(){
            return this._gaugeOpt
        }

        createGaugeSprite(){
            const bmp = this.gaugeOpt().createGaugeBitmap()
            const gauge = new Sprite(bmp)
            gauge.x = -gauge.bitmap.width/2
            if(this.gaugeOpt().pos === "Top"){
                gauge.anchor.y = 1
            }
            this._gauge = gauge
            this.addChild(gauge)
        }

        createBackSprite(){
            const bmp = this.gaugeOpt().createBackBitmap()
            const backSprite = new Sprite(bmp)
            backSprite.anchor.x = 0.5
            if(this.gaugeOpt().pos === "Top"){
                backSprite.anchor.y = 1
                backSprite.y += this.gaugeOpt().thickness
            }else{
                backSprite.y -= this.gaugeOpt().thickness
            }
            this._backGauge = backSprite
            this.addChild(backSprite)
        }

        createSegmentSprite(){
            if(this.gaugeOpt().segments === 1){
                return
            }
            const bmp = this.gaugeOpt().createSegmentBitmap()
            const segSpr = new Sprite(bmp)
            segSpr.anchor.x = 0.5
            if(this.gaugeOpt().pos === "Top"){
                segSpr.anchor.y = 1
                segSpr.y += this.gaugeOpt().thickness
            }else{
                segSpr.y -= this.gaugeOpt().thickness
            }
            this._segSpr = segSpr
            this.addChild(segSpr)
        }

        update(){
            this.updatePosition()
            Sprite.prototype.update.call(this)
            this.updateGaugeAnimation()
            this.updateVisibilityCase()
        }

        updateGaugeAnimation(){
            if(this.isAnimating()){
                const time = this._animDuration - this.displayDuration()
                if(time > 0){
                    const old = this._gauge._bitmap.width * this._oldRate;
                    const target = this._gauge._bitmap.width * this._rate;
                    const change = this.easing(1 - time/this.animateDuration()) * (target - old)
                    this._gauge.width = old + change
                } else {
                    const w = this._gauge._bitmap.width * this._rate;
                    this._gauge.width = w
                }
                this._animDuration -= 1;
            }
        }

        isAnimating(){
            return this._animDuration > 0
        }

        animateDuration(){
            return this.gaugeOpt().animeDuration
        }

        displayDuration(){
            return this.gaugeOpt().displayDuration
        }

        animate(lastRate, newRate){
            this._animDuration = this.animateDuration() + this.displayDuration()
            this._oldRate = lastRate
            this._rate = newRate
        }

        // https://easings.net/
        easing(time){
            return 1 - Math.pow(1 - time, 3)
        }

        currentGaugeRate(){
            return this._gauge.width / this._gauge.bitmap.width
        }

        updateVisibilityCase(){
            const lastHidden = this._hidden
            if(this._refSprite._refreshGauge){
                const lastHpRate = this.isAnimating() ? this.currentGaugeRate() : this._rate;
                const newRate = this.battler().hpRate()
                if(lastHpRate !== newRate){
                    this.animate(lastHpRate, newRate);
                }
                this._refSprite._refreshGauge = false;
            }
            const visible = this.visibility()
            if (lastHidden != !visible){
                this._hidden = !visible
                this.updateVisibility()
            }
        }

        updatePosition(){
            if(this.gaugeOpt().pos === "Bottom"){
                this.x = this._refSprite.x + this.gaugeOpt().offsetX
                this.y = this._refSprite.y + this.gaugeOpt().offsetY
            }else{
                this.x = this._refSprite.x + this.gaugeOpt().offsetX
                this.y = this._refSprite.y + this.gaugeOpt().offsetY - this._refSprite.height
            }
        }

        visibility(){
            let defeated = true
            switch(this.gaugeOpt().displayType){
                case "hide":
                    return false;
                case "defeat":
                    defeated = this.isDefeated(this.battler())
            }
            if(this.gaugeOpt().alwaysShown){
                const dead = this.battler().isDead()
                if(dead){
                    return this.isAnimating()
                }
                return defeated
            }
            return defeated && (this.battler().isSelected() || this.isAnimating());
        }

        battler(){
            return this._refSprite._battler
        }

        isDefeated(){
            if(!$gameParty._defeatedEnemies){
                $gameParty._defeatedEnemies = []
            }
            return $gameParty._defeatedEnemies.includes(this.battler()._enemyId)
        }
    }

    $.aliasCreateLowerLayer = Spriteset_Battle.prototype.createLowerLayer
    Spriteset_Battle.prototype.createLowerLayer = function() {
        $.aliasCreateLowerLayer.call(this)
        $.initGauges.call(this)
    }

    $.initGauges = function(){
        this._gauges = [];
        for(const enemy of this._enemySprites){
            const hpBar = new $.GaugeBar(enemy)
            this._gauges.push(hpBar)
            this._battleField.addChild(hpBar)
        }
    }

    $.createDmgSpr = Sprite_Battler.prototype.createDamageSprite
    Sprite_Battler.prototype.createDamageSprite = function() {
        $.createDmgSpr.call(this)
        this._refreshGauge = true;
    };

    // I can probably put this somewhere else better, but for now, this will do.
    $.enemyDies = Game_Enemy.prototype.die
    Game_Enemy.prototype.die = function() {
        $.enemyDies.call(this)
        $.registerDefeatedEnemy(this._enemyId)
    };

    $.registerDefeatedEnemy = function(id){
        if(!$gameParty._defeatedEnemies){
            $gameParty._defeatedEnemies = []
        }
        if(!$gameParty._defeatedEnemies.includes(id)){
            $gameParty._defeatedEnemies.push(id)
        }
    }
}
Theo.EnemyHPGauge()
