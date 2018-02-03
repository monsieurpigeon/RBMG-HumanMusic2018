namespace HumanMusic {
    export class Start extends Phaser.State {

        public create() {
            this.createLogo();
            this.createStartButton();
        }

        private createLogo() {
            let disclaimer = this.add.text(Global.GAME_WIDTH / 2 , Global.GAME_HEIGHT / 4,
                "Human Music", null);
            disclaimer.anchor.set(0.5, 0.5);
            disclaimer.fill = '#00FFFF';
        }

        private createStartButton() {
            let start = this.add.button(Global.GAME_WIDTH / 2 , 3 * Global.GAME_HEIGHT / 4,
                "DebugButton", function() {
                this.game.state.start("Menu");
            }, this);
            start.anchor.set(0.5, 0.5);
        }

    }
}