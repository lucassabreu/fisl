var Rat = function(interval, probability) {
    this.interval = interval;
    this.probability = probability;

    this.image = new Image();
    this.image.src = "images/mouse1.png";

    this.hole = null;

    // na sugestão não teria this.hole
    // existiria this.x e this.y

    //this.x = 0;
    //this.y = 0;

};


Rat.prototype.draw = function(context) {
    if (this.hole !== null) {
        context.drawImage(this.image,
                this.hole.x - this.image.width / 2,
                this.hole.y - this.image.height / 2);
    }

};

Rat.prototype.collide = function(point) {
    if (this.hole === null)
        return;

    var rect = {
        xIni: this.hole.x - (this.image.width / 2),
        yIni: this.hole.y - (this.image.height / 2),
        xFin: this.hole.x + (this.image.width / 2),
        yFin: this.hole.y + (this.image.height / 2)
    }

    console.log(rect);

    if (rect.xIni <= point.x && rect.xFin >= point.x
            && rect.yIni <= point.y && rect.yFin >= point.y) {
        alert('true');
    }
};

Rat.prototype.update = function(delta) {

};

Rat.prototype.show = function(hole) {
    this.hole = hole;
    this.hole.setEnemy(this);

    //this.x = hole.x;
    //this.y = hole.y;

    // não alimentaria hole
    // pega hole.x e hole.y de hole e copia para this.x e this.y
};
