export function logExecutionTime(options = {}) {
    return (target, propertyKey, descriptor) => {
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
            if (options.log !== undefined) {
                options.log(msFormatted, msNeeded);
            }
            else {
                console.log(`${propertyKey} took ${msFormatted} ms`);
            }
            return result;
        };
    };
}
