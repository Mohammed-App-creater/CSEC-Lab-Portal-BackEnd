// utils/normalize.ts
export function normalizeUndefinedToNull<T extends Record<string, any>>(obj: T): T {
    const result: any = {};
    for (const key in obj) {
        result[key] = obj[key] === undefined ? null : obj[key];
    }
    return result as T;
}
