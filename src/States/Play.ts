namespace HumanMusic {
    export class Play extends Phaser.State {

        private _mainLayer: MainLayer;

        public init(index) {
            console.log(index);
            console.log(Preferences.instance.score[index]);
            console.log(Elements.LIST[index]);
        }

        public create() {
            this.stage.backgroundColor = 0x222222;
            this._mainLayer = new MainLayer(this.game, this.world);
        }

        public update() {

        }
    }
}