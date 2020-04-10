class Obj {

    public without<T, K extends keyof T>(
        obj: T, keys: K[],
    ): Omit<T, keyof { [k in K]: any }> {
        const newObject: T = { ...obj };

        for (const key of keys) {
            delete newObject[key];
        }

        return newObject;
    }

    public withoutUndefined<T>(obj: T): T {
        return this.flattenEntries(
            Object
                .entries(obj)
                .filter(([_, value]) => value !== undefined),
        );
    }

    public flattenEntries<T = any>(entries: [string, any][], target?: T): T {
        return entries.reduce((flattened: any, [key, value]) => {
            flattened[key] = value;

            return flattened;
        }, target || {} as T);
    }

}

export default new Obj();
