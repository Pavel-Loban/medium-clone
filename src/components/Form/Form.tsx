import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux-hooks';
import { setUserLoginError } from 'store/userSlice';
import { Formik } from 'formik';
import { SchemaAuth, SchemaRegistr } from 'validations-shema';
import { VisiblePass } from 'components/visible-pass/visible-pass';

import styles from './form.module.scss';

interface Props {
    title: string;
    titleButton: string;
    handlClick: (email: string, password: string,username: string) => void;
    subTitle: string;
    error: string;
    userError: string;
    userEmailError: string;
}


const Form: React.FC<Props> = ({ title, titleButton,
     handlClick,
    subTitle,
    userError,
    userEmailError,
     error,
    }) => {

    const dispatch = useAppDispatch();
    const [visiblePass, setVisiblePass] = React.useState<boolean>(false);

    const location = useLocation();


    const getVisibilityPassword = () => {
        setVisiblePass(!visiblePass);
    }


    const clearError = () => {
        dispatch(setUserLoginError(''))
    }



    return (
        <div className={styles.wrapper}>


<Formik
                initialValues={{
                    email: '',
                    password: '',
                    userName: '',
                }}
                validationSchema={location.pathname.includes('/login') ? SchemaAuth : SchemaRegistr}
                onSubmit={(values) => handlClick(values.email, values.password, values.userName)}
            >
                {({
                    values,
                    errors,
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    dirty,
                    touched,
                    isValid,
                }) => {


                    return (

            <form
            onSubmit={handleSubmit}
            >
                <h1 className={styles.title}>{title}</h1>
                {location.pathname.includes('/login')
                    ?
                    <Link to='/register'><div onClick ={clearError} className={styles.subTitle}>{subTitle}</div> </Link>
                    :
                    <Link to='/login'><div className={styles.subTitle}>{subTitle}</div> </Link>}


{error && <div style={{ color: 'red' }} >{error} </div>}

{userError  &&  <div style={{ color: 'red' }} >{userError} </div>}

{errors.userName  && touched.userName && <div style={{ color: 'red' }} >{errors.userName} </div>}

                {location.pathname.includes('/register') ? <div>
                    <input className={styles.input}
                        name='userName'
                        type='name'
                        value={values.userName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='Name'
                        maxLength={15}
                    />
                </div> : ''}


                {errors.email  && touched.email && <div style={{ color: 'red' }} >{errors.email} </div>}
                <div>
                    <input className={styles.input}
                        name='email'
                        type='email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='Email'
                    />
                </div>

                {errors.password  && touched.password && <div style={{ color: 'red' }} >{errors.password} </div>}
                <div className={styles.inputpass_wrapper}>
                    <input className={styles.input}
                        name='password'
                        type={visiblePass ?  'text' : 'password' }
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='Password'
                    />

<VisiblePass visiblePass={visiblePass} value={values.password} getVisibilityPassword={getVisibilityPassword} />
                </div>
                <div className={styles.button_wrapper}>
                    <button
                    disabled={!isValid}
                    className={styles.button_login}
                        type='submit'
                    >
                        {titleButton}
                    </button>
                </div>
            </form>


);
}}
</Formik>
        </div>
    );
};

export default Form;