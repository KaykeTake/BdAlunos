// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'


// Vuetify
import { createVuetify } from 'vuetify'
import { mdiDelete, mdiPencil, mdiPlus } from '@mdi/js'

export default createVuetify({
  theme: {
    defaultTheme: 'dark'
  },
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      plus: mdiPlus,
      pencil: mdiPencil,
      delete: mdiDelete
    },
    sets: {
      mdi,
    },
  },
})