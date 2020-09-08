/*:@target MZ
@url https://github.com/theoallen/RMMZ
@plugindesc v1.0.1 - Auto Text Color
@author TheoAllen
@help
This plugins assign a color automatically to some of the word you
registered in the plugin parameter.

Important note:
- Save this plugin as "Theo_AutoTextColor.js" with that exact name.
  OR ELSE IT WILL NOT WORK.
- To enable/disable the auto color function, use Plugin Command.

Special Credit:
- Estriole for making it originally in VXA/MV
https://forums.rpgmakerweb.com/index.php?threads/est-auto-text-color-plus.49350/
https://www.rpgmakercentral.com/topic/18161-est-auto-text-color-plus/

This is my personal take on how Auto Text Color plugin should
have been.

Terms of Use:
- Free for commercial
- Credit is optional

Difference from the original Auto Text Color
- Removed the return color.
  (it serves no purpose. Who would use return color other than 0 and why?)
- Assign all the registered word in a struct.
- Only works in Window_Message as for now 
  (I need it there than anywhere else to be honest)
- MZ optimized with its plugin command
- No usage of switches 
  (switches should be served as your game eventing. Not plugin setting)
- No auto correct, unless requested.
  (Idk why is that even a thing to be honest)

-------------------------------------------------------------------

@param wordlist
@type struct<wordList>[]
@text List of Words
@desc List of registered word with auto color enabled
@default []

@param activate
@type boolean
@desc Enable this plugin on the new game boot
@text Activate
@default true

@param caseSensitive
@type boolean
@desc Make the word detection case sensitive on the new game boot
@text Case Sensitive
@default false

@command autoColorActivate
@text Activate Auto Color
@desc Activate the auto color function.

@command autoColorDeactivate
@text Deactivate Auto Color
@desc Deactivate the auto color function.

@command caseSensitive
@text Activate case sensitive
@desc Activate the case sensitive Mode. The word must match with the capital letter.

@command caseInsensitive
@text Deactivate case sensitive
@desc Deactivate the case sensitive mode. The word does not have to match with the capital letter.
*/

/*~struct~wordList:
@param word
@text Word
@type text
@desc Put your word here

@param color
@text Color ID
@type number
@default 0
*/

var Theo = Theo || {}
Theo.AutoColor = function(){
  "use strict";
  const _ = Theo.AutoColor
  _.pluginName = "Theo_AutoTextColor"

  _.params = PluginManager.parameters(_.pluginName)
  _.list = []
  JSON.parse(_.params.wordlist).forEach(e => {
      _.list.push(JSON.parse(e))
  });

  Game_System.prototype._autoColor = {
    active: _.params.activate == "true",
    caseSensitive: _.params.caseSensitive == "true",
  }

  // For now, it will only works for Window_Message.
  // Tell me if you need this somewhere else (I probably don't need it myself)
  _.convertEscChar = Window_Message.prototype.convertEscapeCharacters
  Window_Message.prototype.convertEscapeCharacters = function(text) {
    text = _.convertAutoColor(text)
    text = _.convertEscChar.call(this, text)
    return text;
  };

  _.convertAutoColor = function(text){
    if (!$gameSystem._autoColor.active){
      return text
    }
    let newText = text
    let flag = $gameSystem._autoColor.caseSensitive ? "mg" : "img"
    let regex = null
    let textColor = null
    _.list.forEach(list => {
      regex = new RegExp("\\b"+String(list.word)+"\\b", flag)
      textColor = "\\c[" + list.color + "]"
      newText = newText.replace(regex, textColor + "$&" + "\\c[0]")
    })
    return newText
  }

  PluginManager.registerCommand(_.pluginName, "autoColorActivate", a => {
    $gameSystem._autoColor.active = true
  });

  PluginManager.registerCommand(_.pluginName, "autoColorDeactivate", a => {
    $gameSystem._autoColor.active = false
  });

  PluginManager.registerCommand(_.pluginName, "caseSensitive", a => {
    $gameSystem._autoColor.caseSensitive = true
  });

  PluginManager.registerCommand(_.pluginName, "caseInsensitive", a => {
    $gameSystem._autoColor.caseSensitive = false
  });

}
Theo.AutoColor()
