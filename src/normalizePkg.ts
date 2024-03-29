import type {PackageJson} from 'type-fest'

import * as immer from 'immer'
import normalizePackageData from 'normalize-package-data'

export const normalizePkg = (pkg: PackageJson) => {
  return immer.produce(pkg, draft => {
    normalizePackageData(draft)
    /* eslint-disable @typescript-eslint/prefer-ts-expect-error */
    // @ts-ignore ts(2615)
    return draft
  })
}
