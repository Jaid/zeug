export function logExecutionTime(options = {}) {
    return (target, propertyKey, descriptor) => {
        if (options.log === null) {
            return descriptor;
        }
        const log = (ms) => {
            const fractionDigits = options.fractionDigits ?? 2;
            let msFormatted;
            if (fractionDigits === 0) {
                msFormatted = `${Math.trunc(ms)}`;
                if (msFormatted === `0`) {
                    msFormatted = `1`;
                }
            }
            else {
                msFormatted = ms.toFixed(fractionDigits);
            }
            let messageResolved;
            if (options.message !== undefined) {
                messageResolved = options.message
                    .replace(`{function}`, `${propertyKey}`)
                    .replace(`{ms}`, msFormatted)
                    .replace(`{msRaw}`, `${ms}`);
            }
            else {
                messageResolved = `${propertyKey} took ${msFormatted} ms`;
            }
            if (options.log !== undefined) {
                // @ts-expect-error: It says options.log can be null, which is not true
                options.log(messageResolved);
            }
            else {
                console.log(messageResolved);
            }
        };
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            const start = performance.now();
            const result = originalMethod.apply(this, args);
            const isPromise = result && typeof result.then === `function`;
            if (isPromise) {
                const asyncResult = result;
                return asyncResult.then(promiseResult => {
                    const end = performance.now();
                    const ms = end - start;
                    log(ms);
                    return promiseResult;
                });
            }
            else {
                const end = performance.now();
                const ms = end - start;
                log(ms);
                return result;
            }
        };
        return descriptor;
    };
}
