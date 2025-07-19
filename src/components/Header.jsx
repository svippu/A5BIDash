import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';
import CurrencyToggle from './CurrencyToggle';

const Header = ({ currency, onCurrencyToggle }) => {
  const { t } = useTranslation();

  return (
    <header className="glass-card border-0 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-8">
          <div className="flex-1 slide-in">
            <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
              {t('title')}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 font-medium">
              {t('subtitle')}
            </p>
          </div>
          
          <div className="flex items-center space-x-3 fade-in">
            <CurrencyToggle 
              currency={currency} 
              onToggle={onCurrencyToggle}
            />
            <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;