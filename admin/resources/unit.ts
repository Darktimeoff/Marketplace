import ForeignInlineListPlugin from '@adminforth/foreign-inline-list/index.ts';
import { AdminForthDataTypes } from 'adminforth';

export default {
    dataSource: 'maindb',
    table: 'Unit',
    resourceId: 'Unit', 
    label: 'Unit',
    recordLabel: (r: any) => `🏡 ${r.uk_ua}`,
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
            name: 'type',
            label: "Type",
            type: AdminForthDataTypes.STRING,
            required: true,
            enum: [
                { value: "GB", label: "Гигабайт" },
                { value: "TB", label: "Терабайт" },
                { value: "Hz", label: "Герц" },
                { value: "MP", label: "Мегапикселей" },
                { value: "mAh", label: "Милиампер" },
                { value: "mm", label: "Милиметров" }
            ]
        },
        {
            name: 'uk_ua',
            label: "Ukrainian",
            type: AdminForthDataTypes.STRING,
            required: true
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