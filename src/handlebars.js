import Handlebars from 'handlebars';
const defaultCompileOptions = {
    noEscape: true,
    knownHelpersOnly: true,
};
const defaultHtmlCompileOptions = {
    knownHelpersOnly: true,
};
export const makeHandlebars = (compileOptions = defaultCompileOptions) => {
    const handlebars = Handlebars.create();
    const compileNative = handlebars.compile;
    handlebars.compile = function (template, options) {
        return compileNative(template, {
            ...compileOptions,
            ...options,
        });
    };
    const precompileNative = handlebars.precompile;
    handlebars.precompile = function (template, options) {
        return precompileNative(template, {
            ...compileOptions,
            ...options,
        });
    };
    return handlebars;
};
export const makeHandlebarsWithHelpers = (helpers, compileOptions = defaultCompileOptions) => {
    const knownHelpers = Object.fromEntries(Object.keys(helpers).map(key => [key, true]));
    const handlebars = makeHandlebars({
        ...compileOptions,
        knownHelpers,
    });
    for (const [key, value] of Object.entries(helpers)) {
        handlebars.registerHelper(key, value);
    }
    return handlebars;
};
export const makeHtmlHandlebars = (compileOptions = defaultHtmlCompileOptions) => {
    return makeHandlebars(compileOptions);
};
export const makeHtmlHandlebarsWithHelpers = (helpers, compileOptions = defaultHtmlCompileOptions) => {
    return makeHandlebarsWithHelpers(helpers, compileOptions);
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
