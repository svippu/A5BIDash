import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import OntarioBarChart from './components/OntarioBarChart';
import RegionalRadarChart from './components/RegionalRadarChart';
import RegionSelector from './components/RegionSelector';
import LoadingSpinner from './components/LoadingSpinner';
import { useCurrency } from './hooks/useCurrency';
import './i18n/config';
import './App.css';

function App() {
  const { t, ready } = useTranslation();
  const { currency, convertPrice, toggleCurrency } = useCurrency();
  const [selectedRegions, setSelectedRegions] = useState(['ontario', 'quebec']);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleRegionToggle = (region) => {
    setSelectedRegions(prev => 
      prev.includes(region) 
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };

  if (!ready || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header 
        currency={currency}
        onCurrencyToggle={toggleCurrency}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-12">
          <div>
            <OntarioBarChart 
              currency={currency}
              convertPrice={convertPrice}
            />
          </div>
          
          <div className="xl:col-span-1">
            <RegionalRadarChart 
              selectedRegions={selectedRegions}
              currency={currency}
              convertPrice={convertPrice}
            />
          </div>
        </div>

        <div>
          <div className="glass-card p-8 rounded-2xl fade-in">
            <RegionSelector 
              selectedRegions={selectedRegions}
              onRegionToggle={handleRegionToggle}
            />
          </div>
        </div>

        <footer className="mt-16 py-8 border-t border-white/20">
          <div className="text-center text-sm text-white/80">
            <p>
              {t('subtitle')} • {currency === 'CAD' ? 'CAD' : 'USD'} • 
              <span className="ml-1">
                {new Date().toLocaleDateString(
                  currency === 'fr' ? 'fr-CA' : 'en-CA'
                )}
              </span>
            </p>
            <p className="mt-2 text-white/60">
              * Synthetic data for demonstration purposes
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;