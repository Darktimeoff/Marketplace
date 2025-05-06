import { UseInterceptors, applyDecorators } from '@nestjs/common'
import { TransformValidateInterceptor } from '@/generic/interceptor/transform-validate-interceptor.interceptor'
import type { ClassConstructor } from 'class-transformer'

export function UseTransformValidator<T>(dto: ClassConstructor<T>) {
    return applyDecorators(UseInterceptors(new TransformValidateInterceptor<T>(dto)))
}
