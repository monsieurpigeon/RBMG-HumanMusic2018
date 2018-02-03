namespace HumanMusic {
    export class MainLayer extends Phaser.Group {

        private _pads: Phaser.Group;

        public constructor(game: Phaser.Game, parent: PIXI.DisplayObjectContainer) {
            super(game, parent);

            this._pads = new Phaser.Group(game, this);
        }

        public get pads(): Phaser.Group {
            return this._pads;
        }


    }
}