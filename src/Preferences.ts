namespace HumanMusic {
    export class Preferences {

        private static _instance: Preferences = null;

        public score: number[] = [0, -1, -1, -1, -1];

        public static get instance(): Preferences {
            if (Preferences._instance === null) {
                Preferences._instance = new Preferences();
                console.log('Preferences KO');
            }

            return Preferences._instance;
        }
    }
}