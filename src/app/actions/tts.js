import _ from 'lodash';
import { find } from 'lodash/find';
const instance = window.speechSynthesis;

function findVoice(lang) {
  return _.find(instance.getVoices(), { lang: lang });
}

function createUtterance(text, lang) {
  const tts = new window.SpeechSynthesisUtterance(text);
  tts.voice = findVoice(lang);
  return tts;
}

function start(text, lang) {
  instance.speak(
    createUtterance(text, lang));
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
