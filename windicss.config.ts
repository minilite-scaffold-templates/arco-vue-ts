import { defineConfig } from 'windicss/helpers'

import modifyVars from './build/theme/arco/modifyVars'

export default defineConfig({
  theme: {
    extend: {
      backgroundColor: {
        primary: modifyVars['arcoblue-6'],
      },
      textColor: {
        primary: modifyVars['arcoblue-6'],
      },
      borderColor: {
        primary: modifyVars['arcoblue-6'],
      },
    },
  },
})
