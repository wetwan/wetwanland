import { useEffect, useState } from "react"
import { RiProgress5Line } from "react-icons/ri";
import {  fetchCredits, fetchDetails, fetchVideos, imgPath, imgPathOrg,  } from "../services/api"
import { useParams } from "react-router-dom"
import Loadding from "../component/Loadding"
import {  BiCalendarEvent, BiCheckCircle, BiPlus } from "react-icons/bi"
import { colorRate, rating, timeRemaing } from "../constatance";
import VideoComponent from "../component/VideoComponent";
import { BsClockHistory } from "react-icons/bs";
import {useAuth} from '../context/useAuth'
import { useFireStore} from '../services/firestore'

import { toast } from "react-toastify";




const DetailsPage = () => {
    const {type, id}=useParams()
    const [loading , setLoading]=useState(true)
    const [details, setDetails] = useState({})
    const [cast, setCast] = useState()
    const [isInWatchlist, setIsInWatchlist] = useState(false)
    const [videos, setVideos] = useState()
    const [video, setVideo] = useState(null)
    const placeholdimage= 'https://placehold.co/400'
    const {user} = useAuth()
    const {adeToWishlist,checkIfInWatchlist,removeFromWatch} = useFireStore()
   

    // useEffect(() => {
    //             setLoading(true) 
    //             fetchDetails(type, id).then((res) =>{
    //                 setdetails(res )
    //              
    //             }).catch((err) =>{
    //               console.log(err, 'err')
    //             }).finally(()=>{
    //                setLoading(false)
    //             })
    //         },[type, id])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const [detailsData, creditData, videosData] = await Promise.all([
              fetchDetails(type, id),
              fetchCredits(type, id),
              fetchVideos(type, id),
            ]);
    // setDetails
            setDetails(detailsData);
    // setCast
            setCast(creditData.cast.slice(0, 10));
    // setVideo
            const video = videosData.results.find((video )=> video.type ==="Trailer")
            setVideo(video)
            const videos = videosData.results.filter((video) => video.type !== "Trailer").slice(0,10)
            setVideos(videos);

          } catch (err) {
            console.log(err, 'err');
          } finally {
            setLoading(false);
          }
        };
    
        fetchData(); // Call the fetchData function inside the useEffect
    
      }, [type, id]);
    const handleSaveTOWatchlist =async () =>{
        if(!user ){
            toast.error('Login to add to watchlist')
        return
        }
        
        const data = {
            id: details?.id ,
            title: details?.title || details?.name,
            type: type,
            poster_path: details?.poster_path,
            release_date: details?.release_date || details?.first_air_date ,
            vote_average: details?.vote_average,
            overview: details?.overview
        }
        const dataId = details?.id.toString()
// to add to watchlist
        await adeToWishlist(user?.uid, dataId,data)
// to check if is in watchlist
        const isSetToWatchlist = await checkIfInWatchlist(user?.uid, dataId)

        setIsInWatchlist(isSetToWatchlist)
    }

    useEffect(() => {
        if(!user){
            setIsInWatchlist(false)
            return
        }
        checkIfInWatchlist(user?.uid, id).then((data) =>{
            setIsInWatchlist(data)
        })
    }, [id, user,checkIfInWatchlist])

    const handleRemoveFromWatchlist = async () =>{
        await removeFromWatch(user?.uid, id)
        const isSetToWatchlist = await checkIfInWatchlist(user?.uid, id)

        setIsInWatchlist(isSetToWatchlist)
    }

    if (loading) {
        return <Loadding />
    }  
   
    
      
    const title = details.title || details.name
    const date = details.first_air_date|| details.release_date
  return (
    <div className='container w-5/6  p-3  mx-auto min-h-screen h-auto '>
       
        <div  className="md:h-[500px] h-auto w-full p-1 flex items-center -z-10"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.88), rgba(0, 0, 0, 0.88)), url(${imgPathOrg}/${details.
                    backdrop_path})`,
                 backgroundSize: 'cover', 
                backgroundPosition: 'center',
        }}>
                
            <div className="flex p-2 flex-col md:flex-row items-center gap-3 ">
               <div className="h-[450px]">
                    <img src={`${imgPath}/${details.poster_path}`}
                    alt={title} 
                    className="h-full object-center"/>
               </div>
               <div className="text-2xl">
                    <h1>{title}
                        <span 
                            className="mx-3 text-ellipsis w-3/4  overflow-hidden text-blue-300 font-mono whitespace-nowrap font-bold "
                            >
                            {new Date (date).getFullYear() ||'N/A'} 
                        </span>
                    </h1>
                <div className="flex items-center gap-3 my-1">
                    <div className="flex items-center">
                        <BiCalendarEvent className="mr-2 text-blue-300" />
                        <p className="text-sm">
                        {new Date (date).toLocaleDateString('en-NG')} (NG) 
                         </p>
                    </div>
                    { type === 'movie' && (
                        <>
                            <div className="text-xs">*</div>
                            <div className="flex gap-2  items-center text-sm ">
                                <BsClockHistory className="text-blue-300" />
                                <div>
                                    <p>
                                        {timeRemaing(details.runtime)}
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="flex items-center gap-6 my-5">
                    <div className="flex items-center">
                        <RiProgress5Line
                             className={`mr-2 ${colorRate(details.vote_average)}`}  />
                        <p className="text-sm">
                            { rating(details.vote_average) }%                         
                         </p>
                    </div>
                    <div>
                    
                    </div>
                    {isInWatchlist ? (
                        <div className=" items-center">
                        <button className="hover:bg-green-100 hover:transition-colors ease-in-out  duration-100  w-40 justify-around capitalize  p-2 border rounded-md text-green-700 flex items-center border-green-400"
                            onClick={handleRemoveFromWatchlist}
                        >
                            <BiCheckCircle />
                            <p className=" text-xs"> in watchlist</p>
                            
                        </button>
                       
                    </div>
                    ):(
                        <div className="flex items-center">
                        <button className="w-40  justify-around capitalize  p-2 border rounded-md text-white flex items-center outline-white"
                            onClick={handleSaveTOWatchlist}
                        >
                            <BiPlus />
                            <p className=" text-xs  text-white"> add watchlist</p>
                            
                        </button>
                       
                    </div>
                    )}
                    
               
                   
                </div>
                <div>
                    <p className="text-blue-300 italic text-sm my-2  ">{details.title}</p>
                </div>
                <div className="  md:max-w-[700px]">
                    <h3 className="my-3 capitalize text-indigo-500 text-xl">overview</h3>
                    <p className="text-lg mb-3 "> {details.overview.slice(0, 400)+'...'}</p>
                </div>
                <div className="flex gap-4 items-center mt-6 ">
                    {details?.genres?.map((gen , i)=>(
                        <div key={i} className="shadow shadow-gray-400 p-1 uppercase text-gray-700 font-semibold bg-gray-300 border text-sm rounded  ">
                            {gen.name}
                        </div> 
                       
                    ))
                    
                    }
                    
                </div>
               </div>

            </div>
        </div>
        <div className="w-full p-3">
            <h2 className="text-lg uppercase mt-3" > cast</h2>
            <div className="flex items-center my-5 overflow-x-scroll p-2">
            {cast.length === 0 && 
                <div className="w-5/6 mx-auto capitalize text-center"> no cast found</div>}
            {cast && cast.length > 0 && cast.map((cast) =>(
                <div key={cast.id}>
                    <div className="mx-1 h-[200px] w-[150px] rounded-xl overflow-hidden object-contain ">
                        <img src={`${imgPath}/${cast.profile_path}  ${placeholdimage}`} 
                        alt={cast.name}
                        className="w-full h-full mx-2" />
                    </div>
                </div>
            )) }
            </div>
        </div>
        <div className="w-full p-3">
            <h2 className="text-lg uppercase mt-3" > videos</h2>
            <div className="w-full h-auto ">
                <VideoComponent id={video?.key}  />
            </div>
            <div className="flex items-center gap-3  my-5 overflow-x-scroll ">
          
            {videos && videos.map((cast) =>(
                <div className=" min-w-[250px]" key={cast.id}>
                   <VideoComponent id={cast?.key} small />
                   <div>
                    <p className=" text-ellipsis font-bold text-sm  h-10 whitespace-pre-line overflow-hidden">
                        {cast?.name }
                    </p>
                   </div>
                </div>
            )) }
            </div>
         
        </div>

       
    </div>
  )
}

export default DetailsPage