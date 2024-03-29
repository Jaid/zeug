import debug from 'debug'

const mainPackageName = process.env.npm_package_name
if (mainPackageName === undefined) {
  throw new Error(`Cannot find package name in env var “npm_package_name”`)
}
export const makeDebug = (subName?: string) => {
  if (subName === undefined) {
    return debug(mainPackageName)
  }
  return debug(`${mainPackageName}:${subName}`)
}
const defaultDebug = makeDebug(mainPackageName)
export {defaultDebug as debug}
