import debug from 'debug'

export const makeDebug = (subName?: string) => {
  const mainPackageName = process.env.npm_package_name
  if (mainPackageName === undefined) {
    throw new Error(`Cannot find package name in env var “npm_package_name”`)
  }
  if (subName === undefined) {
    return debug(mainPackageName)
  }
  return debug(`${mainPackageName}:${subName}`)
}
