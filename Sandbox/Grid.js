var Theo = Theo || {}
Theo.BattleGrid = function(){
    $ = Theo.BattleGrid

    $.MAX_COLUMN = 8
    $.MAX_ROW = 3
    $.MAX_INDEX = $.MAX_COLUMN * $.MAX_ROW - 1

    // Returns grid index (using relative coordinate)
    $.neighbor = function(index, horz, vert){
        const point = $.point(index)
        if (point.invalid)  {
            return -1
        }
        point.x += horz
        point.y += vert
        return $.index(...point.valueOf())
    }
    
    // Returns grid index (using direction)
    $.neighborDir = function(index, direction, times){
        if (times > 1){
            index = $.neighborDir(index, direction, times - 1)
        }
        if (index < 0){
            return -1 // Grid doesn't exist
        }
        const point = $.point(index)
        direction = $.dirDictionary(direction) // Convert into human readable format
        switch(direction){

            // Linear
            case "DOWN":
            case "D":
            case "BOTTOM":
                point.y += 1
                break;

            case "LEFT":
            case "L":
                point.x -= 1
                break;

            case "RIGHT":
            case "R":
                point.x += 1
                break;

            case "TOP":
            case "U":
            case "UP":
                point.y -= 1
                break;

            // Diagonal
            case "BOTTOMLEFT":
                point.x -= 1
                point.y += 1
                break;
            case "BOTTOMRIGHT":
                point.x += 1
                point.y += 1
                break;
            case "TOPLEFT":
                point.x -= 1
                point.y -= 1
                break;
            case "TOPRIGHT":
                point.x += 1
                point.y -= 1
                break;
        }
        return $.index(...point.valueOf())
    }

    // Returns grid index
    $.index = function(x, y){
        if ($.isOutOfBound(x, 0, $.MAX_COLUMN)){
            return -1
        }
        if ($.isOutOfBound(y, 0, $.MAX_ROW)){
            return -1
        }
        return ($.MAX_COLUMN * y) + x
    }

    // Returns [x, y]
    $.point = function(index){
        const point = {
            x: 0,
            y: 0,
            invalid: false,
            valueOf: function() {return [this.x, this.y]}
        }
        if (index > $.MAX_INDEX){
            point.invalid = true
            return point
        }
        point.x = index % $.MAX_COLUMN
        point.y = Math.floor(index / $.MAX_COLUMN)
        return point
    }

    // Returns true/false
    $.isOutOfBound = function(value, min, max){
        return value > max || value < min
    }

    $.dirDictionary = function(dir){
        if (isNaN(dir)){
            return String(dir).toUpperCase()
        }
        return {
            1: "BOTTOMLEFT",
            2: "DOWN",
            3: "BOTTOMRIGHT",
            4: "LEFT",

            6: "RIGHT",
            7: "TOPLEFT",
            8: "UP",
            9: "TOPRIGHT"
        }[dir]
    }
}
Grid = Theo.BattleGrid
Grid()
