import colorPickerComponent from './color_picker/color_picker.vue';
import numberPickerComponent from './number_picker/number_picker.vue';

//
// base config
//
const base = [
    {
        cell: { sm: 6, md: 4 },
        component: numberPickerComponent,
        id: 'cameraAngle',
        label: 'Camera Angle',
        props: { max: 90, min: 0, step: 1 },
    },
    {
        cell: { sm: 6, md: 4 },
        component: numberPickerComponent,
        id: 'cameraDistance',
        label: 'Camera Distance',
        props: { max: 1000, min: 1, step: 1 },
    },
    {
        cell: { sm: 6, md: 4 },
        component: numberPickerComponent,
        id: 'turnDuration',
        label: 'Turn Duration',
        props: { max: 500, min: 1, step: 1 },
    },
];

//
// cube config
//
const cube = [
    {
        cell: {},
        component: colorPickerComponent,
        id: 'colors',
        label: 'Colors',
        props: {
            faces: 6,
        },
    },
    ...base,
    {
        cell: { sm: 6, md: 4 },
        component: numberPickerComponent,
        id: 'stickerSpacing',
        label: 'Sticker Spacing',
        props: { max: 1, min: 0, step: 0.01 },
    },
    {
        cell: { sm: 6, md: 4 },
        component: numberPickerComponent,
        id: 'stickerElevation',
        label: 'Sticker Elevation',
        props: { max: 1, min: 0, step: 0.01 },
    },
    {
        cell: { sm: 6, md: 4 },
        component: numberPickerComponent,
        id: 'stickerRadius',
        label: 'Sticker Radius',
        props: { max: 0.5, min: 0, step: 0.01 },
    },
    {
        cell: { sm: 6, md: 4 },
        component: numberPickerComponent,
        id: 'innerBrightness',
        label: 'Inner Brightness',
        props: { max: 1, min: 0, step: 0.01 },
    },
];

//
// options by puzzle
//
export default {
    '2x2': cube,
    '3x3': cube,
    '4x4': cube,
    '5x5': cube,
};
