var Theo = Theo || {};

Theo.MoveObject = class {
    constructor(obj){
        this.obj = obj
        initialize()
    }

    initialize(){
        this.toX = null;
        this.toY = null;
        this.realX = 0.0;
        this.realY = 0.0;
        this.xSpeed = 0.0;
        this.ySpeed = 0.0;
        this.jump = 0.0;
        this.jumpInterval = 0.0;
        this.offset = 0.0;
        this.duration = 0.0;
    }

    moveto(x, y, jump = 0, duration = 60){
        this.toX = x;
        this.toY = y;
        this.onMove();
        this.determineSpeed(duration,jump);
    }

    determineSpeed(duration, jump){
        this.xSpeed = (this.toX - this.obj.x) / duration;
        this.ySpeed = (this.toY - this.obj.y) / duration;
        this.jump = jump;
        this.jumpInterval = jump/(duration/2.0);
        this.duration = duration;
    }

    onMove(){
        this.realX = this.obj.x;
	    this.realY = this.obj.y;
    }

    isMoving(){
        if (this.toX === null && this.toY === null) {
            return false
        };
        var result = this.obj.x !== this.toX || this.obj.y !== this.toY;
        return result && this.duration > 0;
    }

    updateMove(){
        if (!this.isMoving()) {return};
        this.duration -= 1;
        this.realX += this.xSpeed;
        this.realY += this.ySpeed;
        this.onUpdate();
            this.jump -= this.jumpInterval;
            this.offset -= this.jump;
            if (!this.isMoving()) {
            this.onFinish();
            this.initialize();
        };
    }

    onFinish(){
        this.obj.x = this.toX;
	    this.obj.y = this.toY;
    }

    onUpdate(){
        this.obj.x = Math.round(this.realX);
        this.obj.y = Math.round(this.realY) + Math.round(this.offset);
    }
}
