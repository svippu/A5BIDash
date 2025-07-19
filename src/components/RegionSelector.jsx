import { useTranslation } from 'react-i18next';
import { regionalData } from '../data/meatPrices';

const RegionSelector = ({ selectedRegions, onRegionToggle }) => {
  const { t } = useTranslation();
  const regions = Object.keys(regionalData);

  return (
    <div className="mb-8">
      <label className="block text-lg font-semibold text-gray-800 mb-4">
        {t('charts.select-regions')}
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {regions.map((region) => (
          <label
            key={region}
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/50 cursor-pointer transition-all duration-200 hover:shadow-md"
          >
            <input
              type="checkbox"
              checked={selectedRegions.includes(region)}
              onChange={() => onRegionToggle(region)}
              className="checkbox-modern"
              aria-label={`${t('accessibility.region-select')} ${t(`regions.${region}`)}`}
            />
            <span className="text-sm font-medium text-gray-700">
              {t(`regions.${region}`)}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RegionSelector;