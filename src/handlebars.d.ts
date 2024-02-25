import Handlebars from 'handlebars';
export declare const makeHandlebars: () => typeof Handlebars;
export declare const resolveTemplate: (template: string, context: Record<string, unknown>) => string;
export declare const resolveHtmlTemplate: (template: string, context: Record<string, unknown>) => string;
