export type EntityToModel<T> = T extends (infer U)[]
    ? EntityToModel<U>[]
    : T extends object
      ? {
            [K in keyof T as K extends 'createdAt' | 'updatedAt' | 'deletedAt'
                ? never
                : K]: EntityToModel<T[K]>
        }
      : T
