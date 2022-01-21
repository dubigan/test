import { useMemo } from 'react';
import { TBaseItem, TItemType } from '../components/Detail/DetailTypes';
import ItemStore from './ItemStore';

const useItemStore = <T extends TBaseItem>(itemType: TItemType) => {
    return useMemo(() => new ItemStore<T>(itemType), []);
};

export default useItemStore;
