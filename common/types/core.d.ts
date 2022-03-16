export declare type ValueOf<T> = T[keyof T];
export declare type ValueOfArray<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType> ? ElementType : never;
