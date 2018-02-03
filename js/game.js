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
        function MainLayer(game, parent) {
            var _this = _super.call(this, game, parent) || this;
            _this._pads = [];
            _this._tempo = new Phaser.Group(game, _this);
            _this._controls = new Phaser.Group(game, _this);
            _this._current = 15;
            _this._mode = 0 /* LISTEN */;
            _this.initPushedPads();
            _this.initSounds();
            _this.createTimer();
            _this.generateTempo();
            _this.generatePads();
            _this.generateControls();
            return _this;
        }
        MainLayer.prototype.initSounds = function () {
            this._soundArray = [];
            this._soundArray[0] = this.game.add.audio('kick');
            this._soundArray[1] = this.game.add.audio('snare');
            this._soundArray[2] = this.game.add.audio('hihat');
            this._soundArray[3] = this.game.add.audio('bell');
            this._soundArray[4] = this.game.add.audio('yeah');
            this._soundArray[4].play();
        };
        MainLayer.prototype.initPushedPads = function () {
            this._pushedPads = [];
            for (var i = 0; i < 5; i++) {
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
                this._pads[instrument].getChildAt(tempo).alpha = 0.5;
            }
            else {
                this._pads[instrument].getChildAt(tempo).alpha = 1;
            }
        };
        MainLayer.prototype.createTimer = function () {
            this._timer = this.game.time.create(false);
            this._timer.loop(100, this.tick, this);
            this._timer.start(50);
        };
        MainLayer.prototype.generateTempo = function () {
            for (var i = 0; i < 16; i++) {
                var tempo = this.game.add.sprite(51 * i + 100, 400, 'TempoOn');
                tempo.anchor.set(0.5, 0.5);
                this._tempo.add(tempo);
            }
        };
        MainLayer.prototype.generatePads = function () {
            var scope = this;
            var _loop_1 = function (i) {
                this_1._pads[i] = new Phaser.Group(this_1.game, this_1);
                var _loop_2 = function (j) {
                    var button = this_1.game.add.button(51 * j + 100, 349 - 51 * i, 'DebugButton', function () {
                        scope.pushPad(i, j);
                        console.log(scope._pushedPads);
                    });
                    button.anchor.set(0.5, 0.5);
                    this_1._pads[i].add(button);
                };
                for (var j = 0; j < 16; j++) {
                    _loop_2(j);
                }
            };
            var this_1 = this;
            for (var i = 0; i < 5; i++) {
                _loop_1(i);
            }
        };
        MainLayer.prototype.generateControls = function () {
            var button = this.game.add.button(HumanMusic.Global.GAME_WIDTH / 2, HumanMusic.Global.GAME_HEIGHT, 'DebugButton', function () {
                this.resetTempo();
            }, this);
            button.anchor.set(0.5, 0.2);
            this.add(button);
        };
        Object.defineProperty(MainLayer.prototype, "pads", {
            get: function () {
                return this._pads;
            },
            enumerable: true,
            configurable: true
        });
        MainLayer.prototype.tick = function () {
            this.lightTempoOn();
            this._current = (this._current + 1) % 16;
            for (var i = 0; i < 5; i++) {
                if (this._pushedPads[i][this._current]) {
                    this._soundArray[i].play();
                    console.log(i);
                }
            }
            this.lightTempoOff();
        };
        MainLayer.prototype.lightTempoOn = function () {
            this._tempo.getChildAt(this._current).position.y = 400;
            this._tempo.getChildAt(this._current).alpha = 1;
        };
        MainLayer.prototype.lightTempoOff = function () {
            if (this._mode == 0 /* LISTEN */)
                this._tempo.getChildAt(this._current).alpha = 0.5;
            else if (this._mode == 1 /* PLAY */) {
                this._tempo.getChildAt(this._current).alpha = 0.1;
            }
            this._tempo.getChildAt(this._current).position.y = 405;
        };
        MainLayer.prototype.resetTempo = function () {
            this._tempo.getChildAt(this._current).alpha = 1;
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
                this.game.state.start("Play");
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
        Play.prototype.create = function () {
            this.stage.backgroundColor = 0x222222;
            this._mainLayer = new HumanMusic.MainLayer(this.game, this.world);
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
            this.load.spritesheet('TempoOn', 'assets/tempo_on.png', 50, 20);
            this.load.spritesheet('TempoOff', 'assets/tempo_off.png', 50, 20);
            // Sounds
            this.load.audio('kick', 'assets/kick.wav');
            this.load.audio('snare', 'assets/snare.wav');
            this.load.audio('hihat', 'assets/hihat.wav');
            this.load.audio('bell', 'assets/bell.wav');
            this.load.audio('yeah', 'assets/yeah.mp3');
        };
        Preload.prototype.update = function () {
            if (this._ready === false && this.cache.isSoundDecoded("kick") &&
                this.cache.isSoundDecoded("snare") &&
                this.cache.isSoundDecoded("hihat") && this.cache.isSoundDecoded("bell") &&
                this.cache.isSoundDecoded("yeah")) {
                this._ready = true;
            }
            this.time.events.add(500, function () {
                this.game.state.start("Start");
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
            this.createDisclaimer();
            this.createStartButton();
        };
        Start.prototype.createDisclaimer = function () {
            var disclaimer = this.add.text(HumanMusic.Global.GAME_WIDTH / 2, HumanMusic.Global.GAME_HEIGHT / 4, "Use headphones for better experience", null);
            disclaimer.anchor.set(0.5, 0.5);
            disclaimer.fill = '#00FFFF';
        };
        Start.prototype.createStartButton = function () {
            var start = this.add.button(HumanMusic.Global.GAME_WIDTH / 2, 3 * HumanMusic.Global.GAME_HEIGHT / 4, "DebugButton", function () {
                this.game.state.start("Menu");
            }, this);
            start.anchor.set(0.5, 0.5);
        };
        return Start;
    }(Phaser.State));
    HumanMusic.Start = Start;
})(HumanMusic || (HumanMusic = {}));
//# sourceMappingURL=game.js.map