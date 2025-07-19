import { useTranslation } from 'react-i18next';

const LanguageToggle = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="btn-secondary flex items-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      aria-label={t('accessibility.language-toggle')}
    >
      <span className="mr-2">{t('language.toggle')}:</span>
      <span className="font-bold">
        {i18n.language === 'en' ? 'EN' : 'FR'}
      </span>
    </button>
  );
};

export default LanguageToggle;