import ForeignInlineListPlugin from '@adminforth/foreign-inline-list/index.ts';
import { AdminForthDataTypes } from 'adminforth';

export default {
    dataSource: 'maindb',
    table: 'Media',
    resourceId: 'Media', 
    label: 'Media',
    recordLabel: (r: any) => `🖼️ ${r.url}`,
    plugins: [
        new ForeignInlineListPlugin({
            foreignResourceId: 'Category',
        }),
        new ForeignInlineListPlugin({
            foreignResourceId: 'ProductMedia',
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
            name: 'url',
            type: AdminForthDataTypes.STRING,
            required: true,
            isUnique: true
        },
        {
            name: 'type',
            type: AdminForthDataTypes.STRING,
            required: true,
            enum: [
                { value: "IMAGE", label: "Картинка" },
                { value: "VIDEO", label: "Видео" },
            ]
        },
        {
            name: 'format',
            type: AdminForthDataTypes.STRING,
            required: true,
            enum: [
                {value: "JPEG", label: "JPEG"},
                {value: "PNG", label: "PNG"},
                {value: "WEBP", label: "WEBP"},
            ]
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