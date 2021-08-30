/*
Change log
version 1.0.0   = Finished the plugin
*/
/*:
@target MZ
@plugindesc v1.0.0 - Non RPG Main Menu
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help 
♦ About:
Getting rid RPG stats in the main menu. Now it only consists
- Option
- Save
- Load
- Game End
Might add item menu later.

This plugin was made for a certain game.

♦ Terms of Use:
- MIT
*/
var Theo = Theo || {}
Theo.NonRPGMenu = function(){
    Scene_Menu.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createCommandWindow();
    };

    Scene_Menu.prototype.commandWindowRect = function() {
        const ww = this.mainCommandWidth();
        const wh = Window_Base.prototype.lineHeight() * 5.65
        const wx = (Graphics.boxWidth - ww) / 2;
        const wy = (Graphics.boxHeight - wh) / 2;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Menu.prototype.createCommandWindow = function() {
        const rect = this.commandWindowRect();
        const commandWindow = new Window_MenuCommand(rect);
        //commandWindow.setHandler("item", this.commandItem.bind(this));
        commandWindow.setHandler("options", this.commandOptions.bind(this));
        commandWindow.setHandler("save", this.commandSave.bind(this));
        commandWindow.setHandler("load", this.commandLoad.bind(this));
        commandWindow.setHandler("gameEnd", this.commandGameEnd.bind(this));
        commandWindow.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(commandWindow);
        this._commandWindow = commandWindow;
    };

    Scene_Menu.prototype.commandLoad = function() {
        SceneManager.push(Scene_Load);
    };

    Scene_Menu.prototype.start = function() {
        Scene_MenuBase.prototype.start.call(this);
    };

    Window_MenuCommand.prototype.makeCommandList = function() {
        this.addOptionsCommand();
        this.addSaveCommand();
        this.addCommand("Load", "load", true);
        this.addGameEndCommand();
    };

    Window_Options.prototype.addGeneralOptions = function() {
        this.addCommand(TextManager.alwaysDash, "alwaysDash");
    };

    Scene_Options.prototype.maxCommands = function() {
        return 5;
    };
}
Theo.NonRPGMenu()
