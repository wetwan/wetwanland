import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  
} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import HomePage from './pages/HomePage'
import MoviesPage from './pages/MoviesPage'
import SearchPage from './pages/SearchPage'
import ShowPage from './pages/ShowPage'
import DetailsPage from './pages/DetailsPage.jsx';
import { AuthProvider } from './context/authprovider.jsx';
import WatchlistPage from './pages/WatchlistPage.jsx';
import Protected from './component/route/Protected.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: '/',
        element: <HomePage />,
        
      },
      {
        path: '/movie',
        element: <MoviesPage/>,
      },
      {
        path: '/tv',
        element: <ShowPage />,
      },
      {
        path: '/search',
        element: < SearchPage/>,
      },
      {
        path: '/:type/:id',
        element: < DetailsPage/>,
      },
      {
        path: '/watchlist',
        element: (
          <Protected>
            < WatchlistPage/>
          </Protected>
        ),
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  
  </StrictMode>,
)
