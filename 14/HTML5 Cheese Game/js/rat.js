var Rat = function(interval, probability) {
    this.interval = interval;
    this.probability = probability;
    this._state = Rat.State.Default;
    this._visible = false;

    this.image = new Image();
    this.image.src = "images/mouse1.png";
    this._timeout = 0;
    this._hole = null;

    this._dyingTimeout = 0;
    this._dyingAnimationTimer = 0;
    this._dyingFrameTime = 200;
    this._dyingCurrentFrame = 0;
    this._dyingFrameCount = 2;
    this._imageDying = new Image();
    this._imageDying.src = "images/mouse2.png";
};

Rat.State = {
    Default: 0,
    Dying: 1,
    Dead: 2
};

Rat.prototype.collide = function(point) {
    if (this._hole === null || !this.isVisible())
        return false;

    var v_rect = {
        // centro - metade da altura + espaco em branco
        left: this._hole.x - (this.image.width / 2),
        top: this._hole.y - (this.image.height / 2),
        right: this._hole.x + (this.image.width / 2),
        bottom: this._hole.y + (this.image.height / 2)
    };

    return v_rect.left < point.x && v_rect.right > point.x
            && v_rect.top < point.y && v_rect.bottom > point.y;
};

Rat.prototype.kill = function() {
    this._state = Rat.State.Dying;
    this._dyingTimeout = 1000;
    this._actualDyingSprite = 1;
};

Rat.prototype.isVisible = function() {
    return this._visible;
};

Rat.prototype.isDead = function() {
    return this._state !== Rat.State.Default;
};

Rat.prototype.update = function(delta) {
    if (this._state === Rat.State.Default) {
        this._timeout -= delta;

        if (this._timeout <= 0) {
            this._visible = false;
            if (this._hole !== null)
                this._hole.setEnemy(null);
        }
    } else {
        if (this._state === Rat.State.Dying) {
            this._dyingTimeout -= delta;
            this._dyingAnimationTimer += delta;

            var frameInc = Math.floor(this._dyingAnimationTimer / this._dyingFrameTime);

            this._dyingAnimationTimer %= this._dyingFrameTime;
            this._dyingCurrentFrame += frameInc;
            this._dyingCurrentFrame %= this._dyingFrameCount;

            if (this._dyingTimeout <= 0) {
                this._state = Rat.State.Dead;
                this._visible = false;

                if (this._hole !== null)
                    this._hole.setEnemy(null);

                this._hole = null;
            }
        }
    }
};

Rat.prototype.show = function(hole) {
    this._hole = hole;
    this._hole.setEnemy(this);
    this._visible = true;
    this._timeout = this.interval;
};

Rat.prototype.draw = function(context) {
    if (this._hole !== null && this.isVisible()) {
        if (this._state === Rat.State.Default) {
            context.drawImage(this.image,
                    this._hole.x - this.image.width / 2,
                    this._hole.y - this.image.height / 2);
        } else {
            if (this._state === Rat.State.Dying) {
                context.drawImage(this._imageDying,
                        this.image.width * this._dyingCurrentFrame,
                        0,
                        this.image.width,
                        this.image.height,
                        this._hole.x - this.image.width / 2,
                        this._hole.y - this.image.height / 2,
                        this.image.width,
                        this.image.height);
            }
        }
    }
};
