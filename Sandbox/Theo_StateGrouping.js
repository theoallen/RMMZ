/*:
@target MZ
@plugindesc v1.0.0 - State Grouping
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@desc

@param warning
@text Don't change these unless you know how.
@default Don't change these unless you know how.

@param tagGroup
@type text
@text Notetag for Grouping
@desc Notetag for grouping. Don't change if you don't know how
@default <group\s*:\s*(.+)\s*>

@param tagDispel
@type text
@text Dispel Tag
@desc Tag for dispeling all states in this group. Don't change if you don't know how
@default <dispel\s+(.+)\s*>

@param tagDispelAmount
@type text
@text Dispel Tag (Specific Amount)
@desc Tag for dispeling x number of states in this group. Don't change if you don't know how
@default <dispel\s+(.+)\s*:\s*(\d+)\s*>
*/

var Theo = Theo || {}
Theo.StateGrouping = function(){
    const $ = Theo.StateGrouping
    $._pluginName = document.currentScript.src.match(/.+\/(.+)\.js/)[1]
    $.params = PluginManager.parameters($._pluginName)

    $.GroupREGEX = new RegExp($.params.tagGroup, 'i')
    $.DispelREGEX = new RegExp($.params.tagDispel, 'i')
    $.DispelAmountREGEX = new RegExp($.params.tagDispelAmount, 'i')

    $.dbLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function(){
        if (!$.dbLoaded.call(this)) {return false};
        if (!$.loaded) {
            // States
            for(const db of $dataStates){
                if(db === null){continue}
                $.loadStateDB(db)
            }
            
            // Skills
            for (const db of $dataSkills){
                if(db === null){continue}
                $.loadSkillDB(db)
            }

            // Items
            for (const db of $dataItems){
                if(db === null){continue}
                $.loadSkillDB(db)
            }
            $.loaded = true
        }
        return true;
    }
    // Substitute for array shuffle to avoid conflict
    $.shuffle = function(){
        const len = this.length
        for(let i = len - 1; i > 0; i--){
            const rand = Math.floor(Math.random() * (i + 1));
            const temp = this[i]
            this[i] = this[rand]
            this[rand] = temp
        }
        return this
    }

    $.loadStateDB = (state) => {
        state.groups = []
        const notedata = state.note.split(/[\r\n]+/)
        for(const line of notedata){
            if(line.match($.GroupREGEX)){
                for(const groupName of RegExp.$1.split(",")){
                    state.groups.push(groupName.trim())
                }
            }
        }
    }

    $.loadSkillDB = (item) => {
        item.dispelGroups = []
        const notedata = item.note.split(/[\r\n]+/)
        for(const line of notedata){
            if(line.match($.DispelREGEX)){
                const cmd = {
                    groups: [],
                    amount: null
                }
                for(const groupName of RegExp.$1.split(",")){
                    cmd.groups.push(groupName.trim())
                }
                item.dispelGroups.push(cmd)
            }

            if(line.match($.DispelAmountREGEX)){
                const cmd = {
                    groups: [],
                    amount: Number(RegExp.$2)
                }
                for(const groupName of RegExp.$1.split(",")){
                    cmd.groups.push(groupName.trim())
                }
                item.dispelGroups.push(cmd)
            }
        }
    }

    $.applyItemUserEffect = Game_Action.prototype.applyItemUserEffect
    Game_Action.prototype.applyItemUserEffect = function(target) {
        $.applyItemUserEffect.call(this, target)

        for(const cmd of this.item().dispelGroups){
            $.dispelEffect.call(target, cmd.groups, cmd.amount)
        }
    }

    $.dispelEffect = function(groups, amount){
        let states = this._states.filter(id => $dataStates[id].groups.some(st => groups.includes(st)))
        if (amount === null){
            for(const stateId of [... new Set(states)]){ // Unique element
                this.removeState(stateId)
            }
        }else{          
            // Temporary takeover how the function works
            const oriEraseState = this.eraseState
            this.eraseState = function(stateId){
                // Stacking states compatibility
                if (this._states.filter(id => id === stateId).length === 1){
                    oriEraseState.call(this, stateId)
                    return
                }
                const index = this._states.indexOf(stateId)
                if (index >= 0){
                    this._states.splice(index, 1)
                }
            }
            
            states = $.shuffle.call(states)

            for(const i of [...Array(amount).keys()]){
                stateId = states.shift()
                if (stateId){
                    this.removeState(stateId)
                }else{
                    break
                }
            }

            // Restore function
            this.eraseState = oriEraseState
        }
    }
}
Theo.StateGrouping()
