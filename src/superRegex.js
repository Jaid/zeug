import { firstMatch, matches } from 'super-regex';
const defaultOptions = {
    matchTimeout: 10000,
    timeout: 60000,
};
const defaultSingleOptions = {
    timeout: 60000,
};
export const findNamedGroups = (string, regex, matchOptions = defaultOptions) => {
    const result = matches(regex, string, matchOptions);
    return result.namedGroups;
};
export const findNamedGroupsSingle = (string, regex, matchOptions = defaultSingleOptions) => {
    const result = firstMatch(regex, string, matchOptions);
    return result.namedGroups;
};
