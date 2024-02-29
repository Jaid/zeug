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

export const makeHandlebarsRenderer = <ContextGeneric = any>(template: string, helpers?: Record<string, Handlebars.HelperDelegate>) => {
  if (helpers === undefined) {
    return Handlebars.compile<ContextGeneric>(template, defaultCompileOptions)
  }
  const handlebars = makeHandlebarsWithHelpers(helpers)
  return handlebars.compile<ContextGeneric>(template)
}

export const renderHandlebars = <ContextGeneric = any>(template: string, context: ContextGeneric, helpers?: Record<string, Handlebars.HelperDelegate>) => {
  const templateResolver = helpers === undefined ? makeHandlebarsRenderer<ContextGeneric>(template) : makeHandlebarsWithHelpers(helpers).compile<ContextGeneric>(template)
  return templateResolver(context)
}

export const makeHtmlHandlebarsRenderer = <ContextGeneric = any>(template: string, helpers?: Record<string, Handlebars.HelperDelegate>) => {
  if (helpers === undefined) {
    return Handlebars.compile<ContextGeneric>(template, defaultHtmlCompileOptions)
  }
  const handlebars = makeHtmlHandlebarsWithHelpers(helpers)
  return handlebars.compile<ContextGeneric>(template)
}

export const renderHtmlHandlebars = <ContextGeneric = any>(template: string, context: ContextGeneric, helpers?: Record<string, Handlebars.HelperDelegate>) => {
  const templateResolver = helpers === undefined ? makeHtmlHandlebarsRenderer<ContextGeneric>(template) : makeHtmlHandlebarsWithHelpers(helpers).compile<ContextGeneric>(template)
  return templateResolver(context)
}
