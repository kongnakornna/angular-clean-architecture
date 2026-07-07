export interface Translation {
  key: string;
  value: string;
  language: string;
}

export type SupportedLanguage = 'th' | 'en';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  flag: string;
}
