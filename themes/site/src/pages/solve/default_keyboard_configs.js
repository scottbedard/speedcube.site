const defaultCubeConfig = {
    turns: {
        // face turns
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

        // cube rotations
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

export default {
    '2x2': defaultCubeConfig,
    '3x3': defaultCubeConfig,
    '4x4': defaultCubeConfig,
    '5x5': defaultCubeConfig,
};
