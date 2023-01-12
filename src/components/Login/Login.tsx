import React, { useState } from 'react';
import Form from 'components/Form/Form';
import { useNavigate,useLocation, } from 'react-router-dom';
import { setUser } from 'store/userSlice';
import { useAppDispatch } from 'hooks/redux-hooks';
import axios from 'axios';
import { useAuth } from 'hooks/use-auth';
import {setSendLastPage } from '../../store/articleSlice';


interface Users {
  email: string,
  password: string,
  username: string,
  token: string,
}

const Login: React.FC = () => {


  const dispatch = useAppDispatch();
  const push = useNavigate();
  const location = useLocation();


  const {isAuth,userToken,userName,userEmail} = useAuth();
  const [userError, setUserError] = useState<string>('');
  const [userEmailError, setUserEmailError] = useState<string>('');

  const baseUrl = 'https://conduit.productionready.io/api/users/login';



  const registerUser = async (email: string, pass: string) => {

    const user = {
      email: email,
      password: pass,
    };

    await axios
      .post(baseUrl, { user }

      ).then((response) => {
        localStorage.setItem('tokenData', response.data.user.token)
        dispatch(setUser({
          userEmail: response.data.user.email,
          userToken: response.data.user.token,
          userName: response.data.user.username,
        }));


        // axios.interceptors.request.use((config: any) => {
        //   const token = localStorage.getItem('tokenData');
        //   config.headers.Authorization = `Token ${token}`;
        //   return config;
        // });
        dispatch(setSendLastPage(location.pathname));
        push('/');
      }
      ).catch((err) => {
        console.log(err);
      })
  }



  return (
    <Form
      title='Sign in'
      error='email or password is invalid'
      titleButton="Sign in"
      subTitle='Need an account?'
      handlClick={registerUser}
      userError={userError}
      userEmailError={userEmailError}
    />
  )
}

export default Login
