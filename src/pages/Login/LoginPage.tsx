import Login from 'components/Login/Login';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.scss'

const LoginPage:React.FC = () => {
    return (
        <div className={styles.login_container} >
            <Login/>



        </div>
    );
};

export default LoginPage;