type Options = {
    log?: (ms: number) => void;
};
export declare function WithTimer<T extends (...args: any) => any>(options?: Options): (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => void;
export {};
