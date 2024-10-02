
import { useEffect, useState } from "react";
import { useAuth } from '../context/useAuth';
import { useFireStore } from '../services/firestore';
import Loadding from "../component/Loadding";
import { BsExclamationTriangleFill } from "react-icons/bs";
import WatchlistCard from "../component/WatchlistCard";

const WatchlistPage = () => {
  const { getWatchlist } = useFireStore();
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      setIsLoading(true); // Ensure loading starts when fetching
      getWatchlist(user.uid)
        .then((data) => {
          setWatchlist(data);
         
        })
        .catch((err) => {
          console.log(err, 'error');
        })
        .finally(() => {
          setIsLoading(false); // Loading ends
        });
    }
  }, [user?.uid, getWatchlist]);


 if(isLoading){
  return <Loadding />
 }
  
  return (
    <div className='container w-5/6  p-3  mx-auto '>
        <div className="flex gap-4 my-3 items-baseline p-2 ">
          <h1 className='uppercase md:text-xl font-serif '> watchlist </h1>
        </div> 
        {
          !isLoading && watchlist?.length === 0 &&(
            <div className='w-3/4 mx-auto   my-20 text-center capitalize text-orange-500 text-4xl sm:text-3xl font-bold font-serif  py-10 '>
              <h3>
                no time on your wishlist
              </h3>
              <BsExclamationTriangleFill className='text-center md:text-[300px] text-[200px] mx-auto  '  />
          </div>
          )
        }
        {
          !isLoading && watchlist.length > 0 && (
            <div className="h-full p-3  grid grid-cols-1 gap-3 ">
              {
                watchlist?.map((item)=>(
                  <WatchlistCard 
                    key={item?.id}
                    item={item}
                    type={item?.type}
                    id={item?.id}
                    setWatchlist={setWatchlist} />
                ))
              }
            </div>
          )
        }

    </div>
  )
};

export default WatchlistPage;
