import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: {
                    base: '#24B2D6',
                },
                secondary: '#b0bec5',
                accent: '#8c9eff',
                error: '#b71c1c',
                blue: {
                    base: '#24b2d6',
                    lighten1: '#44d2f6',
                }
            }
        },
    },
})

