import fs from 'fs-extra'

import {toCleanYaml, toYaml} from '../toYaml'

export const toCleanYamlFile = async (input: unknown, file: string) => {
  const text = toCleanYaml(input)
  await fs.outputFile(file, text)
}

export const toYamlFile = async (input: unknown, file: string) => {
  const text = toYaml(input)
  await fs.outputFile(file, text)
}
