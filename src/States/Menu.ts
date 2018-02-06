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
            this.checkEnd();
            this.createMenu();


            if (Preferences.instance.score[4] !== 0) {
                let logo = this.add.text(Global.GAME_WIDTH / 2 , Global.GAME_HEIGHT / 2 - 20,
                    "Human Music", null);
                logo.anchor.set(0.5, 0.5);
                logo.fontSize = 70;
                logo.fill = '#00FFFF';

                let instructions = this.add.text(Global.GAME_WIDTH / 2 , Global.GAME_HEIGHT / 2 + 20,
                    "Find the way to link whatever you hear, whatever you see and whatever you remember", null);
                instructions.anchor.set(0.5, 0.5);
                instructions.fontSize = 14;
                instructions.fill = '#00FFFF';
            }

        }

        private createMenu() {
            for (let i = 0; i < 5; i++) {
                if (Preferences.instance.score[i] >= 0) {
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

        checkEnd() {
            for (let i = 0; i < 4; i++) {
                if (Preferences.instance.score[i] < 2) {
                    return;
                }
            }
            if (Preferences.instance.score[4] == -1) {
                Preferences.instance.score[4] = 0;
            }

        }


    }
}