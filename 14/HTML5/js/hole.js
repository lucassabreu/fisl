var Hole = function(x, y, type) {
    // ini: primeira etapa
    this.x = x;
    this.y = y;

    this.image = new Image();
    this.image.src = Hole.types[type - 1];
    this.enemy = null;
    // fim: primeira etapa
};


Hole.types = [
    "images/hole1.png",
    "images/hole2.png",
    "images/hole3.png",
    "images/hole4.png"
];

Hole.prototype.draw = function(context) {
    // ini: primeira etapa
    context.drawImage(this.image,
            this.x - this.image.width / 2,
            this.y - this.image.height / 2);
    // fim: primeira etapa
};

Hole.prototype.setEnemy = function(enemy) {
    if (this.enemy !== null)
        this.enemy.hole = null;
    
    this.enemy = enemy;
    this.enemy.hole = this;
};
