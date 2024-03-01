type LogHandler = (msFormatted: string, msRaw: number) => Promise<void> | void;
type Options = {
    /**
     * The number of fraction digits to use when formatting the time in milliseconds.
     * @default 2
     */
    fractionDigits?: number;
    /**
     * A function to call with the formatted time in milliseconds and the raw time in milliseconds.
     * @default (message: string) => console.log(message)
     */
    log?: LogHandler | null;
    /**
     * A template to use when formatting the time in milliseconds. The placeholders `{function}`, `{ms}` and `{msRaw}` will be resolved.
     * @default '{function} took {ms} ms'
     */
    message?: string;
};
export declare function logExecutionTime<T extends (...args: any) => any>(options?: Options): (target: any, propertyKey: string | Symbol, descriptor: PropertyDescriptor) => void;
export {};
