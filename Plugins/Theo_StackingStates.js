/*:
@target MZ
@plugindesc v1.0.0 - Stack the same state
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help
♦ About:
Stack the same state multiple times

♦ How to use:
Tag the state with <stack: n>
n = maximum stack you can place.

♦ Terms of Use:
- https://github.com/theoallen/RMMZ/blob/master/README.md
*/

// v1.0.1 - Fixed bug that makes the state stack indefinitely.

var Theo = Theo || {}
Theo.StackingStates = function(){
    const $ = Theo.StackingStates
    $._version = '1.0.1'

    // Remove duplicates
    if(!Array.prototype.uniq){
        Array.prototype.uniq = function() {
            const copy = this.concat();
            const len = copy.length
            for(var i=0; i<len; ++i) {
                for(var j=i+1; j<len; ++j) {
                    if(copy[i] === copy[j])
                        copy.splice(j--, 1);
                }
            }
            return copy;
        };
    }

    // Overwrite
    Game_Battler.prototype.addState = function(stateId) {
        if (this.isStateAddable(stateId)) {
            if (!this.isStateAffected(stateId) || !this.isMaxStack(stateId)) {
                this.addNewState(stateId);
                this.refresh();
            }
            this.resetStateCounts(stateId);
            this._result.pushAddedState(stateId);
        }
    };

    Game_Battler.prototype.isMaxStack = function(stateId){
        const data = $dataStates[stateId]
        const max = data.meta.stack ? Number(data.meta.stack) : 1
        return max === this.stateStack(stateId)
    }

    Game_Battler.prototype.stateStack = function(stateId){
        return this._states.filter(id => { return id === stateId}).length
    }

    // Overwrite
    Game_Battler.prototype.updateStateTurns = function() {
        const updated = []
        for (const stateId of this._states) {
            if (this._stateTurns[stateId] > 0 && !updated.includes(stateId)) {
                this._stateTurns[stateId]--;
                updated.push(stateId)
            }
        }
    };
}
Theo.StackingStates()
