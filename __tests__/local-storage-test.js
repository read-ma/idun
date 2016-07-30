jest.unmock('../src/app/localStore.js');

import localStore from '../src/app/localStore.js';

describe('LocalStorage', () => {

  it ('handles strings ', () => {
    localStore.set('STRING', 'some text');

    expect(localStore.get('STRING')).toEqual('some text');
  });

  it ('handles booleans ', () => {
    localStore.set('BOOLEAN', false);

    expect(localStore.get('BOOLEAN', 'bool')).toEqual(false);
  });

  it ('handles true booleans ', () => {
    localStore.set('BOOLEAN', true);

    expect(localStore.get('BOOLEAN', 'bool')).toEqual(true);
  });

});
