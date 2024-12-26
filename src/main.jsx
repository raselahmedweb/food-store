import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Main from './Pages/Layout/Main';
import Home from './Pages/Home/Home';
import MyRequestFood from './Pages/MyRequestFoods/MyRequestFood';
import MyFoods from './Pages/MyPostFoods/MyFoods';
import Login from './Pages/SecurityPage/Login';
import Register from './Pages/SecurityPage/Register';
import Cooking from './Pages/AdditionalPages/Cooking';
import Delivary from './Pages/AdditionalPages/Delivary';
import Error from './Pages/Error/Error';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllFoods from './Pages/AllFoods/AllFoods';
import AddFood from './Pages/AddFoods/AddFood';
import AuthProvider from './Provider/AuthProvider';
import FoodDetails from './Pages/FooodDetails/FoodDetails';
import UpdateFood from './Pages/MyPostedFoodsUpdate/UpdateFood';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allfood",
        element: <AllFoods />,
        loader: ()=> fetch(`${import.meta.env.VITE_foods_api}/foods`)
      },
      {
        path: "/details/:id",
        element: <PrivateRoute><FoodDetails /></PrivateRoute>,
        loader: ( { params } )=> fetch(`${import.meta.env.VITE_foods_api}/food/${params.id}`)
      },
      {
        path: "/addfood",
        element: <PrivateRoute><AddFood /></PrivateRoute>,
      },
      {
        path: "/mypost",
        element: <PrivateRoute><MyFoods /></PrivateRoute>,
      },
      {
        path: "/update/:id",
        element: <PrivateRoute><UpdateFood /></PrivateRoute>,
        loader: ( { params } )=> fetch(`${import.meta.env.VITE_foods_api}/food/${params.id}`)
      },
      {
        path: "/myrequest",
        element: <PrivateRoute><MyRequestFood /></PrivateRoute>,
      },
      {
        path: "/cook",
        element: <Cooking />,
      },
      {
        path: "/delivary",
        element: <Delivary />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer position='top-right' reverseOrder={false} />
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
