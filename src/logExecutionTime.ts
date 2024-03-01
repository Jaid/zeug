type FormatHandler = (msFormatted: string, msRaw: number) => string
type Options = {
  /**
   * The number of fraction digits to use when formatting the time in milliseconds.
   * @default 2
   */
  fractionDigits?: number
  /**
   * A function to call with the formatted time in milliseconds and the raw time in milliseconds.
   * @default (msFormatted, msRaw) => console.log(`${propertyKey} took ${msFormatted} ms`)
   */
  log?: FormatHandler | string | null
}

export function logExecutionTime<T extends (...args: any) => any>(options: Options = {}) {
  return (target: any, propertyKey: string | Symbol, descriptor: PropertyDescriptor) => {
    if (options.log === null) {
      return
    }
    const log = options.log
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
      if (log !== undefined) {
        if (typeof log === `string`) {
          const message = log
            .replaceAll(`{propertyKey}`, `${propertyKey}`)
            .replaceAll(`{msFormatted}`, msFormatted)
            .replaceAll(`{msRaw}`, `${msNeeded}`)
          console.log(message)
        } else {
          log(msFormatted, msNeeded)
        }
      } else {
        console.log(`${propertyKey} took ${msFormatted} ms`)
      }
      return result
    }
  }
}
