import ForeignInlineListPlugin from '@adminforth/foreign-inline-list/index.ts';
import { AdminForthDataTypes } from 'adminforth';

export default {
    dataSource: 'maindb',
    table: 'Category',
    resourceId: 'Category', 
    label: 'Category',
    recordLabel: (r: any) => `📁 ${r.slug}`,
    plugins: [
        new ForeignInlineListPlugin({
          foreignResourceId: 'Product',
        }),
        new ForeignInlineListPlugin({
            foreignResourceId: 'CategoryAttribute',
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
            name: 'nameId',
            type: AdminForthDataTypes.INTEGER,
            required: true,
            foreignResource: {
                resourceId: 'Translation',
            }
        },
        {
            name: 'slug',
            type: AdminForthDataTypes.STRING,
            required: true,
            isUnique: true
        },
        {
            name: 'parentCategoryId',
            type: AdminForthDataTypes.INTEGER,
            foreignResource: {
                resourceId: 'Category',
            }
        },
        {
            name: 'imageId',
            type: AdminForthDataTypes.INTEGER,
            foreignResource: {
                resourceId: 'Media',
            }
        },
        {
            name: 'path',
            type: AdminForthDataTypes.STRING,
            defaultValue: ""
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