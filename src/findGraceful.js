const makeCompact = (key) => {
    return key.replaceAll(/\W/g, ``);
};
export function findGracefulIndex(needle, haystack, searchResolver) {
    const resolvedKeys = [];
    let resolvedSearchResolver;
    if (searchResolver === undefined) {
        resolvedSearchResolver = (entry) => entry;
    }
    else if (typeof searchResolver === `string`) {
        resolvedSearchResolver = (entry) => entry[searchResolver];
    }
    else {
        resolvedSearchResolver = searchResolver;
    }
    for (const [index, entry] of haystack.entries()) {
        const resolvedKey = resolvedSearchResolver(entry, index);
        if (resolvedKey === needle) {
            return index;
        }
        resolvedKeys.push(resolvedKey);
    }
    const resolvedKeysLowercase = resolvedKeys.map(resolvedKey => resolvedKey.toLowerCase());
    const lowercasedNeedle = needle.toLowerCase();
    const index = resolvedKeysLowercase.indexOf(lowercasedNeedle);
    if (index !== -1) {
        return index;
    }
    const compactNeedle = makeCompact(lowercasedNeedle);
    const gracefulIndex = resolvedKeysLowercase.findIndex(resolvedKey => makeCompact(resolvedKey) === compactNeedle);
    if (gracefulIndex !== -1) {
        return gracefulIndex;
    }
}
export function findGraceful(needle, haystack, searchResolver) {
    const resolvedKeys = [];
    let resolvedSearchResolver;
    if (searchResolver === undefined) {
        resolvedSearchResolver = (entry) => entry;
    }
    else if (typeof searchResolver === `string`) {
        resolvedSearchResolver = (entry) => entry[searchResolver];
    }
    else {
        resolvedSearchResolver = searchResolver;
    }
    for (const [index, entry] of haystack.entries()) {
        const resolvedKey = resolvedSearchResolver(entry, index);
        if (resolvedKey === needle) {
            return entry;
        }
        resolvedKeys.push(resolvedKey);
    }
    const resolvedKeysLowercase = resolvedKeys.map(resolvedKey => resolvedKey.toLowerCase());
    const lowercasedNeedle = needle.toLowerCase();
    const index = resolvedKeysLowercase.indexOf(lowercasedNeedle);
    if (index !== -1) {
        return haystack[index];
    }
    const compactNeedle = makeCompact(lowercasedNeedle);
    const gracefulIndex = resolvedKeysLowercase.findIndex(resolvedKey => makeCompact(resolvedKey) === compactNeedle);
    if (gracefulIndex !== -1) {
        return haystack[gracefulIndex];
    }
}
