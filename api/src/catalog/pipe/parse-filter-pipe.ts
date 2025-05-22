import { Injectable } from '@nestjs/common'
import { BadRequestException, PipeTransform } from '@nestjs/common'
import { isNotEmptyString } from '@rnw-community/shared'
import { FilterInputInterface, FilterValuesRangeType, FilterValuesSelectType } from 'contracts'

@Injectable()
export class ParseFilterPipe implements PipeTransform<string, FilterInputInterface[]> {
    transform(value: string): FilterInputInterface[] {
        if (!isNotEmptyString(value)) {
            return []
        }

        return value.split(';').map(pair => {
            const [slug, raw] = pair.split(':')
            if (!slug || !raw) {
                throw new BadRequestException('Invalid filter format')
            }

            if (/^-?\\d+(\\.\\d+)?-to--?\\d+(\\.\\d+)?$/.test(raw) || raw.includes('-to-')) {
                const [min, max] = raw.split('-to-').map(Number)
                if (isNaN(min) || isNaN(max)) {
                    throw new BadRequestException('Invalid range filter value')
                }
                return { slug, values: { min, max } as FilterValuesRangeType }
            }

            if (raw.includes(',')) {
                const arr = raw.split(',').map(v => v.trim())

                if (arr.some(v => isNaN(Number(v)))) {
                    throw new BadRequestException('Invalid filter format')
                }

                return {
                    slug,
                    values: arr.map(Number),
                }
            }

            if (isNaN(Number(raw))) {
                throw new BadRequestException('Invalid single value format')
            }

            return { slug, values: [Number(raw)] as FilterValuesSelectType }
        })
    }
}
