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
      fontFamily: {
        'sans': 'Quicksand, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      },
      screens: {
        'xs': '480px',
      },
      spacing: {
        'full': '100%',
      },
    },
  },
  variants: {},
};
