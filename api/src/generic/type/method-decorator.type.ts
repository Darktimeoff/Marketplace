import type { DecoratedMethodType } from '@/generic/type/decorated-method.type'

export type MethodDecoratorType<TResult, TArgs extends unknown[]> = (
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<DecoratedMethodType<TResult, TArgs>>
) => void | TypedPropertyDescriptor<DecoratedMethodType<TResult, TArgs>>
