/* eslint-disable */

//
// colors
//
const colors = {
    'transparent': 'transparent',
  
    // greys
    'grey-1': '#1F2933',
    'grey-2': '#323F4B',
    'grey-3': '#3E4C59',
    'grey-4': '#52606D',
    'grey-5': '#616E7C',
    'grey-6': '#7B8794',
    'grey-7': '#9AA5B1',
    'grey-8': '#CBD2D9',
    'grey-9': '#E4E7EB',
    'grey-10': '#F5F7FA',
  
    // primary (blue)
    'primary-1': '#003E6B',
    'primary-2': '#0A558C',
    'primary-3': '#0F609B',
    'primary-4': '#186FAF',
    'primary-5': '#2680C2',
    'primary-6': '#4098D7',
    'primary-7': '#62B0E8',
    'primary-8': '#84C5F4',
    'primary-9': '#B6E0FE',
    'primary-10': '#DCEEFB',
  
    // danger (red)
    'danger-1': '#610404',
    'danger-2': '#780A0A',
    'danger-3': '#911111',
    'danger-4': '#A61B1B',
    'danger-5': '#BA2525',
    'danger-6': '#D64545',
    'danger-7': '#E66A6A',
    'danger-8': '#F29B9B',
    'danger-9': '#FACDCD',
    'danger-10': '#FFEEEE',
};

//
// scale
//
const scale = [
    0, // 0rem
    1, // 0.25rem
    2, // 0.5rem
    3, // 0.75rem
    4, // 1rem
    6, // 1.5rem
    8, // 2rem
    10, // 2.5rem
    12, // 3rem
    14, // 3.5rem
    16, // 4rem
    20, // 5rem
    24, // 6rem
    32, // 8rem
    48, // 12rem
    64, // 16rem
    80, // 20rem
    96, // 24rem
    128, // 32rem
    160, // 40rem
    192, // 48rem
];

const relativeScale = {
    'half': '50%',
    'full': '100%',
};

const remScale = scale.reduce((obj, value) => {
    const rem = value / 4;

    obj[value] = `${rem}rem`;

    if (value !== 0) {
        obj[-value] = `-${rem}rem`;
    }

    return obj;
}, {});

const utilScale = {
    auto: 'auto',
    px: '1px',
};

//
// config
//
module.exports = {
    important: false,
    prefix: '',
    plugins: [
        // ...
    ],
    separator: ':',
    theme: {
        colors,
        fontFamily: {
            sans: [
                'Open Sans',
                'system-ui',
                'BlinkMacSystemFont',
                '-apple-system',
                'Segoe UI',
                'Roboto',
                'Oxygen',
                'Ubuntu',
                'Cantarell',
                'Fira Sans',
                'Droid Sans',
                'Helvetica Neue',
                'sans-serif',
            ],
            serif: [
                'Constantia',
                'Lucida Bright',
                'Lucidabright',
                'Lucida Serif',
                'Lucida',
                'DejaVu Serif',
                'Bitstream Vera Serif',
                'Liberation Serif',
                'Georgia',
                'serif',
            ],
            mono: [
                'Menlo',
                'Monaco',
                'Consolas',
                'Liberation Mono',
                'Courier New',
                'monospace',
            ],
        },
        maxWidth: {
            xs: '20rem',
            sm: '24rem',
            md: '28rem',
            lg: '32rem',
            xl: '36rem',
            '2xl': '42rem',
            '3xl': '48rem',
            '4xl': '56rem',
            '5xl': '64rem',
            '6xl': '100rem',
            full: '100%',
        },
        minHeight: {
            ...relativeScale,
            ...remScale,
            ...utilScale,
        },
        minWidth: {
            '3xs': '12rem',
            '2xs': '16rem',
            xs: '20rem',
            sm: '24rem',
            md: '28rem',
            lg: '32rem',
            xl: '36rem',
            '2xl': '42rem',
            '3xl': '48rem',
            '4xl': '56rem',
            '5xl': '64rem',
            '6xl': '100rem',
            full: '100%',
        },
        screens: {
            xs: '480px',
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
        },
        spacing: {
            ...relativeScale,
            ...remScale,
            ...utilScale,
        }
    },
    variants: {
        appearance: ['responsive'],
        backgroundAttachment: ['responsive'],
        backgroundColors: ['responsive', 'hover', 'group-hover', 'focus'],
        backgroundPosition: ['responsive'],
        backgroundRepeat: ['responsive'],
        backgroundSize: ['responsive'],
        borderCollapse: [],
        borderColors: ['responsive', 'hover', 'focus', 'focus-within'],
        borderRadius: ['responsive'],
        borderStyle: ['responsive'],
        borderWidths: ['responsive'],
        cursor: ['responsive'],
        display: ['responsive'],
        flexbox: ['responsive'],
        float: ['responsive'],
        fonts: ['responsive'],
        fontWeights: ['responsive', 'hover', 'focus'],
        height: ['responsive'],
        leading: ['responsive'],
        lists: ['responsive'],
        margin: ['responsive'],
        maxHeight: ['responsive'],
        maxWidth: ['responsive'],
        minHeight: ['responsive'],
        minWidth: ['responsive'],
        negativeMargin: ['responsive'],
        opacity: ['responsive'],
        outline: ['focus'],
        overflow: ['responsive'],
        padding: ['responsive'],
        pointerEvents: ['responsive'],
        position: ['responsive'],
        resize: ['responsive'],
        shadows: ['responsive', 'hover', 'focus', 'focus-within'],
        svgFill: [],
        svgStroke: [],
        tableLayout: ['responsive'],
        textAlign: ['responsive'],
        textColors: ['responsive', 'hover', 'focus', 'focus-within', 'group-hover'],
        textSizes: ['responsive'],
        textStyle: ['responsive', 'hover', 'focus'],
        tracking: ['responsive'],
        userSelect: ['responsive'],
        verticalAlign: ['responsive'],
        visibility: ['responsive'],
        whitespace: ['responsive'],
        width: ['responsive'],
        zIndex: ['responsive'],
    },
};