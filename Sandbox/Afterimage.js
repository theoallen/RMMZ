Sprite_Actor.prototype.createMainSprite = function() {
    this._mainSprite = new Sprite();
    this._mainSprite.anchor.x = 0.5;
    this._mainSprite.anchor.y = 1;
    this._afterimages = new Afterimages(this)
    this.addChild(this._afterimages)
    this.addChild(this._mainSprite);
};

const Afterimages = class extends Sprite{
    constructor(ref){
        super()
        this.ref = ref
    }

    mainSprite(){
        return this.ref._mainSprite
    }

    update(){
        Sprite.prototype.update.call(this)
        // this.x = this.mainSprite().x
        // this.y = this.mainSprite().y
        this.generateAfterimage()
        for(const child of this.children){
            if(child.opacity === 0){
                child.destroy()
            }
        }
    }

    generateAfterimage(){
        const aftimg = new Afterimage(this.mainSprite())
        this.addChild(aftimg)
    }
}

const Afterimage = class extends Sprite{
    constructor(sprite){
        super()
        this.clone(sprite)
    }

    // Clone everything here
    clone(sprite){
        this.sprite = sprite
        this.bitmap = sprite.bitmap
        this.opacity = 255
        this.anchor.x = sprite.anchor.x
        this.anchor.y = sprite.anchor.y
        this._xpos = sprite.parent.x
        this._ypos = sprite.parent.y
        const frame = sprite._frame
        this.setFrame(frame.x, frame.y, frame.width, frame.height)
        this.updatePosition()
    }

    update(){
        Sprite.prototype.update.call(this)
        this.opacity -= 20
        this.updatePosition()
    }

    updatePosition(){
        this.x = this._xpos - this.sprite.parent.x
        this.y = this._ypos - this.sprite.parent.y
    }
}
