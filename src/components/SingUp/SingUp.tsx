import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'components/Form/Form';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from 'store/userSlice'
import { useAppDispatch } from 'hooks/redux-hooks';
import axios from 'axios';
import { request } from 'https';


// interface Users {
//     email: string,
//     password: string,
//     username: string,
//     token: string,
// }

const SingUp: React.FC = () => {


    const dispatch = useAppDispatch();
    const push = useNavigate();


    let usersArr = JSON.parse(localStorage.getItem('us') as string) || [];


    const [userError, setUserError] = useState<string>('');
    const [userEmailError, setUserEmailError] = useState<string>('');

    const baseUrl = 'https://conduit.productionready.io/api/users';


    const saveToken = (token:string) => {
        localStorage.setItem('tokenData', token);
    }



    const registerUser = async (email: string, pass: string, name: string) => {

        const user = {
                    email: email,
                    password: pass,
                    username: name,
                }
                console.log(user)
                await axios
                        .post(baseUrl, {
                            user
                        }).then((data) => {
                            console.log(data)

                            const tokenData = data.data.user.token;
                            saveToken(tokenData);
                            console.log(localStorage.getItem('tokenData'))
                            console.log(user)

                        }).catch((err) => {
                            console.log(err)
                            setUserError(err.response.data.errors.email[0])
                            setUserEmailError(err.response.data.errors.email[0])
                        })
    }


    return (
        <Form
            title='Register'
            error='email or password is invalid'
            titleButton='Register'
            subTitle='Have an account?'
            handlClick={registerUser}
            userError={userError}
            userEmailError={userEmailError}
        />
    );
};

export default SingUp;


