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
            this._game = game;
            this._mainLayer = mainLayer;
            this._timer = game.time.create(false);
            this._timer.loop(50, this.tictac, this);
            this._timer.start(50);
        }
        Jukebox.prototype.tictac = function () {
            this._mainLayer._pads.alpha = this._game.rnd.between(0, 100) / 100;
        };
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
            _this._pads = new Phaser.Group(game, _this);
            _this._controls = new Phaser.Group(game, _this);
            _this.generatePads();
            _this.generateControls();
            return _this;
        }
        MainLayer.prototype.generatePads = function () {
            var _loop_1 = function (i) {
                var button_1 = this_1.game.add.button(10, 50 * i, 'DebugButton', function () {
                    console.log("hello" + i);
                });
                this_1._pads.add(button_1);
            };
            var this_1 = this;
            for (var i = 0; i < 16; i++) {
                _loop_1(i);
            }
            var button = this.game.add.button(100, 500, 'DebugButton', function () {
                console.log("hello");
            });
            this.add(button);
        };
        MainLayer.prototype.generateControls = function () {
            var button = this.game.add.button(HumanMusic.Global.GAME_WIDTH / 2, HumanMusic.Global.GAME_HEIGHT / 2, 'DebugButton', function () {
                console.log("PLAY");
            });
            this.add(button);
        };
        Object.defineProperty(MainLayer.prototype, "pads", {
            get: function () {
                return this._pads;
            },
            enumerable: true,
            configurable: true
        });
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
            this.stage.backgroundColor = 0xA0DA6F;
            this._mainLayer = new HumanMusic.MainLayer(this.game, this.world);
            this._jukebox = new HumanMusic.Jukebox(this.game, this._mainLayer);
        };
        Play.prototype.update = function () {
        };
        Play.prototype.tictac = function () {
            console.log("tic");
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
            this.load.spritesheet('DebugButton', 'assets/debugbutton.png', 200, 200);
            // Sounds
        };
        Preload.prototype.update = function () {
            if (this._ready === false) {
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