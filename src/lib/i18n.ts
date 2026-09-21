import { DEFAULT_LANG, LANGS, type Lang } from '../content/types';
import { ui, type UiKey } from '../content/site';

export { DEFAULT_LANG, LANGS };
export type { Lang };

/** Creates a translator bound to one language. */
export function useTranslations(lang: Lang) {
  return function translate(key: UiKey): string {
    return ui[key][lang];
  };
}

/**
 * Builds a path for the given language.
 * Spanish is the default and lives at the root; English lives under /en.
 */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === DEFAULT_LANG) return clean === '/' ? '/' : clean;
  return clean === '/' ? '/en/' : `/en${clean}`;
}

/** The opposite language, for the toggle. */
export function otherLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}

/** BCP 47 tag used in <html lang> and hreflang. */
export function htmlLang(lang: Lang): string {
  return lang === 'es' ? 'es-MX' : 'en';
}
