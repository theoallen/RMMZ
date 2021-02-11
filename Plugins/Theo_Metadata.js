/*:
@target MZ
@plugindesc v1.0.0 - Actor and Enemy Metadata
@author TheoAllen
@url https://github.com/theoallen/RMMZ/tree/master/Plugins
@help
♦ About:
You want to tag an enemy as a flying enemy and also want to increase 
the damage to the enemy if you're using a ranged weapon but you don't 
want to do the following:

> Use element rate only for that reason.
> Use a complicated state workaround by applying a state to a certain
  enemy and check if the state exists then boost the damage. Plus it
  is also a waste of the state slot.

---------------------------------
♦ How to use:
Let's start with = Ranged weapon vs Flying
if you're using a ranged weapon to a flying enemy, you deal 2.5x damage.

Example damage formula:
> a.meta.ranged && b.meta.flying ? (a.atk*2.5-b.def) : (a.atk-b.def)

Then what you need to do next is to tag the enemy by putting the tag
<flying>

On the actor side, you need to tag your weapon with
<ranged>

Yes, that is the only thing you need to do.

---------------------------------
♦ How does it work?
The plugin retrives all the tags you put in the notebox. And it is up
to you how to use the tag.

If you use, for example, use this in the damage formula and assume
"a" is an actor
> a.meta.pierce

it will search for its entire actor/class notetag, then it also
search the equipment and states, searching if the <pierce> tag exists.

If you use
<pierce: 10>

The value will be added. So if you have multiple 
<pierce: 10> (in a weapon)
<pierce: 5> (in a state)
<pierce: 15> (in another state)

The value total of "a.meta.pierce" will be 30
You can, for example, use this for a damage formula like
> "a.atk - (b.def - a.meta.pierce)"

However, if you want to do this at all, at least you should put 
<pierce: 0> in the actor notebox to indicate its initial value.

Otherwise, it will return NaN and your code may not work.

♦ Terms of Use:
- https://github.com/theoallen/RMMZ/blob/master/README.md
*/
Object.defineProperty(Game_Battler.prototype, "meta", {
    get: function(){
        const meta = {}
        const objects = this.traitObjects()
        for(const o of objects){
            const metadata = o.meta
            const keys = Object.keys(metadata)
            for(const key of keys){
                const value = metadata[key]
                if(isNaN(value)){
                    meta[key] = value.trim()
                }else{
                    meta[key] = meta[key] || 0
                    meta[key] += Number(value)
                }
            }
        }
        return meta;
    }
})

Object.defineProperty(Game_Party.prototype, "meta", {
    get: function(){
        const meta = {}
        const members = this.members()
        for(const member of members){
            const metadata = member.meta
            const keys = Object.keys(metadata)
            for(const key of keys){
                const value = metadata[key]
                if(isNaN(value)){
                    meta[key] = value.trim()
                }else{
                    meta[key] = meta[key] || 0
                    meta[key] += Number(value)
                }
            }
        }
        return meta
    }
})
