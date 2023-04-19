import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'components/Form/Form';
import { setUser } from 'store/userSlice'
import { useAppDispatch } from 'hooks/redux-hooks';
import { postRegister } from 'api/api';


const SingUp: React.FC = () => {



    const push = useNavigate();


    const [userError, setUserError] = useState<string>('');
    const [userEmailError, setUserEmailError] = useState<string>('');


    const saveToken = (token: string) => {
        localStorage.setItem('tokenConduit', token);
    }



    const registerUser = async ( email: string, pass: string, name: string) => {

        const user = {
            email: email,
            password: pass,
            username: name,
        }
        postRegister(user)
            .then((data) => {
                console.log(data)
                const tokenData = data.user.token;
                saveToken(tokenData);
                localStorage.setItem('userConduit', JSON.stringify(data.user));

                push('/');
            }).catch((err) => {
                console.log(err)
                setUserError(err.response.data.errors.email[0])
                setUserEmailError(err.response.data.errors.email[0])
            })
    }


    return (
        <Form
            title='Register'
            error=''
            titleButton='Register'
            subTitle='Have an account?'
            handlClick={registerUser}
            userError={userError}
            userEmailError={userEmailError}
        />
    );
};

export default SingUp;


