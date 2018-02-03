namespace HumanMusic {
    export class Play extends Phaser.State {

        private _mainLayer: MainLayer;
        private _element: Elemental;
        private _level: number;

        public init(index) {
            this._element = Elements.LIST[index];
            this._level = Preferences.instance.score[index];
        }

        public create() {
            this.stage.backgroundColor = 0x222222;
            this._mainLayer = new MainLayer(this.game, this.world, this._element, this._level);
        }

        public update() {

        }
    }
}