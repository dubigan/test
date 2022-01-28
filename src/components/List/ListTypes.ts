import { TCarItem, TOwnerItem } from '../Detail/DetailTypes';

export enum E_DIRECTION {
    ASC = 'asc',
    DESC = 'desc',
}

export enum E_LIST {
    CARS = 'cars',
    OWNERS = 'owners',
}

export type TOnClick = ((event: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => void) | undefined;

export type TSortedBy = {
    name: string;
    direction: E_DIRECTION;
};

export type TItemFunctions<TItem> = {
    url: string;
    detailUrl: string;
    idKey: string;
    tooltipPlace: string;
    nameOfItem: string;
    addButton: boolean;
    itemInfo: (item: TItem) => string;
    getTable: (items: TItem[], getButtons: Function, onClick: TOnClick, sortedBy: TSortedBy) => JSX.Element;
    getDefaultSortedBy: () => TSortedBy;
};

export type TListFunctions = {
    cars: TItemFunctions<TCarItem>;
    owners: TItemFunctions<TOwnerItem>;
};

export type TListOfItemsProps<TItem> = {
    owner?: number;
    withAlerts?: boolean;
    functions?: TItemFunctions<TItem>;
};

// export type TListItems<TItem> = Array<TItem>;

export type TLoadItemsProps = {
    url: string;
    sortedBy: TSortedBy;
    owner?: number;
};

export type TDeleteItemProps = {
    url: string;
    item_pk : number;
    owner_pk: number;
}

export type TListType = E_LIST;
