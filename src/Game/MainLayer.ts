namespace HumanMusic {
    export class MainLayer extends Phaser.Group {

        public _pads: Phaser.Group;
        public _controls: Phaser.Group;

        public constructor(game: Phaser.Game, parent: PIXI.DisplayObjectContainer) {
            super(game, parent);

            this._pads = new Phaser.Group(game, this);
            this._controls = new Phaser.Group(game, this);

            this.generatePads();
            this.generateControls();


        }

        private generatePads() {
            for (let i = 0; i < 16; i++) {
                let button = this.game.add.button(10, 50 * i, 'DebugButton', function() {
                    console.log("hello" + i);
                });
                this._pads.add(button);
            }
            let button = this.game.add.button(100, 500, 'DebugButton', function() {
                console.log("hello");
            });
            this.add(button);
        }

        private generateControls() {
            let button = this.game.add.button(Global.GAME_WIDTH / 2 , Global.GAME_HEIGHT / 2, 'DebugButton', function() {
                console.log("PLAY");
            });
            this.add(button);
        }

        public get pads(): Phaser.Group {
            return this._pads;
        }


    }
}