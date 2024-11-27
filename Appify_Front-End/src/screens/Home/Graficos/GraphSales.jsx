
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
    labels: ['1 Abr', '2 Abr', '3 Abr', '4 Abr', '5 Abr', '6 Abr', '7 Abr', '8 Abr', '9 Abr', '10 Abr', '11 Abr', '12 Abr', '13 Abr', '14 Abr', '15 Abr'],
    datasets: [
      {
        label: 'Ventas 2024',
        data: [65, 59, 80, 81, 56, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4
      }
    ]
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        display: false
      },
      grid: {
        drawBorder: false,
        color: 'rgba(0,0,0,0.1)'
      }
    },
    x: {
      grid: {
        drawBorder: false,
        color: 'rgba(0,0,0,0.1)'
      }
    }
  },
  plugins: {
    legend: {
      display: false
    },
    title: {
      display:false,
      text: 'Ventas\nDel 1 al 15 de Abril de 2024'
    }
  }
};


export const GraphSales = () => {
  return (
    <div className="graph-container">
      <Line data={data} options={options} />
    </div>
  );
};

