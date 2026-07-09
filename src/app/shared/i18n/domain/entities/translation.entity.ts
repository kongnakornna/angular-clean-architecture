export interface Translation {
  key: string;
  value: string;
  language: string;
}

export type SupportedLanguage = 'th' | 'en' | 'zh' | 'ja' | 'ko' | 'vi' | 'ms' | 'my' | 'km' | 'lo';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  flag: string;
}
