export type DecoratedMethodType<TResult, TArgs extends unknown[]> = (
    ...args: TArgs
) => Promise<TResult>
