import { boot } from 'quasar/wrappers'
import VueAnimXyz from '@animxyz/vue3'
import '@animxyz/core'

export default boot(({ app }) => {
  app.use(VueAnimXyz)
})
