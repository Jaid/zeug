type LogHandler = (msFormatted: string, msRaw: number) => Promise<void> | void
type Options = {
  /**
   * The number of fraction digits to use when formatting the time in milliseconds.
   * @default 2
   */
  fractionDigits?: number
  /**
   * A function to call with the formatted time in milliseconds and the raw time in milliseconds.
   * @default (message: string) => console.log(message)
   */
  log?: LogHandler | null
  /**
   * A template to use when formatting the time in milliseconds. The placeholders `{function}`, `{ms}` and `{msRaw}` will be resolved.
   * @default '{function} took {ms} ms'
   */
  message?: string
}

export function logExecutionTime<T extends (...args: any) => any>(options: Options = {}) {
  return (target: any, propertyKey: string | Symbol, descriptor: PropertyDescriptor) => {
    if (options.log === null) {
      return descriptor
    }
    const log = (ms: number) => {
      const fractionDigits = options.fractionDigits ?? 2
      let msFormatted: string
      if (fractionDigits === 0) {
        msFormatted = `${Math.trunc(ms)}`
        if (msFormatted === `0`) {
          msFormatted = `1`
        }
      } else {
        msFormatted = ms.toFixed(fractionDigits)
      }
      let messageResolved: string
      if (options.message !== undefined) {
        messageResolved = options.message
          .replace(`{function}`, `${propertyKey}`)
          .replace(`{ms}`, msFormatted)
          .replace(`{msRaw}`, `${ms}`)
      } else {
        messageResolved = `${propertyKey} took ${msFormatted} ms`
      }
      if (options.log !== undefined) {
      // @ts-expect-error: It says options.log can be null, which is not true
        options.log(messageResolved)
      } else {
        console.log(messageResolved)
      }
    }
    const originalMethod = descriptor.value as T
    descriptor.value = function (...args: Parameters<T>) {
      const start = performance.now()
      const result = originalMethod.apply(this, args) as ReturnType<T>
      const isPromise = result && typeof result.then === `function`
      if (isPromise) {
        const asyncResult = result as Promise<ReturnType<T>>
        return asyncResult.then(promiseResult => {
          const end = performance.now()
          const ms = end - start
          log(ms)
          return promiseResult
        })
      } else {
        const end = performance.now()
        const ms = end - start
        log(ms)
        return result
      }
    }
    return descriptor
  }
}
