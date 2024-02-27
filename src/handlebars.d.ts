import Handlebars from 'handlebars';
export declare const makeHandlebars: () => typeof Handlebars;
export declare const makeHandlebarsRenderer: (template: string) => HandlebarsTemplateDelegate<any>;
export declare const renderHandlebars: (template: string, context: Record<string, unknown>) => string;
export declare const makeHtmlHandlebarsRenderer: (template: string) => HandlebarsTemplateDelegate<any>;
export declare const renderHtmlHandlebars: (template: string, context: Record<string, unknown>) => string;
