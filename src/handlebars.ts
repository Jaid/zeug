import Handlebars from 'handlebars'

type CompileOptions = Parameters<(typeof Handlebars)['compile']>[1]
type PrecompileOptions = Parameters<(typeof Handlebars)['precompile']>[1]

const defaultCompileOptions: CompileOptions = {
  noEscape: true,
  knownHelpersOnly: true,
}
const defaultHtmlCompileOptions: CompileOptions = {
  knownHelpersOnly: true,
}

export const makeHandlebars = (compileOptions: CompileOptions = defaultCompileOptions) => {
  const handlebars = Handlebars.create()
  const compileNative = handlebars.compile
  handlebars.compile = function (template: string, options: CompileOptions) {
    return compileNative(template, {
      ...compileOptions,
      ...options,
    })
  }
  const precompileNative = handlebars.precompile
  handlebars.precompile = function (template: string, options: PrecompileOptions) {
    return precompileNative(template, {
      ...compileOptions,
      ...options,
    })
  }
  return handlebars
}

export const makeHandlebarsWithHelpers = (helpers: Record<string, Handlebars.HelperDelegate>, compileOptions: CompileOptions = defaultCompileOptions) => {
  const knownHelpers = Object.fromEntries(Object.keys(helpers).map(key => [key, true]))
  const handlebars = makeHandlebars({
    ...compileOptions,
    knownHelpers,
  })
  for (const [key, value] of Object.entries(helpers)) {
    handlebars.registerHelper(key, value)
  }
  return handlebars
}

export const makeHtmlHandlebars = (compileOptions: CompileOptions = defaultHtmlCompileOptions) => {
  return makeHandlebars(compileOptions)
}

export const makeHtmlHandlebarsWithHelpers = (helpers: Record<string, Handlebars.HelperDelegate>, compileOptions: CompileOptions = defaultHtmlCompileOptions) => {
  return makeHandlebarsWithHelpers(helpers, compileOptions)
}

export const makeHandlebarsRenderer = (template: string) => {
  const templateResolver = Handlebars.compile(template, {
    noEscape: true,
    knownHelpersOnly: true,
  })
  return templateResolver
}

export const renderHandlebars = (template: string, context: Record<string, unknown>) => {
  const templateResolver = makeHandlebarsRenderer(template)
  return templateResolver(context)
}

export const makeHtmlHandlebarsRenderer = (template: string) => {
  const templateResolver = Handlebars.compile(template, {
    knownHelpersOnly: true,
  })
  return templateResolver
}

export const renderHtmlHandlebars = (template: string, context: Record<string, unknown>) => {
  const templateResolver = makeHtmlHandlebarsRenderer(template)
  return templateResolver(context)
}
