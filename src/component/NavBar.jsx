/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { nav , nav2} from '../constatance'
// import {Avatar} from '../assets/index'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { BsSearch } from 'react-icons/bs'
import { auth } from '../services/firebase'
import Avatar from 'react-avatar';
import { GiHamburgerMenu } from 'react-icons/gi'
import { CgClose } from 'react-icons/cg'
import { BiLogInCircle } from 'react-icons/bi'

const NavBar = () => {
    const{ signInWithGoogle,logout,user} = useAuth()
    const [isOpen, setIsOpen]= useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null)
    const avatar =()=> setIsOpen(!isOpen)
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsOpen(false);
          setIsMenuOpen(false);
        }
      }
      useEffect(() => {
        if (isOpen) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [isOpen]);
      useEffect(() => {
        if (isMenuOpen) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [isMenuOpen]);

      const handleLogin = async() =>{
        try {
            await signInWithGoogle()
        } catch (error) {
            console.log(error , 'error')
        }
      }
  return (
   <main >
        <div className="md:flex hidden  w-5/6 p-2 h-20 items-center justify-between  mx-auto" >
            <Link to='/' 
                className='text-2xl  font-bold text-blue-500 tracking-widest'
            >
                WetwanLand
            </Link>
           <li className='sm:flex  list-none gap-4 items-center justify-center'>  
                {nav.map((item, i)=>(
                    <NavLink
                         key={i} 
                         to={item.path}
                         
                         className={({ isActive }) => isActive ? 'font-bold text-blue-400 hover:opacity-75 capitalize' : 'capitalize text-white'}
                    >{item.element}</NavLink>
                ))}
                 <NavLink className='mt-2'
                 
                 to='/search'> <BsSearch className='text-xl'  />
                </NavLink>
                {
                    user && (
                      <Avatar 

                        name={user.email} 
                        onClick={avatar}
                        size={40}
                        className='py-1'
                        round={true} 
                        color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])}
                         />
                    )
                }
                {
                    !user && (

                      <Avatar 

                        name='user' 
                        onClick={handleLogin}
                        size={40}
                        className='py-1'
                        round={true} 
                        color= 'red'
                         />
                    )
                }
                
           </li>
           { isOpen &&  <div
                 ref={menuRef} className='right-28 top-16  p-2 flex flex-col gap-3 absolute text-center font-sans '>
                <Link to='/watchlist' className='p-1 font-bold rounded-md bg-white text-black capitalize  font-sans'> watchlist</Link>
                <Link onClick={logout} className='p-1 font-bold rounded-md bg-white text-black capitalize font-sans'> logout</Link>
           </div>}
          
        </div>

        <div className="flex sm:hidden  w-5/6 p-2 h-20 items-center justify-between  mx-auto">
            <Link to='/' 
                className='text-2xl  font-bold text-blue-500 tracking-widest'
            >
                WetwanLand
            </Link>
            <button onClick={toggleMenu} className="text-2xl text-blue-700 focus:outline-none">
              {isMenuOpen ? (
                <CgClose />
              ) : (
                <GiHamburgerMenu />
              )}
            </button>
        </div >
              {
                isMenuOpen && (
                   <div
            ref={menuRef} 
            className="w-full z-50 min-h-screen  h-full  ">
              <ul className='flex flex-col gap-2 items-center mt-6'>
                {nav2.map((nav , i)=>(
                  <NavLink key={i} 
                  onClick={() => setIsMenuOpen(false)}
                    className='text-black bg-white hover:shadow-md p-3 my-2 w-[90%] mx-auto rounded-md text-center  capitalize'
                     to={nav.path}>{nav.element}</NavLink>
                ))}
              </ul>
              {
                    user && (
                      <Avatar 

                        name={user.email} 
                        onClick={avatar}
                        size={45}
                        className='py-1 absolute bottom-2 left-3 '
                        round={true} 
                        color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])}
                         />
                    )
                }
                  {
                    !user && (

                      <Avatar 

                        name='user' 
                        onClick={handleLogin}
                        size={45}
                       className='py-1 absolute bottom-3 left-3 '
                        round={true} 
                        color= 'red'
                         />
                    )
                }
              
                  { user ? 
                   <div  ref={menuRef} 
          >
                <Link to='/watchlist'  className='text-black bg-white hover:shadow-md p-3 my-4 w-[90%] mx-auto rounded-md text-center  capitalize block'> watchlist</Link>
                <Link onClick={logout} className='bg-red-500 shadow-md shadow-black absolute w-12 text-center  h-12 rounded-full   right-9 bottom-4 text-white'>
                  <BiLogInCircle className='text-3xl  m-2'/> </Link>
           </div> : <></>
            } 
        </div>
                )
              }

       
   </main>
  )
}

export default NavBar