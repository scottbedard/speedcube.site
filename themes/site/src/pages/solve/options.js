const cubeOptions = [
    {
        default: [
            '#ffeb3b', // U -> yellow
            '#ff9800', // L -> orange
            '#03a9f4', // F -> blue
            '#f44336', // R -> red
            '#4caf50', // B -> green
            '#eeeeee', // D -> white
        ],
        faces: 6,
        key: 'colors',
        label: 'Colors',
        type: 'colors',
    },
    {
        default: 10,
        key: 'stickerSpacing',
        label: 'Sticker Spacing',
        max: 100,
        min: 0,
        span: 6,
        type: 'range',
    },
    {
        default: 10,
        key: 'stickerElevation',
        label: 'Sticker Elevation',
        max: 100,
        min: 0,
        span: 6,
        type: 'range',
    },
    {
        default: 10,
        key: 'stickerRadius',
        label: 'Sticker Radius',
        max: 50,
        min: 0,
        span: 6,
        type: 'range',
    },
    {
        default: 40,
        key: 'innerBrightness',
        label: 'Inner Brightness',
        max: 100,
        min: 0,
        span: 6,
        type: 'range',
    },
    {
        default: 90,
        key: 'turnDuration',
        label: 'Turn Duration',
        max: 500,
        min: 50,
        type: 'range',
    }
];

export default {
    '2x2': cubeOptions,
    '3x3': cubeOptions,
    '4x4': cubeOptions,
    '5x5': cubeOptions,
};
