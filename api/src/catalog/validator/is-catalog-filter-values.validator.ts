import { ValidationOptions, registerDecorator, validateSync } from 'class-validator'
import { CatalogFilterValuesSelectDto } from '@/catalog/dto/catalog-filter-values-select.dto'
import { CatalogFilterValuesRangeDto } from '@/catalog/dto/catalog-filter-values-range.dto'

export function IsCatalogFilterValues(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isCatalogFilterValues',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: unknown) {
                    if (Array.isArray(value)) {
                        return value.every((item: unknown) => {
                            const instance = Object.assign(new CatalogFilterValuesSelectDto(), item)
                            const errors = validateSync(instance)
                            return errors.length === 0
                        })
                    }

                    if (value && typeof value === 'object') {
                        const instance = Object.assign(new CatalogFilterValuesRangeDto(), value)
                        const errors = validateSync(instance)
                        return errors.length === 0
                    }

                    return false
                },
                defaultMessage() {
                    return 'Значение должно быть либо массивом CatalogFilterValuesSelectDto, либо объектом CatalogFilterValuesRangeDto'
                },
            },
        })
    }
}
