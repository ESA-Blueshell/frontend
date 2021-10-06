import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: {
                    base: '#3387FA',
                    lighten1: '#549aff',
                },
                accent: '#A8FF00',
                error: '#b71c1c',
            }
        },
    },
})

