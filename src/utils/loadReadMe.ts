import mdHighlight from 'markdown-it-highlightjs'
import Readme from '../../README.md?raw'

export const mdPlugins = [
  {
    plugin: mdHighlight,
  },
]

export default Readme
