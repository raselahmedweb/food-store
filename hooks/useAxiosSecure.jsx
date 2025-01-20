import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../src/Provider/AuthProvider';


const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_foods_api}`,
    withCredentials: true
});

const useAxiosSecure = () => {
    const { signOutUser } = useContext(authContext);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.interceptors.response.use(response => {
            return response;
        }, error => {
            console.log('api response error status', error.status);
            if (error.status === 401 || error.status === 403) {
                signOutUser()
                    .then(() => {
                        // redirect to the login page
                        navigate('/login')
                    })
                    .catch(err => console.log(err))
            }
            return Promise.reject(error);
        })
    }, [])

    return axiosInstance;
};

export default useAxiosSecure;


