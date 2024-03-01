type FormatHandler = (msFormatted: string, msRaw: number) => string;
type Options = {
    /**
     * The number of fraction digits to use when formatting the time in milliseconds.
     * @default 2
     */
    fractionDigits?: number;
    /**
     * A function to call with the formatted time in milliseconds and the raw time in milliseconds.
     * @default (msFormatted, msRaw) => console.log(`${propertyKey} took ${msFormatted} ms`)
     */
    log?: FormatHandler | string | null;
};
export declare function logExecutionTime<T extends (...args: any) => any>(options?: Options): (target: any, propertyKey: string | Symbol, descriptor: PropertyDescriptor) => void;
export {};
