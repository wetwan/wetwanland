import axios from "axios";

const baseUrl ='https://api.themoviedb.org/3'
const apiKey = import.meta.env.VITE_MOVIE_API;

export const imgPath ='https://image.tmdb.org/t/p/w500'
export const imgPathOrg ='https://image.tmdb.org/t/p/original/'
 
// trending

export const fetchTrending = async (time_window = 'day') =>{
    const {data} = await axios.get(`${baseUrl}/trending/all/${time_window}?api_key=${apiKey}`)
    return data.results 
}  
// details 

export const fetchDetails = async (type, id) =>{
    const res = await axios.get(`${baseUrl}/${type}/${id}?api_key=${apiKey}`)
    return res.data
}   

  
// details 

export const fetchCredits = async (type, id) =>{
    const res = await axios.get(`${baseUrl}/${type}/${id}/credits?api_key=${apiKey}`)
    return res.data
}   
// vdieos 
 
export const fetchVideos = async (type, id) =>{
    const res = await axios.get(`${baseUrl}/${type}/${id}/videos?api_key=${apiKey}`)
    return res.data
}   

  
// moovies  
export const fetchMovies = async (page, sortBy) =>{
    const res = await axios.get(`${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}&sort_by${sortBy}`)
    return res.data
}   

  
// tv series  
export const fetchTvSeries = async (page, sortBy) =>{
    const res = await axios.get(`${baseUrl}/discover/tv?api_key=${apiKey}&page=${page}&sort_by${sortBy}`)
    return res.data
}   

  
//search  
export const searchData = async (query , page) =>{
    const res = await axios.get(`${baseUrl}/search/multi?api_key=${apiKey}&query=${query}&page=${page}`)
    return res.data
}   

  
