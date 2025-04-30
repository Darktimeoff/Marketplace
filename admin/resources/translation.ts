

import { AdminForthDataTypes } from 'adminforth';

export default {
    dataSource: 'maindb',
    table: 'Translation',
    resourceId: 'Translation', 
    label: 'Translation',
    recordLabel: (r: any) => `🏡 ${r.uk_ua}`,
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
            name: 'uk_ua',
            label: "Ukrainian",
            type: AdminForthDataTypes.STRING,
        },
        {
            name: 'en_us',
            label: "English",
            type: AdminForthDataTypes.STRING,
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