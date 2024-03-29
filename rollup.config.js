import {buildConfig} from 'rollup-config-factory'

export default await buildConfig({
  externals: false,
  minify: true,
})
