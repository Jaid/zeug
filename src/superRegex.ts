import type {Match} from 'super-regex'
import type {OverrideProperties} from 'type-fest'

import {firstMatch, matches} from 'super-regex'

export type MatchFromObject<T extends Record<string, string>> = OverrideProperties<Match, {
  namedGroups: T
}>

export type MatchFromKeys<T extends Record<string, string> | string> = MatchFromObject<Record<T extends string ? T : keyof T, string>>

const defaultOptions: Parameters<typeof matches>[2] = {
  matchTimeout: 60_000,
  timeout: 600_000,
}
const defaultSingleOptions: Parameters<typeof firstMatch>[2] = {
  timeout: 600_000,
}

export const findNamedGroups = <T extends Record<string, string> | string>(string: string, regex: RegExp, matchOptions = defaultOptions) => {
  const result = matches(regex, string, matchOptions) as Iterable<MatchFromKeys<T>>
  const mapped = Array.from(result, match => match.namedGroups)
  return mapped
}

export const findNamedGroupsSingle = <T extends Record<string, string> | string>(string: string, regex: RegExp, matchOptions = defaultSingleOptions) => {
  const result = firstMatch(regex, string, matchOptions) as MatchFromKeys<T>
  return result.namedGroups
}

export const findNamedGroup = (string: string, regex: RegExp, groupName: string, matchOptions = defaultSingleOptions) => {
  const result = firstMatch(regex, string, matchOptions)
  return result?.namedGroups[groupName]
}

export const findNamedGroupGlobal = (string: string, regex: RegExp, groupName: string, matchOptions = defaultOptions) => {
  const result = matches(regex, string, matchOptions)
  const groupMatches = Array.from(result, match => match.namedGroups[groupName])
  return groupMatches
}

export const findGroup = (string: string, regex: RegExp, groupIndex = 0, matchOptions = defaultSingleOptions) => {
  const result = firstMatch(regex, string, matchOptions)
  return result?.groups[groupIndex]
}

export const findGroupGlobal = (string: string, regex: RegExp, groupIndex = 0, matchOptions = defaultOptions) => {
  const result = matches(regex, string, matchOptions)
  const groupMatches = Array.from(result, match => match.groups[groupIndex])
  return groupMatches
}
