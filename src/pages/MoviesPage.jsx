// import React from 'react'

import { useEffect, useState } from "react"
import { fetchMovies } from "../services/api"
import Loadding from "../component/Loadding"
import MovieCards from "../component/MovieCards"
import Pagination from "../component/Pagination"



const MoviesPage = () => {
const [isLoading, setIsLoading] = useState(true)
const [movies, setMovies] = useState()
const [activePage, setActivePage] = useState('1')
const [totalPages, setTotalPages] = useState('1')
const [sortBy, setSortBy] = useState('popularity.desc')

  useEffect(() => {
   setIsLoading(true)
    fetchMovies(activePage, sortBy).then((res) =>{
      setMovies(res.results  )
      setActivePage(res.page  )
      setTotalPages(res.total_pages)
    }).catch((err) =>{
      console.log(err, 'err')
    }).finally(()=>{
       setIsLoading(false)
    })
   
  }, [activePage,sortBy ])
  
  return (
    <div className='container w-5/6  p-3  mx-auto'>
    <div className="flex gap-4 my-3 items-baseline p-2 ">
        <h1 className='uppercase md:text-xl font-serif '> discover movie</h1>

        <div>
          <select 
          className="bg-transparent acc border rounded-md  p-1  " 
          name="change" id="change"
        
          onChange={(e) => {
            setActivePage(1)
            setSortBy(e.target.value)}}>
            <option className="bg-black text-blue-600 border-none selection:text-blue-950 " value="popularity.desc "> Popularity</option>
            <option className="bg-black text-blue-600 border-none  accent-orange-500" value="vote_average.desc&vote_count.gte=1000 "> Top Rated</option>
          </select>
        </div>
       

    </div>
  {isLoading && <Loadding />}
    <div className="grid gap-5 lg:grid-cols-5  sm:grid-cols-3 md:grid-cols-4 grid-cols-1  ">
      {
        movies && movies.map((item)=>(
          <MovieCards 
            key={item.id} 
            item={item} 
            type={"movie"} 
            />
        ))
      }
    </div>

    {/* pagination */}
    
         <Pagination 
      activePage={activePage} 
      totalPages={totalPages}
      setActivePage={setActivePage} 
      />
      ) 

    
  </div>

  )
}

export default MoviesPage