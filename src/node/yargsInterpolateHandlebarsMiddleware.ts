import type {ArgumentsCamelCase, Argv, MiddlewareFunction} from 'yargs'

import mapObject, {mapObjectSkip} from 'map-obj'

import {renderHandlebars} from 'src/handlebars'

type Options = Partial<{
  context: Record<string, unknown>
  keys: Array<string>
}>

const isHandlebarsTemplate = (value: string) => {
  return value.includes(`{{`)
}

type AdvancedMiddlewareFunction = (args: ArgumentsCamelCase, yargs: Argv) => Record<string, unknown>
type MiddlewareFactory = (options?: Options) => MiddlewareFunction

// @ts-expect-error
const createInterpolateHandlebarsMiddleware: MiddlewareFactory = (options: Options = {}) => {
  const middleware: AdvancedMiddlewareFunction = (args, yargs) => {
    const handlebarsContext = Object.assign({}, args, options.context)
    const argsOverride = mapObject(args, (key: string, value) => {
      if (key === `_` || key === `$0`) {
        return mapObjectSkip
      }
      if (options.keys) {
        if (!options.keys.includes(key)) {
          return mapObjectSkip
        }
      }
      if (typeof value !== `string`) {
        return mapObjectSkip
      }
      if (!isHandlebarsTemplate(value)) {
        return mapObjectSkip
      }
      const resolvedValue = renderHandlebars(value, handlebarsContext)
      return [key, resolvedValue]
    })
    console.dir(argsOverride)
    return argsOverride
  }
  return middleware
}
const interpolateHandlebarsMiddleware = createInterpolateHandlebarsMiddleware()

export {createInterpolateHandlebarsMiddleware, interpolateHandlebarsMiddleware}
