export function logExecutionTime(options = {}) {
    return (target, propertyKey, descriptor) => {
        if (options.log === null) {
            return;
        }
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            const start = performance.now();
            const result = await originalMethod.apply(this, args);
            const end = performance.now();
            const msNeeded = end - start;
            const fractionDigits = options.fractionDigits ?? 2;
            let msFormatted;
            if (fractionDigits === 0) {
                msFormatted = `${Math.trunc(msNeeded)}`;
                if (msFormatted === `0`) {
                    msFormatted = `1`;
                }
            }
            else {
                msFormatted = msNeeded.toFixed(fractionDigits);
            }
            let messageResolved;
            if (options.message !== undefined) {
                messageResolved = options.message
                    .replace(`{function}`, `${propertyKey}`)
                    .replace(`{ms}`, msFormatted)
                    .replace(`{msRaw}`, `${msNeeded}`);
            }
            else {
                messageResolved = `${propertyKey} took ${msFormatted} ms`;
            }
            if (options.log !== undefined) {
                // @ts-expect-error: It says options.log can be null, which is not true
                await options.log(messageResolved);
            }
            else {
                console.log(messageResolved);
            }
            return result;
        };
    };
}
