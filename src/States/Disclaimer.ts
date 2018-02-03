namespace HumanMusic {
    export class Disclaimer extends Phaser.State {

        public create() {
            this.createDisclaimer();
            this.waitToStart();
        }

        private createDisclaimer() {
            let disclaimer = this.add.text(Global.GAME_WIDTH / 2 , Global.GAME_HEIGHT / 2,
                "Use headphones for best experience", null);
            disclaimer.anchor.set(0.5, 0.5);
            disclaimer.fill = '#00FFFF';
        }

        private waitToStart() {
            let timer = this.game.time.create(true);
            timer.add(3000, () => {
                this.game.state.start("Start");
            });
            timer.start(50);
        }
    }
}