jest.unmock('../src/app/components/TextUtils.js');

import { detokenize, Token } from '../src/app/components/TextUtils.js';

describe('Detokenize', () => {
  it ('returns empty arry on empty input', () => {
    expect(detokenize([])).toEqual([]);
  });
});
