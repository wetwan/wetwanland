/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { imgPath } from "../services/api"
import { BiStar } from "react-icons/bi"


const MovieCards = ({item, type}) => {  
   

  return (

    <Link to={`/${type}/${item.id}`}  >
        <div className="relative md:hover:scale-105 transition-transform ease-in-out   group rounded-2xl overflow-hidden shadow shadow-[rgba(170,169,169,0.1)]">
            <img className='w-full object-center h-full' src={`${imgPath}/${item.
            poster_path } `}
            alt={item.title || item.name} />
            <div className="absolute  p-0.5 hidden group-hover:block w-full h-2/6 bottom-0 bg-[rgba(0,0,0,.8)]">
                <h3 className="text-ellipsis w-3/4  overflow-hidden whitespace-nowrap font-bold ">
                   {item.title || item.name} 
                </h3>
                <h3 className="text-ellipsis w-3/4  overflow-hidden text-blue-300 font-mono whitespace-nowrap font-bold text-xs">
                   {new Date (item.first_air_date|| item.release_date).getFullYear() ||'N/A'} 
                </h3>
                <div className="flex items-center text-xs mt-1 gap-2">
                    <BiStar className=" text-yellow-300"/>
                    <p>{item.vote_average  || 'No rating available' } </p>
                </div>
                 </div> 
        </div>
        

    </Link>
  )
}

export default MovieCards