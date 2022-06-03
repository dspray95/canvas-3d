const MorseConfig = {
    LANDSCAPE: {
        MESSAGE: ".... .. .-. . / -- .", //hire me!
        WIDTH: 0.1,
        HEIGHT: 0.7,
        SPACING: 0.015,
        LEAD_LENGTH: 0.2,
        TRAIL_LENGTH: 0.2,
        X_POS: 0.5,
        Y_POS: 1
    },
    PORTRAIT: {
        //this repeats here, might be a nicer way to do it
        MESSAGE: ".... .. .-. . / -- .",
        WIDTH: 0.5,
        HEIGHT: 0.7,
        SPACING: 0.015,
        LEAD_LENGTH: 0.2,
        TRAIL_LENGTH: 0.2,
        X_POS: 0.1,
        Y_POS: 1
    }
}

const NeuralNetConfig = { 
    LANDSCAPE: {
        WIDTH: 0.2,
        HEIGHT: 0.2,
        N_COLS: 6,
        N_ROWS: 4,
        SPACING: 0.1,
        X_POS: 0.075,
        Y_POS: 0.075,
        NEURON_RADIUS: 6,
        TOP: 0.025,
        LEFT: 0.0333
    },
    PORTRAIT: {
        WIDTH: 0.5,
        HEIGHT: 0.4,
        N_COLS: 6,
        N_ROWS: 4,
        SPACING: 0.075,
        X_POS: 0.05,
        Y_POS: 0.05,
        NEURON_RADIUS: 4,
        TOP: 0.02,
        LEFT: 0.015
    }
}

const FretboardConfig = { 
    LANDSCAPE: {
        WIDTH: 0.15,
        SCREEN_HEIGHT: 0.04,
        HEIGHT: 1,
        X_POS: 0,
        Y_POS: 0,
        FRET_SPACING: 0.15
    },
    PORTRAIT: {
        WIDTH: 0.35,
        SCREEN_HEIGHT: 0.04,
        HEIGHT: 1,
        X_POS: 0,
        Y_POS: 0,
        FRET_SPACING: 0.15,
    }
}

const MountainsConfig = { 
    LANDSCAPE: {
        WIDTH: 0.135,
        HEIGHT: 0.04,
        N_PEAKS: 11,
        SLOPE_DISTANCE: 0.1,
        PEAK_HEIGHT: 1,
        X_POS: 1,
        Y_POS: 1,
        ALIGNMENT: "right",
        UPPER: {
            BOTTOM: 0.4,
            RIGHT: 0
        },
        LOWER: {
            BOTTOM: 0.35,
            RIGHT: -0.012
        }

    },
    PORTRAIT: {
        WIDTH: 0.25,
        HEIGHT: 0.04,
        N_PEAKS: 11,
        SLOPE_DISTANCE: 0.1,
        PEAK_HEIGHT: 1,
        X_POS: 1,
        Y_POS: 1,
        ALIGNMENT: "right",
        UPPER: {
            BOTTOM: 0.2,
            RIGHT: 0
        },
        LOWER: {
            BOTTOM: 0.15,
            RIGHT: -0.012
        }
    }
}

export { MorseConfig, NeuralNetConfig, FretboardConfig, MountainsConfig}