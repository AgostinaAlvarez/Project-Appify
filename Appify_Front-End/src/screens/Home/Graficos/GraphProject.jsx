import React, {useState,useRef, useContext,useEffect} from "react";
import { Document, Page, Text, View, Image, PDFDownloadLink , StyleSheet, Svg, Path, Defs, LinearGradient, Stop} from '@react-pdf/renderer';
import { FaFileDownload } from "react-icons/fa";
import LogoReporte from '../../../assets/assets/logoReporte.png'
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
  import { Doughnut } from "react-chartjs-2";
  import { AppContext } from "../../../context/AppContext";
import { Button } from "antd";
import { Header } from "antd/es/layout/layout";
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
  const styles = StyleSheet.create({
    page: {
      display:'flex',
      flexDirection: 'column',
      justifyContent:'space-between',
      width: '100%',
      height: '100%',
      padding: 0,
      margin: 0,
    },
    header:{
      width:'100%',
      marginBottom:20,
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor:'#006F76'
    },
    logoHeader:{
      display:' flex',
      width: 135.762,
      height: 45,
      justifyContent:' center',
      alignItems:' center',
      gap: 4.665,
      marginTop:15,
      marginBottom:15,
    },
    title: {
      color: '#000',
      fontWeight: 700,
      fontSize: 24,
      marginBottom: 10,
      textAlign:'center',
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 20,
      marginHorizontal:50,
      marginTop:15,
    },
    chartContainer: {
      width: 200,
    },
    chart: {
      width: 'auto',
      height: 150,
    },
    divDatosProyecto:{
      display: 'flex',
      flexDirection:'row',
      margin:' auto',
      justifyContent: 'space-between',
      gap:50,
      marginTop:50,
    },
    datos1:{
      display:' flex',
      flexDirection:'row',
      alignItems: 'center',
      padding: 8,
      bordeRadius: 6,
    },
    acept:{
      display:' flex',
      flexDirection: 'column',
    },
    datosAceptado:{
      width:4,
      height:50,
      borderRadius:4,
      backgroundColor:'#00B69B',
      marginRight: 10,
    },
    datosEnProceso:{
      width:4,
      height:50,
      borderRadius:4,
      backgroundColor:'#ff7a00',
      marginRight: 10,
    },
    datosPendiente:{
      width:4,
      height:50,
      borderRadius:4,
      backgroundColor:"#d94868",
      marginRight: 10,
    },
    divFooter:{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      top:800,
      display:'flex',
      alignItems:"center",
    },
    footer: {
     
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      color:'#979797'
    },
    graficoProyecto:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-around',
    },
    textFooter:{
      fontSize: 14,
      fontWeight: 700,
    },
    textFooter2:{
      fontSize: 14,
      fontWeight: 700,
      marginLeft:2,
    }
  });
export const GraphProject = ({period, startDate, endDate}) =>{
  const { proyectos } = useContext(AppContext);
  const [projectData, setProjectData] = useState({ accepted: 0, inProgress: 0, pending: 0 });
  const chartRef= useRef(null);
  const [chartImage,setChartImage]=useState('')
  //Calculo el periodo
  const getPeriod = (period) => {
    const now = new Date();
    let startDate;
    if (period === "mensual") {
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    } else if (period === "trimestral") {
      startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
    } else if (period === "anual") {
      startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    } else {
      startDate = now;
    }
    return { startDate, endDate: now };
  };
    useEffect(() => {
      const calculatePercentages = () => {
          const {startDate,endDate}= getPeriod(period)

          const filteredProjects = proyectos.filter(proyecto => {
              const projectDate = new Date(proyecto.fecha);
              return projectDate >= startDate && projectDate <= endDate;
          });

          const total = filteredProjects.length;

          const accepted = filteredProjects.filter(proyecto => proyecto.estado === 'Aceptado').length;
          const inProgress = filteredProjects.filter(proyecto => proyecto.estado === 'En proceso').length;
          const pending = filteredProjects.filter(proyecto => proyecto.estado === 'Pendiente').length;
            setProjectData({
              accepted: total > 0 ? (accepted / total) * 100 : 0,
              inProgress: total > 0 ? (inProgress / total) * 100 : 0,
              pending: total > 0 ? (pending / total) * 100 : 0,
            });
      };
      calculatePercentages();
    }, [period, proyectos]);
    useEffect(() => {
      if (chartRef.current) {
        const chartInstance = chartRef.current;
        const chartBase64Image = chartInstance.toBase64Image();
        setChartImage(chartBase64Image);
      }
    }, [projectData]);
    const data = {
        datasets: [
          {
            data: [projectData.accepted, projectData.inProgress, projectData.pending],
            backgroundColor: [
              "rgba(0, 182, 155, 1)",
              "#FF7A00",
              "rgba(249, 60, 101, 1)",
            ],
            borderColor:[
                "rgba(0, 182, 155, 1)",
                "#FF7A00",
                "rgba(249, 60, 101, 1)",
            ]
          },
          ],
    };
      
    const options = {
        responsive: true,
        maintainAspectRatio: true,
        rotation: -90, 
        circumference: 180, 
         cutout: "65%",
         plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: false,
              text: '-',
            },
          },
    };
 
    const PdfDocument = ({chartImage})=>(
    <Document>
        <Page size="A4" style={styles.page}>
          <View>
              <View style={styles.header}>
             <Image src={LogoReporte} style={styles.logoHeader}></Image>
              </View>
              <View style={styles.title}>
                  <Text>Reporte de proyectos</Text>   
              </View>
              <View style={styles.subtitle}>
                <Text>Periodo: Desde el {startDate} al {endDate}</Text>
              </View>
              <View style={styles.graficoProyecto}>
                <Image src={chartImage} style={styles.chart}/>
              </View>
              <View style={styles.divDatosProyecto}>
                <View style={styles.datos1}>
                  <View style={styles.datosAceptado}></View>
                  <View style={styles.acept}>
                    <Text>Aceptado</Text>
                    <Text style={styles.porcent}>{projectData.accepted.toFixed(2)}%</Text>
                  </View>
                </View>
                <View style={styles.datos1}>
                  <View style={styles.datosEnProceso}></View>
                  <View style={styles.acept}>
                    <Text>En proceso</Text>
                    <Text style={styles.porcent}>{projectData.inProgress.toFixed(2)}%</Text>
                  </View>
                </View>  
                <View style={styles.datos1}>
                  <View style={styles.datosPendiente}></View>
                  <View style={styles.acept}>
                    <Text>Pendiente</Text>
                    <Text style={styles.porcent}>{projectData.pending.toFixed(2)}%</Text>
                  </View>
                </View>
              </View>
            
              <View style={styles.divFooter} >
                <View style={styles.footer}>
                  <Text style={styles.textFooter}>Creado con </Text>
                <Svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
                <Path d="M18.5975 13.4945L11.4813 1.1686C10.582 -0.389532 8.33293 -0.389532 7.43367 1.1686L0.316496 13.4945C-0.582762 15.0526 0.54131 17 2.33982 17H2.34664L7.72758 7.68043C8.18694 6.8853 9.20299 6.6128 9.99811 7.07216C10.7932 7.53152 11.0657 8.54757 10.6064 9.34269L6.18502 17H9.34508L12.0935 12.24C12.5528 11.4448 13.5689 11.1723 14.364 11.6317C15.1591 12.0911 15.4316 13.1071 14.9722 13.9022L13.1835 17H16.5732C18.3717 17 19.4968 15.0526 18.5965 13.4945H18.5975Z" fill="#979797"></Path></Svg>
                <Text style={styles.textFooter2}>Appify</Text>
                </View>
              </View>
          </View>
        </Page>
      </Document>
    )
    return(
        <>
      <PDFDownloadLink document={<PdfDocument chartImage={chartImage}/>} fileName="reporteProyectos.pdf">
      <Button 
        type='primary' 
        style={{display:"flex",alignItems:"center",justifyContent:"center", marginTop:10}}>
        <FaFileDownload/>
      </Button>          
      </PDFDownloadLink>
        <div className="graficoProyecto">
          <div className="graficoProject">
            <Doughnut data={data} options={options} ref={chartRef}/>
          </div>
         <div className='datosProyecto'>
                <div className='datos1'>
                  <div className='datosAceptado'></div>
                  <div className='acept'>
                      <p>Aceptado</p>
                      <span className='porcent'>{projectData.accepted.toFixed(2)}%</span>
                  </div>
                </div>
                <div className='datos1'>
                  <div className='datosEnproceso'></div>
                  <div className='acept'>
                    <p>En proceso</p>
                    <span className='porcent'>{projectData.inProgress.toFixed(2)}%</span>
                  </div>
            
                </div>
                <div className='datos1'>
                  <div className='datosPendiente'></div>
                  <div className='acept'>
                  <p>Pendiente</p>
                  <span className='porcent'>{projectData.pending.toFixed(2)}%</span>
                  </div>

                </div>
          </div>
          <div className='datosProyetosMobile'>
              <div className='datosMobile'>
                <div className='aceptado'>
                  <div className='dato1'>
                      <div className='aceptadoMobile'></div>
                      <p>Aceptado</p>  
                  </div>
                  <span>{projectData.accepted.toFixed(2)}%</span>            
                </div>
                <div className='enProceso'>
                   <div>
                      <div className='enprocesoMobile'></div>
                      <p>En proceso</p>  
                  </div>
                  <span>{projectData.inProgress.toFixed(2)}%</span>            
                </div>
                <div className='pendientes'>
                   <div>
                      <div className='pendienteMobile'></div>
                      <p>Pendiente</p>  
                  </div>
                  <span>{projectData.pending.toFixed(2)}%</span>            
                </div>
              </div>
          </div>
        </div>
        </>
    )
}


