namespace HumanMusic {

    const enum tempoMode { LISTEN, PLAY, WAIT, VICTORY, PRENEXT, NEXT }

    export class MainLayer extends Phaser.Group {

        private tuto: boolean = true;
        private _pads: Phaser.Button[][];
        private _instruments: Phaser.Sprite[];
        private _tempo: Phaser.Sprite[];
        private _pushedPads: boolean[][];
        public _instrumentTweens: Phaser.Tween[];
        public _textTweens: Phaser.Tween[];
        private _title: Phaser.Text;
        private _levelText: string;

        private _element: Elemental;
        private _level: number;
        private _track: number;
        private _remains: number;

        private _controls: Phaser.Sprite[];
        private _mode: tempoMode;

        private _timer: Phaser.Timer;
        private _current: number;
        private _beginListenCount: number;
        private _soundArray: Phaser.Sound[];
        private _levelInstruments: number[] = [2, 3, 4];
        private _levelToText: string[] = ["easy", "medium", "hard"];
        private _remainText: Phaser.Text;
        private _scoreText: Phaser.Text;
        private _highScoreText: Phaser.Text;
        private _highScore: number;

        private _bonusEmitter: Phaser.Particles.Arcade.Emitter;
        private _malusEmitter: Phaser.Particles.Arcade.Emitter;
        private _score: number;

        public constructor(game: Phaser.Game, parent: PIXI.DisplayObjectContainer, track: number) {
            super(game, parent);
            this._score = 0;
            this._remains = 0;
            this._track = track;
            this._element = Elements.LIST[track];
            this._level = Math.min(Preferences.instance.score[track], 2);
            this._highScore = Preferences.instance.top[track];
            if (Preferences.instance.score[track] < 3) {
                this._levelText = this._levelToText[this._level];
            } else {
                this._levelText = "Xtrem";
            }

            this._pads = [];
            this._tempo = [];
            this._controls = [];
            this._instruments = [];
            this._instrumentTweens = [];
            this._textTweens = [];

            this._current = 15;
            this._beginListenCount = 0;

            this.initPushedPads();
            this.initSounds();

            this._remainText = this.game.add.text(1024 - 100 , Global.GAME_HEIGHT / 12,
                "Remaining: ...", null);
            this._remainText.anchor.set(1, 0.5);
            this._remainText.fill = '#00FFFF';

            this.createTimer();
            this.computeRemains();
            this.generateTempo();
            this.generateInstruments();
            this.generatePads();
            this.generateControls();
            this.launchListen();
            if (this._level > 0 && Preferences.instance.score[this._track] < 3) {
                this.populateTrack();
            }
            this._scoreText = this.game.add.text(100 , Global.GAME_HEIGHT / 12,
                "Score: " + this._score, null);
            this._scoreText.anchor.set(0, 0.5);
            this._scoreText.fill = '#00FFFF';

            this._highScoreText = this.game.add.text(100 , Global.GAME_HEIGHT / 12 + 20,
                "Highscore: " + this._highScore, null);
            this._highScoreText.anchor.set(0, 0.5);
            this._highScoreText.fontSize = 12;
            this._highScoreText.fill = '#006767';

            this._textTweens[0] = this.game.add.tween(this._scoreText.scale).
            to({ x: 1.2, y: 1.2 }, 100,
                function (k: number) {
                    return Math.sin(Math.PI * k);
                }, false, 0);



            this._textTweens[1] = this.game.add.tween(this._remainText.scale).
            to({ x: 1.2, y: 1.2 }, 100,
                function (k: number) {
                    return Math.sin(Math.PI * k);
                }, false, 0);

            this._title = this.game.add.text(Global.GAME_WIDTH / 2 , Global.GAME_HEIGHT / 12,
                this._element.name + " : " + this._levelText, null);
            this._title.anchor.set(0.5, 0.5);
            this._title.fill = '#00FFFF';

            this.initBonusEmitter();

        }

        private updateRemainText() {
            this._remainText.text = "Remaining: " + this._remains;
        }

        private updateSCoreText() {
            if (this._score > this._highScore) {
                this._highScore = this._score;
                Preferences.instance.top[this._track] = this._highScore;
                this._highScoreText.text = "Highscore: " + this._highScore;
            }
            this._scoreText.text = "Score: " + this._score;
        }

        private bounceText(type: number) {
            if (!this._textTweens[type].isRunning) {
                this._textTweens[type].start();
            }
        }

        private initBonusEmitter() {
            // Bonus emitter
            let emitter = new Phaser.Particles.Arcade.Emitter(this.game, 0, 0, 16);
            emitter.makeParticles("Bonus",[0]);
            emitter.setYSpeed(-50, -20);
            emitter.setRotation(0, 0);
            emitter.setAlpha(1, 0, 500, Phaser.Easing.Linear.None);
            emitter.gravity = -Parameters.GRAVITY;
            //this._pads['bonus'] = emitter;
            this._bonusEmitter = emitter;

            // Malus emitter
            let emitter2 = new Phaser.Particles.Arcade.Emitter(this.game, 0, 0, 16);
            emitter2.makeParticles("Bonus",[1]);
            emitter2.setYSpeed(-50, -20);
            emitter2.setRotation(0, 0);
            emitter2.setAlpha(1, 0, 500, Phaser.Easing.Linear.None);
            emitter2.gravity = -Parameters.GRAVITY;
            //this._pads['malus'] = emitter2;
            this._malusEmitter = emitter2;
        }

        private populateTrack() {
            for (let i = 0; i < this._levelInstruments[this._level] - 1; i++) {
                for (let j = 0; j < 16; j++) {
                    if (this._element.track[i][j]) {
                        this.pushPad(i, j);
                    }
                }
            }
            this.eraseTrack();
        }

        private eraseTrack() {
            let dice = this.game.rnd.between(0, 3);

            for (let i = 0; i < this._levelInstruments[this._level] - 1; i++) {
                for (let j = dice * 4; j < ( dice + 1 ) * 4; j++) {
                    if (this._pushedPads[i][j]) {
                        this.pushPad(i, j);
                    }
                }
            }
        }

        private initSounds() {
            this._soundArray = [];
            this._soundArray[0] = this.game.add.audio(this._element.instruments[0]);
            this._soundArray[1] = this.game.add.audio(this._element.instruments[1]);
            this._soundArray[2] = this.game.add.audio(this._element.instruments[2]);
            this._soundArray[3] = this.game.add.audio(this._element.instruments[3]);

            this._soundArray[5] = this.game.add.audio('metronome');
        }

        private initPushedPads() {
            this._pushedPads = [];
            for (let i = 0; i < this._levelInstruments[this._level]; i++) {
                this._pushedPads[i] = [];
                for (let j = 0; j < 16; j++) {
                    this._pushedPads[i][j] = false;
                }
            }
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
            this._timer.loop(200, this.tick, this);
            this._timer.start(50);
        }

        private generateTempo() {
            for (let i = 0; i < 16; i++) {
                let tempo = this.game.add.sprite(51 * i + 125 + 2 * Math.ceil(( i + 1 ) / 4), 400, 'Tempo', 1);
                tempo.anchor.set(0.5, 0.5);
                this._tempo[i] = tempo;
            }
        }

        private generateInstruments() {
            for (let i = 0; i < this._levelInstruments[this._level]; i++) {
                this._instruments[i] = this.game.add.sprite(51, 349 - 52 * i, 'Instruments', i);
                this._instruments[i].anchor.set(0.5, 0.5);

                this._instrumentTweens[i] = this.game.add.tween(this._instruments[i].scale).
                to({ x: 0.8, y: 0.8 }, 100,
                    function (k: number) {
                        return Math.sin(Math.PI * k);
                    }, false, 0);
            }
        }

        public bounce(index: number): void {
            if (!this._instrumentTweens[index].isRunning) {
                this._instrumentTweens[index].start();
            }
        }

        private generatePads() {
            let scope = this;
            for (let i = 0; i < this._levelInstruments[this._level]; i++) {
                this._pads[i] = [];
                for (let j = 0; j < 16; j++) {
                    let button = this.game.add.button(51 * j + 125 + 2 * Math.ceil((j+1) / 4), 349 - 52 * i, 'Pad',function() {
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

            let returnButton = this.game.add.button(50 , 50, 'Return', function() {
                this.game.state.start("Menu");
            }, this, 1, 0, 2);
            returnButton.anchor.set(0.5, 0.5);
            this._controls['listen'] = button;
        }

        private preLaunchListen() {
            this._beginListenCount = 0;
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
            this._controls['listen'].frame = 0;
            this._controls['listen'].inputEnabled = true;
            this._mode = tempoMode.PLAY;
        }

        private correctInputs(index: number) {
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
                        this._pads[index][this._current].setFrames(4,4,4);
                        this._score += 2;
                        this.bounceText(0);
                    }
                } else {
                    this._pads[index][this._current].setFrames(5,5,5);
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
        }

        private computeRemains() {
            let remain = 0;
            for (let i = 0; i < this._levelInstruments[this._level]; i++) {
                for (let j = 0; j < 16; j++) {
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
        }

        // Update

        private tick() {

            this.lightTempoOn();
            this._current = (this._current + 1) % 16;
            this.lightTempoOff();



            if (this._mode == tempoMode.PLAY) {
                for (let i = 0; i < this._levelInstruments[this._level]; i++) {
                    if (this._pushedPads[i][this._current]) {
                        this._soundArray[i].play();
                        this.bounce(i);
                        this.correctInputs(i);
                    }
                }
                if (this.checkSolution() === true){
                    //Start result
                    this.prepareVictory();
                }
            } else if (this._mode == tempoMode.LISTEN) {
                if (this._beginListenCount < 16) {
                    if (this._beginListenCount % 4 == 0) {
                        this._soundArray[5].play();
                    }
                    this._beginListenCount++;
                } else {
                    for (let i = 0; i < this._levelInstruments[this._level]; i++) {
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
                        } else {
                            this.stopListen();
                        }
                    }
                }
            } else if (this._mode == tempoMode.WAIT) {
                if (this._current % 4 == 0) {
                    this.launchListen();
                }
            } else if (this._mode == tempoMode.VICTORY) {
                for (let i = 0; i < this._levelInstruments[this._level]; i++) {
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
            } else if (this._mode == tempoMode.PRENEXT) {
                if (this._beginListenCount < 15) {
                    if (this._beginListenCount % 4 == 0) {
                        this._soundArray[5].play();
                    }
                    this._beginListenCount++;
                } else {
                    this.launchNext();
                }
            } else if (this._mode == tempoMode.NEXT) {
                for (let i = 0; i < this._levelInstruments[this._level]; i++) {
                    if (this._element.track[i][this._current]) {
                        this._soundArray[i].play();
                        this.bounce(i);
                    }
                    if (this._pushedPads[i][this._current]) {
                        this.correctInputs(i);
                    }
                }
            }
        }

        private checkSolution() {
            for (let i = 0; i < this._levelInstruments[this._level]; i++) {
                for (let j = 0; j < 16; j++) {
                    if (this._pushedPads[i][j] != this._element.track[i][j]) {
                        return false;
                    }
                }
            }
            return true;
        }

        private prepareNext() {
            this._timer.destroy();
            this._timer = this.game.time.create(true);
            this._timer.loop(170, this.tick, this);
            this._timer.start();
            this._mode = tempoMode.PRENEXT;
            this._beginListenCount = 0;
        }

        private launchNext() {
            this._timer.destroy();
            this._timer = this.game.time.create(true);
            this._timer.loop(100, this.tick, this);
            this._mode = tempoMode.NEXT;
            this._timer.start();
            Preferences.instance.score[this._track]++;
            this.game.time.events.add(1000, function() {
                this.createTracksButtons();
            }, this);

            // Return score to parent website
            let potential = 2 * this._element.track.reduce((total, instrument) => {
                return total + instrument.reduce((total2, pad) => {
                    if (pad) {
                        return total2 + 1;
                    } else {
                        return total2;
                    }
                }, 0);
            }, 0);
            let result = Math.floor(100 * this._score / potential);
            parent.postMessage(`gameOver:${+this._track + 1}:${result}` , "*" )


        }

        private createTracksButtons() {
            if (Preferences.instance.score[this._track] < 3) {
                let continueButton = this.game.add.button(Global.GAME_WIDTH / 2 ,5 * Global.GAME_HEIGHT / 6,
                    "Navigation", function() {
                        this.game.state.start("Play", true, false, this._track);
                    }, this, 0,0,0);
                continueButton.anchor.set(0.5, 0.5);
            } else {
                let returnButton = this.game.add.button(Global.GAME_WIDTH / 2 ,5 * Global.GAME_HEIGHT / 6,
                    "Navigation", function() {
                        this.game.state.start("Menu");
                    }, this, 1, 1, 1);
                returnButton.anchor.set(0.5, 0.5);
            }
        }

        private prepareVictory() {
            this._mode = tempoMode.VICTORY;
            this._controls['listen'].destroy();
            // Lock all buttons
            // Correct all buttons
            this.correctAndLockAllEntries();
        }

        private correctAndLockAllEntries() {
            for (let i = 0; i < this._levelInstruments[this._level]; i++) {
                for (let j = 0; j < 16; j++) {
                    if (this._pushedPads[i][j] !== this._element.track[i][j]) {
                        this.pushPad(i, j);
                    }
                    this._pads[i][j].inputEnabled = false;
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