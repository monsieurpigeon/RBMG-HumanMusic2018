namespace HumanMusic {
    export class Play extends Phaser.State {

        private _mainLayer: MainLayer;
        private _jukebox: Jukebox;

        public create() {
            this.stage.backgroundColor = 0xA0DA6F;
            this._mainLayer = new MainLayer(this.game, this.world);
            this._jukebox = new Jukebox(this.game, this._mainLayer);
        }

        public update() {

        }

        public tictac() {
            console.log("tic");
        }
    }
}