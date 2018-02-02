namespace HumanMusic {
    export class Preload extends Phaser.State {

        private _ready: boolean = false;

        public preload() {
            // Preload all assets
            // Sprites
            this.load.spritesheet('DebugButton', 'assets/debugbutton.png', 200, 200);


            // Sounds

        }

        public update() {
            if (this._ready === false ) {
                this._ready = true;
            }
            this.time.events.add(500, function() {
                this.game.state.start("Start");
            }, this);
        }
    }
}