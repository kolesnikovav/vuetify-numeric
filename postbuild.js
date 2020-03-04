// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

const DIST_LIB_PATH = 'dist/'
const README_PATH = 'README.md'
const PACKJS_PATH = 'package.json'

const PATH_TO = DIST_LIB_PATH + README_PATH
const PATH_TO_JSON = 'dist/package.json'

function copyFilesIntoDistFolder () {
  if (!fs.existsSync(README_PATH) || !fs.existsSync(PACKJS_PATH)) {
    throw new Error('README.md or package.json does not exist')
  } else {
    fs.copyFileSync(README_PATH, PATH_TO)
    fs.copyFileSync(PACKJS_PATH, PATH_TO_JSON)
  }
}

copyFilesIntoDistFolder()
