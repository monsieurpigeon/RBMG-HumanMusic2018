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
            _this.state.add("Winner", HumanMusic.Winner);
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
            this.score = [0, -1, -1, -1, -1];
        }
        Object.defineProperty(Preferences, "instance", {
            get: function () {
                if (Preferences._instance === null) {
                    Preferences._instance = new Preferences();
                    console.log('Preferences KO');
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
                name: "Fire",
                track: [
                    [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
                    [true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true],
                    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],
                    [false, true, false, true, false, false, false, true, false, true, false, true, false, false, false, true]
                ],
                tempo: [280, 250, 200],
                introduction: "Bonjour"
            },
            {
                name: "Earth",
                track: [[true, true]],
                tempo: [280, 250, 200],
                introduction: "Salut"
            }
        ];
        return Elements;
    }());
    HumanMusic.Elements = Elements;
})(HumanMusic || (HumanMusic = {}));
var HumanMusic;
(function (HumanMusic) {
    var Jukebox = /** @class */ (function () {
        function Jukebox(game, mainLayer) {
        }
        return Jukebox;
    }());
    HumanMusic.Jukebox = Jukebox;
})(HumanMusic || (HumanMusic = {}));
var HumanMusic;
(function (HumanMusic) {
    var MainLayer = /** @class */ (function (_super) {
        __extends(MainLayer, _super);
        function MainLayer(game, parent, track) {
            var _this = _super.call(this, game, parent) || this;
            _this.tuto = true;
            _this._levelInstruments = [2, 3, 4];
            _this._score = 0;
            _this._track = track;
            _this._element = HumanMusic.Elements.LIST[track];
            _this._level = HumanMusic.Preferences.instance.score[track];
            console.log('track: ', track);
            _this._pads = [];
            _this._tempo = [];
            _this._controls = [];
            _this._current = 15;
            _this._beginListenCount = 0;
            _this.initPushedPads();
            _this.initSounds();
            _this.createTimer();
            _this.computeRemains();
            _this.generateTempo();
            _this.generatePads();
            _this.generateControls();
            _this.launchListen();
            if (_this._level > 0) {
                _this.populateTrack();
            }
            _this._remainText = _this.game.add.text(3 * HumanMusic.Global.GAME_WIDTH / 4, HumanMusic.Global.GAME_HEIGHT / 12, "Remains: " + _this._remains, null);
            _this._remainText.anchor.set(0.5, 0.5);
            _this._remainText.fill = '#00FFFF';
            _this._scoreText = _this.game.add.text(1 * HumanMusic.Global.GAME_WIDTH / 4, HumanMusic.Global.GAME_HEIGHT / 12, "Score: " + _this._score, null);
            _this._scoreText.anchor.set(0.5, 0.5);
            _this._scoreText.fill = '#00FFFF';
            _this.initBonusEmitter();
            return _this;
        }
        MainLayer.prototype.updateRemainText = function () {
            this._remainText.text = "Remains: " + this._remains;
        };
        MainLayer.prototype.updateSCoreText = function () {
            this._scoreText.text = "Score: " + this._score;
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
            console.log('dice:', dice);
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
            this._soundArray[0] = this.game.add.audio('kick');
            this._soundArray[1] = this.game.add.audio('snare');
            this._soundArray[2] = this.game.add.audio('hihat');
            this._soundArray[3] = this.game.add.audio('bell');
            this._soundArray[4] = this.game.add.audio('yeah');
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
            console.log(this._pushedPads);
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
                    this._pads[index][this._current].setFrames(4, 4, 4);
                    // Bonus Emitter
                    if (this._pads[index][this._current].inputEnabled === true) {
                        this._bonusEmitter.emitX = this._pads[index][this._current].x;
                        this._bonusEmitter.emitY = this._pads[index][this._current].y;
                        this._bonusEmitter.setXSpeed(-20, 20);
                        this._bonusEmitter.setYSpeed(0, 20);
                        this._bonusEmitter.emitParticle();
                        this._pads[index][this._current].inputEnabled = false;
                        this._score += 2;
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
                }
            }
            this.computeRemains();
            this.updateSCoreText();
        };
        MainLayer.prototype.computeRemains = function () {
            this._remains = 0;
            for (var i = 0; i < this._levelInstruments[this._level]; i++) {
                for (var j = 0; j < 16; j++) {
                    if (this._element.track[i][j] && !this._pushedPads[i][j]) {
                        this._remains++;
                    }
                }
            }
            if (this._remainText) {
                this.updateRemainText();
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
                        }
                        if (this._pushedPads[i][this._current]) {
                            this.correctInputs(i);
                        }
                    }
                    if (this._current == 15) {
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
            console.log("PRENEXT");
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
        };
        MainLayer.prototype.createTracksButtons = function () {
            var start = this.game.add.button(HumanMusic.Global.GAME_WIDTH / 2, HumanMusic.Global.GAME_HEIGHT / 2, "DebugButton", function () {
                this.game.state.start("Play", true, false, 0);
            }, this);
            start.anchor.set(0.5, 0.5);
        };
        MainLayer.prototype.prepareVictory = function () {
            this._mode = 3 /* VICTORY */;
            // Lock all buttons
            // Correct all buttons
            this.correctAndLockAllEntries();
            console.log("VICTORY");
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
    var Pad = /** @class */ (function () {
        function Pad() {
        }
        return Pad;
    }());
    HumanMusic.Pad = Pad;
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
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Menu.prototype.create = function () {
            this.createTracksButtons();
        };
        Menu.prototype.createTracksButtons = function () {
            var start = this.add.button(HumanMusic.Global.GAME_WIDTH / 2, HumanMusic.Global.GAME_HEIGHT / 2, "DebugButton", function () {
                this.game.state.start("Play", true, false, 0);
            }, this);
            start.anchor.set(0.5, 0.5);
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
            this.stage.backgroundColor = 0x222222;
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
            var logo = this.add.text(HumanMusic.Global.GAME_WIDTH / 2, HumanMusic.Global.GAME_HEIGHT / 4, "Human Music", 70);
            logo.anchor.set(0.5, 0.5);
            logo.fill = '#00FFFF';
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
var HumanMusic;
(function (HumanMusic) {
    var Winner = /** @class */ (function (_super) {
        __extends(Winner, _super);
        function Winner() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Winner.prototype.create = function () {
            this.createTracksButtons();
        };
        Winner.prototype.createTracksButtons = function () {
            var start = this.add.button(HumanMusic.Global.GAME_WIDTH / 2, HumanMusic.Global.GAME_HEIGHT / 2, "DebugButton", function () {
                this.game.state.start("Play", true, false, 0);
            }, this);
            start.anchor.set(0.5, 0.5);
        };
        return Winner;
    }(Phaser.State));
    HumanMusic.Winner = Winner;
})(HumanMusic || (HumanMusic = {}));
//# sourceMappingURL=game.js.map