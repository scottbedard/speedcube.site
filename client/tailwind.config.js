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
    extend: {},
  },
  variants: {},
};
