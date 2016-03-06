import store from './store';

class LanguageManager {
    constructor(){
        this.settings = store.getState().settings;
    }

    current() {
        return this.settings.language;
    }

    keysOfCurrent(){
        return {
            to: this.byCode(this.current().to).key,
            from: this.byCode(this.current().from).key
        };
    }

    all(){
        return this.settings.languages;
    }

    byCode(code){
        return _.find(this.all(), {code: code});
    }

    byKey(key){
        return _.find(this.all(), {key: key});
    }

};

export default new LanguageManager();
