namespace HumanMusic {
    export class Game extends Phaser.Game {
        public constructor() {
            // init game
            super(Global.GAME_WIDTH, Global.GAME_HEIGHT, Phaser.AUTO, "content");

            // load states
            this.state.add("Boot", Boot);
            this.state.add("Preload", Preload);
            this.state.add("Disclaimer", Disclaimer);
            this.state.add("Start", Start);
            this.state.add("Menu", Menu);
            this.state.add("Play", Play);

            // start
            this.state.start("Boot");
        }
    }
}