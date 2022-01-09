import { useMemo } from 'react';
import ListStore from './ListStore';

const useListStore = <TItem extends Object>() => {
    return useMemo(() => new ListStore<TItem>(), []);
};

export default useListStore;
