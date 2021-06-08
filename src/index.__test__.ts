import { createLocalIdentGetter } from './index';

describe('createLocalIdentGetter', () => {
  it('should be defined', () => {
    expect(createLocalIdentGetter).toBeDefined();
  });

  it('should return function', () => {
    expect(createLocalIdentGetter()).toBeInstanceOf(Function);
  });

  it('should return undefined if bypass option is truthy', () => {
    expect(createLocalIdentGetter({ bypass: true })).toBeUndefined();
  });

  describe('getter', () => {
    it('should use provided alphabet', () => {
      const getter = createLocalIdentGetter({ alphabet: 'ab' });

      expect(
        getter(
          {
            rootContext: '/a',
            resourcePath: '/a/b',
          },
          undefined,
          'a',
          undefined
        )
      ).toBe('a_a');

      expect(
        getter(
          {
            rootContext: '/a',
            resourcePath: '/a/b',
          },
          undefined,
          'f',
          undefined
        )
      ).toBe('a_b');

      expect(
        getter(
          {
            rootContext: '/a',
            resourcePath: '/a/b',
          },
          undefined,
          'z',
          undefined
        )
      ).toBe('a_ba');

      expect(
        getter(
          {
            rootContext: '/a',
            resourcePath: '/a/c',
          },
          undefined,
          'z',
          undefined
        )
      ).toBe('b_a');
    });

    it('should return same id for same resource', () => {
      const getter = createLocalIdentGetter({ alphabet: 'ab' });

      expect(
        getter(
          {
            rootContext: '/a',
            resourcePath: '/a/b',
          },
          undefined,
          'd',
          undefined
        )
      ).toBe('a_a');
      expect(
        getter(
          {
            rootContext: '/a',
            resourcePath: '/a/b',
          },
          undefined,
          'c',
          undefined
        )
      ).toBe('a_b');
    });

    it('should return same local id for same resource and same local name', () => {
      const getter = createLocalIdentGetter({ alphabet: 'ab' });

      expect(
        getter(
          {
            rootContext: '/a',
            resourcePath: '/a/b',
          },
          undefined,
          'a',
          undefined
        )
      ).toBe('a_a');
      expect(
        getter(
          {
            rootContext: '/a',
            resourcePath: '/a/b',
          },
          undefined,
          'a',
          undefined
        )
      ).toBe('a_a');
    });

    it('should return same local id for same resource and same local name', () => {
      const getter = createLocalIdentGetter({ alphabet: 'ab' });

      expect(
        getter(
          {
            rootContext: '/a',
            resourcePath: '/a/b',
          },
          undefined,
          'a',
          undefined
        )
      ).toBe('a_a');
    });

    it('should use provided separator', () => {
      const getter = createLocalIdentGetter({ alphabet: 'ab', localIdentSeparator: '-' });

      expect(
        getter(
          {
            rootContext: '/a',
            resourcePath: '/a/b',
          },
          undefined,
          'a',
          undefined
        )
      ).toBe('a-a');
    });

    it('should use provided suffix and prefix', () => {
      const getter = createLocalIdentGetter({ alphabet: 'ab', suffix: '-', prefix: '__' });

      expect(
        getter(
          {
            rootContext: '/a',
            resourcePath: '/a/b',
          },
          undefined,
          'a',
          undefined
        )
      ).toBe('__a_a-');
    });
  });
});
