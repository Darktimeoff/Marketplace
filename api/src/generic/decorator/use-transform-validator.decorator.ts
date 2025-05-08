import { UseInterceptors, applyDecorators } from '@nestjs/common'
import { SerializeValidateInterceptor } from '@/generic/interceptor/transform-validate-interceptor.interceptor'
import type { ClassConstructor } from 'class-transformer'

export function UseSerializeValidator<T>(dto: ClassConstructor<T>) {
    return applyDecorators(UseInterceptors(new SerializeValidateInterceptor<T>(dto)))
}
