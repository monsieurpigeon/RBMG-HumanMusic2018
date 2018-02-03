namespace HumanMusic {
    export class Menu extends Phaser.State {
        public create() {
            this.createTracksButtons();

        }

        private createTracksButtons() {
            let start = this.add.button(Global.GAME_WIDTH / 2 ,Global.GAME_HEIGHT / 2,
                "DebugButton", function() {
                    this.game.state.start("Play", true, false, 0);
                }, this);
            start.anchor.set(0.5, 0.5);
        }
    }
}