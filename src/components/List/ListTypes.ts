import { TCarItem, TOwnerItem } from "../Detail/DetailTypes";

export type TOnClick =
    | ((event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>) => void)
    | undefined;

export type TSortedBy = {
    name: string;
    direction: "asc" | "desc";
};

export type TItemFunctions<TItem> = {
    url: string;
    tooltipPlace: string;
    nameOfItem: string;
    addButton: boolean;
    itemInfo: (item: TItem) => string;
    getTable: (
        items: TItem[],
        getButtons: Function,
        onClick: TOnClick,
        sortedBy: TSortedBy
    ) => JSX.Element;
    getDefaultSortedBy: () => TSortedBy;
};

export type TListFunctions = {
    cars: TItemFunctions<TCarItem>;
    owners: TItemFunctions<TOwnerItem>;
};

export type TListOfItemsProps<TItem> = {
    owner?: number;
    withAlerts?: boolean;
    functions: TItemFunctions<TItem>;
};

export type TListItems<TItem> = Array<TItem>;

export type TListType = "cars" | "owners";
