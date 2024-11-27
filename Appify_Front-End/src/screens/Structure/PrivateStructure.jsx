import React, { useContext, useEffect, useState } from 'react'
import Aside from '../../components/Aside/Aside';
import NavBar from '../../components/NavBar/NavBar';
import Modal from '../../components/Modal/Modal';
import { AppContext } from '../../context/AppContext';
import CompressedAside from '../../components/Aside/CompressedAside';
import logoResponsive from '../../assets/logoHeaderResponsive.svg'
import logoHeader from '../../assets/logoHeader.png'
import { useNavigate } from 'react-router-dom';


import { BiSolidDownArrow } from "react-icons/bi";

import { BiSolidRightArrow } from "react-icons/bi";

import { BiUpArrow } from "react-icons/bi";

import { FiPlus } from "react-icons/fi";

import { AiFillSetting } from "react-icons/ai";

import { ImArrowLeft2 } from "react-icons/im";

import { ImArrowRight2 } from "react-icons/im";
import { IoNotifications } from "react-icons/io5";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";

import { RiUserFill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { CiSettings } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { NavCreate } from '../../components/NavBar/NavCreate';

import './PrivateStructure.css'
import Overlay from '../../components/Overlay/Overlay';
import Cookies from 'js-cookie';

const PrivateStructure = ({ children }) => {

  const { userLoggedData } = useContext(AppContext)
  
  const { modal,setModal,setLogged,menuOptions,setMenuOptions } = useContext(AppContext);

  const [ profileMenu,setProfileMenu ] = useState(false)

  const [ deployAside,setDeployAside ] = useState(false);

  const [ openAside,setOpenAside ] = useState(false);

  const [isOpen, setIsOpen] = useState(null); 

  const [allowInteraction, setAllowInteraction] = useState(false); 

  //Esta parte
  useEffect(() => {
    const handleResize = () => {
      setAllowInteraction(window.innerWidth < 750); 
      
      if(window.innerWidth > 750){
        setIsOpen(null)
      }

      if(window.innerWidth < 750){
        setIsExpanded(false)
      }
    };

    handleResize(); 

    window.addEventListener('resize', handleResize); 

    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen); 
  };

  const closeMenu = () => {
    setIsOpen(false); 
  };


  const [isExpanded, setIsExpanded ] = useState(false)

  const expandDiv = () => {
    setIsExpanded(true); 
  };

  const contraerDiv = () =>{
    setIsExpanded(false)
  }


  const toggleExpansion = () => {
    setIsOpen(!isOpen); 
    setIsExpanded(!isExpanded); 
  };



  const navigate = useNavigate()

  function selectOption (option) {
    navigate(`${option.route}`)
    const updateData = menuOptions.map((opt)=>{
      if (opt.text === option.text) {
        if(opt.submenuOptions){
          
          console.log('tiene submenu')
          
          let updateArraySubOptions = opt.submenuOptions;

          for (let i = 0; i < updateArraySubOptions.length; i++) {
            if( i === 0 ){
              updateArraySubOptions[i].selected = true
              console.log(updateArraySubOptions[0].itemsOpen)
              if(updateArraySubOptions[0].itemsOpen !== undefined){
                console.log('existe')
                let itemsOptionsUpdate = updateArraySubOptions[i].items.map((subit)=>{
                  return {...subit,selected:false}
                })
                updateArraySubOptions[i].itemsOpen = true
                updateArraySubOptions[i].items = itemsOptionsUpdate
              }else{
                console.log('no existe')
              }
            } else {
              updateArraySubOptions[i].selected = false
              if(updateArraySubOptions[i].itemsOpen !== undefined){
                console.log('existe')
                let itemsOptionsUpdate = updateArraySubOptions[i].items.map((subit)=>{
                  return {...subit,selected:false}
                })
                updateArraySubOptions[i].itemsOpen = false
                updateArraySubOptions[i].items = itemsOptionsUpdate
              }else{
                console.log('no existe')
              }
            }
          }

          //actualizo la opcion cambio el estado de abuerto
          console.log({...opt, submenuOpen: !opt.submenuOpen, submenuOptions:updateArraySubOptions})
          return {...opt, submenuOpen: !opt.submenuOpen, submenuOptions:updateArraySubOptions}
        } else {
          return {...opt,selected:false}
        }
      }

      if(opt.submenuOpen){
        return {...opt,submenuOpen:false}
      } else {
        return {...opt,selected:false}
      }
    })    
    setMenuOptions(updateData)
    //setOpenMenuAnimated(false)
  }


  function selectOptionCompressed (option) {
    navigate(`${option.route}`)
    const updateData = menuOptions.map((opt)=>{
      if (opt.text === option.text) {
        if(opt.submenuOptions){
          
          console.log('tiene submenu')
          
          let updateArraySubOptions = opt.submenuOptions;

          for (let i = 0; i < updateArraySubOptions.length; i++) {
            if( i === 0 ){
              updateArraySubOptions[i].selected = true
            } else {
              updateArraySubOptions[i].selected = false
            }
          }

          //actualizo la opcion cambio el estado de abuerto
          return {...opt, submenuOpen: true, submenuOptions:updateArraySubOptions}
        } else {
          return {...opt,selected:false}
        }
      }

      if(opt.submenuOpen){
        return {...opt,submenuOpen:false}
      } else {
        return {...opt,selected:false}
      }
    })    
    setMenuOptions(updateData)
    //setOpenMenuAnimated(false)
  }

  
  function selectSubMenuOption (option_name, sub_option_name){
    const updateSubMenuOption = menuOptions.map((item)=>{
      if(item.text === option_name){
        let updateArray = [];
        item.submenuOptions.forEach(element => {
          if(element.name === sub_option_name){
            
            let objt_update;
            if(element.itemsOpen !== undefined){
              const itemsUpdate = element.items.map((it)=>{
                return {...it,selected:false}
              })
              objt_update = {...element, selected: true,itemsOpen:true,items:itemsUpdate }
            }else{
              objt_update = {...element, selected: true}
            }
            updateArray.push(objt_update)
          }else{
            
            let objt_update;
            if(element.itemsOpen !== undefined){
              const itemsUpdate = element.items.map((it)=>{
                return {...it,selected:false}
              })
              objt_update = {...element, selected: false,itemsOpen:false,items:itemsUpdate }
            }else{
              objt_update = {...element, selected: false}
            }
            updateArray.push(objt_update)
          }

        });
        return {...item, submenuOptions: updateArray}
      }
      return item
    })
    setMenuOptions(updateSubMenuOption);
    setOpenMenuAnimated(false)
  }



  function selectSubItem (section,suboption,item) {
    const updateMenu = menuOptions.map((menuOption)=>{
      if(menuOption.text === section){
        const updateSubMenuOptions = menuOption.submenuOptions.map((subMenuOpt)=>{
          if(subMenuOpt.name === suboption){
            const updateItems = subMenuOpt.items.map((subit)=>{
              if(subit.name === item){
                return {...subit,selected:true}
              }else{
                return {...subit,selected:false}
              }
            })
            return {...subMenuOpt,items:updateItems}
          }else{
            return subMenuOpt
          }
        })
        return {...menuOption,submenuOptions:updateSubMenuOptions}
      }else{
        return menuOption
      }
    })
    setMenuOptions(updateMenu)
    
  }



  function RenderIcon (option) {
    if(option.submenuOpen === true){
      return <BiUpArrow/>
    }else{
      return <BiSolidDownArrow/>
    }
  }


  function logOut () {
    Cookies.remove('tkn')
    //borrar datos del localstorage
    setLogged(false)
  }

  const [isCreateVisible, setIsCreateVisible]=useState(false);
  const toggleCreate = () =>{
    setIsCreateVisible(!isCreateVisible)
  }

  return (
    <>
    <main className={`private-main ${allowInteraction ? 'private-main-contract' : 'private-main-expanded'}`}>
      {
        !allowInteraction ?
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
                                <>
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
                                  {
                                    item.itemsOpen === true ?
                                    <div className='subitem-menu'>
                                      {
                                        item.items.map((subitem)=>
                                          <div
                                          onClick={()=>{ 
                                            selectSubItem(option.text,item.name,subitem.name)
                                            navigate(`${subitem.route}`)
                                          }}
                                          style={{fontSize:12}}
                                          className={subitem.selected  === true ? 'private-aside-extended-menu-item-submenu-item-cta' : 'private-aside-extended-menu-item-submenu-item'}
                                          >
                                            <BiSolidRightArrow style={{fontSize:10}}/>
                                            <span>{subitem.name}</span>
                                            
                                          </div>
                                        )
                                      }
                                    </div>
                                    :
                                    <></>
                                  }
                                </>
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
              {!isCreateVisible && (
                <div className='aside-create-container' onClick={toggleCreate}>
                  <div className='aside-create-icon'>
                    <FiPlus />
                  </div>
                  <span>Crear</span>
                </div>
              )}
                {isCreateVisible && (
                    <NavCreate onHeaderClick={toggleCreate} />
                )}
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
        :
        <>
          {
            isOpen ?
            <div style={{height:"100vh",width:"100%",backgroundColor:"#0000006a",zIndex:100,position:"fixed"}} onClick={()=>{setIsOpen(false)}}></div>
            :
            <></>
          }
          <div className={isOpen === null ? `menu-close` : `menu ${isOpen ? 'open' : 'close'}`}>
              <img src={logoHeader} className={'aside-logo'}/>
              <MdClose style={{position:"absolute",top:7,right:7,fontSize:23,color:"grey"}} onClick={closeMenu}/>
              <div className='private-aside-extended-menu'>
                {
                  menuOptions.map((option)=>
                    <>
                      {
                        option.text === 'Inicio' ?
                        <></>
                        :
                        <>
                          <div 
                          onClick={()=>{
                            //console.log('hola')
                            selectOption(option)
                            setIsOpen(false)
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
                                        console.log('jolaaa')
                                        setIsOpen(false)
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
                      }
                    </>
                  )
                }
              </div>
              
          </div>
        </>
      }
      <div 
      className={ allowInteraction ? 'private-main-container-responsive private-main-container' : (isExpanded ? 'private-main-container-expanded private-main-container' : 'private-main-container-contract private-main-container')}
      >
        <div className='private-header'>
          {/*mobile components */}
          {
            
            allowInteraction ?
            <>
              <IoMenu style={{fontSize:"30px"}} onClick={toggleMenu} disabled={!allowInteraction}/>
              <img src={logoResponsive} style={{height:"30px"}}/>
              <div style={{
                position:"relative",fontSize:25,color:"#2DD99C"}}>
                <div style={{height:13,width:13,backgroundColor:"#F93C65",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:6,position:"absolute",right:0,top:0,color:"#FFFFFF"}}>
                  <span>1</span>
                </div>
                <IoNotifications/>
              </div>
            </>
            :
            <></>
            
          }
          {/*desktop components*/}
          <div className='private-header-col'>
            <div style={{display:"flex",alignItems:"center",border:"1px solid #97979747",padding:"0px 5px",borderRadius:30,overflow:"hidden",width:"300px",backgroundColor:"#F5F6FA"}}>
              <div style={{width:30,display:"flex",justifyContent:"center",fontSize:20,color:"#979797"}}>
                <CiSearch/>
              </div>
              <input className='custom-input ' placeholder='Buscar'/>
            </div>
          </div>
          <div className='private-header-col'>
            <div style={{
              position:"relative",fontSize:25,color:"#2DD99C"}}>
              <div style={{height:13,width:13,backgroundColor:"#F93C65",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:6,position:"absolute",right:0,top:0,color:"#FFFFFF"}}>
                <span>1</span>
              </div>
              <IoNotifications/>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:7,boxSizing:"border-box",cursor:"pointer",
            //border:"1px solid red"
            }} onClick={()=>{setProfileMenu(!profileMenu)}}>
              <div className='private-header-user-container'>
                <div className='private-header-user-img'></div>
                <div style={{display:"flex",flexDirection:"column",gap:4,fontSize:11}}>
                  <span style={{fontSize:12,fontWeight:600}}>{ userLoggedData.data.nombre } </span>
                  {
                    userLoggedData.data.cargo ?
                    <span style={{fontWeight:300}}>{userLoggedData.data.cargo}</span>
                    :
                    <span style={{fontWeight:300}}>Invitado</span>

                  }
                </div>
              </div>
              <div  style={{fontSize:20
                //,border:"1px solid red"
                ,height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                {
                  profileMenu === false ?
                  <IoIosArrowDropdown/>
                  :
                  <IoIosArrowDropup/>
                }
              </div>
            </div>
          </div>
          {
            profileMenu === true ?
            <div className='private-header-menu'>
              <div onClick={()=>{
                setProfileMenu(false)
                navigate('/profile'
              )}} className='private-header-menu-item'>
                <RiUserFill/>
                <span>Perfil</span>
              </div>
              <div className='private-header-menu-item'>
                <FaCheckCircle/>
                <span>Permisos</span>
              </div>
              <div onClick={()=>{
                logOut()
              }} className='private-header-menu-item'>
                <FaCheckCircle/>
                <span>Cerrar sesion</span>
              </div>
            </div>
            :
            <></>
          }

        </div>
        <div className='private-main-children-container'>
          {children}
        </div>
        {
          allowInteraction ?
          <>
            <div className='private-bottom-nav'>
              <IoHomeOutline/>
              <CiSearch/>
              <div style={{height:45,width:45,borderRadius:"50%",backgroundColor:"white",display:"flex",alignItems:"center",justifyContent:"center",color:"#006F76",fontWeight:"800",position:"relative",bottom:"10px",border:"1px solid grey"}}>
                <GoPlus/>
              </div>
              <CiSettings/>
              <FaRegUser/>
            </div>
          </>
          :
          <></>
        }
      </div>

      {
        modal === true ?
        <Overlay/>
        :
        <></>
      }

    </main>
    </>
  );
}

export default PrivateStructure