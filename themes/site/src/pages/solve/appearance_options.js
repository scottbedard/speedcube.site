const cubeOptions = [
    {
        faces: 6,
        key: 'colors',
        label: 'Colors',
        type: 'colors',
    },
    {
        grid: {
            xs: 6,
            md: 4,
        },
        key: 'stickerSpacing',
        label: 'Sticker Spacing',
        max: 100,
        min: 0,
        type: 'range',
    },
    {
        grid: {
            xs: 6,
            md: 4,
        },
        key: 'stickerElevation',
        label: 'Sticker Elevation',
        max: 100,
        min: 0,
        type: 'range',
    },
    {
        grid: {
            xs: 6,
            md: 4,
        },
        key: 'stickerRadius',
        label: 'Sticker Radius',
        max: 50,
        min: 0,
        type: 'range',
    },
    {
        grid: {
            xs: 6,
            md: 4,
        },
        key: 'innerBrightness',
        label: 'Inner Brightness',
        max: 100,
        min: 0,
        type: 'range',
    },
    {
        grid: {
            xs: 6,
            md: 4,
        },
        key: 'cameraAngle',
        label: 'Camera Angle',
        max: 90,
        min: 0,
        type: 'range',
    },
    {
        grid: {
            xs: 6,
            md: 4,
        },
        key: 'cameraDistance',
        label: 'Camera Distance',
        min: 1,
        max: 8000,
        type: 'range',
    },
    {
        grid: {
            xs: 6,
            md: 4,
        },
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
