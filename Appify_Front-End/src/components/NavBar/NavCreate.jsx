import NewFileSubMenu from './NewFileSubMenu';
import { useNavigate } from 'react-router-dom';
export const NavCreate = ({onHeaderClick}) =>{
    const navigate = useNavigate()
    return(
        <>
        <div className="container-create">
            <div className="header-create" onClick={onHeaderClick}>
            <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15.3306" r="15" fill="url(#paint0_linear_1860_18747)"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M8.07666 15.3311C8.07666 14.6938 8.59325 14.1772 9.23051 14.1772H20.769C21.4062 14.1772 21.9228 14.6938 21.9228 15.3311C21.9228 15.9683 21.4062 16.4849 20.769 16.4849H9.23051C8.59325 16.4849 8.07666 15.9683 8.07666 15.3311Z" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M15 8.40771C15.6373 8.40771 16.1539 8.92431 16.1539 9.56156V21.1C16.1539 21.7373 15.6373 22.2539 15 22.2539C14.3628 22.2539 13.8462 21.7373 13.8462 21.1V9.56156C13.8462 8.92431 14.3628 8.40771 15 8.40771Z" fill="white"/>
                <defs>
                <linearGradient id="paint0_linear_1860_18747" x1="0.000314744" y1="15.3304" x2="30.0006" y2="15.3304" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FDB738"/>
                <stop offset="1" stopColor="#FD4238"/>
                </linearGradient>
                </defs>
                </svg>

            <h1 className="title-create">Crear</h1>
            </div>
            <div className="submenu-create">
               <div className='sub-create' onClick={()=>{navigate('/quotes/new')}}>
               <svg className='spanSub' xmlns="http://www.w3.org/2000/svg" width="7" height="9" viewBox="0 0 7 9" fill="none">
                <path d="M5.84212 3.68294C6.40671 4.08135 6.40671 4.91865 5.84212 5.31706L1.82656 8.15064C1.16413 8.61808 0.250001 8.14433 0.250001 7.33358L0.250001 1.66642C0.250001 0.855667 1.16413 0.381915 1.82656 0.849358L5.84212 3.68294Z" fill="#047679"/>
                </svg>
                <span className='spanSub'>Proyecto</span>
               </div>
               <div className='sub-create' onClick={()=>{navigate('/clients/new')}}>
               <svg className='spanSub' xmlns="http://www.w3.org/2000/svg" width="7" height="9" viewBox="0 0 7 9" fill="none">
                    <path d="M5.84212 3.68294C6.40671 4.08135 6.40671 4.91865 5.84212 5.31706L1.82656 8.15064C1.16413 8.61808 0.250001 8.14433 0.250001 7.33358L0.250001 1.66642C0.250001 0.855667 1.16413 0.381915 1.82656 0.849358L5.84212 3.68294Z" fill="#047679"/>
                </svg>
               <span className='spanSub'> Cliente</span>
                </div>
                <div className='sub-create' onClick={()=>{navigate('/sale_invoices/new')}}>
                <svg className='spanSub'xmlns="http://www.w3.org/2000/svg" width="7" height="9" viewBox="0 0 7 9" fill="none">
                    <path d="M5.84212 3.68294C6.40671 4.08135 6.40671 4.91865 5.84212 5.31706L1.82656 8.15064C1.16413 8.61808 0.250001 8.14433 0.250001 7.33358L0.250001 1.66642C0.250001 0.855667 1.16413 0.381915 1.82656 0.849358L5.84212 3.68294Z" fill="#047679"/>
                </svg>
                <span className='spanSub'>Factura</span>
                </div>
                <div className='sub-create'onClick={()=>{navigate('/work_orders/new')}} >
                <svg className='spanSub' xmlns="http://www.w3.org/2000/svg" width="7" height="9" viewBox="0 0 7 9" fill="none">
                <path d="M5.84212 3.68294C6.40671 4.08135 6.40671 4.91865 5.84212 5.31706L1.82656 8.15064C1.16413 8.61808 0.250001 8.14433 0.250001 7.33358L0.250001 1.66642C0.250001 0.855667 1.16413 0.381915 1.82656 0.849358L5.84212 3.68294Z" fill="#047679"/>
                </svg>
                <span className='spanSub'>Orden de trabajo</span>
                </div>
            </div>
        </div>
        </>
    )
}