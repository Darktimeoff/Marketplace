

import { AdminForthDataTypes } from 'adminforth';

export default {
    dataSource: 'maindb',
    table: 'Translation',
    resourceId: 'Translation', 
    label: 'Translation',
    recordLabel: (r: any) => `🏡 ${Object.values(r.value)[0]}`,
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
            name: 'value',
            type: AdminForthDataTypes.JSON,
            required: true,
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