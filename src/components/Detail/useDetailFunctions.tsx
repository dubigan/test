import {
  TDetailType,
  TCarItem,
  TOwnerItem,
  TDetailFunctions,
  TDetailItemFunctions,
} from './DetailTypes';

const EMPTY_CAR = {
  id: -1,
  manufacturer: '',
  model: '',
  production: new Date().toLocaleDateString('ru'),
  color: '',
  power: undefined,
  mileage: undefined,
  comment: '',
};

const EMPTY_OWNER_ID = -10;
//const UNDEFINED_OWNER = -1;

const EMPTY_OWNER: TOwnerItem = {
  id: EMPTY_OWNER_ID, // indicate new owner, -1 means undefined owner
  cars: [],
  name: '',
  patronymic: '',
  last_name: '',
  gender: 'f',
  age: undefined,
  comment: '',
};

const functions: TDetailFunctions = {
  car: {
    url: '/api/car/',
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
  owner: {
    url: '/api/owner/',
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
