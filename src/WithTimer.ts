type Options = {
  log?: (ms: number) => void
}

export function WithTimer<T extends (...args: any) => any>(options?: Options) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value as T
    descriptor.value = async function (...args: Parameters<T>) {
      const start = performance.now()
      const result = await originalMethod.apply(this, args) as ReturnType<T>
      const end = performance.now()
      if (options?.log) {
        options.log(end - start)
      } else {
        console.log(`${_propertyKey} took ${end - start}ms`)
      }
      return result
    }
  }
}
