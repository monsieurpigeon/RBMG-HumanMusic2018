namespace HumanMusic {

    export interface Elemental {
        name: string;
        track: boolean[][];
        tempo: number[];
        introduction: string;
    }

    export class Elements {

        public static LIST: Elemental[] = [
            {
                name: "Fire",
                track: [
                    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
                    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
                    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
                    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
                    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
                ],
                tempo: [280, 250, 200],
                introduction: "Bonjour"
            },
            {
                name: "Earth",
                track: [[true, true]],
                tempo: [280, 250, 200],
                introduction: "Salut"
            }
        ];
    }
}