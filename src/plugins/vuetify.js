import {createVuetify} from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    // dark: localStorage.getItem('esa-blueshell.nl:darkMode') === 'true',
    options: {customProperties: true},

    variations: {
      colors: ['primary'],
      lighten: 1
    },

    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#3387FA',
          accent: '#000000',
          error: '#ff0022',
          anchor: '#3387FA',
          background: '#1E1E1E',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#3387FA',
          accent: '#A8FF00',
          error: '#ff0022',
          anchor: '#3387FA',
          background: '#343434',
        },
      }
    },
  },
})

