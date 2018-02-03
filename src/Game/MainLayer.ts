namespace HumanMusic {

    const enum tempoMode { LISTEN, PLAY, WAIT }

    export class MainLayer extends Phaser.Group {

        private _pads: Phaser.Button[][];
        private _tempo: Phaser.Sprite[];
        private _pushedPads: boolean[][];

        private _element: Elemental;
        private _level: number;

        private _controls: Phaser.Sprite[];
        private _mode: tempoMode;

        private _timer: Phaser.Timer;
        private _current: number;
        private _beginListenCount: number;
        private _soundArray: Phaser.Sound[];

        public constructor(game: Phaser.Game, parent: PIXI.DisplayObjectContainer, element: Elemental, level: number) {
            super(game, parent);
            this._element = element;
            this._level = level;

            this._pads = [];
            this._tempo = [];
            this._controls = [];

            this._current = 15;
            this._beginListenCount = 0;

            this.initPushedPads();
            this.initSounds();

            this.createTimer();
            this.generateTempo();
            this.generatePads();
            this.generateControls();
            this.launchListen();
        }

        private initSounds() {
            this._soundArray = [];
            this._soundArray[0] = this.game.add.audio('kick');
            this._soundArray[1] = this.game.add.audio('snare');
            this._soundArray[2] = this.game.add.audio('hihat');
            this._soundArray[3] = this.game.add.audio('bell');
            this._soundArray[4] = this.game.add.audio('yeah');
            this._soundArray[5] = this.game.add.audio('metronome');
        }

        private initPushedPads() {
            this._pushedPads = [];
            for (let i = 0; i < 4; i++) {
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
                this._pads[instrument][tempo].setFrames(3,3,3);
            } else {
                this._pads[instrument][tempo].setFrames(1,0,2);
            }

        }

        private createTimer() {
            this._timer = this.game.time.create(false);
            this._timer.loop(100, this.tick, this);
            this._timer.start(50);
        }

        private generateTempo() {
            for (let i = 0; i < 16; i++) {
                let tempo = this.game.add.sprite(51 * i + 100 + 2 * Math.ceil((i+1) / 4), 400, 'Tempo', 1);
                tempo.anchor.set(0.5, 0.5);
                this._tempo[i] = tempo;
            }
        }

        private generatePads() {
            let scope = this;
            for (let i = 0; i < 4; i++) {
                this._pads[i] = [];
                for (let j = 0; j < 16; j++) {
                    let button = this.game.add.button(51 * j + 100 + 2 * Math.ceil((j+1) / 4), 349 - 52 * i, 'Pad',function() {
                        scope.pushPad(i, j);
                    }, this, 1, 0, 2);
                    button.anchor.set(0.5, 0.5);
                    this._pads[i][j] = button;
                }
            }

        }

        private generateControls() {
            let button = this.game.add.button(Global.GAME_WIDTH / 2 , Global.GAME_HEIGHT - 20, 'Listen', function() {
                this.preLaunchListen();
            }, this);
            button.anchor.set(0.5, 1);
            this._controls['listen'] = button;
        }

        private preLaunchListen() {
            this._mode = tempoMode.WAIT;
            this._controls['listen'].frame = 1;
            this._controls['listen'].inputEnabled = false;
        }

        private launchListen() {
            this.resetTempo();
            this._controls['listen'].frame = 1;
            this._controls['listen'].inputEnabled = false;
            this._beginListenCount = 0;
            this._mode = tempoMode.LISTEN;
        }

        private stopListen() {
            this._beginListenCount = 0;
            this._controls['listen'].frame = 0;
            this._controls['listen'].inputEnabled = true;
            this._mode = tempoMode.PLAY;
        }

        public get pads(): Phaser.Button[][] {
            return this._pads;
        }

        // Update

        private tick() {

            this.lightTempoOn();
            this._current = (this._current + 1) % 16;
            this.lightTempoOff();



            if (this._mode == tempoMode.PLAY) {
                for (let i = 0; i < 4; i++) {
                    if (this._pushedPads[i][this._current]) {
                        this._soundArray[i].play();
                    }
                }
            } else if (this._mode == tempoMode.LISTEN) {
                if (this._beginListenCount < 16) {
                    if (this._beginListenCount % 4 == 0) {
                        this._soundArray[5].play();
                    }
                    this._beginListenCount++;
                } else {
                    for (let i = 0; i < 4; i++) {
                        if (this._element.track[i][this._current]) {
                            this._soundArray[i].play();
                        }
                    }
                    if (this._current == 15) {
                        if (this._beginListenCount < 18) {
                            this._beginListenCount++;
                        } else {
                            this.stopListen();
                        }
                    }
                }
            } else if (this._mode == tempoMode.WAIT) {
                if (this._current % 4 == 0) {
                    this.launchListen();
                }
            }
        }

        private lightTempoOn() {
            this._tempo[this._current].frame = 1;
        }

        private lightTempoOff() {
            this._tempo[this._current].frame = 0;
        }

        private resetTempo() {
            this._tempo[this._current].frame = 1;
            this._mode = tempoMode.PLAY;
            this._current = 15;
        }
    }
}