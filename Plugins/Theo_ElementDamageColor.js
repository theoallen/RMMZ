/*:
@target MZ
@plugindesc Theo - Element Damage Color
@author TheoAllen
@help 
Version 1.0

Colorize the damage popup based on the attack element.

Terms of Use:
- Free for commercial
- Credit is optional, just do not claim.

 @param eleColor
 @text Element Color List
 @desc List of the element color. Add more here
 @type struct<elelist>[]
 */

 /*~struct~elelist:
 @param id
 @text Element ID
 @type number
 @min 1
 @desc Element ID in the database (Types --> Element)
 @default 1

 @param red
 @text Red
 @type number
 @min 0
 @max 255
 @desc Red color factor
 @default 255

 @param green
 @text Green
 @type number
 @min 0
 @max 255
 @desc Green color factor
 @default 255

 @param blue
 @text Blue
 @type number
 @min 0
 @max 255
 @desc Blue color factor
 @default 255
 */
var Theo = Theo || {}
Theo.elementColor = function(){
    let pluginName = "Theo_ElementDamageColor"
    let params = PluginManager.parameters(pluginName)

    let hexConverter = (value) => {
        return ('00' + value.toString(16)).slice(-2);
    }

    let $ = Theo.elementColor
    $._category = {}

    JSON.parse(params.eleColor).forEach(innerJson => {
        colorObj = JSON.parse(innerJson)
        let index = Number(colorObj.id) + 3
        let red = hexConverter(Number(colorObj.red))
        let green = hexConverter(Number(colorObj.green))
        let blue = hexConverter(Number(colorObj.blue))
        $._category[index] = "#" + red + green + blue
    })

    $.dmgColor = ColorManager.damageColor
    ColorManager.damageColor = function(colorType) {
        if($._category[colorType]){
            return $._category[colorType]
        }
        return $.dmgColor(colorType)
    };

    $.popupSetup = Sprite_Damage.prototype.setup
    Sprite_Damage.prototype.setup = function(target) {
        const result = target.result();
        const type = result.damageElement + 3
        if (!result.missed && !result.evaded && result.hpAffected && $._category[type]) {
            this._colorType = type
            this.createDigits(result.hpDamage);
            if (result.critical) {
                this.setupCriticalEffect();
            }
        } else {
            $.popupSetup.call(this, target)
        }
    };

    $.clearResult = Game_ActionResult.prototype.clear
    Game_ActionResult.prototype.clear = function() {
        $.clearResult.call(this)
        this.damageElement = 0;
    };

    $.actionExecuteHpDamage = Game_Action.prototype.executeHpDamage
    Game_Action.prototype.executeHpDamage = function(target, value) {
        let elementId = this.item().damage.elementId
        if(elementId < 0){
            multiEle = this.subject().attackElements()
            multiEle = multiEle.sort((a,b) => target.elementRate(b) - target.elementRate(a))
            elementId = multiEle[0];
        }
        target.result().damageElement = elementId
        $.actionExecuteHpDamage.call(this, target, value)
    };

}
Theo.elementColor()
