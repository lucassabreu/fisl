var Cheese = function(x, y) {

    // por conta
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = "images/cheese.png";

    this.level = null;
    this.hp = 0;
    this._hpInterval = 500;
    this._hpTimeout = this._hpInterval;

    this.holes = [];
    this.enemies = [];

    this.enemiesAlive = 0;

    // fim: por conta
};

Cheese.prototype.loadLevel = function(level) {
    // ini: por conta
    this.holes = [];
    this.enemies = [];

    this.level = level;
    this.hp = level.hp;

    var index = 0, holeMeta = null;

    for (index in this.level.holes) {
        holeMeta = this.level.holes[index];
        this.holes.push(new Hole(holeMeta.x, holeMeta.y, holeMeta.type));
    }

    var enemy = null, enemyMeta = null;
    this.enemiesAlive = 0;
    for (index in this.level.enemies) {
        enemyMeta = this.level.enemies[index];

        switch (enemyMeta.enemy) {
            case "Rat":
                enemy = new Rat(enemyMeta.interval, enemyMeta.probability);
                break;
        }

        this.enemies.push(enemy);
        this.enemiesAlive++;
    }

    // fim: por conta
};

Cheese.prototype.processInputs = function(clicks) {
    if (clicks.length > 0) {
        var click = null;

        for (var index in clicks) {
            click = {
                x: (clicks[index].x - this.x + window.scrollX),
                y: (clicks[index].y - this.y + window.scrollY)
            };

            var enemy = null;
            for (var iEne in this.enemies)
            {
                enemy = this.enemies[iEne];
                if (enemy.collide(click)) {
                    enemy.kill();
                    this.enemiesAlive--;
                    break;
                }
            }
        }
    }
};

Cheese.prototype.update = function(delta) {
    var enemy = null, iHole = null;
    for (var index in this.enemies) {
        enemy = this.enemies[index];

        if (!enemy.isDead() && !enemy.isVisible()) {
            if (enemy.probability > Math.random()) {
                iHole = Utils.getRandomInt(0, this.holes.length - 1);
                if (!this.holes[iHole].hasEnemy())
                    enemy.show(this.holes[iHole]);
            }
        }

        enemy.update(delta);
    }

    this._hpTimeout -= delta;
    if (this._hpTimeout <= 0) {
        this._hpTimeout = this._hpInterval;
        
        this.hp -= this.enemiesAlive;
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
