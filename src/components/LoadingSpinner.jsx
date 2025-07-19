import { useTranslation } from 'react-i18next';

const LoadingSpinner = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-96">
      <div className="loading-spinner mb-4"></div>
      <span className="text-white text-lg font-medium">{t('loading')}</span>
    </div>
  );
};

export default LoadingSpinner;