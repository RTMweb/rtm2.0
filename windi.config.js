module.exports = {
  attributify: true,
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      accent: '#d9e021',
      primary: '#0060A6',
      secondary: '#4D4D4D',
    },
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sofia: ['sofia-pro', 'ui-sans-serif', 'system-ui', '-apple-system'],
        proxy: ['proxima-nova', 'ui-sans-serif', 'system-ui', '-apple-system'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('windicss/plugin/aspect-ratio')],
}
