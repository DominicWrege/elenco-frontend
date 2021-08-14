
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
        fonts: {
            ci: {
                name: "Helvetica Neue",
                family: [
                    "BlinkMacSystemFont",
                    "Helvetica Neue",
                    "Candara",
                    "Arial",
                    "Helvetica",
                    "sans-serif"
                ],
                weight: 900,
                src: []
            },
            regular: {
                name: "Helvetica Neue",
                family: [
                    "Helvetica Neue",
                    "Calibri",
                    "Candara",
                    "Arial",
                    "Helvetica",
                    "sans-serif"
                ],
                weight: 300,
                src: []
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
                src: []
            }
        }
    },

    "subscribe-button": null,
    playlist: [],
    share: null,
};


export { config };