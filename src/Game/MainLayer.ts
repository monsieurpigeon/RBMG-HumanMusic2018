namespace HumanMusic {

    const enum tempoMode { LISTEN, PLAY }

    export class MainLayer extends Phaser.Group {

        private _pads: Phaser.Group;
        private _tempo: Phaser.Group;

        private _controls: Phaser.Group;
        private _mode: tempoMode;

        private _timer: Phaser.Timer;
        private _current: number;

        public constructor(game: Phaser.Game, parent: PIXI.DisplayObjectContainer) {
            super(game, parent);

            this._pads = new Phaser.Group(game, this);
            this._tempo = new Phaser.Group(game, this);
            this._controls = new Phaser.Group(game, this);

            this._current = 15;
            this._mode = tempoMode.LISTEN;

            this.createTimer();
            this.generatePads();
            this.generateControls();
        }

        private createTimer() {
            this._timer = this.game.time.create(false);
            this._timer.loop(300, this.tick, this);
            this._timer.start(50);
        }

        private generatePads() {
            for (let i = 0; i < 16; i++) {
                let tempo = this.game.add.sprite(51 * i + 100, 400, 'TempoOn');
                this._tempo.add(tempo);
            }
            // let button = this.game.add.button(100, 500, 'DebugButton', function() {
            //     console.log("hello");
            // });
            // this.add(button);
        }

        private generateControls() {
            let button = this.game.add.button(Global.GAME_WIDTH / 2 , Global.GAME_HEIGHT, 'DebugButton', function() {
                this.resetTempo();
            }, this);
            button.anchor.set(0.5, 0.2);
            this.add(button);
        }

        public get pads(): Phaser.Group {
            return this._pads;
        }

        private tick() {
            this.lightTempoOn();
            this._current = (this._current + 1) % 16;
            this.lightTempoOff();
        }

        private lightTempoOn() {
            this._tempo.getChildAt(this._current).position.y=400;
            this._tempo.getChildAt(this._current).alpha = 1;
        }

        private lightTempoOff() {
            if (this._mode == tempoMode.LISTEN)
                this._tempo.getChildAt(this._current).alpha = 0.5;
            else if (this._mode == tempoMode.PLAY) {
                this._tempo.getChildAt(this._current).alpha = 0.1;
            }
            this._tempo.getChildAt(this._current).position.y=405;
        }

        private resetTempo() {
            this._tempo.getChildAt(this._current).alpha = 1;
            this._mode = tempoMode.PLAY;
            this._current = 15;
        }


    }
}