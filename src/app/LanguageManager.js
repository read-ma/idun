import store from './store';

class LanguageManager {
    settings() {
        return store.getState().settings
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
