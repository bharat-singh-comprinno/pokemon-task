import { CapitalizePipe } from './capitalize-pipe';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should capitalize first letter and lowercase the rest', () => {
    expect(pipe.transform('hello')).toBe('Hello');
    expect(pipe.transform('WORLD')).toBe('World');
    expect(pipe.transform('tEST')).toBe('Test');
  });

  it('should handle empty string', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should handle null/undefined', () => {
    expect(pipe.transform(null as any)).toBe('');
    expect(pipe.transform(undefined as any)).toBe('');
  });
});
