import fs from 'fs-extra'
import yaml from 'yaml'

export type StringifyYamlOptions = yaml.DocumentOptions & yaml.SchemaOptions & yaml.ParseOptions & yaml.CreateNodeOptions & yaml.ToStringOptions

export type YamlInput = Parameters<typeof yaml.stringify>[0]

export const defaultYamlOptions: StringifyYamlOptions = {
  lineWidth: 0,
  minContentWidth: 0,
  nullStr: `~`,
  schema: `core`,
  singleQuote: true,
}

export const defaultCompactYamlOptions: StringifyYamlOptions = {
  ...defaultYamlOptions,
  indent: 1,
}

export const stringifyYaml = (input: YamlInput, options: StringifyYamlOptions = defaultYamlOptions) => yaml.stringify(input, undefined, options)

export const stringifyCompactYaml = (input: YamlInput) => yaml.stringify(input, undefined, defaultCompactYamlOptions)

export const makeYamlFile = async (file: string, input: YamlInput, options?: StringifyYamlOptions) => {
  await fs.outputFile(file, stringifyYaml(input, options))
}

export const makeCompactYamlFile = async (file: string, input: YamlInput) => {
  await makeYamlFile(file, input, defaultCompactYamlOptions)
}
