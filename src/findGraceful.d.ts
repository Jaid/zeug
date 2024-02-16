export type SearchResolver<T> = ((entry: T, index: number) => string);
export declare function findGracefulIndex(needle: string, haystack: string[]): number | undefined;
export declare function findGracefulIndex(needle: string, haystack: Record<string, unknown>[], searchResolver: string): number | undefined;
export declare function findGracefulIndex<HaystackEntryGeneric>(needle: string, haystack: HaystackEntryGeneric[], searchResolver: SearchResolver<HaystackEntryGeneric>): number | undefined;
export declare function findGraceful(needle: string, haystack: string[], searchResolver?: SearchResolver<string>): string | undefined;
export declare function findGraceful<HaystackEntryGeneric extends Record<string, unknown>>(needle: string, haystack: HaystackEntryGeneric[], searchResolver: string): HaystackEntryGeneric | undefined;
export declare function findGraceful<HaystackEntryGeneric>(needle: string, haystack: HaystackEntryGeneric[], searchResolver: SearchResolver<HaystackEntryGeneric>): HaystackEntryGeneric | undefined;
