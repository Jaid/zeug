export function WithTimer(options) {
    return function (_target, _propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            const start = performance.now();
            const result = await originalMethod.apply(this, args);
            const end = performance.now();
            if (options?.log) {
                options.log(end - start);
            }
            else {
                console.log(`${_propertyKey} took ${end - start}ms`);
            }
            return result;
        };
    };
}
