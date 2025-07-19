import { useTranslation } from 'react-i18next';

const CurrencyToggle = ({ currency, onToggle }) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onToggle}
      className="btn-modern flex items-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      aria-label={t('accessibility.currency-toggle')}
    >
      <span className="mr-2">{t('currency.toggle')}:</span>
      <span className="font-bold">
        {currency}
      </span>
    </button>
  );
};

export default CurrencyToggle;