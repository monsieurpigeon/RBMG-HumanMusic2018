var HumanMusic;
(function (HumanMusic) {
    var Global = /** @class */ (function () {
        function Global() {
        }
        // game size
        Global.GAME_WIDTH = 1024;
        Global.GAME_HEIGHT = 640;
        return Global;
    }());
    HumanMusic.Global = Global;
})(HumanMusic || (HumanMusic = {}));
window.onload = function () {
    HumanMusic.Global.game = new HumanMusic.Game();
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var HumanMusic;
(function (HumanMusic) {
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = 
            // init game
            _super.call(this, HumanMusic.Global.GAME_WIDTH, HumanMusic.Global.GAME_HEIGHT, Phaser.AUTO, "content") || this;
            // load states
            _this.state.add("Boot", HumanMusic.Boot);
            _this.state.add("Preload", HumanMusic.Preload);
            _this.state.add("Disclaimer", HumanMusic.Disclaimer);
            _this.state.add("Start", HumanMusic.Start);
            _this.state.add("Menu", HumanMusic.Menu);
            _this.state.add("Play", HumanMusic.Play);
            // start
            _this.state.start("Boot");
            return _this;
        }
        return Game;
    }(Phaser.Game));
    HumanMusic.Game = Game;
})(HumanMusic || (HumanMusic = {}));
var HumanMusic;
(function (HumanMusic) {
    var Preferences = /** @class */ (function () {
        function Preferences() {
            this.score = [0, 0, 0, 0, -1];
            this.top = [0, 0, 0, 0, 0];
        }
        Object.defineProperty(Preferences, "instance", {
            get: function () {
                if (Preferences._instance === null) {
                    Preferences._instance = new Preferences();
                }
                return Preferences._instance;
            },
            enumerable: true,
            configurable: true
        });
        Preferences._instance = null;
        return Preferences;
    }());
    HumanMusic.Preferences = Preferences;
})(HumanMusic || (HumanMusic = {}));
var HumanMusic;
(function (HumanMusic) {
    var Elements = /** @class */ (function () {
        function Elements() {
        }
        Elements.LIST = [
            {
                name: "🔥 Fire",
                track: [
                    [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
                    [true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true],
                    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],
                    [false, true, false, true, false, false, false, true, false, true, false, true, false, false, false, true]
                ],
                introduction: "Bonjour",
                instruments: ["kick", "snare", "hihat", "bell"]
            },
            {
                name: "🌱 Earth",
                track: [
                    [true, false, false, true, false, false, true, false, false, false, true, false, false, false, true, false],
                    [false, true, false, false, false, true, false, false, false, true, false, false, true, false, true, false],
                    [false, false, true, false, true, false, false, false, true, false, false, true, false, false, false, false],
                    [false, true, false, true, false, false, true, false, false, true, false, false, false, false, true, false]
                ],
                introduction: "Bonjour",
                instruments: ["kick", "snare", "hihat", "bell"]
            },
            {
                name: "☁️ Air",
                track: [
                    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],
                    [false, true, false, false, true, false, false, false, true, false, false, true, false, false, false, true],
                    [true, false, false, true, false, false, true, false, false, false, true, false, true, false, false, false],
                    [false, true, false, false, true, false, false, true, false, false, false, true, false, false, true, false]
                ],
                introduction: "Bonjour",
                instruments: ["kick", "snare", "hihat", "bell"]
            },
            {
                name: "💧 Water",
                track: [
                    [false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false],
                    [true, false, false, true, false, false, true, false, true, false, false, true, false, false, true, false],
                    [false, false, true, false, true, false, false, true, false, false, true, false, true, false, false, true],
                    [false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false]
                ],
                introduction: "Bonjour",
                instruments: ["kick", "snare", "hihat", "bell"]
            },
            {
                name: "😀 Soul",
                track: [
                    [false, true, false, false, false, true, false, false, true, false, false, true, false, false, false, true],
                    [true, false, true, false, true, false, false, false, false, true, false, false, true, false, true, false],
                    [false, true, false, false, false, true, false, true, false, false, false, true, false, true, false, false],
                    [true, false, false, true, false, false, false, false, false, true, false, false, false, false, false, true]
                ],
                introduction: "Bonjour",
                instruments: ["kick", "snare", "hihat", "bell"]
            }
        ];
        return Elements;
    }());
    HumanMusic.Elements = Elements;
})(HumanMusic || (HumanMusic = {}));
var HumanMusic;
(function (HumanMusic) {
    var MainLayer = /** @class */ (function (_super) {
        __extends(MainLayer, _super);
        function MainLayer(game, parent, track) {
            var _this = _super.call(this, game, parent) || this;
            _this.tuto = true;
            _this._levelInstruments = [2, 3, 4];
            _this._levelToText = ["easy", "medium", "hard"];
            _this._score = 0;
            _this._remains = 0;
            _this._track = track;
            _this._element = HumanMusic.Elements.LIST[track];
            _this._level = Math.min(HumanMusic.Preferences.instance.score[track], 2);
            _this._highScore = HumanMusic.Preferences.instance.top[track];
            if (HumanMusic.Preferences.instance.score[track] < 3) {
                _this._levelText = _this._levelToText[_this._level];
            }
            else {
                _this._levelText = "Xtrem";
            }
            _this._pads = [];
            _this._tempo = [];
            _this._controls = [];
            _this._instruments = [];
            _this._instrumentTweens = [];
            _this._textTweens = [];
            _this._current = 15;
            _this._beginListenCount = 0;
            _this.initPushedPads();
            _this.initSounds();
            _this._remainText = _this.game.add.text(1024 - 100, HumanMusic.Global.GAME_HEIGHT / 12, "Remaining: ...", null);
            _this._remainText.anchor.set(1, 0.5);
            _this._remainText.fill = '#00FFFF';
            _this.createTimer();
            _this.computeRemains();
            _this.generateTempo();
            _this.generateInstruments();
            _this.generatePads();
            _this.generateControls();
            _this.launchListen();
            if (_this._level > 0 && HumanMusic.Preferences.instance.score[_this._track] < 3) {
                _this.populateTrack();
            }
            _this._scoreText = _this.game.add.text(100, HumanMusic.Global.GAME_HEIGHT / 12, "Score: " + _this._score, null);
            _this._scoreText.anchor.set(0, 0.5);
            _this._scoreText.fill = '#00FFFF';
            _this._highScoreText = _this.game.add.text(100, HumanMusic.Global.GAME_HEIGHT / 12 + 20, "Highscore: " + _this._highScore, null);
            _this._highScoreText.anchor.set(0, 0.5);
            _this._highScoreText.fontSize = 12;
            _this._highScoreText.fill = '#006767';
            _this._textTweens[0] = _this.game.add.tween(_this._scoreText.scale).
                to({ x: 1.2, y: 1.2 }, 100, function (k) {
                return Math.sin(Math.PI * k);
            }, false, 0);
            _this._textTweens[1] = _this.game.add.tween(_this._remainText.scale).
                to({ x: 1.2, y: 1.2 }, 100, function (k) {
                return Math.sin(Math.PI * k);
            }, false, 0);
            _this._title = _this.game.add.text(HumanMusic.Global.GAME_WIDTH / 2, HumanMusic.Global.GAME_HEIGHT / 12, _this._element.name + " : " + _this._levelText, null);
            _this._title.anchor.set(0.5, 0.5);
            _this._title.fill = '#00FFFF';
            _this.initBonusEmitter();
            return _this;
        }
        MainLayer.prototype.updateRemainText = function () {
            this._remainText.text = "Remaining: " + this._remains;
        };
        MainLayer.prototype.updateSCoreText = function () {
            if (this._score > this._highScore) {
                this._highScore = this._score;
                HumanMusic.Preferences.instance.top[this._track] = this._highScore;
                this._highScoreText.text = "Highscore: " + this._highScore;
            }
            this._scoreText.text = "Score: " + this._score;
        };
        MainLayer.prototype.bounceText = function (type) {
            if (!this._textTweens[type].isRunning) {
                this._textTweens[type].start();
            }
        };
        MainLayer.prototype.initBonusEmitter = function () {
            // Bonus emitter
            var emitter = new Phaser.Particles.Arcade.Emitter(this.game, 0, 0, 16);
            emitter.makeParticles("Bonus", [0]);
            emitter.setYSpeed(-50, -20);
            emitter.setRotation(0, 0);
            emitter.setAlpha(1, 0, 500, Phaser.Easing.Linear.None);
            emitter.gravity = -HumanMusic.Parameters.GRAVITY;
            //this._pads['bonus'] = emitter;
            this._bonusEmitter = emitter;
            // Malus emitter
            var emitter2 = new Phaser.Particles.Arcade.Emitter(this.game, 0, 0, 16);
            emitter2.makeParticles("Bonus", [1]);
            emitter2.setYSpeed(-50, -20);
            emitter2.setRotation(0, 0);
            emitter2.setAlpha(1, 0, 500, Phaser.Easing.Linear.None);
            emitter2.gravity = -HumanMusic.Parameters.GRAVITY;
            //this._pads['malus'] = emitter2;
            this._malusEmitter = emitter2;
        };
        MainLayer.prototype.populateTrack = function () {
            for (var i = 0; i < this._levelInstruments[this._level] - 1; i++) {
                for (var j = 0; j < 16; j++) {
                    if (this._element.track[i][j]) {
                        this.pushPad(i, j);
                    }
                }
            }
            this.eraseTrack();
        };
        MainLayer.prototype.eraseTrack = function () {
            var dice = this.game.rnd.between(0, 3);
            for (var i = 0; i < this._levelInstruments[this._level] - 1; i++) {
                for (var j = dice * 4; j < (dice + 1) * 4; j++) {
                    if (this._pushedPads[i][j]) {
                        this.pushPad(i, j);
                    }
                }
            }
        };
        MainLayer.prototype.initSounds = function () {
            this._soundArray = [];
            this._soundArray[0] = this.game.add.audio(this._element.instruments[0]);
            this._soundArray[1] = this.game.add.audio(this._element.instruments[1]);
            this._soundArray[2] = this.game.add.audio(this._element.instruments[2]);
            this._soundArray[3] = this.game.add.audio(this._element.instruments[3]);
            this._soundArray[5] = this.game.add.audio('metronome');
        };
        MainLayer.prototype.initPushedPads = function () {
            this._pushedPads = [];
            for (var i = 0; i < this._levelInstruments[this._level]; i++) {
                this._pushedPads[i] = [];
                for (var j = 0; j < 16; j++) {
                    this._pushedPads[i][j] = false;
                }
            }
        };
        MainLayer.prototype.pushPad = function (instrument, tempo) {
            this._pushedPads[instrument][tempo] = !this._pushedPads[instrument][tempo];
            if (this._pushedPads[instrument][tempo]) {
                this._pads[instrument][tempo].setFrames(3, 3, 3);
            }
            else {
                this._pads[instrument][tempo].setFrames(1, 0, 2);
            }
        };
        MainLayer.prototype.createTimer = function () {
            this._timer = this.game.time.create(false);
            this._timer.loop(200, this.tick, this);
            this._timer.start(50);
        };
        MainLayer.prototype.generateTempo = function () {
            for (var i = 0; i < 16; i++) {
                var tempo = this.game.add.sprite(51 * i + 125 + 2 * Math.ceil((i + 1) / 4), 400, 'Tempo', 1);
                tempo.anchor.set(0.5, 0.5);
                this._tempo[i] = tempo;
            }
        };
        MainLayer.prototype.generateInstruments = function () {
            for (var i = 0; i < this._levelInstruments[this._level]; i++) {
                this._instruments[i] = this.game.add.sprite(51, 349 - 52 * i, 'Instruments', i);
                this._instruments[i].anchor.set(0.5, 0.5);
                this._instrumentTweens[i] = this.game.add.tween(this._instruments[i].scale).
                    to({ x: 0.8, y: 0.8 }, 100, function (k) {
                    return Math.sin(Math.PI * k);
                }, false, 0);
            }
        };
        MainLayer.prototype.bounce = function (index) {
            if (!this._instrumentTweens[index].isRunning) {
                this._instrumentTweens[index].start();
            }
        };
        MainLayer.prototype.generatePads = function () {
            var scope = this;
            var _loop_1 = function (i) {
                this_1._pads[i] = [];
                var _loop_2 = function (j) {
                    var button = this_1.game.add.button(51 * j + 125 + 2 * Math.ceil((j + 1) / 4), 349 - 52 * i, 'Pad', function () {
                        scope.pushPad(i, j);
                    }, this_1, 1, 0, 2);
                    button.anchor.set(0.5, 0.5);
                    this_1._pads[i][j] = button;
                };
                for (var j = 0; j < 16; j++) {
                    _loop_2(j);
                }
            };
            var this_1 = this;
            for (var i = 0; i < this._levelInstruments[this._level]; i++) {
                _loop_1(i);
            }
        };
        MainLayer.prototype.generateControls = function () {
            var button = this.game.add.button(HumanMusic.Global.GAME_WIDTH / 2, HumanMusic.Global.GAME_HEIGHT - 20, 'Listen', function () {
                this.preLaunchListen();
            }, this);
            button.anchor.set(0.5, 1);
            this._controls['listen'] = button;
            var returnButton = this.game.add.button(50, 50, 'Return', function () {
                this.game.state.start("Menu");
            }, this, 1, 0, 2);
            returnButton.anchor.set(0.5, 0.5);
            this._controls['listen'] = button;
        };
        MainLayer.prototype.preLaunchListen = function () {
            this._beginListenCount = 0;
            this._mode = 2 /* WAIT */;
            this._controls['listen'].frame = 1;
            this._controls['listen'].inputEnabled = false;
        };
        MainLayer.prototype.launchListen = function () {
            this.resetTempo();
            this._controls['listen'].frame = 1;
            this._controls['listen'].inputEnabled = false;
            this._beginListenCount = 0;
            this._mode = 0 /* LISTEN */;
        };
        MainLayer.prototype.stopListen = function () {
            this._controls['listen'].frame = 0;
            this._controls['listen'].inputEnabled = true;
            this._mode = 1 /* PLAY */;
        };
        MainLayer.prototype.correctInputs = function (index) {
            if (this.tuto === true) {
                if (this._pushedPads[index][this._current] === this._element.track[index][this._current]) {
                    // Bonus Emitter
                    if (this._pads[index][this._current].frame == 3) {
                        this._bonusEmitter.emitX = this._pads[index][this._current].x;
                        this._bonusEmitter.emitY = this._pads[index][this._current].y;
                        this._bonusEmitter.setXSpeed(-20, 20);
                        this._bonusEmitter.setYSpeed(0, 20);
                        this._bonusEmitter.emitParticle();
                        this._pads[index][this._current].inputEnabled = false;
                        this._pads[index][this._current].setFrames(4, 4, 4);
                        this._score += 2;
                        this.bounceText(0);
                    }
                }
                else {
                    this._pads[index][this._current].setFrames(5, 5, 5);
                    // Malus Emitter
                    this._malusEmitter.emitX = this._pads[index][this._current].x;
                    this._malusEmitter.emitY = this._pads[index][this._current].y;
                    this._malusEmitter.setXSpeed(-20, 20);
                    this._malusEmitter.setYSpeed(0, 20);
                    this._malusEmitter.emitParticle();
                    this._score -= 1;
                    this.bounceText(0);
                }
            }
            this.computeRemains();
            this.updateSCoreText();
        };
        MainLayer.prototype.computeRemains = function () {
            var remain = 0;
            for (var i = 0; i < this._levelInstruments[this._level]; i++) {
                for (var j = 0; j < 16; j++) {
                    if (this._element.track[i][j] && !this._pushedPads[i][j]) {
                        remain++;
                    }
                }
            }
            if (this._remainText) {
                if (remain != this._remains) {
                    if (this._textTweens[1]) {
                        this.bounceText(1);
                    }
                    this._remains = remain;
                    this.updateRemainText();
                }
            }
        };
        // Update
        MainLayer.prototype.tick = function () {
            this.lightTempoOn();
            this._current = (this._current + 1) % 16;
            this.lightTempoOff();
            if (this._mode == 1 /* PLAY */) {
                for (var i = 0; i < this._levelInstruments[this._level]; i++) {
                    if (this._pushedPads[i][this._current]) {
                        this._soundArray[i].play();
                        this.bounce(i);
                        this.correctInputs(i);
                    }
                }
                if (this.checkSolution() === true) {
                    //Start result
                    this.prepareVictory();
                }
            }
            else if (this._mode == 0 /* LISTEN */) {
                if (this._beginListenCount < 16) {
                    if (this._beginListenCount % 4 == 0) {
                        this._soundArray[5].play();
                    }
                    this._beginListenCount++;
                }
                else {
                    for (var i = 0; i < this._levelInstruments[this._level]; i++) {
                        if (this._element.track[i][this._current]) {
                            this._soundArray[i].play();
                            this.bounce(i);
                        }
                        if (this._pushedPads[i][this._current]) {
                            this.correctInputs(i);
                        }
                    }
                    if (this._current == 15) {
                        if (this._remains == 0) {
                            this._beginListenCount = 18;
                        }
                        if (this._beginListenCount < 18) {
                            this._beginListenCount++;
                        }
                        else {
                            this.stopListen();
                        }
                    }
                }
            }
            else if (this._mode == 2 /* WAIT */) {
                if (this._current % 4 == 0) {
                    this.launchListen();
                }
            }
            else if (this._mode == 3 /* VICTORY */) {
                for (var i = 0; i < this._levelInstruments[this._level]; i++) {
                    if (this._element.track[i][this._current]) {
                        this._soundArray[i].play();
                        this.bounce(i);
                    }
                    if (this._pushedPads[i][this._current]) {
                        this.correctInputs(i);
                    }
                }
                if (this._current == 15) {
                    this.prepareNext();
                }
            }
            else if (this._mode == 4 /* PRENEXT */) {
                if (this._beginListenCount < 15) {
                    if (this._beginListenCount % 4 == 0) {
                        this._soundArray[5].play();
                    }
                    this._beginListenCount++;
                }
                else {
                    this.launchNext();
                }
            }
            else if (this._mode == 5 /* NEXT */) {
                for (var i = 0; i < this._levelInstruments[this._level]; i++) {
                    if (this._element.track[i][this._current]) {
                        this._soundArray[i].play();
                        this.bounce(i);
                    }
                    if (this._pushedPads[i][this._current]) {
                        this.correctInputs(i);
                    }
                }
            }
        };
        MainLayer.prototype.checkSolution = function () {
            for (var i = 0; i < this._levelInstruments[this._level]; i++) {
                for (var j = 0; j < 16; j++) {
                    if (this._pushedPads[i][j] != this._element.track[i][j]) {
                        return false;
                    }
                }
            }
            return true;
        };
        MainLayer.prototype.prepareNext = function () {
            this._timer.destroy();
            this._timer = this.game.time.create(true);
            this._timer.loop(170, this.tick, this);
            this._timer.start();
            this._mode = 4 /* PRENEXT */;
            this._beginListenCount = 0;
        };
        MainLayer.prototype.launchNext = function () {
            this._timer.destroy();
            this._timer = this.game.time.create(true);
            this._timer.loop(100, this.tick, this);
            this._mode = 5 /* NEXT */;
            this._timer.start();
            HumanMusic.Preferences.instance.score[this._track]++;
            this.game.time.events.add(1000, function () {
                this.createTracksButtons();
            }, this);
            console.log(this._score + " // " + this._track);
            var potential = 2 * this._element.track.reduce(function (total, instrument) {
                return total + instrument.reduce(function (total2, pad) {
                    if (pad) {
                        return total2 + 1;
                    }
                    else {
                        return total2;
                    }
                }, 0);
            }, 0);
            console.log(this._element);
            console.log(potential);
            var result = Math.floor(100 * this._score / potential);
            console.log(result);
            console.log("gameOver:" + (+this._track + 1) + ":" + result, "*");
        };
        MainLayer.prototype.createTracksButtons = function () {
            if (HumanMusic.Preferences.instance.score[this._track] < 3) {
                var continueButton = this.game.add.button(HumanMusic.Global.GAME_WIDTH / 2, 5 * HumanMusic.Global.GAME_HEIGHT / 6, "Navigation", function () {
                    this.game.state.start("Play", true, false, this._track);
                }, this, 0, 0, 0);
                continueButton.anchor.set(0.5, 0.5);
            }
            else {
                var returnButton = this.game.add.button(HumanMusic.Global.GAME_WIDTH / 2, 5 * HumanMusic.Global.GAME_HEIGHT / 6, "Navigation", function () {
                    this.game.state.start("Menu");
                }, this, 1, 1, 1);
                returnButton.anchor.set(0.5, 0.5);
            }
        };
        MainLayer.prototype.prepareVictory = function () {
            this._mode = 3 /* VICTORY */;
            this._controls['listen'].destroy();
            // Lock all buttons
            // Correct all buttons
            this.correctAndLockAllEntries();
        };
        MainLayer.prototype.correctAndLockAllEntries = function () {
            for (var i = 0; i < this._levelInstruments[this._level]; i++) {
                for (var j = 0; j < 16; j++) {
                    if (this._pushedPads[i][j] !== this._element.track[i][j]) {
                        this.pushPad(i, j);
                    }
                    this._pads[i][j].inputEnabled = false;
                }
            }
        };
        MainLayer.prototype.lightTempoOn = function () {
            this._tempo[this._current].frame = 1;
        };
        MainLayer.prototype.lightTempoOff = function () {
            this._tempo[this._current].frame = 0;
        };
        MainLayer.prototype.resetTempo = function () {
            this._tempo[this._current].frame = 1;
            this._mode = 1 /* PLAY */;
            this._current = 15;
        };
        return MainLayer;
    }(Phaser.Group));
    HumanMusic.MainLayer = MainLayer;
})(HumanMusic || (HumanMusic = {}));
var HumanMusic;
(function (HumanMusic) {
    var Parameters = /** @class */ (function () {
        function Parameters() {
        }
        // gravity
        Parameters.GRAVITY = 24;
        return Parameters;
    }());
    HumanMusic.Parameters = Parameters;
})(HumanMusic || (HumanMusic = {}));
var HumanMusic;
(function (HumanMusic) {
    var Boot = /** @class */ (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // RESIZING STUFF
        Boot.prototype.create = function () {
            this.game.state.start("Preload");
        };
        return Boot;
    }(Phaser.State));
    HumanMusic.Boot = Boot;
})(HumanMusic || (HumanMusic = {}));
var HumanMusic;
(function (HumanMusic) {
    var Disclaimer = /** @class */ (function (_super) {
        __extends(Disclaimer, _super);
        function Disclaimer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Disclaimer.prototype.create = function () {
            this.createDisclaimer();
            this.waitToStart();
        };
        Disclaimer.prototype.createDisclaimer = function () {
            var disclaimer = this.add.text(HumanMusic.Global.GAME_WIDTH / 2, HumanMusic.Global.GAME_HEIGHT / 2, "Use headphones for best experience", null);
            disclaimer.anchor.set(0.5, 0.5);
            disclaimer.fill = '#00FFFF';
        };
        Disclaimer.prototype.waitToStart = function () {
            var _this = this;
            var timer = this.game.time.create(true);
            timer.add(3000, function () {
                _this.game.state.start("Start");
            });
            timer.start(50);
        };
        return Disclaimer;
    }(Phaser.State));
    HumanMusic.Disclaimer = Disclaimer;
})(HumanMusic || (HumanMusic = {}));
var HumanMusic;
(function (HumanMusic) {
    var Menu = /** @class */ (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._elements = [];
            _this._highScores = [];
            _this._positions = [
                { x: 200, y: 110 },
                { x: 200, y: HumanMusic.Global.GAME_HEIGHT - 110 },
                { x: HumanMusic.Global.GAME_WIDTH - 200, y: 110 },
                { x: HumanMusic.Global.GAME_WIDTH - 200, y: HumanMusic.Global.GAME_HEIGHT - 110 },
                { x: HumanMusic.Global.GAME_WIDTH / 2, y: HumanMusic.Global.GAME_HEIGHT / 2 }
            ];
            return _this;
        }
        Menu.prototype.create = function () {
            this._elements = [];
            this.checkEnd();
            this.createMenu();
            if (HumanMusic.Preferences.instance.score[4] !== 0) {
                var logo = this.add.text(HumanMusic.Global.GAME_WIDTH / 2, HumanMusic.Global.GAME_HEIGHT / 2 - 20, "Human Music", null);
                logo.anchor.set(0.5, 0.5);
                logo.fontSize = 70;
                logo.fill = '#00FFFF';
                var instructions = this.add.text(HumanMusic.Global.GAME_WIDTH / 2, HumanMusic.Global.GAME_HEIGHT / 2 + 20, "Find the way to link whatever you hear, whatever you see and whatever you remember", null);
                instructions.anchor.set(0.5, 0.5);
                instructions.fontSize = 14;
                instructions.fill = '#00FFFF';
            }
        };
        Menu.prototype.createMenu = function () {
            var _loop_3 = function (i) {
                if (HumanMusic.Preferences.instance.score[i] >= 0) {
                    this_2._elements[i] = this_2.game.add.button(this_2._positions[i].x, this_2._positions[i].y, 'Elements', function () {
                        this.game.state.start("Play", true, false, i);
                    }, this_2, i, i, i);
                    this_2._elements[i].anchor.set(0.5, 0.5);
                    this_2._highScores[i] = this_2.game.add.text(this_2._positions[i].x, this_2._positions[i].y + 85, "HighScore: " + HumanMusic.Preferences.instance.top[i].toString(), null);
                    this_2._highScores[i].anchor.set(0.5, 0.5);
                    this_2._highScores[i].fill = '#777777';
                    this_2._highScores[i].fontSize = 15;
                }
            };
            var this_2 = this;
            for (var i = 0; i < 5; i++) {
                _loop_3(i);
            }
        };
        Menu.prototype.checkEnd = function () {
            for (var i = 0; i < 4; i++) {
                if (HumanMusic.Preferences.instance.score[i] < 2) {
                    return;
                }
            }
            if (HumanMusic.Preferences.instance.score[4] == -1) {
                HumanMusic.Preferences.instance.score[4] = 0;
            }
        };
        return Menu;
    }(Phaser.State));
    HumanMusic.Menu = Menu;
})(HumanMusic || (HumanMusic = {}));
var HumanMusic;
(function (HumanMusic) {
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        function Play() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Play.prototype.init = function (index) {
            this._index = index;
        };
        Play.prototype.create = function () {
            this.stage.backgroundColor = 0x000000;
            this._mainLayer = new HumanMusic.MainLayer(this.game, this.world, this._index);
        };
        Play.prototype.update = function () {
        };
        return Play;
    }(Phaser.State));
    HumanMusic.Play = Play;
})(HumanMusic || (HumanMusic = {}));
var HumanMusic;
(function (HumanMusic) {
    var Preload = /** @class */ (function (_super) {
        __extends(Preload, _super);
        function Preload() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._ready = false;
            return _this;
        }
        Preload.prototype.preload = function () {
            // Preload all assets
            // Sprites
            this.load.spritesheet('DebugButton', 'assets/debugbutton.png', 50, 50);
            this.load.spritesheet('Tempo', 'assets/tempo.png', 50, 5);
            this.load.spritesheet('Pad', 'assets/pad.png', 50, 50);
            this.load.spritesheet('Listen', 'assets/listen.png', 200, 50);
            this.load.spritesheet('Start', 'assets/start.png', 200, 100);
            this.load.spritesheet('Bonus', 'assets/bonus.png', 25, 25);
            this.load.spritesheet('Elements', 'assets/elements.png', 377, 200);
            this.load.spritesheet('Navigation', 'assets/navigation.png', 200, 50);
            this.load.spritesheet('Return', 'assets/return.png', 50, 50);
            this.load.spritesheet('Instruments', 'assets/instruments.png', 50, 50);
            // Sounds
            this.load.audio('kick', 'assets/kick.wav');
            this.load.audio('snare', 'assets/snare.wav');
            this.load.audio('hihat', 'assets/hihat.wav');
            this.load.audio('bell', 'assets/bell.wav');
            this.load.audio('yeah', 'assets/yeah.mp3');
            this.load.audio('metronome', 'assets/metronome.wav');
        };
        Preload.prototype.update = function () {
            if (this._ready === false && this.cache.isSoundDecoded("kick") &&
                this.cache.isSoundDecoded("snare") &&
                this.cache.isSoundDecoded("hihat") && this.cache.isSoundDecoded("bell") &&
                this.cache.isSoundDecoded("yeah") && this.cache.isSoundDecoded("metronome")) {
                this._ready = true;
            }
            this.time.events.add(500, function () {
                this.game.state.start("Disclaimer");
            }, this);
        };
        return Preload;
    }(Phaser.State));
    HumanMusic.Preload = Preload;
})(HumanMusic || (HumanMusic = {}));
var HumanMusic;
(function (HumanMusic) {
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        function Start() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Start.prototype.create = function () {
            this.createLogo();
            this.createStartButton();
        };
        Start.prototype.createLogo = function () {
            var logo = this.add.text(HumanMusic.Global.GAME_WIDTH / 2, HumanMusic.Global.GAME_HEIGHT / 4, "Human Music", null);
            logo.anchor.set(0.5, 0.5);
            logo.fontSize = 70;
            logo.fill = '#00FFFF';
            var moto = this.add.text(HumanMusic.Global.GAME_WIDTH / 2, HumanMusic.Global.GAME_HEIGHT / 4 + 50, "Let's bring back harmony, one element at a time", null);
            moto.anchor.set(0.5, 0.5);
            moto.fontStyle = 'italic';
            moto.fontSize = 15;
            moto.fill = '#00FFFF';
        };
        Start.prototype.createStartButton = function () {
            var start = this.add.button(HumanMusic.Global.GAME_WIDTH / 2, 3 * HumanMusic.Global.GAME_HEIGHT / 4, "Start", function () {
                this.game.state.start("Menu");
            }, this, 1, 0, 2);
            start.anchor.set(0.5, 0.5);
        };
        return Start;
    }(Phaser.State));
    HumanMusic.Start = Start;
})(HumanMusic || (HumanMusic = {}));
//# sourceMappingURL=game.js.map