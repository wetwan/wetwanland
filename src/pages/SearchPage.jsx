/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { searchData } from '../services/api'
import Loadding from '../component/Loadding'
import {  BsExclamationTriangleFill } from 'react-icons/bs'
import MovieCards from '../component/MovieCards'
import Pagination from '../component/Pagination'


const SearchPage = () => {
  const [searchValue, setSearchValue] = useState('')
  const [tempSearchValue, setTempSearchValue] = useState('')
  const [activePage, setActivePage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  
  
useEffect(() => {
  setIsLoading(true)
  console.log(searchValue)
  searchData(searchValue , activePage).then((res) =>{
      console.log(res, 'res' )
      setData(res.results )
      setActivePage(res.page )
      setTotalPages(res.total_pages)
  }).catch((err) =>{
    console.log(err, 'err')
  }).finally(()=>{
    setIsLoading(false)
  })
  
}, [searchValue, activePage])

const handleSearch = (e) =>{
  e.preventDefault()
  setSearchValue(tempSearchValue )
 

}

  return (
    <div className='container w-5/6  p-3  mx-auto'>
      <div className="flex gap-4 my-3 items-baseline p-2 ">
          <h1 className='uppercase md:text-xl font-serif '> search</h1>
      </div>
       <form  className='flex items-center p-2  my-5 ' action="" onSubmit={handleSearch}>
          <label 
            className='absolute left-[999999px] '
            htmlFor="input"> search</label>
          <input 
            type="text"
            id='input'
            value={tempSearchValue}
            placeholder='search movie and tv-series'
            onChange={(e)=> setTempSearchValue(e.target.value)} 
            className='text-black outline-none  placeholder-shown:text-xl text-xl shadow-sm shadow-blue-200 placeholder-shown:text-blue-300 p-3  w-3/4 bg-blue-100 mx-3 rounded-3xl capitalize'
            autoFocus/>
          <button 
            className='mx-2 p-2 text-blue-500 hover:translate-x-2  duration-75 transition-t ransform w-32 shadow-md shadow-slate-200 bg-white capitalize rounded-md'
            > search</button>
       </form>
        {
          data.length === 0 && !isLoading &&(
            <div className='w-3/4 mx-auto   my-20 text-center capitalize text-orange-500 text-4xl sm:text-3xl font-bold font-serif  py-10 '>
              <h3>
                no search found
              </h3>
              <BsExclamationTriangleFill className='text-center md:text-[300px] text-[200px] mx-auto  '  />
            </div>
          )
        }
          <div className="grid gap-5 lg:grid-cols-5  sm:grid-cols-3 md:grid-cols-4 grid-cols-1  ">
        {data.length > 0 && !isLoading && data.map((item)=> (
          
            <MovieCards 
              key={item.id} 
              item={item} 
              type={item.media_type} />
            
        
        ))}

         {/* pagination */}
      {data.length > 0 && !isLoading &&(
         <Pagination 
      activePage={activePage} 
      totalPages={totalPages}
      setActivePage={setActivePage} 
      />
      ) }
   
      </div>
    </div>
  )
}

export default SearchPage