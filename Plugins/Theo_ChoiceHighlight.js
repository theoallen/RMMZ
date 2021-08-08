/*:
@target MZ
@plugindesc v1.0.0 - Changing the color highlight of the choice
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help

♦ But why?
You're about to warn your player that your choice may affect the game. A 
choice that has a consequence such as to let an NPC diesor live. Also 
for some fancy effect.

♦ How to use:
Use a plugin command before the choice.
Don't forget to reset using another plugin command afterward.

♦ Terms of Use:
- https://github.com/theoallen/RMMZ/blob/master/README.md

♦ Special mention
InVictor for originally took my idea I gave to him and created his own 
version here https://invictor.itch.io/highlight-choices

@command hl
@text Choice Highlight
@desc Colorize the choice. Number represents text number in \C[n]

@arg chl
@text Highlight
@type number[]
@default []
@desc The order represent choice order. The number represents text number in \C[n]. Zero means no change.

@command reset
@text Reset Choice Highlight
@desc No longer highlight the choice

*/

var Theo = Theo || {}
Theo.ChoiceHighlight = function(){
    "use strict";

    const $ = Theo.ChoiceHighlight
    $._pluginName = document.currentScript.src.match(/.+\/(.+)\.js/)[1]
    $._version = '1.0.0'
    $._highlight = []

    PluginManager.registerCommand($._pluginName, "hl", func => {
        $._highlight = JSON.parse(func.chl)
    });

    PluginManager.registerCommand($._pluginName, "reset", () => {
        $._highlight = []
    });

    $.ChoiceCmd = Window_ChoiceList.prototype.commandName
    Window_ChoiceList.prototype.commandName = function(index) {
        const oriCmd = $.ChoiceCmd.call(this, index)
        if (this.index() === index && Number($._highlight[this.index()]) > 0){
            const hlNumber = Number($._highlight[this.index()])
            return `\\c[${hlNumber}]${oriCmd}\\c[0]`;
        }
        return this._list[index].name;
    };

    $.setCursor = Window_ChoiceList.prototype.setCursorRect
    Window_ChoiceList.prototype.setCursorRect = function(x, y, width, height){
        $.setCursor.call(this, x, y, width, height)
        this.refresh()
    }
}
Theo.ChoiceHighlight()