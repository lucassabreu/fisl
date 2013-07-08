var Game = function() {
    this._cheese = null;
    this._context = null;
    this._canvas = null;
    this._inputs = null;
    this._currentLevel = null;

    // passo4
    this.background = new Image();
    this.background.src = "images/bg.png";
};

Game.TICK = 30;

Game.prototype.init = function() {
    this._canvas = document.getElementById("game");
    this._context = this._canvas.getContext("2d");

    this._inputs = [];
    this._canvas.addEventListener("click", this.onClicked.bind(this));

    this._currentLevel = Levels[1];
    this._cheese = new Cheese(0, this._canvas.height - 469);
    this._cheese.loadLevel(this._currentLevel);
};

Game.prototype.onClicked = function(e) {
    var click = {
        x: e.clientX,
        y: e.clientY
    };
    this._inputs.push(click);
};

Game.prototype.start = function() {
    this._mainLoop();
};

Game.prototype._mainLoop = function() {
    this._processInput();
    this._update();
    this._draw();

    // comentei para brincar
    setTimeout(this._mainLoop.bind(this), Game.TICK);
};

Game.prototype._processInput = function() {
    this._cheese.processInputs(this._inputs);
    this._inputs = [];
};

Game.prototype._update = function() {
    this._cheese.update(Game.TICK);
};

Game.prototype._draw = function() {

    // parte 4
    this._context.drawImage(this.background, 0, 0);

    this._cheese.draw(this._context);
};
