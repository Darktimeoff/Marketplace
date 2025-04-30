import ForeignInlineListPlugin from '@adminforth/foreign-inline-list/index.ts';
import { AdminForthDataTypes } from 'adminforth';

export default {
    dataSource: 'maindb',
    table: 'Attribute',
    resourceId: 'Attribute', 
    label: 'Attribute',
    recordLabel: (r: any) => `🏡 ${r.slug}`,
    plugins: [
        new ForeignInlineListPlugin({
          foreignResourceId: 'ProductAttributeValue',
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
            name: 'slug',
            type: AdminForthDataTypes.STRING,
            required: true,
        },
        {
            name: 'nameId',
            type: AdminForthDataTypes.INTEGER,
            required: true,
            isUnique: true,
            showIn: {
                create: false,
            },
            foreignResource: {
                resourceId: 'Translation',
            },
        },
        {
            name: 'order',
            type: AdminForthDataTypes.INTEGER,
            required: true,
            defaultValue: 0,
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