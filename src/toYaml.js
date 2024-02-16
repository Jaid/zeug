import fs from 'fs-extra';
import yaml from 'yaml';
export const defaultYamlOptions = {
    lineWidth: 0,
    minContentWidth: 0,
    nullStr: `~`,
    schema: `core`,
    singleQuote: true,
};
export const defaultCompactYamlOptions = {
    ...defaultYamlOptions,
    indent: 1,
};
export const stringifyYaml = (input, options = defaultYamlOptions) => yaml.stringify(input, undefined, options);
export const stringifyCompactYaml = (input) => yaml.stringify(input, undefined, defaultCompactYamlOptions);
export const makeYamlFile = async (file, input, options) => {
    await fs.outputFile(file, stringifyYaml(input, options));
};
export const makeCompactYamlFile = async (file, input) => {
    await makeYamlFile(file, input, defaultCompactYamlOptions);
};
