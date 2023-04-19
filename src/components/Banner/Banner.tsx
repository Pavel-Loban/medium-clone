import React from 'react';
import styles from './banner.module.scss'

const Banner: React.FC = () => {
    return (
        <div className={styles.banner}>
            <div className={styles.banner_block}>
                <p className={styles.banner_title}>conduit</p>
                <p className={styles.banner_text}>A place to share your Angular knowledge.</p>
            </div>
        </div>
    )
}

export default Banner