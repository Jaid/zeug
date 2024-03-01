type Options = {
    fractionDigits?: number;
    log?: (msFormatted: string, msRaw: number) => void;
};
export declare function withTimer<T extends (...args: any) => any>(options?: Options): (target: any, propertyKey: string | Symbol, descriptor: PropertyDescriptor) => void;
export {};
