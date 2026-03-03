import { useTranslation as useTranslationOriginal } from 'react-i18next';

type TranslationFunction = (key: string, options?: any) => string;

export const useTranslation = () => {
  const { t, i18n } = useTranslationOriginal();

  const translate: TranslationFunction = (key: string, options?: any) => {
    return t(key, options) as string;
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return {
    t: translate,
    changeLanguage,
    currentLanguage: i18n.language
  };
}; 