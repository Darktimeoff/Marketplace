import ForeignInlineListPlugin from '@adminforth/foreign-inline-list/index.ts';
import { AdminForthDataTypes } from 'adminforth';

export default {
    dataSource: 'maindb',
    table: 'AttributeGroup',
    resourceId: 'AttributeGroup', 
    label: 'Attribute Group',
    recordLabel: (r: any) => `📋 ${r.id}`,
    plugins: [
        new ForeignInlineListPlugin({
            foreignResourceId: 'Attribute',
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