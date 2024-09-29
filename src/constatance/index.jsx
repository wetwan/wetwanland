export const nav = [
    {
        path: '/',
        element: 'home'
      },
      {
        path: '/movie',
        element: 'movies'
      },
      {
        path: '/tv',
        element: 'shows'
      }
      
] 
export const nav2 = [
    {
        path: '/',
        element: 'home'
      },
      {
        path: '/movie',
        element: 'movies'
      },
      {
        path: '/tv',
        element: 'shows'
      },
      {
        path: '/search',
        element: 'search'
      },
      
] 
export const rating = (rate) =>{
  return  (rate *10)?.toFixed(0)
}
  export const colorRate= (rate) => {
    if(rate >=7){
      return 'text-green-400'
    }
    else if(rate >= 5){
      return 'text-yellow-400'
    }else return 'text-red-400'
}

export const timeRemaing =(minutes)=>{
  const hour = Math.floor(minutes /60)
  const mint = minutes % 60
  return `${hour}h ${mint}m`
}

