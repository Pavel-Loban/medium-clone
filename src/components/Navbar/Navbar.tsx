import React from 'react';
import styles from './navbar.module.scss'
import Navigation from './Navigation/Navigation';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {



    return (
        <div className={styles.nav_wrapper} >
            <Link to='/'>
                <p
                style={{color:'#5cb85c',
                fontSize: '22px',
                fontWeight:'700'}}
                >
                    conduit
                </p>
            </Link>
            <Navigation />
        </div>
    )
}

export default Navbar