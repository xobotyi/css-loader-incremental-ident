import * as path from 'path';
import { idgen } from './idgen';

const DEFAULT_ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

export interface LocalIdentGeneratorOptions {
  alphabet?: string;
  bypass?: boolean;
  prefix?: string;
  suffix?: string;
  localIdentSeparator?: string;
}

export interface ContextLike {
  rootContext: string;
  resourcePath: string;
}

type GetLocalIdent = (
  context: ContextLike,
  localIdentName: string,
  localName: string,
  options: unknown
) => string;

export function createLocalIdentGetter(
  opt: LocalIdentGeneratorOptions = {}
): GetLocalIdent | undefined {
  const {
    bypass = false,
    prefix = '',
    suffix = '',
    localIdentSeparator = '_',
    alphabet = DEFAULT_ALPHABET,
  } = opt;

  if (bypass) return undefined;

  const resourceIdGen = idgen(alphabet);
  const resources = new Map<
    string,
    { id: string; localIdGen: ReturnType<typeof idgen>; locals: Map<string, string> }
  >();

  function getShortIdent(resourcePath: string, localName: string) {
    let resource = resources.get(resourcePath);

    if (!resource) {
      resource = {
        id: resourceIdGen(),
        localIdGen: idgen(alphabet),
        locals: new Map(),
      };
      resources.set(resourcePath, resource);
    }

    let local = resource.locals.get(localName);

    if (!local) {
      local = resource.localIdGen();
      resource.locals.set(localName, local);
    }

    return `${prefix}${resource.id}${localIdentSeparator}${local}${suffix}`;
  }

  return (
    context: ContextLike,
    localIdentName: string,
    localName: string,
    _options: unknown
  ): string => {
    const relPath = path
      .relative(context.rootContext, context.resourcePath)
      // windows paths fix
      .replace(/\\/g, '/');

    return getShortIdent(relPath, localName);
  };
}
