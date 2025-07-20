import { useTranslation } from 'react-i18next';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { meatTypes, ontarioData } from '../data/meatPrices';
import { formatPrice } from '../utils/formatters';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OntarioBarChart = ({ currency, convertPrice }) => {
  const { t, i18n } = useTranslation();

  const data = {
    labels: meatTypes.map(meat => t(`meat-types.${meat}`)),
    datasets: [
      {
        label: t('charts.ontario-prices'),
        data: meatTypes.map(meat => convertPrice(ontarioData[meat])),
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderColor: [
          'rgb(239, 68, 68)',
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
        ],
        borderWidth: 2,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: t('charts.ontario-prices'),
        font: { size: 16, weight: 'bold' },
        color: '#374151',
      },
      tooltip: {
        callbacks: {
          label: context => {
            const meat = meatTypes[context.dataIndex];
            const price = formatPrice(context.parsed.y, currency, i18n.language);
            return t('accessibility.price-tooltip', {
              meat: t(`meat-types.${meat}`),
              price,
            });
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: t('charts.price-axis', { currency }),
          font: { weight: 'bold' },
        },
        ticks: {
          callback: value => formatPrice(value, currency, i18n.language),
        },
      },
      x: {
        title: {
          display: true,
          text: '', // optional—remove if you don't need an X-axis title
        },
      },
    },
    animation: { duration: 800, easing: 'easeInOutQuart' },
  };

  return (
    <div className="glass-card p-8 rounded-2xl fade-in">
      {/* makes a 16:9 box up to 800px wide, centered */}
      <div className="w-full max-w-[800px] mx-auto aspect-video">
        <Bar
          data={data}
          options={options}
          aria-label={t('accessibility.chart-description')}
        />
      </div>
    </div>
  );
};

export default OntarioBarChart;
