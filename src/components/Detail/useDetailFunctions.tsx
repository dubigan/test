import {
    TDetailType,
    TCarItem,
    TOwnerItem,
    TDetailFunctions,
    TDetailItemFunctions,
    E_GENDER,
    E_DETAIL,
    E_BASE_ITEM,
    E_CAR_ITEM,
    E_OWNER_ITEM,
} from './DetailTypes';

export const EMPTY_CAR: TCarItem = {
    [E_BASE_ITEM.ID]: -1,
    [E_CAR_ITEM.MANUFACTURER]: '',
    [E_CAR_ITEM.MODEL]: '',
    [E_CAR_ITEM.PRODUCTION]: new Date().toLocaleDateString('ru'),
    [E_CAR_ITEM.COLOR]: '',
    [E_CAR_ITEM.POWER]: undefined,
    [E_CAR_ITEM.MILEAGE]: undefined,
    [E_BASE_ITEM.COMMENT]: '',
};

export const EMPTY_OWNER_ID = -10;
//const UNDEFINED_OWNER = -1;

export const EMPTY_OWNER: TOwnerItem = {
    [E_BASE_ITEM.ID]: EMPTY_OWNER_ID, // indicate new owner, -1 means undefined owner
    [E_OWNER_ITEM.CARS]: [],
    [E_OWNER_ITEM.NAME]: '',
    [E_OWNER_ITEM.PATRONYMIC]: '',
    [E_OWNER_ITEM.LAST_NAME]: '',
    [E_OWNER_ITEM.GENDER]: E_GENDER.FEMALE,
    [E_OWNER_ITEM.AGE]: undefined,
    [E_BASE_ITEM.COMMENT]: '',
};

const functions: TDetailFunctions = {
    [E_DETAIL.CAR]: {
        url: '/api/car/',
        // detailUrl: "/car",
        idKey: 'car_pk',
        tooltipPlace: 'bottom',

        getNewItemId: (): number => -1,
        getNewItem: () => {
            const item: TCarItem = EMPTY_CAR;
            //console.log('getNewItem', item);

            return item;
        },
        verifyItem: (item: TCarItem) => {
            item.power = item.power ?? 0;
            item.mileage = item.mileage ?? 0;
            return item;
        },
    },
    [E_DETAIL.OWNER]: {
        url: '/api/owner/',
        // detailUrl: "/owner",
        idKey: 'owner_pk',
        tooltipPlace: 'bottom',

        getNewItemId: (): number => EMPTY_OWNER_ID,
        getNewItem: () => {
            return EMPTY_OWNER;
        },
        verifyItem: (item: TOwnerItem) => {
            item.age = item.age ?? 0;
            return item;
        },
    },
};

export const useDetailFunctions = (detailType: TDetailType) => {
    return functions[detailType];
};
