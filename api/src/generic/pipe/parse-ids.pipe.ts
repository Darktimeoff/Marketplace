import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { isNotEmptyString, isPositiveNumber } from '@rnw-community/shared'

@Injectable()
export class ParseIdsPipe implements PipeTransform<string, number[]> {
    transform(value: unknown): number[] {
        if (!isNotEmptyString(value)) {
            throw new BadRequestException('ids must be a comma-separated string of numbers')
        }
        const ids = value.split(',').map(id => Number(id.trim()))
        if (ids.some(id => !isPositiveNumber(id))) {
            throw new BadRequestException('ids must be a comma-separated string of numbers')
        }
        return ids
    }
}
