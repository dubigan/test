import { ChangeEvent } from 'react';

export enum E_DETAIL {
    CAR = 'car',
    OWNER = 'owner',
}

export enum E_GENDER {
    MALE = 'm',
    FEMALE = 'f',
}

export enum E_BASE_ITEM {
    ID = 'id',
    COMMENT = 'comment',
    // API_KEY = 'api_key',
}

export enum E_CAR_ITEM {
    MODEL = 'model',
    MANUFACTURER = 'manufacturer',
    PRODUCTION = 'production',
    COLOR = 'color',
    POWER = 'power',
    MILEAGE = 'mileage',
    OWNER = 'owner_pk',
    // COMMENT = 'comment',
}

export enum E_OWNER_ITEM {
    NAME = 'name',
    PATRONYMIC = 'patronymic',
    LAST_NAME = 'last_name',
    GENDER = 'gender',
    AGE = 'age',
    CARS = 'cars',
}

export type TGender = E_GENDER;

export enum E_ITEM_KEY {
    CAR = 'car_pk',
    OWNER = 'owner_pk',
}

// export type TItemKey = E_ITEM_KEY;

export type TBaseItem = {
    [E_BASE_ITEM.ID]: number;
    [E_BASE_ITEM.COMMENT]?: string;
    // [E_BASE_ITEM.API_KEY]: TItemKey;
};

// export type TBaseItem = {
//     id: number;
//     comment?: string;
//     // [E_BASE_ITEM.API_KEY]: TItemKey;
// };

export type TCarItem = TBaseItem & {
    [E_CAR_ITEM.MODEL]: string;
    [E_CAR_ITEM.MANUFACTURER]: string;
    [E_CAR_ITEM.PRODUCTION]: string;
    [E_CAR_ITEM.COLOR]: string;
    [E_CAR_ITEM.POWER]: number | undefined;
    [E_CAR_ITEM.MILEAGE]: number | undefined;
    [E_CAR_ITEM.OWNER]: number;
};

// export type TCarItem = TBaseItem & {
//     model: string;
//     manufacturer: string;
//     prodaction: string;
//     color: string;
//     power: number | undefined;
//     mileage: number | undefined;
// };

export type TOwnerItem = TBaseItem & {
    [E_OWNER_ITEM.NAME]: string;
    [E_OWNER_ITEM.PATRONYMIC]: string;
    [E_OWNER_ITEM.LAST_NAME]: string;
    [E_OWNER_ITEM.GENDER]: TGender;
    [E_OWNER_ITEM.AGE]: number | undefined;
    [E_OWNER_ITEM.CARS]: TCarItem[];
};

export type TItem = TCarItem | TOwnerItem;

export type TItemInfo<T> = {
    url: string;
    // detailUrl: string;
    idKey: string;
    tooltipPlace: string;
    getNewItemId: () => number;
    getNewItem: () => T;
    verifyItem: (item: T) => T | null;
};

export type TItemsInfo = {
    [E_DETAIL.CAR]: TItemInfo<TCarItem>;
    [E_DETAIL.OWNER]: TItemInfo<TOwnerItem>;
};

export type TItems = {
    [E_DETAIL.CAR]: TCarItem;
    [E_DETAIL.OWNER]: TOwnerItem;
};

export type TItemType = E_DETAIL;

export type TItemsProps<T> = {
    // owner?: number;
    // withAlerts?: boolean;
    itemInfo: TItemInfo<T>;
};

export type TSetItem<T> = (item: T) => void;

export type TItemFunctions<T> = {
    item: T;
    loadItem: () => void;
    saveItem: (back?: boolean) => void;
    changeItem : (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void
    changeItemData: <K extends keyof T>(name: string, value: any) => void;
    changeGender: (e: ChangeEvent<HTMLInputElement>) => void;
};
