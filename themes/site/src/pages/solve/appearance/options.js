import colorPickerComponent from './color_picker/color_picker.vue';

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
