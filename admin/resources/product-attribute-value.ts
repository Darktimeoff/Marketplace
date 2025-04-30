import { AdminForthDataTypes } from 'adminforth';

export default {
    dataSource: 'maindb',
    table: 'ProductAttributeValue',
    resourceId: 'ProductAttributeValue', 
    label: 'Product Attribute Value',
    recordLabel: (r: any) => `🏷️ ${r.attributeId}: ${r.textValueId} ${r.numberValue}`,
    columns: [
        {
            name: 'attributeId',
            primaryKey: true,
            type: AdminForthDataTypes.INTEGER,
            required: true,
            foreignResource: {
                resourceId: 'Attribute',
            }
        },
        {
            name: 'productId',
            type: AdminForthDataTypes.INTEGER,
            required: true,
            foreignResource: {
                resourceId: 'Product',
            }
        },
        {
            name: 'order',
            primaryKey: true,
            type: AdminForthDataTypes.INTEGER,
            required: true,
            defaultValue: 0
        },
        {
            name: 'numberValue',
            type: AdminForthDataTypes.DECIMAL,
        },
        {
            name: 'textValueId',
            type: AdminForthDataTypes.INTEGER,
            foreignResource: {
                resourceId: 'Translation',
            }
        },
        {
            name: 'createdAt',
            type: AdminForthDataTypes.DATETIME,
            showIn: { create: false },
            fillOnCreate: () => (new Date()).toISOString(),
        },
        {
            name: 'updatedAt',
            type: AdminForthDataTypes.DATETIME,
            showIn: { create: false },
            fillOnCreate: () => (new Date()).toISOString(),
        },
        {
            name: 'deletedAt',
            type: AdminForthDataTypes.DATETIME,
            showIn: { create: false },
        },
    ]
} 