// the current year
export const currentYear = (new Date()).getFullYear();

// default cube config
export const defaultCubeConfig = {
    cameraAngle: 50,
    cameraDistance: 200,
    colors: [
        '#FFEE5D', // U
        '#EFAA18', // L
        '#2589E2', // F
        '#EC6157', // R
        '#5CBD60', // B
        '#F0F0F0', // D
    ],
    innerBrightness: 0.9,
    stickerElevation: 0.2,
    stickerRadius: 0.1,
    stickerSpacing: 0.2,
    turnDuration: 80,
};

// default cube keyboard config
export const defaultCubeKeyboardConfig = {
    modifiers: {
        // ...
    },
    turns: {
        J: 'U',
        F: 'U-',
        D: 'L',
        E: 'L-',
        H: 'F',
        G: 'F-',
        I: 'R',
        K: 'R-',
        W: 'B',
        O: 'B-',
        S: 'D',
        L: 'D-',
        A: 'Y-',
        ';': 'Y',
        R: 'X',
        U: 'X',
        T: 'X',
        Y: 'X',
        V: 'X-',
        C: 'X-',
        N: 'X-',
        M: 'X-',
        Q: 'Z-',
        P: 'Z',
    },
};

// bezier curves
// see https://easings.net for examples
export const easeInSine = [0.47, 0, 0.745, 0.715];
export const easeOutSine = [0.39, 0.575, 0.565, 1];
export const easeInOutSine = [0.445, 0.05, 0.55, 0.95];
export const easeInQuad = [0.55, 0.085, 0.68, 0.53];
export const easeOutQuad = [0.25, 0.46, 0.45, 0.94];
export const easeInOutQuad = [0.455, 0.03, 0.515, 0.955];
export const easeInCubic = [0.55, 0.055, 0.675, 0.19];
export const easeOutCubic = [0.215, 0.61, 0.355, 1];
export const easeInOutCubic = [0.645, 0.045, 0.355, 1];
export const easeInQuart = [0.895, 0.03, 0.685, 0.22];
export const easeOutQuart = [0.165, 0.84, 0.44, 1];
export const easeInOutQuart = [0.77, 0, 0.175, 1];
export const easeInQuint = [0.755, 0.05, 0.855, 0.06];
export const easeOutQuint = [0.23, 1, 0.32, 1];
export const easeInOutQuint = [0.86, 0, 0.07, 1];
export const easeInExpo = [0.95, 0.05, 0.795, 0.035];
export const easeOutExpo = [0.19, 1, 0.22, 1];
export const easeInOutExpo = [1, 0, 0, 1];
export const easeInCirc = [0.6, 0.04, 0.98, 0.335];
export const easeOutCirc = [0.075, 0.82, 0.165, 1];
export const easeInOutCirc = [0.785, 0.135, 0.15, 0.86];
export const easeInBack = [0.6, -0.28, 0.735, 0.045];
export const easeOutBack = [0.175, 0.885, 0.32, 1.275];
export const easeInOutBack = [0.68, -0.55, 0.265, 1.55];

// detect firefox
export const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

// determine if we're in a production environment
export const isProduction = process.env.NODE_ENV === 'production';

// determine if we're un a unit testing environment
export const isTesting = process.env.NODE_ENV === 'test';

// @todo: determine if we're using a touch device
export const isTouch = false;

// key codes
// export const escapeKeyCode = ...;
export const enterKeyCode = 13;
export const spacebarKeyCode = 32;

// puzzles
// this constant is used to keep meta data with various puzzle ids
export const puzzles = {
    '2x2': {
        color: '#4098D7',
        defaultConfig: defaultCubeConfig,
        slug: '2x2',
        title: '2x2',
    },
    '3x3': {
        color: '#f5d16f',
        defaultConfig: defaultCubeConfig,
        slug: '3x3',
        title: '3x3',
    },
    '4x4': {
        color: '#4CAF50',
        defaultConfig: defaultCubeConfig,
        slug: '4x4',
        title: '4x4',
    },
    '5x5': {
        color: '#f44336',
        defaultConfig: defaultCubeConfig,
        slug: '5x5',
        title: '5x5',
    },
};

// an array of supported puzzle types
export const puzzleTypes = Object.keys(puzzles);

// our common string format for date values
// tip: this format is useful because it's human readable and values
//      can be compared with each other as strings. for example...
//      '2018-01-01 12:00:00' > '2017-01-01 12:00:00' // true
export const timestampFormat = 'YYYY-MM-DD HH:mm:ss';
