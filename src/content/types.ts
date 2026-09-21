export type Lang = 'es' | 'en';

export const LANGS: Lang[] = ['es', 'en'];
export const DEFAULT_LANG: Lang = 'es';

/** A string localized into every supported language. */
export type L10n = Record<Lang, string>;

/** A list of strings localized into every supported language. */
export type L10nList = Record<Lang, string[]>;

export function t(value: L10n, lang: Lang): string {
  return value[lang];
}

export function tl(value: L10nList, lang: Lang): string[] {
  return value[lang];
}
