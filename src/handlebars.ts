import Handlebars from 'handlebars'

export const makeHandlebars = () => {
  const handlebars = Handlebars.create()
  const compileNative = handlebars.compile
  handlebars.compile = (template: string) => {
    return compileNative(template, {
      noEscape: true,
      knownHelpersOnly: true,
    })
  }
  const precompileNative = handlebars.precompile
  handlebars.precompile = (template: string) => {
    return precompileNative(template, {
      noEscape: true,
      knownHelpersOnly: true,
    })
  }
}

export const makeHandlebarsWithHelpers = (helpers: Record<string, Handlebars.HelperDelegate>) => {
  const handlebars = Handlebars.create()
  const knownHelpers = {}
  for (const [name, helper] of Object.entries(helpers)) {
    handlebars.registerHelper(name, helper)
    knownHelpers[name] = true
  }
  const compileNative = handlebars.compile
  handlebars.compile = (template: string) => {
    return compileNative(template, {
      noEscape: true,
      knownHelpersOnly: true,
      knownHelpers,
    })
  }
  const precompileNative = handlebars.precompile
  handlebars.precompile = (template: string) => {
    return precompileNative(template, {
      noEscape: true,
      knownHelpersOnly: true,
      knownHelpers,
    })
  }
}

export const makeHtmlHandlebars = () => {
  const handlebars = Handlebars.create()
  const compileNative = handlebars.compile
  handlebars.compile = (template: string) => {
    return compileNative(template, {
      knownHelpersOnly: true,
    })
  }
  const precompileNative = handlebars.precompile
  handlebars.precompile = (template: string) => {
    return precompileNative(template, {
      knownHelpersOnly: true,
    })
  }
}

export const makeHtmlHandlebarsWithHelpers = (helpers: Record<string, Handlebars.HelperDelegate>) => {
  const handlebars = Handlebars.create()
  const knownHelpers = {}
  for (const [name, helper] of Object.entries(helpers)) {
    handlebars.registerHelper(name, helper)
    knownHelpers[name] = true
  }
  const compileNative = handlebars.compile
  handlebars.compile = (template: string) => {
    return compileNative(template, {
      knownHelpersOnly: true,
      knownHelpers,
    })
  }
  const precompileNative = handlebars.precompile
  handlebars.precompile = (template: string) => {
    return precompileNative(template, {
      knownHelpersOnly: true,
      knownHelpers,
    })
  }
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
