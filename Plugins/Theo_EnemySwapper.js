/*:@target MZ
@plugindesc v1.0.0 - Swap the enemy for randomized troop composition
@author TheoAllen
@url https://github.com/theoallen/RMMZ
@help
Swap the enemy for randomized troop composition

In enemy notebox, use tag <swap: id, id, id>
To swap the enemy with other enemies based on the id

if you don't want to use ID, you can use the name
<swap: frog, dragon, goblin>

Terms of Use:
- Free for commercial
- Credit is optional, just do not claim.

*/

var Theo = Theo || {}
Theo.EnemySwapper = function(){
    let $ = Theo.EnemySwapper
    $._tagSwap = /<swap\s*:\s*(.+)\s*>/i

    $._isLoaded = false;
    $.dbLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function(){
        if (!$.dbLoaded.call(this)) {return false};
        if (!$._isLoaded){
            $dataEnemies.forEach(db => {
                if(db){
                    db.swapList = [];
                    db.note.split(/[\r\n]+/i).forEach(line => {
                        if(line.match($._tagSwap)){
                            swaps = String(RegExp.$1)
                            swaps.split(",").forEach(targetSwap => {
                                if(Number.isNaN(Number(targetSwap))){
                                    let name = String(targetSwap).trim()
                                    console.log(name)
                                    enemy = $dataEnemies.find(e => {
                                        if (e){
                                            return e.name === name
                                        }else{
                                            return false
                                        }
                                    })
                                    if(enemy){
                                        db.swapList.push(enemy.id)
                                    }
                                }else if($dataEnemies[Number(targetSwap)]){
                                    db.swapList.push(Number(targetSwap))
                                }
                            })
                        }
                    })
                }
            });
            $._isLoaded = true;
        }
        return true
    }

    $.troopMakeUniqName = Game_Troop.prototype.makeUniqueNames
    Game_Troop.prototype.makeUniqueNames = function() {
        $.troopSwapEnemies.call(this)
        $.troopMakeUniqName.call(this)
    };
    
    $.troopSwapEnemies = function(){
        this.members().forEach(m => {
            let enemyData = m.enemy()
            if (enemyData.swapList.length > 0){
                let newId = enemyData.swapList[Math.floor(Math.random() * enemyData.swapList.length)]
                $.enemyChangeId.call(m, newId);
            }
        })
    }

    $.enemyChangeId = function(newId){
        let x = this._screenX
        let y = this._screenY
        this.setup(newId, x, y)
    }
}

Theo.EnemySwapper()
