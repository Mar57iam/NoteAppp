import React, { useEffect, useState , useContext } from 'react'
import { FaCirclePlus } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineLightMode } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from "../../Context/AuthContext";
import{ modalContext } from '../../Context/ModalContext';
import Swal from 'sweetalert2'




export default function Sidebar() {
  const { showModal, setShowModal , setEditingNote } = useContext(modalContext);
 const {Token, setToken } = useContext(authContext )
  const [ShowAddoption, setShowAddoption] = useState(false);
  const [DarkMode, setDarkMode] = useState(localStorage.getItem('darkmode'));
  const navigate = useNavigate()
  
 console.log(Token);
 
  

  useEffect(()=>{
    if(DarkMode){
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkmode' , DarkMode)
    }
    else{
      document.documentElement.classList.remove('dark')
      localStorage.removeItem('darkmode' )
    
  
    }
  }, [DarkMode])


  const logOutFn = ()=>{

    Swal.fire({
      title: "Are you sure ?",
      text: "You will be logged out of your account !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout me!"
    }).then((result) => {
      if (result.isConfirmed) {
        setToken('')
        localStorage.removeItem('userToken')
        navigate('/')
     
      }
    });
  
  }
  return (
    <>
  
  <button  data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" 
  aria-controls="sidebar-multi-level-sidebar" type="button" 
  className="inline-flex items-center   p-2 mt-2 ms-8 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
    <span className="sr-only ">Open sidebar</span>
    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
    </svg>
  </button>
  <aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 w-28 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800  flex flex-col justify-between">
      <div className="space-y-2 font-medium">
        <div >
          <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              
            <span className="mx-auto">Note APP</span>
          </a>
        </div>
{Token ? <> <div className="flex justify-center items-center pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
  <button onClick={()=>{ setShowAddoption(!ShowAddoption)}} >
  
  <FaCirclePlus className= {` w-6 h-6 text-gray-900 dark:text-gray-300  ${ShowAddoption ? 'rotate-45' : ''}`} />  </button>
</div>
<div className={` overflow-hidden transition-all duration-300 ease-in-out ${ShowAddoption ? 'max-h-40 scale-100 opacity-100' : 'max-h-0 scale-95 opacity-0'} `}>
  <button onClick={()=>{ setShowAddoption(false);
                          setShowModal(true)
                          setEditingNote(null)
  }} className='text-xs  bg-gray-800 p-[6px] rounded-md text-gray-50 dark:bg-white dark:text-gray-950'>
  New Note
  
  </button>
</div></> :<>
<div className="relative flex justify-center items-center pt-4 mt-4">
  <button className="group relative">
  <Link to="/register">
      <FaUserPlus className="w-6 h-6 text-gray-900 dark:text-gray-300" />
   
    <span className="absolute -top-4 left-2/3 -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
      register
    </span>
    </Link>
  </button>
</div>
<div className="relative  flex justify-center items-center pt-4 mt-4">
  <button  className=" group relative ">
    <Link to= '/'>
      <RiLogoutCircleRLine className=" w-6 h-6 text-gray-900 dark:text-gray-300" />
   
  
    <span className="absolute -top-4 left-2/3 -translate-x-1/2 bg-gray-900 text-white  text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
      Login
    </span>
    </Link>
  </button>
</div>

</>

}






      </div>

      <div>
    
    {Token&&<>
      <div className=' flex justify-center items-center    pt-4 mt-4 border-t border-gray-300 dark:border-gray-700'>

<button   onClick={()=>{
    logOutFn()
  }}>
<BiLogOut className="w-6 h-6 text-gray-900 dark:text-gray-300" />
</button>

</div>
    
    </>}
    <div className=' flex justify-center items-center pt-4 mt-4'>

<button onClick={()=>{
  setDarkMode(!DarkMode)
}}>

  {DarkMode ? <MdOutlineLightMode className="w-6 h-6 text-gray-900 dark:text-gray-300" /> : <FaMoon className="w-4 h-4  text-gray-900 dark:text-gray-300" />}


</button>
</div>


    </div>
    </div>
    
  </aside>
 
</>

  )
}
