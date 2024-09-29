/* eslint-disable no-unused-vars */
import React from 'react'
import Layouts from './component/Layouts'
import { Outlet } from 'react-router-dom'


const App = () => {

  return (
    <div className='bg-black  text-white min-h-screen h-auto'>
        <Layouts>
      <Outlet />
     </Layouts>
    </div>
     
  )
}

export default App