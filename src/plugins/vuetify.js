import { createVuetify } from 'vuetify'

export default createVuetify({
    theme: {
      dark: localStorage.getItem('esa-blueshell.nl:darkMode') === 'true',
      options: {customProperties: true},
      themes: {
        light: {
          primary: {
            base: '#3387FA',
            lighten1: '#549aff',
          },
          accent: '#000000',
          error: '#ff0022',
          anchor: '#3387FA',
          background: '#1E1E1E',
        },
        dark: {
          primary: {
            base: '#3387FA',
            lighten1: '#549aff',
          },
          accent: '#A8FF00',
          error: '#ff0022',
          anchor: '#3387FA',
          background: '#343434',
        }
      },
    },
  })

