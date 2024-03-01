type Options = {
  fractionDigits?: number
  log?: (msFormatted: string, msRaw: number) => void
}

export function withTimer<T extends (...args: any) => any>(options: Options = {}) {
  return (target: any, propertyKey: string | Symbol, descriptor: PropertyDescriptor) => {
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
      if (options.log !== undefined) {
        options.log(msFormatted, msNeeded)
      } else {
        console.log(`${propertyKey} took ${msFormatted} ms`)
      }
      return result
    }
  }
}
