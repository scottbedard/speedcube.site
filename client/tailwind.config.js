const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  mode: 'jit',
  purge: [
    '../resources/views/**/*.blade.php',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        darken: {
          '50': 'rgba(0, 0, 0, 0.5)',
        },
        primary: colors.emerald,
      },
      cursor: {
        grab: 'grab',
        grabbing: 'grabbing',
      },
      fontFamily: {
        sans: 'Quicksand, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      },
      spacing: {
        'full': '100%',
      },
    },
    minHeight: {
      '0': '0px',
      '12': '3rem',
      'full': '100%',
      'screen': '100vh',
    },
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  variants: {
    extend: {
      padding: ['hover', 'first', 'focus', 'last'],
    },
  },
}
