import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const BasicLayout = ({ children }) => {
  const [openMenuAnimated, setOpenMenuAnimated] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 720) {
        setOpenMenuAnimated(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className={openMenuAnimated ? 'overlay' : 'overlay-none'}></div>
      <nav className='nav'>
        <div onClick={() => setOpenMenuAnimated(true)}>Menu</div>
        <div>Icono</div>
      </nav>
      <aside className={openMenuAnimated ? 'aside-cta-animated' : 'aside'}>
        <button className='aside-close-btn' onClick={() => setOpenMenuAnimated(false)}>Cerrar</button>
      </aside>
      <section className='main-content'>
        {children}
      </section>
    </>
  );
};

const NotFound = () => {
  return (
    <div className='not-found'>
      Not Found
    </div>
  );
};

const PrincipalStructure = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <Routes>
            <Route path="/" element={<BasicLayout><div>Home Screen</div></BasicLayout>} />
            <Route path="/quotes" element={<BasicLayout><div>Proyectos</div></BasicLayout>} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        }
      />
      <Route path="/not-found" element={<NotFound />} />
    </Routes>
  );
};

export default PrincipalStructure;
