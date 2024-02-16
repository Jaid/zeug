import type { Match } from 'super-regex';
import type { OverrideProperties } from 'type-fest';
export type MatchFromObject<T extends Record<string, string>> = OverrideProperties<Match, {
    namedGroups: T;
}>;
export type MatchFromKeys<T extends Record<string, string> | string> = MatchFromObject<Record<T extends string ? T : keyof T, string>>;
export declare const findNamedGroups: <T extends string | Record<string, string>>(string: string, regex: RegExp, matchOptions?: import("super-regex").MatchesOptions) => Record<T extends string ? T : keyof T, string>;
export declare const findNamedGroupsSingle: <T extends string | Record<string, string>>(string: string, regex: RegExp, matchOptions?: import("function-timeout").Options) => Record<T extends string ? T : keyof T, string>;
