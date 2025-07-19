import { useState } from 'react';
import { exchangeRate } from '../data/meatPrices';

export const useCurrency = () => {
  const [currency, setCurrency] = useState('CAD');

  const convertPrice = (price) => {
    return currency === 'USD' ? price * exchangeRate : price;
  };

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'CAD' ? 'USD' : 'CAD');
  };

  return {
    currency,
    convertPrice,
    toggleCurrency,
    exchangeRate
  };
};