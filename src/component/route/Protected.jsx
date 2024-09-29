import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

// eslint-disable-next-line react/prop-types
const Protected = ({children}) => {
    const {user, isloading} = useAuth()
    if (isloading){
      return null
    }
  return (
   <>
    { user ? children : <Navigate to='/' />}
   </>
  )
}

export default Protected 
