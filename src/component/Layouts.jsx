/* eslint-disable react/prop-types */

import NavBar from './NavBar'
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Layouts = ({children}) => {
  return (
    <>
        
        <NavBar />
        <main> {children}</main>
        < ToastContainer/>
    </>
  )
}

export default Layouts