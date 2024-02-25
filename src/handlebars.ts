import Handlebars from 'handlebars'

export const makeHandlebars = () => {
  const handlebars = Handlebars.create()
  return handlebars
}

export const resolveTemplate = (template: string, context: Record<string, unknown>) => {
  const handlebars = makeHandlebars()
  const resolvedTemplate = handlebars.compile(template, {
    noEscape: true,
  })
  return resolvedTemplate(context)
}

export const resolveHtmlTemplate = (template: string, context: Record<string, unknown>) => {
  const handlebars = makeHandlebars()
  const resolvedTemplate = handlebars.compile(template)
  return resolvedTemplate(context)
}
