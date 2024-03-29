import {strict as assert} from 'node:assert'
import {test} from 'node:test'

import {getMainModule} from 'zeug'

type MainModule = typeof import('zeug')
const zeug = await getMainModule<MainModule>(`zeug`)
test(`handlebars`, async () => {
  const result = zeug.renderHandlebars(`hello {{name}}`, {name: `world`})
  assert.equal(result, `hello world`)
})
