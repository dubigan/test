import { computed, makeAutoObservable, observable, runInAction } from 'mobx';
import { TLoadItemsProps, TSortedBy } from '../components/List/ListTypes';
import api from '../pages/api/api';

class ListStore<TItem> {
    _list: TItem[] = [];
    constructor() {
        makeAutoObservable(this, { _list: observable, list: computed }, { autoBind: true });
    }
    loadItems = async (props: TLoadItemsProps) => {
        const { url, sortedBy, owner } = props;
        const params = {
            sortedBy,
            owner,
        };
        const res = await api.queryServer(url, params);
        runInAction(() => {
            this._list = res.data;
            // console.log('ItemsStore.loadItems this.items', this.items);
        });
    };
    get list() {
        return this._list;
    }
}

export default ListStore;
