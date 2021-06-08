import * as path from 'path';
import { idgen } from './idgen';

const DEFAULT_ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

export interface LocalIdentGeneratorOptions {
  alphabet?: string;
  bypass?: boolean;
  prefix?: string;
  suffix?: string;
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
  if (opt.bypass) return undefined;

  const resourceIdGen = idgen(opt.alphabet ?? DEFAULT_ALPHABET);
  const resources = new Map<
    string,
    { id: string; localIdGen: ReturnType<typeof idgen>; locals: Map<string, string> }
  >();

  function getShortIdent(resourcePath: string, localName: string) {
    let resource = resources.get(resourcePath);

    if (!resource) {
      resource = {
        id: resourceIdGen(),
        localIdGen: idgen(opt.alphabet ?? DEFAULT_ALPHABET),
        locals: new Map(),
      };
      resources.set(resourcePath, resource);
    }

    let local = resource.locals.get(localName);

    if (!local) {
      local = resource.localIdGen();
      resource.locals.set(localName, local);
    }

    return `${opt.prefix}${resource.id}_${local}${opt.suffix}`;
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
