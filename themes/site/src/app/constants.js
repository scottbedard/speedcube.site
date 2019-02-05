// the current year
export const currentYear = (new Date()).getFullYear();

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
export const easeInCubic = [0.55, 0.055, 0.675, 0.19];
export const easeInOutCubic = [0.645, 0.045, 0.355, 1];
export const easeOutCubic = [0.215, 0.61, 0.355, 1];

// detect firefox
export const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

// determine if we're in a production environment
export const isProduction = process.env.NODE_ENV === 'production';

// determine if we're un a unit testing environment
export const isTesting = process.env.NODE_ENV === 'testing';

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
        slug: '2x2',
        title: '2x2',
    },
    '3x3': {
        color: '#f5d16f',
        slug: '3x3',
        title: '3x3',
    },
    '4x4': {
        color: '#ff00ff',
        slug: '4x4',
        title: '4x4',
    },
    '5x5': {
        color: '#ff00ff',
        slug: '5x5',
        title: '5x5',
    },
};

// our common string format for date values
// tip: this format is useful because it's human readable and values
//      can be compared with each other as strings. for example...
//      '2018-01-01 12:00:00' > '2017-01-01 12:00:00' // true
export const timestampFormat = 'YYYY-MM-DD HH:mm:ss';
