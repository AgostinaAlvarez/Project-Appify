import React from 'react';
import { Button } from 'antd';
import { FaFileDownload } from 'react-icons/fa';
import exportToExcel from '../../utils/excel/exportToExcel';
export const ReportExcel = ({data,fileName,columns})=>{
    return(
        <Button type='primary' 
        onClick={()=>exportToExcel(data,fileName,columns)}
        style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,padding:"17px 14px"}}>
        <FaFileDownload/>
        <span>Reporte</span>
        </Button>
    )
}