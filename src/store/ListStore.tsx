import {computed, flow, makeAutoObservable, makeObservable, observable, runInAction} from 'mobx';
import {TDeleteItemProps, TLoadItemsProps, TSortedBy} from '../components/List/ListTypes';
import api from '../pages/api/api';
import {onBecomeObserved} from "mobx/src/api/become-observed";
import {TItemInfo, TItemType} from "../components/Detail/DetailTypes";
import itemInfo from "../components/Detail/useItemInfo";

class ListStore<T> {
    _list: T[] = [];

    constructor() {
        makeObservable(this, { _list: observable, list: computed, loadItems: flow.bound });
        // onBecomeObserved(this, '_list', this.loadItems.bind(this))
    }
    *loadItems(props: TLoadItemsProps) {
        const { url, sortedBy, owner } = props;
        const params = {
            sortedBy,
            owner,
        };
        // @ts-ignore
        const res = yield api.queryServer(url, params);
        runInAction(() => {
            this._list = res.data;
            // console.log('ItemsStore.loadItems this.items', this.items);
        });
    };
    async deleteItem(props: TDeleteItemProps) {
        const res = await api.queryServer(props.url, {
            // sorted_by: sortedBy,
            btn_del: '',
            item_pk: props.item_pk,
            owner: props.owner_pk ?? -1,
        });
        runInAction(() => {
            this._list = res.data;
            // console.log('ItemsStore.loadItems this.items', this.items);
        });

    }
    get list() {
        return this._list;
    }
}

export default ListStore;
