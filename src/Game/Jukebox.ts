namespace HumanMusic {
    export class Jukebox {

        private _timer: Phaser.Timer;
        private _game: Phaser.Game;
        private _mainLayer: MainLayer;

        public constructor(game: Phaser.Game, mainLayer: MainLayer) {
            this._game = game;
            this._mainLayer = mainLayer;
            this._timer = game.time.create(false);
            this._timer.loop(50, this.tictac, this);
            this._timer.start(50);
        }

        private tictac() {
           this._mainLayer._pads.alpha = this._game.rnd.between(0, 100) / 100;
        }
    }
}