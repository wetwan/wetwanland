/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { fetchTrending, imgPath } from '../services/api'
import MovieCards from '../component/MovieCards'
import Loadding from '../component/Loadding'

const HomePage = () => {
  const [data , setData]=useState([])
  const [timewindow , setTimewindow]=useState('day')
  const [loading , setLoading]=useState(true)


  useEffect(() => {
    setLoading(true) 
    fetchTrending(timewindow).then((res) =>{
      setData(res )
    }).catch((err) =>{
      console.log(err, 'err')
    }).finally(()=>{
       setLoading(false)
    })
  
   
  },[timewindow])


  
  return (
    <div className='container w-5/6  p-3  mx-auto'>
      <div className="flex gap-4 my-3 items-center p-2 ">
          <h1 className='uppercase md:text-xl font-serif '> trending</h1>
          <div className="flex brder justify-start rounded-full shadow capitalize shadow-white bg-white text-black  gap-6 items-center">
              <button 
                  // className='p-2 capitalize'
                  className={`${timewindow === 'day' ? 'bg-gray-400 ease-in-out md:p-2 p-1 shadow transition-all shadow-gray-200   tracking-wide m-1 capitalize rounded-full':'md:p-2 capitalize whitespace-nowrap m-1' }`}
                  
                  onClick={()=> setTimewindow('day')}
                  >today</button>
              <button 
                 className={`${timewindow === 'week' ? 'bg-gray-400 transition-all ease-in-out shadow shadow-gray-200 md:p-2 p-1   tracking-wide m-1 capitalize whitespace-nowrap rounded-full':'md:p-2 p-1 m-1 capitalize whitespace-nowrap' }`}
                  onClick={()=> setTimewindow('week')}
                  >this week</button>
          </div>

      </div>
    {loading && <Loadding />}
      <div className="grid gap-5 lg:grid-cols-5  sm:grid-cols-3 md:grid-cols-4 grid-cols-1  ">
        {data && data.map((item)=> (
          
            <MovieCards key={item.id} item={item} type={item.media_type} />
            
        
        ))}
      </div>
    </div>
  )
}

export default HomePage