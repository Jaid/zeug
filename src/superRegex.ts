import type {Match} from 'super-regex'
import type {OverrideProperties, Simplify} from 'type-fest'

import {firstMatch, matches} from 'super-regex'

export type MatchFromObject<T extends Record<string, string>> = OverrideProperties<Match, {
  namedGroups: T
}>

export type MatchFromKeys<T extends Record<string, string> | string> = MatchFromObject<Record<T extends string ? T : keyof T, string>>

const defaultOptions: Parameters<typeof matches>[2] = {
  matchTimeout: 10_000,
  timeout: 60_000,
}
const defaultSingleOptions: Parameters<typeof firstMatch>[2] = {
  timeout: 60_000,
}

export const findNamedGroups = <T extends Record<string, string> | string>(string: string, regex: RegExp, matchOptions = defaultOptions) => {
  const result = <MatchFromKeys<T>> <unknown> matches(regex, string, matchOptions)
  return result.namedGroups
}

export const findNamedGroupsSingle = <T extends Record<string, string> | string>(string: string, regex: RegExp, matchOptions = defaultSingleOptions) => {
  const result = <MatchFromKeys<T>> <unknown> firstMatch(regex, string, matchOptions)
  return result.namedGroups
}
