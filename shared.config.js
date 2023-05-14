import {resolve} from 'path'
import {fileURLToPath} from 'node:url'

const dirname = fileURLToPath(new URL('.', import.meta.url))
const alias = {
  '$': resolve(dirname, './src'),
  // '$components': resolve(dirname, './src/components')
}

export default {
  alias,
}
