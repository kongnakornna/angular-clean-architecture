import { TranslatePipe } from './translate.pipe';

describe('TranslatePipe', () => {
  it('should return the same value (placeholder)', () => {
    const pipe = new TranslatePipe();
    expect(pipe.transform('hello')).toBe('hello');
  });
});
