import { Bar } from 'react-chartjs-2';

export const GraficoFacturacion = () => {
  const data = {
    labels: ['Conciliado', 'Pendiente'],
    datasets: [
      {
        data: [25, 75], // Porcentajes (por ejemplo, 25% y 75%)
        backgroundColor: ['rgba(0, 182, 155, 1)', 'rgba(253, 115, 16, 1)'],
        barPercentaje: 0.3,
        categoryPercentage:0.3,
        borderRadius:100,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio:true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          callback: (value) => `${value}%`, // Agrega el símbolo de porcentaje
        },
      },
    },
  };

  return (
    <div style={{ maxHeight: '300px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};
