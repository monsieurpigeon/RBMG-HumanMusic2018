namespace HumanMusic {

    export interface Elemental {
        name: string;
        track: boolean[][];
        introduction: string;
        instruments: string[];
    }

    export class Elements {

        public static LIST: Elemental[] = [
            {
                name: "🔥 Fire",
                track: [
                    [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
                    [true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true],
                    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],
                    [false, true, false, true, false, false, false, true, false, true, false, true, false, false, false, true]
                ],
                introduction: "Bonjour",
                instruments: ["kick", "snare", "hihat", "bell"]
            },
            {
                name: "☁️ Air",
                track: [
                    [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],
                    [false, true, false, false, true, false, false, false, true, false, false, true, false, false, false, true],
                    [true, false, false, true, false, false, true, false, false, false, true, false, true, false, false, false],
                    [false, true, false, false, true, false, false, true, false, false, false, true, false, false, true, false]
                ],
                introduction: "Bonjour",
                instruments: ["kick", "snare", "hihat", "bell"]
            },
            {
                name: "🌱 Earth",
                track: [
                    [true, false, false, true, false, false, true, false, false, false, true, false, false, false, true, false],
                    [false, true, false, false, false, true, false, false, false, true, false, false, true, false, true, false],
                    [false, false, true, false, true, false, false, false, true, false, false, true, false, false, false, false],
                    [false, true, false, true, false, false, true, false, false, true, false, false, false, false, true, false]
                ],
                introduction: "Bonjour",
                instruments: ["kick", "snare", "hihat", "bell"]
            },
            {
                name: "💧 Water",
                track: [
                    [false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false],
                    [true, false, false, true, false, false, true, false, true, false, false, true, false, false, true, false],
                    [false, false, true, false, true, false, false, true, false, false, true, false, true, false, false, true],
                    [false, true, false, false, false, true, false, false, false, true, false, false, false, true, false, false]
                ],
                introduction: "Bonjour",
                instruments: ["kick", "snare", "hihat", "bell"]
            },
            {
                name: "😀 Soul",
                track: [
                    [false, true, false, false, false, true, false, false, true, false, false, true, false, false, false, true],
                    [true, false, true, false, true, false, false, false, false, true, false, false, true, false, true, false],
                    [false, true, false, false, false, true, false, true, false, false, false, true, false, true, false, false],
                    [true, false, false, true, false, false, false, false, false, true, false, false, false, false, false, true]
                ],
                introduction: "Bonjour",
                instruments: ["kick", "snare", "hihat", "bell"]
            }
        ];
    }
}