import { AdminForthDataTypes } from 'adminforth';

export default {
    dataSource: 'maindb',
    table: 'CategoryAttribute',
    resourceId: 'CategoryAttribute', 
    label: 'Category Attribute',
    recordLabel: (r: any) => `🔖 ${r.categoryId}: ${r.attributeId}`,
    columns: [
        {
            name: 'categoryId',
            type: AdminForthDataTypes.INTEGER,
            required: true,
            foreignResource: {
                resourceId: 'Category',
            }
        },
        {
            name: 'attributeId',
            type: AdminForthDataTypes.INTEGER,
            required: true,
            foreignResource: {
                resourceId: 'Attribute',
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