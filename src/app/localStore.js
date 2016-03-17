class LocalStore {
  constructor(){
    this.store = localStorage;
  }

  set(key, value){
    this.store.setItem(key, value);
  }

  get(key) {
    return this.store.getItem(key);
  }

  clear(key) {
    this.store.removeItem(key);
  }

  clearAll(key){
    this.store.clear();
  }
}

export default new LocalStore();
