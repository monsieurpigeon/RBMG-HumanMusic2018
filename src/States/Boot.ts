namespace HumanMusic {
    export class Boot extends Phaser.State {
        // RESIZING STUFF

        public create(): void {
            this.game.state.start("Preload");
        }
    }
}