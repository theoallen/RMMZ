/*:
@target MZ
@plugindesc Theo - Command Icon
Adds icon in your window command
@author TheoAllen
@help 
Version 1.0

Adds icon to your command window.

Terms of Use:
- Free for commercial
- Credit is optional, just do not claim.

 @param icolist
 @text Icon List
 @desc List of the command icons
 @type struct<icolist>[]
 */

 /*~struct~icolist:
 @param name
 @text Command Name
 @type text
 @desc Command name that you wish to have icon

 @param icon
 @text Icon Index
 @type number
 @min 0
 @default 0
 @desc Icon index for the command.
 */
var Theo = Theo || {}
Theo.CommandIcon = function(){
    pluginName = "Theo_CommandIcon"
    let params = PluginManager.parameters(pluginName)

    let $ = Theo.CommandIcon;
    $._list = {}

    JSON.parse(params.icolist).forEach(innerJson => {
        item = JSON.parse(innerJson)
        let name = item.name
        let index = Number(item.icon)
        $._list[name] = index
    })

    $.itemRect = Window_Command.prototype.itemLineRect
    Window_Command.prototype.itemLineRect = function(index) {
        const rect = $.itemRect.call(this, index)
        const name = this.commandName(index)
        if ($._list[name]){
            rect.x += 38
            rect.width -= 38
        }
        return rect
    };

    $.drawItem = Window_Command.prototype.drawItem
    Window_Command.prototype.drawItem = function(index) {
        const name = this.commandName(index)
        if ($._list[name]){
            let rect = $.itemRect.call(this, index);
            let iconIndex = $._list[name]
            this.drawIcon(iconIndex, rect.x, rect.y)
        }
        $.drawItem.call(this, index)
    };

}
Theo.CommandIcon()
