import { makeAutoObservable, observable, runInAction } from 'mobx';

class Loading {
    _loading = false;
    constructor() {
        makeAutoObservable(this, { _loading: observable }, { autoBind: true });
    }

    get loading() {
        return this._loading;
    }

    set loading(loading: boolean) {
        runInAction(() => {
            // console.log('Loading', this.loading);
            this._loading = loading;
            // this._list = res;
        });
    }
}

export default Loading;
