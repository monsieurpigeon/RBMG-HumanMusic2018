namespace HumanMusic {
    export class Play extends Phaser.State {

        private _mainLayer: MainLayer;
        private _jukebox: Jukebox;
        public timer: Phaser.Timer;
        public time: Phaser.Time;

        public create() {
            this.time = new Phaser.Time(this.game);
            this.stage.backgroundColor = 0xA0DA6F;
            this._mainLayer = new MainLayer(this.game, this.world);
            this._jukebox = new Jukebox(this.game);
            this.timer = this.game.time.create(false);
            this.timer.loop(1000, this.tictac, this);
            this.timer.start(500);
        }

        public update() {
        }

        public tictac() {
            console.log("tic");
        }
    }
}