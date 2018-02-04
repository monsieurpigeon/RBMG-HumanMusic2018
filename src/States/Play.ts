namespace HumanMusic {
    export class Play extends Phaser.State {

        private _mainLayer: MainLayer;
        private _index: number;

        public init(index) {
            this._index = index;
        }

        public create() {
            this.stage.backgroundColor = 0x000000;
            this._mainLayer = new MainLayer(this.game, this.world, this._index);
        }

        public update() {

        }
    }
}