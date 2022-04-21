export type ValueOf<T> = T[keyof T]

export type ValueOfArray<
  T extends ReadonlyArray<unknown>
> = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never
