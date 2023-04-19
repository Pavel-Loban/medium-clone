import React, { useState } from 'react';
import Form from 'components/Form/Form';
import { useNavigate,useLocation, } from 'react-router-dom';
import {setUser,setUserLoginError } from 'store/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import {setSendLastPage } from '../../store/articleSlice';
import { RootState } from 'store';
import { postAuth } from 'api/api';




const Login: React.FC = () => {


  const dispatch = useAppDispatch();
  const push = useNavigate();
  const location = useLocation();

  const {userLoginError } = useAppSelector((state: RootState) => state.user)
  const [userError, setUserError] = useState<string>('');
  const [userEmailError, setUserEmailError] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  const baseUrl = 'https://conduit.productionready.io';


  const loginUser = async (email: string, pass: string) => {

    const user = {
      email: email,
      password: pass,
    };

    dispatch(setUserLoginError(''))
     postAuth(user)
     .then((response) => {
        console.log(response)
        localStorage.setItem('tokenConduit', response.user.token);
        localStorage.setItem('userConduit', JSON.stringify(response.user));

        dispatch(setSendLastPage(location.pathname));
        push('/');
      }
      ).catch((err) => {
        if(err.response?.request.status === 403){
                setLoginError('email or password is invalid')
               dispatch(setUserLoginError('email or password is invalid'))
              console.log(err)
              }
              if(err.response?.request.status !== 403) {
                dispatch(setUserLoginError('something went wrong'))
              }
      })
  }



  return (
    <Form
      title='Sign in'
      error={userLoginError}
      titleButton="Sign in"
      subTitle='Need an account?'
      handlClick={loginUser}
      userError={userError}
      userEmailError={userEmailError}
    />
  )
}

export default Login
