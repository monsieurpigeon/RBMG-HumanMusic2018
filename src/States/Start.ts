namespace HumanMusic {
    export class Start extends Phaser.State {

        public create() {
            this.createLogo();
            this.createStartButton();
        }

        private createLogo() {
            let logo = this.add.text(Global.GAME_WIDTH / 2 , Global.GAME_HEIGHT / 4,
                "Human Music", null);
            logo.anchor.set(0.5, 0.5);
            logo.fontSize = 70;
            logo.fill = '#00FFFF';

            let moto = this.add.text(Global.GAME_WIDTH / 2 , Global.GAME_HEIGHT / 4 + 50,
                "Let's bring back harmony, one element at a time", null);
            moto.anchor.set(0.5, 0.5);
            moto.fontStyle = 'italic';
            moto.fontSize = 15;
            moto.fill = '#00FFFF';

            let instructions = this.add.text(Global.GAME_WIDTH / 2 , Global.GAME_HEIGHT - 50,
                "Find the way to link what you hear, what you see and what you remember", null);
            instructions.anchor.set(0.5, 0.5);
            instructions.fontSize = 14;
            instructions.fill = '#00FFFF';
        }

        private createStartButton() {
            let start = this.add.button(Global.GAME_WIDTH / 2 , 3 * Global.GAME_HEIGHT / 4,
                "Start", function() {
                this.game.state.start("Menu");
            }, this, 1, 0, 2);
            start.anchor.set(0.5, 0.5);
        }

    }
}