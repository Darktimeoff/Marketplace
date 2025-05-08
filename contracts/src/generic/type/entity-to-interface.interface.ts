export type EntityToInterface<T> = T extends (infer U)[]
    ? EntityToInterface<U>[]
    : T extends object
      ? {
            [K in keyof T as K extends 'createdAt' | 'updatedAt' | 'deletedAt'
                ? never
                : K]: EntityToInterface<T[K]>
        }
      : T
