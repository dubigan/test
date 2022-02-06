import { flow, makeAutoObservable, makeObservable, observable, runInAction } from 'mobx';
import {
    E_BASE_ITEM,
    E_DETAIL,
    E_ITEM_KEY,
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
import { onBecomeObserved } from 'mobx/src/api/become-observed';

class ItemStore<T extends TBaseItem> {
    public item: T;
    private _itemInfo: TItemInfo<T>;
    constructor(itemType: TItemType) {
        this._itemInfo = itemInfo(itemType) as unknown as TItemInfo<T>;
        this.item = this._itemInfo.getNewItem();
        makeAutoObservable(this, {}, { autoBind: true });
        // makeObservable(
        //     this,
        //     {
        //         item: observable,
        //         loadItem: flow.bound,
        //     },
        //     { autoBind: true },
        // );
        // onBecomeObserved(this, 'item', this.loadItem.bind(this));
    }

    *loadItem() {
        const item_pk = sessionStorage.getItem(this._itemInfo.idKey) || -1;

        // @ts-ignore
        const res = yield api.queryServer(this._itemInfo.url, { item_pk });
        console.log('ItemStore.loadItem', res.data);
        runInAction(() => {
            this.item = this.getItemFromData(res.data);
        });
    }
    async saveItem() {
        const verifiedItem = this._itemInfo.verifyItem(this.item);
        const owner_pk = sessionStorage.getItem(E_ITEM_KEY.OWNER) ?? -1;
        if (!verifiedItem) return;
        // console.log('ItemStore.saveItem', verifiedItem);
        const res = await api.queryServer(this._itemInfo.url, {
            item: verifiedItem,
            owner_pk,
            [this._itemInfo.idKey]: verifiedItem.id,
        });
        runInAction(() => {
            this.item = this.getItemFromData(res.data);
        });
    }

    changeItemData<K extends keyof T>(name: string, value: any) {
        runInAction(() => {
            if (this.item && name in this.item) this.item[name as K] = value;
        });
    }
    getItemFromData = (data: any): T => {
        //console.log('getItemFromData', data);
        return data[E_BASE_ITEM.ID] ? (data as T) : this._itemInfo.getNewItem();
    };
}

export default ItemStore;
