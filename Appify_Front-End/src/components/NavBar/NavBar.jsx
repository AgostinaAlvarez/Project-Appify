import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { FaGift } from "react-icons/fa";
import { FaInbox } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import NewFileSubMenu from './NewFileSubMenu';
import NotificationsSubMenu from './NotificationsSubMenu';



const NavBar = ({setOpenMenuAnimated}) => {
  
  const [ openNewFileSubMenu, setOpenNewFileSubMenu ] = useState(false)
  const [ openNotificationSubMenu,setOpenNotificationSubMenu ] = useState(false)

  const renderSubMenuNewFile = () => {
    return openNewFileSubMenu === true ?  <NewFileSubMenu/> : <></>
  }

  const renderSubMenuNotifications = () => {
    return openNotificationSubMenu === true ? <NotificationsSubMenu/> : <></>
  }

  return (
    <>
      <nav className='nav'>
        <GiHamburgerMenu onClick={() => setOpenMenuAnimated(true)}/>
        <div className='nav-icon-container'>
          <FaGift/>
          <FaInbox onClick={()=>{
            setOpenNotificationSubMenu(!openNotificationSubMenu)
            setOpenNewFileSubMenu(false)
          }}/>
          <FaPlusCircle onClick={()=>{
            setOpenNewFileSubMenu(!openNewFileSubMenu)
            setOpenNotificationSubMenu(false)
          }}/>
        </div>
      </nav>
      { renderSubMenuNewFile() }
      { renderSubMenuNotifications() }
    </>
  )
}

export default NavBar