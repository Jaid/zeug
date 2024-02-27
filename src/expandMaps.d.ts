type Key = number | string | symbol;
type DynamicPredicate = (key: Key, value: unknown) => boolean;
type KeyMapper = (key: Key, isDynamic: boolean, isActuallyDynamic: boolean) => Key;
export declare const defaultDynamicPredicate: DynamicPredicate;
export declare const defaultKeyMapper: (key: Key, isDynamic: boolean) => string | number | symbol;
export declare const expandMaps: <T extends Record<Key, unknown>>(input: T, dynamicPredicate?: DynamicPredicate, keyMapper?: KeyMapper) => T[];
export {};
