/*:@target MZ
 @plugindesc Adjust the enemy placement according to your game resolution automatically
 @author TheoAllen
 @help
 Adjust the enemy placement according to your game resolution automatically.
 Because the default editor does not allow you to place the enemy far in the right when
 you changed your game resolution.

 Terms of Use:
- Free for commercial
- Credit is optional
 
 */

var Theo = Theo || {}
Theo.ResBasedPosition = function() {
    var _ = Theo.ResBasedPosition
    var troop = Game_Troop.prototype

    _.DefMaxHeight = 624
    _.DefMaxWidth = 816

    _.setup = troop.setup;
    troop.setup = function(troopId) {
        _.setup.call(this, troopId);
        _.fixEnemyPlacement.call(this)
    };

    _.fixEnemyPlacement = function(){
        xScale = $dataSystem.advanced.uiAreaWidth / _.DefMaxWidth
        yScale = $dataSystem.advanced.uiAreaHeight / _.DefMaxHeight
        this._enemies.forEach(enemy => {
            enemy._screenX *= xScale
            enemy._screenY *= yScale
        });
    }
}
Theo.ResBasedPosition()
