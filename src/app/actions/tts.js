const instance = window.speechSynthesis;

function start(text, lang) {
  instance.cancel();
  instance.speak( createUtterance(text,lang) );
};

function createUtterance(text,lang){
  var tts = new window.SpeechSynthesisUtterance(text);
  tts.voice = findVoice(lang);
  return tts;
};

function findVoice(lang){
  return _.find(instance.getVoices(), {lang: lang});
}

function stop(){
  instance.cancel();
};

function resume(){
  instance.resume();
};

function pause(){
  instance.pause();
};

export { start, stop, pause, resume }
