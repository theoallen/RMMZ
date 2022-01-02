Easings = {
    linear: t => t,
        
    // Out
    outSine: t => Math.sin((t * Math.PI) / 2),
    outQuad: t => 1 - (1 - t) * (1 - t),
    outCubic: t => 1 - Math.pow(1 - t, 3),
    outQuart: t => 1 - Math.pow(1 - t, 4),
    outQuint: t => 1 - Math.pow(1 - t, 5),
    outExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
    outCirc: t => Math.sqrt(1 - Math.pow(t - 1, 2)),
    outBack: t => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * pow(t - 1, 3) + c1 * pow(t - 1, 2)
    },

        // In
    inSine: t => 1 - Math.cos((t * Math.PI) / 2),
    inQuad: t => t * t,
    inCubic: t => t * t * t,
    inQuart: t => t * t * t * t,
    inQuint: t => t * t * t * t * t,
    inExpo: t => t === 0 ? 0 : Math.pow(2, 10 * t - 10),
    inCirc: t => 1 - Math.sqrt(1 - Math.pow(t, 2)),
    inBack: t => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return c3 * t * t * t - c1 * t * t
    },

        // In-Out Mix
    inOutSine: t => -(Math.cos(Math.PI * t) - 1) / 2,
    inOutQuad: t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    inOutCubic: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    inOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
    inOutQuint: t => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2,
    inOutExpo: t => x === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2,
    inOutCirc: t => x < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2,
    inOutBack: t => {
        const c1 = 1.70158; const c2 = c1 * 1.525;

         return x < 0.5 
        ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
        : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
    },

    fn: (ori, target, time, maxTime, fnName) => {
        const t = time / maxTime
        const progress = Easings[fnName](t)
        return ori + ((target - ori) * progress);
    },

    /**
	 * Move the object to x,y within the duration. The object must have x and y property to work.
     * 
	 * @param {object} [object=null] - Object that will be moved to XY
     * 
	 * @param {number} [x] - Target X
     * 
     * @param {number} [y] - Target Y
     * 
	 * @param {number} [duration] - Duration until it completes its movement
     * 
     * @param {string} [fnName="Linear"] - What function to use?
     * 
	 */
    move: (object, x, y, duration, fnName = "linear") => {
        const movement = {
            duration: duration,
            maxDuration: duration,
            startX: object.x,
            startY: object.y,
            endingX: x,
            endingY: y,
            object: object,
            fnName: fnName
        }
        movefn = () => {
            if(movement.duration-- > 0){
                const t = movement.maxDuration - movement.duration
                movement.object.x = Easings.fn(movement.startX, movement.endingX, t, movement.maxDuration, movement.fnName)
                movement.object.y = Easings.fn(movement.startX, movement.endingX, t, movement.maxDuration, movement.fnName)
                if(movement.duration <= 0){
                    movefn.done = true
                }
            }
        }
        Easings.updateList.push(movefn)
        return movefn
    },
    /**
	 * Move the object to x,y within the duration. The object must have x and y property to work.
     * 
	 * @param {object} [object=null] - Object that will be moved to XY
     * 
	 * @param {string} [prop] - Property name of the object
     * 
     * @param {number} [value] - Target property value
     * 
	 * @param {number} [duration] - Duration until it completes its movement
     * 
     * @param {string} [fnName="Linear"] - What function to use?
     * 
	 */
    updateProp: (object, prop, value, duration, fnName = "linear") => {
        const movement = {
            duration: duration,
            maxDuration: duration,
            propStart: object[prop],
            propEnd: value,
            propName: prop,
            object: object,
            fnName: fnName
        }
        movefn = () => {
            if(movement.duration-- > 0){
                const t = movement.maxDuration - movement.duration
                movement.object[movement.propName] = Easings.fn(movement.propStart, movement.propEnd, t, movement.maxDuration, movement.fnName)
                if(movement.duration <= 0){
                    movefn.done = true
                }
            }
        }
        Easings.updateList.push(movefn)
        return movefn
    },

    updateList: []
}

Easings.updateBase = Scene_Base.prototype.update
Scene_Base.prototype.update = function() {
    Easings.updateBase.call(this)
    for(const easing of [...Easings.updateList]){
        easing()
        if (easing.done){
            Easings.updateList.remove(easing)
        }
    }
};
