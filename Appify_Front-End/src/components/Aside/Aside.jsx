import React, { useContext, useEffect, useState } from 'react'
import logoHeader from '../../assets/logoHeader.png';
import { AppContext } from '../../context/AppContext';


const Aside = () => {
  const { menuOptions } = useContext(AppContext);
  const [isExpanded, setIsExpanded ] = useState(false)

  
  return (
    <>
        <aside className={`caja ${isExpanded ? 'expandir' : 'contraer'}`}>
          {
            isExpanded ?
            <div className='private-aside-extanded'>
              <img src={logoHeader} className={'aside-logo'}/>
              <div className='private-aside-extended-menu'>
                {
                  menuOptions.map((option)=>
                    <>
                      <div 
                      onClick={()=>{
                        //console.log('hola')
                        selectOption(option)
                      }}
                      className='private-aside-extended-menu-item' style={option.submenuOptions && option.submenuOpen === true ? {borderRadius:"3px 3px 0px 0px"} : {}} >
                        <div style={{display:"flex",alignItems:"center",gap:15}}>
                          {option.icon}
                          <span>{option.text}</span>
                        </div>
                        {
                          option.submenuOptions ?
                          <>{RenderIcon(option)}</>
                          :
                          <></>
                        }
                      </div>
                      {
                        option.submenuOptions ?
                        <>
                          {
                            option.submenuOpen === true ?
                            <div className='private-aside-extended-menu-item-submenu'>
                              {
                                option.submenuOptions.map((item)=>
                                  <div 
                                  onClick={()=>{
                                    navigate(`${item.route}`)
                                    console.log(item.route)
                                    selectSubMenuOption(option.text, item.name, item.route)
                                  }}
                                  //className={ 'private-aside-extended-menu-item-submenu-item'}
                                  className={item.selected  === true ? 'private-aside-extended-menu-item-submenu-item-cta' : 'private-aside-extended-menu-item-submenu-item'}
                                  >
                                    <BiSolidRightArrow style={{fontSize:10}}/>
                                    <span>{item.name}</span>
                                  </div>
                                )
                              }
                            </div>
                            :
                            <></>
                          }
                        </>
                        :
                        <></>
                      }
                    </>
                  )
                }
              </div>
              <div className='private-aside-extended-footer'>
                <div className='aside-create-container'>
                  <div className='aside-create-icon'>
                    <FiPlus/>
                  </div>
                  <span>Crear</span>        
                </div>
                <div className='aside-config-container'>
                  <AiFillSetting/>
                  <span>Configurar empresa</span>
                </div>
              </div>
            </div>
            :
            <div className='private-aside-contract'>
              <div className='private-aside-contract-icons-container'>
                <img src={logoResponsive} style={{width:"45px",marginBottom:20}}/>
                {
                  menuOptions.map((option)=> 
                    <div onClick={()=>{
                      selectOptionCompressed(option)
                      toggleExpansion()
                    }}>
                      {option.icon}
                    </div>
                  )
                }
              </div>
            </div>
          }
          <div onClick={toggleExpansion}  className={`private-aside-btn ${isExpanded ? 'private-aside-btn-expanded' : ''}`}>
            {
              isExpanded ?
              <ImArrowLeft2/>
              :
              <ImArrowRight2/>
            }
          </div>
        </aside>
    </>
  )
}

export default Aside