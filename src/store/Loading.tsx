import { makeAutoObservable, runInAction } from 'mobx';

class Loading {
    _loading = false;
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get loading() {
        return this._loading;
    }

    set loading(loading: boolean) {
        runInAction(() => {
            this._loading = loading;
            // console.log('Loading', this.loading);
            // this._list = res;
        });
    }
}

export default new Loading();
