import {pathToFileURL} from 'node:url'

export const getMainModule = async <T>(defaultName?: string) => {
  const importPath = process.env.MAIN_MODULE ? pathToFileURL(process.env.MAIN_MODULE).toString() : process.env.npm_package_name ?? defaultName
  if (!importPath) {
    throw new Error(`Cannot find main module path, searched in env vars “MAIN_MODULE” and “npm_package_name”`)
  }
  const mainModule = await import(importPath) as T
  return mainModule
}
export const getMainModuleDefault = async <T extends {default: unknown}>(defaultName?: string) => {
  const mainModule = await getMainModule<T>(defaultName)
  return mainModule.default as T['default']
}
