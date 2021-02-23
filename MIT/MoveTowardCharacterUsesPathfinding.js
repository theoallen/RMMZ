Game_Character.prototype.moveTowardPlayer = function() {
    const d = this.findDirectionTo($gamePlayer.x, $gamePlayer.y)
    this.moveStraight(d);
};

Game_Event.prototype.searchLimit = function() {
    return 9999;
};
