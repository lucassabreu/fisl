var Cheese = function(x, y) {

    // por conta
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = "images/cheese.png";

    this.level = null;

    this.holes = [];
    this.enemies = [];

    // fim: por conta
};

Cheese.prototype.loadLevel = function(level) {
    // ini: por conta
    this.holes = [];
    this.enemies = [];

    this.level = level;

    var index = 0, holeMeta = null;

    for (index in this.level.holes) {
        holeMeta = this.level.holes[index];
        this.holes.push(new Hole(holeMeta.x, holeMeta.y, holeMeta.type));
    }

    var enemy = null, enemyMeta = null;
    for (index in this.level.enemies) {
        enemyMeta = this.level.enemies[index];

        switch (enemyMeta.enemy) {
            case "Rat":
                enemy = new Rat(enemyMeta.interval, enemyMeta.probability);
                break;
        }

        this.enemies.push(enemy);
    }

    // fim: por conta
};

Cheese.prototype.processInputs = function(clicks) {
    if (clicks.length > 0) {
        console.clear();
        for (var index in clicks) {
            console.log(clicks[index]);

            var enemy = null;
            for (var iEne in this.enemies) {
                enemy = this.enemies[iEne];
                enemy.collide(clicks[index]);
            }
        }
    }
};

Cheese.prototype.update = function(delta) {
    for (var index in this.holes) {
        this.enemies[index].show(this.holes[index]);
    }
};

Cheese.prototype.draw = function(context) {

    context.save(); // salva o estado de desenho do contexto
    context.translate(this.x, this.y); // muda a posicao 0/0 para o passado por parametro

    // por conta
    context.drawImage(this.image, 0, 0); // printei cheese
    var index = null;
    for (index in this.holes) {
        this.holes[index].draw(context);
    }

    for (index in this.enemies) {
        this.enemies[index].draw(context);
    }

    context.restore(); // restaura o contexto, posicoes x e y
    // fim: por conta
};
