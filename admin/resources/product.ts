import { AdminForthDataTypes } from 'adminforth';
import ForeignInlineListPlugin from '@adminforth/foreign-inline-list';

export default {
    dataSource: 'maindb',
    table: 'Product',
    resourceId: 'Product', 
    label: 'Product',
    recordLabel: (r: any) => `📦 ${r.slug}`,
    plugins: [
        new ForeignInlineListPlugin({
          foreignResourceId: 'ProductAttributeValue',
        }),
      ],
    columns: [
        {
            name: 'id',
            primaryKey: true,
            type: AdminForthDataTypes.INTEGER,
            showIn: {
                edit: false,
                create: false,
            },
        },
        {
            name: 'titleId',
            type: AdminForthDataTypes.INTEGER,
            required: true,
            foreignResource: {
                resourceId: 'Translation',
            }
        },
        {
            name: 'descriptionId',
            type: AdminForthDataTypes.INTEGER,
            foreignResource: {
                resourceId: 'Translation',
            }
        },
        {
            name: 'categoryId',
            type: AdminForthDataTypes.INTEGER,
            required: true,
            foreignResource: {
                resourceId: 'Category',
            }
        },
        {
            name: 'slug',
            type: AdminForthDataTypes.STRING,
            required: true,
            isUnique: true
        },
        {
            name: 'price',
            type: AdminForthDataTypes.DECIMAL,
            required: true,
        },
        {
            name: 'oldPrice',
            type: AdminForthDataTypes.DECIMAL,
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