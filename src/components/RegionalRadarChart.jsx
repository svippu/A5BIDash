import { useTranslation } from 'react-i18next';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { meatTypes, regionalData } from '../data/meatPrices';
import { formatPrice, getChartColors } from '../utils/formatters';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RegionalRadarChart = ({ selectedRegions, currency, convertPrice }) => {
  const { t, i18n } = useTranslation();

  const data = {
    labels: meatTypes.map(meat => t(`meat-types.${meat}`)),
    datasets: selectedRegions.map((region, index) => {
      const colors = getChartColors(index);
      return {
        label: t(`regions.${region}`),
        data: meatTypes.map(meat => convertPrice(regionalData[region][meat])),
        backgroundColor: colors.bg,
        borderColor: colors.border,
        borderWidth: 2,
        pointBackgroundColor: colors.border,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: colors.border,
        pointRadius: 4,
        pointHoverRadius: 6,
      };
    }),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: t('charts.regional-comparison'),
        font: { size: 16, weight: 'bold' },
        color: '#374151',
      },
      legend: {
        position: 'bottom',
        labels: { usePointStyle: true, padding: 20 },
      },
      tooltip: {
        callbacks: {
          label: context => {
            const meat = meatTypes[context.dataIndex];
            const price = formatPrice(context.parsed.r, currency, i18n.language);
            const region = context.dataset.label;
            return `${region} – ${t(`meat-types.${meat}`)}: ${price}`;
          },
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        title: {
          display: true,
          text: t('charts.price-axis', { currency }),
        },
        ticks: {
          callback: value => formatPrice(value, currency, i18n.language),
        },
      },
    },
    animation: { duration: 800, easing: 'easeInOutQuart' },
  };

  if (selectedRegions.length === 0) {
    return (
      <div className="glass-card p-8 rounded-2xl fade-in">
        <div className="aspect-square w-full max-w-[800px] mx-auto flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-gray-600 text-lg font-medium">
              {t('charts.select-regions')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-8 rounded-2xl fade-in">
      <div className="aspect-square w-full max-w-[800px] mx-auto">
        <Radar
          data={data}
          options={options}
          aria-label={t('accessibility.chart-description')}
        />
      </div>
    </div>
  );
};

export default RegionalRadarChart;
