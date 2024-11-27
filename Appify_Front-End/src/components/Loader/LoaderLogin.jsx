import React, { useState, useEffect } from 'react';
import { Progress } from 'antd';
 import LogoSplash from '../../assets/assets/logoSplash.svg'
const ProgressBar = ({ loading, progress }) => {

  return (
    <div className='progress-container'>
      {loading && (
        <>
          <div>
          <img src={LogoSplash} alt='mysvg' className='logo-splash'/>
         </div>
        <Progress 
          percent={progress} 
          status="active" 
          showInfo={true} 
          strokeWidth={15} 
          className='progress-bar'
          strokeColor={{
            '0%': '#FDB738',
            '100%': '#FD4238',
          }}
        />
        </>
      
      )}
    </div>
  );
};

export default ProgressBar;
