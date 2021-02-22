/*:
@target MZ
@plugindesc v1.0.0 - Selection Highlight Customization
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help
♦ About:
Changes the selection highlight because you don't like the
blinking highlight when selecting enemy or actor. Or at least
you want to customize its duration or the blend color strength

♦ Options:
Selection highlight comes from 3 options
- Blink (default)
- Flash 
- Whiten (persistent highlight)

♦ Terms of Use:
- https://github.com/theoallen/RMMZ/blob/master/README.md

@param flashsetting
@text [Flash Setting]

@param selectflash
@parent flashsetting
@text Selection Flashing
@type select
@default Blink
@option Blink
@option Flash
@option Whiten
@desc Pick selection highlight type.

@param actorflashselect
@parent flashsetting
@text Actor Flash Strength
@type number
@min 0
@max 255
@desc Flashing strength for actor when being selected
@default 64

@param enemyflashselect
@parent flashsetting
@text Enemy Flash Strength
@type number
@min 0
@max 255
@desc Flashing strength for enemy when being selected
@default 64

@param flashduration
@parent flashsetting
@text Flash Duration
@type number
@min 2
@max 999
@desc Flashing duration effect
@default 10
*/
var Theo = Theo || {}
Theo.SelectionFlash = function(){
    const $ = Theo.SelectionFlash
    $._pluginName = document.currentScript.src.match(/.+\/(.+)\.js/)[1]
    $._version = '1.0.0'
    $._params = PluginManager.parameters($._pluginName)

    $._selectionFlash = $._params.selectflash
    $._actorFlash = Number($._params.actorflashselect)
    $._enemyFlash = Number($._params.enemyflashselect)
    $._flashDuration = Number($._params.flashduration)

    Sprite_Battler.prototype.updateSelectionEffect = function() {
        const target = this.mainSprite();
        if (this._battler.isSelected()) {
            this._selectionEffectCount++;
            const str = this._battler.isEnemy() ? $._enemyFlash : $._actorFlash
            if($._selectionFlash === "Flash"){
                const strFactor = this._selectionEffectCount % $._flashDuration
                const realStr = str * (1 - strFactor/$._flashDuration)
                target.setBlendColor([255, 255, 255, realStr])
            } else if ($._selectionFlash === "Whiten" || this._selectionEffectCount % $._flashDuration < $._flashDuration/2) {
                target.setBlendColor([255, 255, 255, str]);
            } else {
                target.setBlendColor([0, 0, 0, 0]);
            }
        } else if (this._selectionEffectCount > 0) {
            this._selectionEffectCount = 0;
            target.setBlendColor([0, 0, 0, 0]);
        }
    };
}
Theo.SelectionFlash()
