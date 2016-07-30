class LocalStore {
  constructor() {
    this.store = window.localStorage;
  }

  set(key, value) {
    this.store.setItem(key, value);
  }

  get(key, type='string') {
    switch (type) {
    case 'bool':
      return this.store.getItem(key) === 'true';
    default:
      return this.store.getItem(key);
    }
  }

  clear(key) {
    this.store.removeItem(key);
  }

  clearAll() {
    this.store.clear();
  }
}

export default new LocalStore();
