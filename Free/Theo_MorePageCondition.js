/*:
@target MZ
@plugindesc More page conditions
@author TheoAllen
@help 
Version 0.1

Because more page condition is always welcomed.
Because they will never care about the variable page condition to allow you 
to use other than >=

Currently ONLY WORKS FOR MAP EVENT PAGE.

Plan:
- Add more condition other than just more switches and variables
- Maybe, use conditional branch instead?
- Make this works for troop event and common event

Terms of Use:
- Free for commercial
- Credit is optional, just do not claim.

-------------------------
@command switch
@text Switch
@desc Switch Page Condition (in case you want more than 3 switches condition)

@arg id
@type switch
@desc Select the switch

-------------------------
@command var
@text Variable
@desc Variable page condition

@arg id
@type variable
@default 1

@arg operand
@type combo
@option >= (Bigger or equal than)
@option > (Bigger than)
@option == (Equal)
@option != (Not equal)
@option <= (Lower or equal than)
@option < (Lower than)
@default >= (Bigger or equal than)

@arg num
@type number
@default 1

*/
var Theo = Theo || {}
Theo.PageCondition = function(){
    this.pluginName = "Theo_MorePageConditions"
    let cond = this; 

    cond.meetsConditions = Game_Event.prototype.meetsConditions
    Game_Event.prototype.meetsConditions = function(page) {
        return cond.meetsConditions.call(this, page) && cond.extra(page)
    };

    cond.extra = function(page){
        var valid = true
        page.list.forEach(li => {
            if (li.code === 357){
                console.log(li.parameters[0])
            }
            if (li.code === 357 && li.parameters[0] === cond.pluginName){
                param = li.parameters[3]
                if(li.parameters[1] == "switch"){
                    valid = $gameSwitches.value(param.id)
                }

                if(li.parameters[1] === "var"){
                    let value = $gameVariables.value(param.id)
                    switch(param.operand){
                        case ">= (Bigger or equal than)":
                            valid = value >= param.num
                            break;
                        case "> (Bigger than)":
                            valid = value > param.num
                            break;
                        case "== (Equal)":
                            valid = value == param.num
                            break;
                        case "!= (Not equal)":
                            valid = value != param.num
                            break;
                        case "<= (Lower or equal than)":
                            valid = value <= param.num
                            break;
                        case "< (Lower than)":
                            valid = value < param.num
                            break;
                    }
                }
            }
        });
        return valid;
    }
}

Theo.PageCondition()
