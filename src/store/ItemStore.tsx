import { makeAutoObservable, runInAction } from 'mobx';
import {
    E_BASE_ITEM,
    E_DETAIL,
    TBaseItem,
    TCarItem,
    TItem,
    TItemInfo,
    TItems,
    TItemType,
    TOwnerItem,
} from '../components/Detail/DetailTypes';
import itemInfo from '../components/Detail/useItemInfo';
import api from '../pages/api/api';

class ItemStore<T extends TBaseItem> {
    _item: T;
    _itemInfo: TItemInfo<T>;
    constructor(itemType: TItemType) {
        this._itemInfo = itemInfo(itemType) as unknown as TItemInfo<T>;
        this._item = this._itemInfo.getNewItem();
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get item() {
        return this._item;
    }

    async loadItem() {
        const item_pk = sessionStorage.getItem(this._itemInfo.idKey);

        const res = await api.queryServer(this._itemInfo.url, { [this._itemInfo.idKey]: item_pk });
        console.log('ItemStore.loadItem', res.data);
        runInAction(() => {
            this._item = this.getItemFromData(res.data);
        });
    }
    async saveItem() {
        const verifiedItem = this._itemInfo.verifyItem(this._item);
        const owner_pk = sessionStorage.getItem('owner_pk') ?? -1;
        if (!verifiedItem) return;
        const res = await api.queryServer(this._itemInfo.url, {
            item: verifiedItem,
            owner_pk,
            [this._itemInfo.idKey]: verifiedItem.id,
        });
        runInAction(() => {
            this._item = this.getItemFromData(res.data);
        });
    }
    changeItemData<K extends keyof T>(name: string, value: any) {
        runInAction(() => {
            if (this._item && name in this._item) this._item[name as K] = value;
        });
    }
    getItemFromData = (data: any): T => {
        //console.log('getItemFromData', data);
        return data[E_BASE_ITEM.ID] ? (data as T) : this._itemInfo.getNewItem();
    };
}

export default ItemStore;
