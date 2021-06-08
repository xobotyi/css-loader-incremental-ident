import { idgen } from './idgen';

describe('idgen', () => {
  it('should be defined', () => {
    expect(idgen).toBeDefined();
  });

  it('should return a function', () => {
    expect(idgen('abc')).toBeInstanceOf(Function);
  });

  it('should sequentially increment string over alphabet', () => {
    const gen = idgen('acb');

    expect(gen()).toBe('a');
    expect(gen()).toBe('c');
    expect(gen()).toBe('b');
  });

  it('should add extra character when alphabet is ended', () => {
    const gen = idgen('ab');

    expect(gen()).toBe('a');
    expect(gen()).toBe('b');
    expect(gen()).toBe('ba');
    expect(gen()).toBe('bb');
    expect(gen()).toBe('bba');
    expect(gen()).toBe('bbb');
  });
});
