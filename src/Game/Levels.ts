namespace HumanMusic {

    interface Element {
        name: string;
        track: boolean[][];
        introduction: string;
    }

    export class Elements {

        public static LIST: Element[] = [
            {
                name: "Fire",
                track: [
                    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
                    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
                    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
                    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
                    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
                ],
                introduction: "Bonjour"
            },
            {
                name: "Earth",
                track: [[true, true]],
                introduction: "Salut"
            }
        ];
    }
}