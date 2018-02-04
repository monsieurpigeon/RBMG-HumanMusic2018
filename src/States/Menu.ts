namespace HumanMusic {
    export class Menu extends Phaser.State {

        private _elements: Phaser.Button[] = [];
        private _highScores: Phaser.Text[] = [];
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
                    this.game.state.start("Play", true, false, i);
                }, this, i, i, i);
                this._elements[i].anchor.set(0.5, 0.5);

                this._highScores[i] = this.game.add.text(this._positions[i].x, this._positions[i].y + 85, "HighScore: " + Preferences.instance.top[i].toString(), null);
                this._highScores[i].anchor.set(0.5, 0.5);
                this._highScores[i].fill = '#777777';
                this._highScores[i].fontSize = 15;
            }
        }


    }
}