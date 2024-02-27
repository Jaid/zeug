export const defaultDynamicPredicate = key => {
    if (typeof key !== `string`) {
        return false;
    }
    return key.endsWith(`.map`);
};
export const defaultKeyMapper = (key, isDynamic) => {
    if (typeof key !== `string`) {
        return key;
    }
    if (isDynamic) {
        return key.slice(0, -4);
    }
    return key;
};
export const expandMaps = (input, dynamicPredicate = defaultDynamicPredicate, keyMapper = defaultKeyMapper) => {
    const keys = {};
    for (const [key, value] of Object.entries(input)) {
        const currentKey = key;
        const meta = {
            isActuallyDynamic: false,
            isDynamic: dynamicPredicate(key, value),
        };
        if (meta.isDynamic) {
            if (!Array.isArray(value)) {
                meta.value = value;
            }
            else if (value.length === 0) {
                continue;
            }
            else if (value.length === 1) {
                meta.value = value[0];
            }
            else {
                meta.isActuallyDynamic = true;
            }
        }
        else {
            meta.value = value;
        }
        keys[currentKey] = meta;
    }
    const dynamicKeys = Object.keys(keys).filter(key => keys[key].isActuallyDynamic);
    if (!dynamicKeys.length) {
        return [input];
    }
    const combinations = dynamicKeys.reduce((accumulator, key) => {
        const currentArray = input[key];
        return accumulator.flatMap(accumulatorElement => {
            return currentArray.map(currentArrayElement => {
                return [...accumulatorElement, currentArrayElement];
            });
        });
    }, [[]]);
    const output = combinations.map(combination => {
        const result = {};
        for (const key of Object.keys(keys)) {
            const keyMeta = keys[key];
            const normalizedKey = keyMapper(key, keyMeta.isDynamic, keyMeta.isActuallyDynamic);
            const value = keyMeta.isActuallyDynamic ? combination[dynamicKeys.indexOf(key)] : keyMeta.value;
            result[normalizedKey] = value;
        }
        return result;
    });
    return output;
};
