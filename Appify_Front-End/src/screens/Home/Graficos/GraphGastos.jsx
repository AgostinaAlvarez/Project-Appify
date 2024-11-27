

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const GraphExpenses = () =>{
  const gastosone = 1234564;
  const gastosTwo = 546123;
  const gastosThree = 450000;
  const gastosFour = 98651;
  const dataTwo = {
    datasets: [
      {
        data: [gastosone, gastosTwo, gastosThree, gastosFour],
        backgroundColor: [
          "rgba(138, 128, 255, 1)",
          "rgba(255, 195, 0, 1)",
          "rgba(253, 115, 56, 1)",
          "rgba(249, 60, 101, 1)",
        ],
        borderColor: [
          "rgba(138, 128, 255, 1)",
          "rgba(255, 195, 0, 1)",
          "rgba(253, 115, 56, 1)",
          "rgba(249, 60, 101, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const optionsShadowChart = {
    cutout: "90%",
  };

  const optionsMainChart = {
    cutout: "65%", // Tamaño del gráfico principal
  };
  const dataShadowChart = {
    datasets: [
      {
        data: [100], // Valor fijo para el gráfico de sombreado
        backgroundColor: ["rgba(0, 0, 0, 0.1)"], // Color del sombreado
        borderWidth: 0, // Sin bordes
      },
    ],
  };

    return(
        <>
        <div className="divGastos">
        <div className="graficoGastos containerPie">
            <Pie
              data={dataTwo}
              options={optionsMainChart}
              style={{ position: "absolute", top: 0, left: 0, padding: 12 }}
            />
            <Pie data={dataShadowChart} options={optionsShadowChart} />
        </div>
        <div className="gastosDetail">
            <div className="column1">
                <div className="gasto1">
                  <div className="gasto1Barra"></div>
                  <div className="gasto1Detail">
                    <p>Gastos Administrativos</p>
                    <span>$234.20</span>
                </div>
              </div>
                  {/* 2 */}
              <div className="gasto2">
                  <div className="gasto2Barra"></div>
                  <div className="gasto2Detail">
                    <p>Gastos Administrativos</p>
                    <span>$234.20</span>
                </div>
              </div>

            </div>
            <div className="column2">
                 <div className="gasto3">
                  <div className="gasto3Barra"></div>
                  <div className="gasto3Detail">
                    <p>Gastos Administrativos</p>
                    <span>$234.20</span>
                </div>
              </div>
              <div className="gasto4">
                  <div className="gasto4Barra"></div>
                  <div className="gasto4Detail">
                    <p>Gastos Administrativos</p>
                    <span>$234.20</span>
                </div>
              </div>
            </div>
        </div>

        </div>

     
        </>
    )
}