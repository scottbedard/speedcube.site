module.exports = {
  corePlugins: {
    animation: false,
  },
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  plugins: [],
  purge: {
    content: [
      './public/**/*.html',
      './src/**/*.vue',
    ],
    preserveHtmlElements: false,
  },
  theme: {
    extend: {
      boxShadow: {
        'outline': '0 0 0 2px rgba(66, 153, 225, 0.9)',
      },
      colors: {
        alpha: {
          '50': 'rgba(0, 0, 0, 0.5)',
        },
      },
      cursor: {
        grab: 'grab',
        grabbing: 'grabbing',
      },
      fontFamily: {
        'sans': 'Quicksand, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      },
      spacing: {
        'full': '100%',
      },
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
  variants: {},
};
