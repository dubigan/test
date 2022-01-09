import { makeAutoObservable, runInAction } from 'mobx';
import { E_DETAIL, TItems } from '../components/Detail/DetailTypes';
import { EMPTY_CAR, EMPTY_OWNER } from '../components/Detail/useDetailFunctions';

type TChangeItemData = {
    type: E_DETAIL;
    name: string;
    value: string;
};

class ItemsStore {
    _items: TItems = {
        [E_DETAIL.CAR]: EMPTY_CAR,
        [E_DETAIL.OWNER]: EMPTY_OWNER,
    };
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
    get car() {
        return this._items[E_DETAIL.CAR];
    }
    get owner() {
        return this._items[E_DETAIL.OWNER];
    }

    loadItem(type: E_DETAIL) {}
    saveItem(type: E_DETAIL) {}
    changeItem({ type, name, value }: TChangeItemData) {}
}

export default ItemsStore;
