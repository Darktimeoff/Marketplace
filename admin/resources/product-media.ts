import { AdminForthDataTypes } from 'adminforth';

export default {
    dataSource: 'maindb',
    table: 'ProductMedia',
    resourceId: 'ProductMedia', 
    label: 'Product Media',
    recordLabel: (r: any) => `🖼️ ${r.productId}-${r.mediaId}`,
    columns: [
        {
            name: 'productId',
            primaryKey: true,
            type: AdminForthDataTypes.INTEGER,
            required: true,
            foreignResource: {
                resourceId: 'Product',
            }
        },
        {
            name: 'mediaId',
            primaryKey: true,
            type: AdminForthDataTypes.INTEGER,
            required: true,
            foreignResource: {
                resourceId: 'Media',
            }
        },
        {
            name: 'order',
            type: AdminForthDataTypes.INTEGER,
            required: true,
            defaultValue: 0
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