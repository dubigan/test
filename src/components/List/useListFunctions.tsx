import { TSortedBy, TListFunctions, TListType, E_DIRECTION } from './ListTypes';
import { TCarItem, TOwnerItem } from '../Detail/DetailTypes';
import getCarsTable from './carsTable';
import getOwnersTable from './ownersTable';

const functions: TListFunctions = {
    cars: {
        url: '/api/cars/',
        detailUrl: '/car',
        idKey: 'car_pk',
        tooltipPlace: 'bottom',
        nameOfItem: 'Автомобиль',
        addButton: false,

        itemInfo: (item: TCarItem) => [item.manufacturer, item.model].join(' '),
        getTable: getCarsTable,

        getDefaultSortedBy: () =>
            ({
                name: 'model',
                direction: E_DIRECTION.ASC,
            } as TSortedBy),
    },

    owners: {
        url: '/api/owners/',
        detailUrl: '/owner',
        idKey: 'owner_pk',
        tooltipPlace: 'bottom',
        nameOfItem: 'Автовладелец',
        addButton: true,

        itemInfo: (item: TOwnerItem) => [item.last_name, item.name, item.patronymic].join(' '),
        getTable: getOwnersTable,

        getDefaultSortedBy: () =>
            ({
                name: 'last_name',
                direction: E_DIRECTION.ASC,
            } as TSortedBy),
    },
};

export const useListFunctions = (listType: TListType) => {
    return functions[listType];
};
