var Game = function() {
    this._cheese = null;
    this._context = null;
    this._canvas = null;
    this._inputs = null;
    this._currentLevel = null;
    this._currentLevelNumber = 0;
    this._looper = null;
    this._pauseButton = null;
    this._nextLevelButton = null;
    this._state = Game.State.Paused;
    this._pauseMenu = null;
    this._looseMenu = null;
    this._winMenu = null;

    // passo4
    this.background = new Image();
    this.background.src = "images/bg.png";

    this._hpImageBord = new Image();
    this._hpImageBord.src = "images/heart.png";

    this._hpImageFill = new Image();
    this._hpImageFill.src = "images/heart_body.png";
};

Game.TICK = 30;

Game.State = {
    Paused: 0,
    Running: 1,
    Loose: 2,
    Winned: 3
};

Game.prototype.init = function() {
    this._canvas = document.getElementById("game");
    this._context = this._canvas.getContext("2d");

    this._inputs = [];
    this._canvas.addEventListener("click", this.onClicked.bind(this));

    this._pauseButton = document.getElementById("pause_button");
    this._pauseButton.addEventListener("click", this.onPause.bind(this));

    this._nextLevelButton = document.getElementById("nextlevel_button");
    this._nextLevelButton.addEventListener("click", this.onNextLevel.bind(this));

    this._pauseMenu = document.getElementById("pause_menu");
    this._looseMenu = document.getElementById("loose_menu");
    this._winMenu = document.getElementById("win_menu");

    this._currentLevelNumber = 1;
    this._currentLevel = Levels[this._currentLevelNumber];
    this._cheese = new Cheese(0, this._canvas.height - 469);
    this._cheese.loadLevel(this._currentLevel);
};

Game.prototype.onClicked = function(e) {
    if (!this.isPaused()) {
        var click = {
            x: e.clientX,
            y: e.clientY
        };
        this._inputs.push(click);
    }
};

Game.prototype.onPause = function(e) {
    if (this._state === Game.State.Paused) {
        this.start();
    } else {
        if (this._state === Game.State.Running)
            this.pause();
        else
            this.retry();
    }
};

Game.prototype.onNextLevel = function(e) {
    e.preventDefault();


    if (Levels[this._currentLevelNumber + 1]) {
        this._currentLevelNumber++;
    } else {
        this._currentLevelNumber = 1;
    }

    this._currentLevel = Levels[this._currentLevelNumber];
    this._cheese.loadLevel(this._currentLevel);
    this.start();

    return false;
};

Game.prototype.start = function() {
    this._pauseButton.src = "images/pause.png";
    this._state = Game.State.Running;
    this._mainLoop();
    this._pauseMenu.style.display = "none";
    this._looseMenu.style.display = "none";
    this._winMenu.style.display = "none";
};

Game.prototype.pause = function() {
    this._pauseButton.src = "images/play.png";
    this._state = Game.State.Paused;
    window.clearInterval(this._looper);
    this._looper = null;
    this._pauseMenu.style.display = "block";
};

Game.prototype.retry = function() {
    this._cheese.loadLevel(this._currentLevel);
    this.start();
};

Game.prototype.isPaused = function() {
    return this._state === Game.State.Paused;
};

Game.prototype._mainLoop = function() {
    if (this._state !== Game.State.Running)
        return;

    this._processInput();
    this._update();
    this._draw();

    // comentei para brincar
    this._looper = setTimeout(this._mainLoop.bind(this), Game.TICK);
};

Game.prototype._processInput = function() {
    this._cheese.processInputs(this._inputs);
    this._inputs = [];
};

Game.prototype._update = function() {
    this._cheese.update(Game.TICK);

    if (this._cheese.hp <= 0) {
        this.pause();
        this._state = Game.State.Loose;
        this._pauseMenu.style.display = "none";
        this._looseMenu.style.display = "block";
        this._pauseButton.src = "images/retry.png";
    } else {
        if (this._cheese.enemiesAlive === 0) {
            this._state = Game.State.Winned;
            this._pauseButton.src = "images/retry.png";

            console.clear();
            console.log(this._currentLevelNumber + 1);
            console.log(Levels[this._currentLevelNumber + 1]);

            if (Levels[this._currentLevelNumber + 1]) {
                console.log("reher");
                this._nextLevelButton.innerHTML = "Next Level &Gg;";
                console.log(this._nextLevelButton);
            } else {
                console.log("iet");
                this._nextLevelButton.innerHTML = "Reset Game?";
                console.log(this._nextLevelButton);
            }

            this._winMenu.style.display = "block";
        }
    }
};

Game.prototype._draw = function() {
    // parte 4
    this._context.drawImage(this.background, 0, 0);

    this._context.drawImage(this._hpImageBord, 0, 0);
    var v_percHp = 1 - (this._cheese.hp / this._currentLevel.hp);

    this._context.fillStyle = "white";
    this._context.font = "bold 16px monospace";
    this._context.fillText("Life:  " + this._cheese.hp, this._hpImageFill.width + 5, 20);
    this._context.fillText("Level: " + this._currentLevelNumber, this._hpImageFill.width + 5, 45);
    this._context.fillText("Enemies Alive: " + this._cheese.enemiesAlive, this._hpImageFill.width + 5, 75);

    this._context.drawImage(this._hpImageFill, // sx, sy, sw, sh, dx, dy, dw, dh
            0, // sx
            (this._hpImageFill.height * v_percHp), // sy
            this._hpImageFill.width, // sw
            this._hpImageFill.height - (this._hpImageFill.height * v_percHp), // sh
            0, // dx
            this._hpImageFill.height * v_percHp, // dy
            this._hpImageFill.width, // dw
            this._hpImageFill.height - (this._hpImageFill.height * v_percHp)); // dh

    this._cheese.draw(this._context);
};
