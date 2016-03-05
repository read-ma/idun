class LocalStore {
    constructor(){
        this.store = localStorage;
    }

    get(key) {
        return this.store.getItem(key);
    }

}

export default new LocalStore();
