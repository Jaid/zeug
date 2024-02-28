import Handlebars from 'handlebars';
export const makeHandlebars = () => {
    const handlebars = Handlebars.create();
    const compileNative = handlebars.compile;
    handlebars.compile = (template) => {
        return compileNative(template, {
            noEscape: true,
            knownHelpersOnly: true,
        });
    };
    const precompileNative = handlebars.precompile;
    handlebars.precompile = (template) => {
        return precompileNative(template, {
            noEscape: true,
            knownHelpersOnly: true,
        });
    };
};
export const makeHandlebarsWithHelpers = (helpers) => {
    const handlebars = Handlebars.create();
    const knownHelpers = {};
    for (const [name, helper] of Object.entries(helpers)) {
        handlebars.registerHelper(name, helper);
        knownHelpers[name] = true;
    }
    const compileNative = handlebars.compile;
    handlebars.compile = (template) => {
        return compileNative(template, {
            noEscape: true,
            knownHelpersOnly: true,
            knownHelpers,
        });
    };
    const precompileNative = handlebars.precompile;
    handlebars.precompile = (template) => {
        return precompileNative(template, {
            noEscape: true,
            knownHelpersOnly: true,
            knownHelpers,
        });
    };
};
export const makeHtmlHandlebars = () => {
    const handlebars = Handlebars.create();
    const compileNative = handlebars.compile;
    handlebars.compile = (template) => {
        return compileNative(template, {
            knownHelpersOnly: true,
        });
    };
    const precompileNative = handlebars.precompile;
    handlebars.precompile = (template) => {
        return precompileNative(template, {
            knownHelpersOnly: true,
        });
    };
};
export const makeHtmlHandlebarsWithHelpers = (helpers) => {
    const handlebars = Handlebars.create();
    const knownHelpers = {};
    for (const [name, helper] of Object.entries(helpers)) {
        handlebars.registerHelper(name, helper);
        knownHelpers[name] = true;
    }
    const compileNative = handlebars.compile;
    handlebars.compile = (template) => {
        return compileNative(template, {
            knownHelpersOnly: true,
            knownHelpers,
        });
    };
    const precompileNative = handlebars.precompile;
    handlebars.precompile = (template) => {
        return precompileNative(template, {
            knownHelpersOnly: true,
            knownHelpers,
        });
    };
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
