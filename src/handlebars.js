import Handlebars from 'handlebars';
export const makeHandlebars = () => {
    const handlebars = Handlebars.create();
    return handlebars;
};
export const makeHandlebarsRenderer = (template) => {
    const templateResolver = Handlebars.compile(template, {
        noEscape: true,
        knownHelpersOnly: true,
    });
    return templateResolver;
};
export const renderHandlebars = (template, context) => {
    const templateResolver = makeHandlebarsRenderer(template);
    return templateResolver(context);
};
export const makeHtmlHandlebarsRenderer = (template) => {
    const templateResolver = Handlebars.compile(template, {
        knownHelpersOnly: true,
    });
    return templateResolver;
};
export const renderHtmlHandlebars = (template, context) => {
    const templateResolver = makeHtmlHandlebarsRenderer(template);
    return templateResolver(context);
};
