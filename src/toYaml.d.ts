import yaml from 'yaml';
export type StringifyYamlOptions = yaml.DocumentOptions & yaml.SchemaOptions & yaml.ParseOptions & yaml.CreateNodeOptions & yaml.ToStringOptions;
export type YamlInput = Parameters<typeof yaml.stringify>[0];
export declare const defaultYamlOptions: StringifyYamlOptions;
export declare const defaultCompactYamlOptions: StringifyYamlOptions;
export declare const stringifyYaml: (input: YamlInput, options?: StringifyYamlOptions) => string;
export declare const stringifyCompactYaml: (input: YamlInput) => string;
export declare const makeYamlFile: (file: string, input: YamlInput, options?: StringifyYamlOptions) => Promise<void>;
export declare const makeCompactYamlFile: (file: string, input: YamlInput) => Promise<void>;
