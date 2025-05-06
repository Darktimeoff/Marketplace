import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, map } from 'rxjs'
import { type ClassConstructor, plainToInstance } from 'class-transformer'
import { validateOrReject } from 'class-validator'

@Injectable()
export class TransformValidateInterceptor<T> implements NestInterceptor {
    constructor(private dto: ClassConstructor<T>) {}

    async transformAndValidate(data: unknown): Promise<T | T[]> {
        const instances = plainToInstance(this.dto, data, {
            strategy: 'exposeAll',
        })

        const list = Array.isArray(data) ? (instances as T[]) : [instances]

        for (const item of list) {
            await validateOrReject(item as object)
        }

        return instances
    }

    intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map(data => this.transformAndValidate(data)))
    }
}
