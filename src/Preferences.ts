namespace HumanMusic {
    export class Preferences {

        private static _instance: Preferences = null;

        public score: number[] = [0, 0, 0, 0, -1];
        public top: number[] = [0, 0, 0, 0, 0];

        public static get instance(): Preferences {
            if (Preferences._instance === null) {
                Preferences._instance = new Preferences();
            }

            return Preferences._instance;
        }
    }
}