namespace HumanMusic {
    export class Menu extends Phaser.State {

        private _elements: Phaser.Button[] = [];
        private _positions: any = [
            {x: 200, y:110},
            {x: 200, y: Global.GAME_HEIGHT - 110},
            {x: Global.GAME_WIDTH - 200, y: 110},
            {x: Global.GAME_WIDTH - 200, y: Global.GAME_HEIGHT - 110},
            {x: Global.GAME_WIDTH / 2, y: Global.GAME_HEIGHT / 2}
        ];

        public create() {
            this._elements = [];
            this.createMenu();
        }

        private createMenu() {
            for (let i = 0; i < 5; i++) {
                this._elements[i] = this.game.add.button(this._positions[i].x, this._positions[i].y, 'Elements',function() {
                    if (Preferences.instance.score[i] < 3) {
                        this.game.state.start("Play", true, false, i);
                    }
                }, this, i, i, i);
                this._elements[i].anchor.set(0.5, 0.5);
            }
        }


    }
}