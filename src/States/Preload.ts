namespace HumanMusic {
    export class Preload extends Phaser.State {

        private _ready: boolean = false;

        public preload() {
            // Preload all assets
            // Sprites
            this.load.spritesheet('DebugButton', 'assets/debugbutton.png', 50, 50);
            this.load.spritesheet('Tempo', 'assets/tempo.png', 50, 5);
            this.load.spritesheet('Pad', 'assets/pad.png', 50, 50);

            // Sounds
            this.load.audio('kick', 'assets/kick.wav');
            this.load.audio('snare', 'assets/snare.wav');
            this.load.audio('hihat', 'assets/hihat.wav');
            this.load.audio('bell', 'assets/bell.wav');
            this.load.audio('yeah', 'assets/yeah.mp3');

        }

        public update() {
            if (this._ready === false && this.cache.isSoundDecoded("kick") &&
            this.cache.isSoundDecoded("snare") &&
            this.cache.isSoundDecoded("hihat") && this.cache.isSoundDecoded("bell") &&
                this.cache.isSoundDecoded("yeah")) {
                this._ready = true;
            }
            this.time.events.add(500, function() {
                this.game.state.start("Start");
            }, this);
        }
    }
}