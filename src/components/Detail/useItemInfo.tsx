import {
    TCarItem,
    TOwnerItem,
    TItemsInfo,
    E_GENDER,
    E_DETAIL,
    E_BASE_ITEM,
    E_CAR_ITEM,
    E_OWNER_ITEM,
    TBaseItem,
    E_ITEM_KEY,
    TItemType,
} from './DetailTypes';

export const EMPTY_CAR_ID = -1;
export const EMPTY_CAR: TCarItem = {
    [E_BASE_ITEM.ID]: EMPTY_CAR_ID,
    [E_CAR_ITEM.MANUFACTURER]: '',
    [E_CAR_ITEM.MODEL]: '',
    [E_CAR_ITEM.PRODUCTION]: new Date().toLocaleDateString('ru'),
    [E_CAR_ITEM.COLOR]: '',
    [E_CAR_ITEM.POWER]: undefined,
    [E_CAR_ITEM.MILEAGE]: undefined,
    [E_BASE_ITEM.COMMENT]: '',
    [E_CAR_ITEM.OWNER]: -1,
    // [E_BASE_ITEM.KEY]: E_ITEM_KEY.CAR,
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
    // [E_BASE_ITEM.KEY]: E_ITEM_KEY.OWNER,
};

export const CAR_URL_API = '/api/car/';
export const CAR_API_KEY = 'car_pk';
export const OWNER_URL_API = '/api/owner/';
export const OWNER_API_KEY = 'owner_pk';

const functions: TItemsInfo = {
    [E_DETAIL.CAR]: {
        url: CAR_URL_API,
        // detailUrl: "/car",
        idKey: CAR_API_KEY,
        tooltipPlace: 'bottom',

        getNewItemId: (): number => EMPTY_CAR_ID,
        getNewItem: () => {
            return EMPTY_CAR;
        },
        verifyItem: (item: TCarItem) => {
            // if (item.id < 0) return null;
            item.power = item.power ?? 0;
            item.mileage = item.mileage ?? 0;
            return item;
        },
    },
    [E_DETAIL.OWNER]: {
        url: OWNER_URL_API,
        // detailUrl: "/owner",
        idKey: OWNER_API_KEY,
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

const useItemInfo = (detailType: TItemType) => {
    return functions[detailType];
};

export default useItemInfo;
