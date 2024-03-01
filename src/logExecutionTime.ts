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
    const originalMethod = descriptor.value as T
    descriptor.value = async function (...args: Parameters<T>) {
      const start = performance.now()
      const result = await originalMethod.apply(this, args) as ReturnType<T>
      const end = performance.now()
      const msNeeded = end - start
      const fractionDigits = options.fractionDigits ?? 2
      let msFormatted: string
      if (fractionDigits === 0) {
        msFormatted = `${Math.trunc(msNeeded)}`
        if (msFormatted === `0`) {
          msFormatted = `1`
        }
      } else {
        msFormatted = msNeeded.toFixed(fractionDigits)
      }
      let messageResolved: string
      if (options.message !== undefined) {
        messageResolved = options.message
          .replace(`{function}`, `${propertyKey}`)
          .replace(`{ms}`, msFormatted)
          .replace(`{msRaw}`, `${msNeeded}`)
      } else {
        messageResolved = `${propertyKey} took ${msFormatted} ms`
      }
      if (options.log !== undefined) {
        // @ts-expect-error: It says options.log can be null, which is not true
        await options.log(messageResolved)
      } else {
        console.log(messageResolved)
      }
      return result
    }
    return descriptor
  }
}
