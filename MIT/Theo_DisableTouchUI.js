/*:
@target MZ
@plugindesc Removes the touch UI and reposition the menu accordingly
@author TheoAllen
@help 
Version 0.1
This plugin removes the touch UI. Reposition all of the windows. As well as 
remove the option of it in the option menu. 

IT IS RECOMMENDED TO PUT THIS PLUGIN LOAD ORDER ABOVE ANYTHING ELSE.

Terms of use:
MIT

*/
var Theo = Theo || {}
Theo.NoTouchUI = () => {
    ConfigManager.touchUI = false;
    
    Scene_MenuBase.prototype.mainAreaHeight = function() {
        return Graphics.boxHeight - this.helpAreaHeight()
    };

    Scene_MenuBase.prototype.mainAreaTop = function() {
        if (this.isBottomHelpMode()) {
            return 0
        } else {
            return this.helpAreaHeight();;
        }
    };

    Scene_MenuBase.prototype.helpAreaTop = function() {
        if (!this.isBottomHelpMode()) {
            return 0
        } else {
            return this.mainAreaHeight();;
        }
    };

    Scene_Map.prototype.createButtons = ()=>{}
    Scene_MenuBase.prototype.createButtons = ()=>{}
    Scene_Battle.prototype.createButtons = ()=>{}

    Window_Options.prototype.addGeneralOptions = function() {
        this.addCommand(TextManager.alwaysDash, "alwaysDash");
        this.addCommand(TextManager.commandRemember, "commandRemember");
    };

    Scene_Options.prototype.maxCommands = function() {
        return 6;
    };

}
Theo.NoTouchUI()
