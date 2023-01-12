import axios from 'axios';
import { useAppDispatch } from '../hooks/redux-hooks';
import { setUser } from 'store/userSlice';
import { useNavigate } from 'react-router-dom';
// const dispatch = useAppDispatch();
// const push = useNavigate();

const userServices = {
    // async getUser() {
    //     try {
    //         const token = localStorage.getItem('tokenData')
    //         if (token) {
    //             axios.interceptors.request.use((config: any) => {
    //                 const token = localStorage.getItem('tokenData')
    //                 config.headers.Authorization = `Token ${token}`;
    //                 return config;
    //             });
    //             await axios
    //                 .get('https://conduit.productionready.io/api/user ').then((response) => {
    //                     localStorage.setItem('tokenData', response.data.user.token)})
    //             // console.log(data)
    //             // return data
    //             // console.log('ok')
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
}

export default userServices;