import store from './store';
import _ from 'lodash';
import { find } from 'lodash/find';

class LanguageManager {
  settings() {
    return store.getState().settings;
  }

  keysOfCurrent(){

    return {
      to: this.byCode(this.settings().language.to).key,
      from: this.byCode(this.settings().language.from).key
    };
  }

  all(){
    return this.settings().languages;
  }

  byCode(code){
    return _.find(this.all(), {code: code});
  }

  byKey(key){
    return _.find(this.all(), {key: key});
  }

};

export default new LanguageManager();
