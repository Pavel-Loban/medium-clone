import React from 'react';
import styles from './footer.module.scss';
import { Link} from 'react-router-dom';

const Footer:React.FC = () => {
  return (
    <div className={styles.wrapper}>
        <div className={styles.content}>
            <Link to={'/'} className={styles.link}>conduit</Link>
            <p>2023. &copy; An interactive learning project from Thinkster. Code licensed under MIT.</p>
        </div>
    </div>

  )
}

export default Footer