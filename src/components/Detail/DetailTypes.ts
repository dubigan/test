import { ChangeEvent } from 'react';

export type TMALE = 'm';
export type TFEMALE = 'f';

export const GENDER = {
  FEMALE: 'f' as TFEMALE,
  MALE: 'm' as TMALE,
};

export type TGender = TMALE | TFEMALE;

export type TBaseItem = {
  id: number;
};

export type TCarItem = {
  id: number;
  manufacturer: string;
  model: string;
  production: string;
  color: string;
  power: number | undefined;
  mileage: number | undefined;
  comment: string;
};

export type TOwnerItem = {
  id: number;
  name: string;
  patronymic: string;
  last_name: string;
  gender: TGender;
  age: number | undefined;
  comment: string;
  cars: TCarItem[];
};

export type TDetailItemFunctions<TItem> = {
  url: string;
  tooltipPlace: string;
  getNewItemId: () => number;
  getNewItem: () => TItem;
  verifyItem: (item: TItem) => TItem;
};

export type TDetailFunctions = {
  car: TDetailItemFunctions<TCarItem>;
  owner: TDetailItemFunctions<TOwnerItem>;
};

export type TDetailType = 'car' | 'owner';

export type TDetailOfItemsProps<TItem> = {
  // owner?: number;
  // withAlerts?: boolean;
  functions: TDetailItemFunctions<TItem>;
};

export type TSetItemFunc<TItem> = (item: TItem) => void;

export type TDetailUtils<TItem> = {
  item: TItem;
  getItem: () => void;
  saveItem: () => void;
  changeItem: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  setItem: (item: TItem) => void;
};
