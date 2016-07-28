import _ from 'lodash';
const instance = window.speechSynthesis;

function findVoice(lang) {
  return _.find(instance.getVoices(), { lang: lang });
}

function createUtterance(text, lang, rate) {
  const tts = new window.SpeechSynthesisUtterance(text);
  tts.voice = findVoice(lang);
  tts.rate = rate;
  return tts;
}

function start(text, lang, rate = 0.8) {
  instance.speak(
    createUtterance(text, lang, rate));
  return {
    type: 'TTS_START'
  };
}

function stop() {
  instance.cancel();
  return {
    type: 'TTS_STOP'
  };
}

function resume() {
  instance.resume();
  return {
    type: 'TTS_RESUME'
  };
}

function pause() {
  instance.pause();
  return {
    type: 'TTS_PAUSE'
  };
}

export { start, stop, pause, resume };
