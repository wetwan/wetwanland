/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom'
import {imgPath} from '../services/api'
import { useFireStore } from '../services/firestore'
import { useAuth } from '../context/useAuth'
import { MdStarRate } from 'react-icons/md'
import { rating } from '../constatance'

const WatchlistCard = ({item,id, type,setWatchlist }) => {
    const {removeFromWatch} = useFireStore()
    const {user} = useAuth()

    const handleCheckRemove = (e) => {
        e.preventDefault();
        removeFromWatch(user?.uid, id)
          .then(() => {
            setWatchlist((prev) => prev.filter((el) => el.id !== id)); // Corrected the arrow function syntax
          })
          .catch((err) => {
            console.log(err, 'err');
          });
      };
      const title = item.title || item.name
      const date = item.first_air_date|| item.release_date
      
  return (
    <Link className='w-full  ' to={`/${type}/${item.id}`}  >
        <div className="flex w-full flex-col  p-2 md:flex-row  bg-white text-black font-serif items-center gap-2 justify-start rounded-md shadow-sm shadow-gray-200">
            <div className="relative">
               <div className='md:w-[150px] md:h-[200px] rounded-2xl overflow-hidden border-l-2 border-green-600'>
                 <img src={`${imgPath}/${item?.poster_path}`} 
                alt={title}
                className='w-full h-full'
                 />
               </div>
               
                 <input 
                    aria-label='remove from watchlist'
                    type="checkbox" 
                    name="check"  
                    id="check"
                    onClick={handleCheckRemove}
                    className=' border bg-green-700 absolute z-50 top-4 left-2 md:scale-125 w-7 h-7  transition-all before:absolute before:content-[""] before:border-green-700 before:p-1 before:border before:w-full before:h-full before:rounded before:transition-all before:animate-spin-slow after:absolute after:content-[""] after:border-yellow-700 after:p-1 after:border after:w-full after:h-full after:rounded after:transition-all after:animate-spin-reverse'
                />
            </div>
            <div >
                <h2 className='font-bold  my-1 text-lg'>{title}</h2>
                <p 
                    className='text-sm text-green-400 my-0.5'>{new Date (date).getFullYear()}
                </p>
                <div className="flex gap-2 p-1 my-0.5">
                    <MdStarRate className='text-xl text-yellow-600' />
                    <p className='text-sm'>
                    { rating(item.vote_average) }% </p>
                </div>
                <div>
                <p className="text-lg  mb-3 md:w-3/4"> {item.overview}</p>
                </div>
            </div>
        </div>
    </Link>
  
  )
}

export default WatchlistCard