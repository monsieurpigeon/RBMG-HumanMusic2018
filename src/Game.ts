namespace HumanMusic {
    export class Game extends Phaser.Game {
        public constructor() {
            // init game
            super(Global.GAME_WIDTH, Global.GAME_HEIGHT, Phaser.AUTO, "content");
        }
    }
}