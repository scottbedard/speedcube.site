const production = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [],
  purge: production ? [
    './src/**/*.htm',
    './src/**/*.vue',
  ] : [],
  theme: {
    extend: {
      padding: {
        full: '100%',
      },
    },
  },
  variants: {},
};
