/*:
@target MZ
@plugindesc v1.0.0 - Auto Variable Value
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help
♦ About:
You want the value of variable value is dynamically changed and you
hate using parallel common event for varions reasons.

♦ How to use
Encapsulate your code in {}
Put them as a variable name.

Example:
{ $gamePlayer.x }

♦ Pros
- It runs on battle screen too.
- When the value is not changed, it won't refresh the entire map.
- Probably less laggy(?)

♦ Cons
- You're writing JS code in a very cramped space in the control
  variable user interface.

♦ Terms of Use:
- https://github.com/theoallen/RMMZ/blob/master/README.md

*/
var Theo = Theo || {}
Theo.AutoVariableValue = function(){
    const $ = Theo.AutoVariableValue
    $._version = '1.0.0'
    $._tagRetrieval = /.*\{(.+)\}.*/i
    $._trackerFunctions = {}

    $.VariableTracker = class {
        constructor(id, evalscript){
            this._id = id
            this._evalscript = evalscript.match($._tagRetrieval)[1]
            this._oldval = 0
            this._newval = 0
        }

        update(){
            this._newval = this.track()
            if(this._oldval !== this._newval){
                this._oldval = this._newval
                $gameVariables.onChange()
            }
        }

        value(){
            return this._newval
        }

        track(){
            if($._trackerFunctions[this._id] === undefined){
                $._trackerFunctions[this._id] = eval("() => { return " + this._evalscript + "}")
            }
            return $._trackerFunctions[this._id]()
        }
    }

    $.varClear = Game_Variables.prototype.clear
    Game_Variables.prototype.clear = function() {
        $.varClear.call(this)
        $.initDynamicData.call(this)
    };

    $.initDynamicData = function(){
        this._dynamicData = []
        let i = 0
        for(const name of $dataSystem.variables){
            if($._tagRetrieval.test(name)){
                this._dynamicData[i] = new $.VariableTracker(i, name)
            }
            i++;
        }
    }

    $.varValue = Game_Variables.prototype.value
    Game_Variables.prototype.value = function(variableId) {
        if($.isDynamicVar(variableId)){
            if(this._dynamicData[variableId] === undefined){
                this._dynamicData[variableId] = new $.VariableTracker(variableId, $dataSystem.variables[variableId])
                this._dynamicData[variableId].update()
            }
            return this._dynamicData[variableId].value()
        }
        return $.varValue.call(this, variableId);
    };

    $.isDynamicVar = (variableId) => {
        return !!($dataSystem.variables[variableId] && $._tagRetrieval.test($dataSystem.variables[variableId]));
    }

    $.update = () => {
        for(const data of $gameVariables._dynamicData){
            if(data){
                data.update()
            }
        }
    }

    $.mapUpdate = Scene_Map.prototype.update
    Scene_Map.prototype.update = function() {
        $.mapUpdate.call(this)
        $.update()
    }
    
    $.battleUpdate = Scene_Battle.prototype.update
    Scene_Battle.prototype.update = function() {
        $.battleUpdate.call(this)
        $.update()
    };

}
Theo.AutoVariableValue()
