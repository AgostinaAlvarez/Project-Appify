// import { Button } from 'antd';
// import React, {useState, useEffect} from 'react'
// import { FiFilter } from "react-icons/fi";
// import { IoReloadOutline } from "react-icons/io5";


// const Filter = ({children, onResetFilters}) => {
//     const [isFilterOpen, setIsFilterOpen] = useState(false);
//     const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//     useEffect(() => {
//       const handleResize = () => {
//         setIsMobile(window.innerWidth <= 768);
//       };
//       window.addEventListener('resize', handleResize);
//       return () => {
//         window.removeEventListener('resize', handleResize);
//       };
//     }, []);
//     const handleResetFilters = () => {
//       if (onResetFilters) {
//         onResetFilters();
//       }
//     };
//     const toogleMenu = () =>{
//       setIsFilterOpen(!isFilterOpen)
//     }

//   return (
//     <div className={`filter-menu ${isFilterOpen? 'open' : ''}`}>
//         <div className='filter-menu-item filter-icon' onClick={toogleMenu}>
//           <FiFilter style={{fontSize:18}}/>
//           <span>Filtrar</span>
//         </div>
    
//         <div className={`filter-children ${isFilterOpen || !isMobile ? 'visible' : 'hidden'}`}>
//             {children}
//                <div className='filter-menu-item'>
//           <Button danger on onClick={handleResetFilters} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
//             <IoReloadOutline/>
//             <span>Borrar filtros</span>
//           </Button>
//         </div>
//           </div>
       
     
//     </div>
//   )
// }

// export default Filter
import { Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { FiFilter } from "react-icons/fi";
import { IoReloadOutline } from "react-icons/io5";

const Filter = ({ children, onResetFilters, filters, onChangeFilter }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleResetFilters = () => {
        if (onResetFilters) {
            onResetFilters();
        }
    };

    const toggleMenu = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    return (
        <div className={`filter-menu ${isFilterOpen ? 'open' : ''}`}>
            <div className='filter-menu-item filter-icon' onClick={toggleMenu}>
                <FiFilter style={{ fontSize: 18 }} />
                <span>Filtrar</span>
            </div>

            <div className={`filter-children ${isFilterOpen || !isMobile ? 'visible' : 'hidden'}`}>
                {children}
                <div className='filter-menu-item'>
                    <Button danger onClick={handleResetFilters} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                        <IoReloadOutline />
                        <span>Borrar filtros</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Filter;
