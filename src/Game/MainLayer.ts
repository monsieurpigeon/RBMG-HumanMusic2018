namespace HumanMusic {

    const enum tempoMode { LISTEN, PLAY }

    export class MainLayer extends Phaser.Group {

        private _pads: Phaser.Group[];
        private _tempo: Phaser.Group;
        private _pushedPads: boolean[][];

        private _controls: Phaser.Group;
        private _mode: tempoMode;

        private _timer: Phaser.Timer;
        private _current: number;
        private _soundArray: Phaser.Sound[];

        public constructor(game: Phaser.Game, parent: PIXI.DisplayObjectContainer) {
            super(game, parent);

            this._pads = [];
            this._tempo = new Phaser.Group(game, this);
            this._controls = new Phaser.Group(game, this);

            this._current = 15;
            this._mode = tempoMode.LISTEN;

            this.initPushedPads();
            this.initSounds();

            this.createTimer();
            this.generateTempo();
            this.generatePads();
            this.generateControls();
        }

        private initSounds() {
            this._soundArray = [];
            this._soundArray[0] = this.game.add.audio('kick');
            this._soundArray[1] = this.game.add.audio('snare');
            this._soundArray[2] = this.game.add.audio('hihat');
            this._soundArray[3] = this.game.add.audio('bell');
            this._soundArray[4] = this.game.add.audio('yeah');

            this._soundArray[4].play();
        }

        private initPushedPads() {
            this._pushedPads = [];
            for (let i = 0; i < 5; i++) {
                this._pushedPads[i] = [];
                for (let j = 0; j < 16; j++) {
                    this._pushedPads[i][j] = false;
                }
            }
            console.log(this._pushedPads);
        }

        private pushPad(instrument: number, tempo: number) {
            this._pushedPads[instrument][tempo] = !this._pushedPads[instrument][tempo];
            if (this._pushedPads[instrument][tempo]) {
                this._pads[instrument].getChildAt(tempo).alpha = 0.5;
            } else {
                this._pads[instrument].getChildAt(tempo).alpha = 1;
            }

        }

        private createTimer() {
            this._timer = this.game.time.create(false);
            this._timer.loop(100, this.tick, this);
            this._timer.start(50);
        }

        private generateTempo() {
            for (let i = 0; i < 16; i++) {
                let tempo = this.game.add.sprite(51 * i + 100, 400, 'TempoOn');
                tempo.anchor.set(0.5, 0.5);
                this._tempo.add(tempo);
            }
        }

        private generatePads() {
            let scope = this;
            for (let i = 0; i < 5; i++) {
                this._pads[i] = new Phaser.Group(this.game, this);
                for (let j = 0; j < 16; j++) {
                    let button = this.game.add.button(51 * j + 100, 349 - 51 * i, 'DebugButton', function() {
                        scope.pushPad(i, j);
                        console.log(scope._pushedPads);
                    });
                    button.anchor.set(0.5, 0.5);
                    this._pads[i].add(button);
                }
            }

        }

        private generateControls() {
            let button = this.game.add.button(Global.GAME_WIDTH / 2 , Global.GAME_HEIGHT, 'DebugButton', function() {
                this.resetTempo();
            }, this);
            button.anchor.set(0.5, 0.2);
            this.add(button);
        }

        public get pads(): Phaser.Group[] {
            return this._pads;
        }

        private tick() {

            this.lightTempoOn();
            this._current = (this._current + 1) % 16;
            for (let i = 0; i < 5; i++) {
                if (this._pushedPads[i][this._current]) {
                    this._soundArray[i].play();
                    console.log(i);
                }
            }
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