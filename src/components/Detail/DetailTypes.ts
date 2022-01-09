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
}

export enum E_CAR_ITEM {
    MANUFACTURER = 'manufacturer',
    MODEL = 'model',
    PRODUCTION = 'production',
    COLOR = 'color',
    POWER = 'power',
    MILEAGE = 'mileage',
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

export type TBaseItem = {
    [E_BASE_ITEM.ID]: number;
    [E_BASE_ITEM.COMMENT]?: string;
};

export type TCarItem = TBaseItem & {
    [E_CAR_ITEM.MANUFACTURER]: string;
    [E_CAR_ITEM.MODEL]: string;
    [E_CAR_ITEM.PRODUCTION]: string;
    [E_CAR_ITEM.COLOR]: string;
    [E_CAR_ITEM.POWER]: number | undefined;
    [E_CAR_ITEM.MILEAGE]: number | undefined;
};

export type TOwnerItem = TBaseItem & {
    [E_OWNER_ITEM.NAME]: string;
    [E_OWNER_ITEM.PATRONYMIC]: string;
    [E_OWNER_ITEM.LAST_NAME]: string;
    [E_OWNER_ITEM.GENDER]: TGender;
    [E_OWNER_ITEM.AGE]: number | undefined;
    [E_OWNER_ITEM.CARS]: TCarItem[];
};

export type TDetailItemFunctions<TItem> = {
    url: string;
    // detailUrl: string;
    idKey: string;
    tooltipPlace: string;
    getNewItemId: () => number;
    getNewItem: () => TItem;
    verifyItem: (item: TItem) => TItem;
};

export type TDetailFunctions = {
    [E_DETAIL.CAR]: TDetailItemFunctions<TCarItem>;
    [E_DETAIL.OWNER]: TDetailItemFunctions<TOwnerItem>;
};

export type TItems = {
    [E_DETAIL.CAR]: TCarItem;
    [E_DETAIL.OWNER]: TOwnerItem;
};

export type TDetailType = E_DETAIL;

export type TDetailOfItemsProps<TItem> = {
    // owner?: number;
    // withAlerts?: boolean;
    functions: TDetailItemFunctions<TItem>;
};

export type TSetItem<TItem> = (item: TItem) => void;

export type TDetailUtils<TItem> = {
    item: TItem;
    getItem: () => void;
    saveItem: () => void;
    changeItem: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
    setItem: TSetItem<TItem>;
};
