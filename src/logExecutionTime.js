export function logExecutionTime(options = {}) {
    return (target, propertyKey, descriptor) => {
        if (options.log === null) {
            return;
        }
        const log = options.log;
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
            if (log !== undefined) {
                if (typeof log === `string`) {
                    const message = log
                        .replaceAll(`{propertyKey}`, `${propertyKey}`)
                        .replaceAll(`{msFormatted}`, msFormatted)
                        .replaceAll(`{msRaw}`, `${msNeeded}`);
                    console.log(message);
                }
                else {
                    log(msFormatted, msNeeded);
                }
            }
            else {
                console.log(`${propertyKey} took ${msFormatted} ms`);
            }
            return result;
        };
    };
}
