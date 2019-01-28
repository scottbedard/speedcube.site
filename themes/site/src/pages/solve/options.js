const cubeOptions = [
    {
        faces: 6,
        key: 'colors',
        label: 'Colors',
        type: 'colors',
    },
    {
        key: 'stickerSpacing',
        label: 'Sticker Spacing',
        max: 100,
        min: 0,
        span: 6,
        type: 'range',
    },
    {
        key: 'stickerElevation',
        label: 'Sticker Elevation',
        max: 100,
        min: 0,
        span: 6,
        type: 'range',
    },
    {
        key: 'stickerRadius',
        label: 'Sticker Radius',
        max: 50,
        min: 0,
        span: 6,
        type: 'range',
    },
    {
        key: 'innerBrightness',
        label: 'Inner Brightness',
        max: 100,
        min: 0,
        span: 6,
        type: 'range',
    },
    {
        key: 'cameraAngle',
        label: 'Camera Angle',
        max: 90,
        min: 0,
        span: 6,
        type: 'range',
    },
    {
        key: 'cameraDistance',
        label: 'Camera Distance',
        min: 1,
        max: 8000,
        span: 6,
        type: 'range',
    },
    {
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
