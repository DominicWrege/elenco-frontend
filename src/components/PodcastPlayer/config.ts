
const config = {
    version: 5,
    base: "/web-player/",
    theme: {
        tokens: {
            brand: "#3f51b5",
            brandDark: "#3f51b5",
            brandDarkest: "#1A3A4A",
            brandLightest: "#E9F1F5",
            shadeDark: "#807E7C",
            shadeBase: "#807E7C",
            contrast: "#000",
            alt: "#fff"
        },

        /**
         * Fonts
         * - by default the system font stack is used (https://css-tricks.com/snippets/css/system-font-stack/)
         *
         * font:
         * - name: font name that is used in the font stack
         * - family: list of fonts in a fallback order
         * - weight: font weight of the defined font
         * - src: list of web font sources (allowed: woff, woff2, ttf, eot, svg)
         */

        // FIX ME
        fonts: {
            ci: {
                name: "RobotoBlack",
                family: [
                    "RobotoBlack",
                    "Calibri",
                    "Candara",
                    "Arial",
                    "Helvetica",
                    "sans-serif"
                ],
                weight: 900,
                src: ["./assets/Roboto-Black.ttf"]
            },
            regular: {
                name: "FiraSansLight",
                family: [
                    "FiraSansLight",
                    "Calibri",
                    "Candara",
                    "Arial",
                    "Helvetica",
                    "sans-serif"
                ],
                weight: 300,
                src: ["./assets/FiraSans-Light.ttf"]
            },
            bold: {
                name: "FiraSansBold",
                family: [
                    "FiraSansBold",
                    "Calibri",
                    "Candara",
                    "Arial",
                    "Helvetica",
                    "sans-serif"
                ],
                weight: 700,
                src: ["./assets/FiraSans-Bold.ttf"]
            }
        }
    },

    "subscribe-button": null,
    playlist: [],
    share: null,
};


export { config };