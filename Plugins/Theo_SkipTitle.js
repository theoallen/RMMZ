/*:
@target MZ
@plugindesc Skip Title Screen (and auto loads save game)
@author TheoAllen
@help 
Version 0.1

Because watching title screen is annoying for developers
Because going through the menu to load save file is also annoying.
Because you can't have enough "skip title screen" plugins, apparently.

Terms of Use:
- Free for commercial
- Credit is optional, just do not claim.

-------------------------
@param devmode
@text Dev Mode Only?
@type boolean
@desc Dev mode only will auto disable the plugin when not in playtest mode
@default true

@param skip
@text Skip title screen?
@type boolean
@desc Go skip title screen and head straight to the map
@default true

@param load
@text Load saved game?
@type boolean
@desc To enable auto load save games so you dont have to go through save game
@default true

@param id
@text Save ID
@type number
@desc Determine which save file to load. Putting 0 will load latest save file
@default 0

*/

var Theo = Theo || {}
Theo.SkipTitle = function(){
    this.params = PluginManager.parameters('Theo_SkipTitle')
    this.onLoadSuccess = function(scene){
        SoundManager.playLoad();
        SceneManager.goto(Scene_Map);
        scene.resizeScreen()
        scene.updateDocumentTitle()
    }

    let t = this
    t.start = Scene_Boot.prototype.start
    Scene_Boot.prototype.start = function(){
        let skipping = t.params.skip === 'true'
        if (t.params.devmode){
            skipping = Utils.isOptionValid("test") && skipping
        }
        if (DataManager.isBattleTest()){
            skipping = false
        }
        if (skipping) {
            if(t.params.load === 'true' && DataManager.isAnySavefileExists()){
                if(t.params.id == 0){
                    var id = DataManager.latestSavefileId()
                } else {
                    var id = t.params.id
                }
                DataManager.loadGame(id)
                    .then(t.onLoadSuccess(this))
                    .catch(() => {
                        console.warn("Loading failed. Creating a new game instead")
                        this.checkPlayerLocation();
                        DataManager.setupNewGame();
                        SceneManager.goto(Scene_Map);
                        this.resizeScreen();
                        this.updateDocumentTitle();        
                    })
            } else {
                this.checkPlayerLocation();
                DataManager.setupNewGame();
                SceneManager.goto(Scene_Map);
                this.resizeScreen();
                this.updateDocumentTitle();
            }
        } else {
            t.start.call(this);
        }
    }    
}
Theo.SkipTitle()
