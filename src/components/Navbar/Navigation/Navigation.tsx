import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './navigation.module.scss';
import { useAuth } from 'hooks/use-auth';
import { ReactComponent as Settings } from '../../../assets/images/settings.svg';
import { ReactComponent as Person } from '../../../assets/images/person.svg';

const Navigation: React.FC = () => {



  const [link, setLink] = React.useState<string[]>([]);
  const links = ['Home', 'Sing in', 'Sing up'];
  const linkTo = ['/', '/login', '/register'];

  const { isAuth, userToken, userName, userEmail } = useAuth();
  const linksIfUser = [
    {
      link: 'Home',
      img: '',
      linkTo: '/' || '/yourfeed',
    },
    {
      link: 'New Article',
      img: <Settings width={15} height={15} className={styles.img}/>,
      linkTo: '/newArticle',
    },
    {
      link: 'Settings',
      img: <Settings width={15} height={15} className={styles.img}/>,
      linkTo: '/settings',
    },
    {
      link: userName,
      img: <Person width={15} height={15} className={styles.img}/>,
      linkTo: '/user',
    },
  ]

  React.useEffect(() => {

  }, [isAuth])

  React.useEffect(() => {
    setLink(links)
  }, [])

  const location = useLocation();
  return (
    <div className={styles.linkWrapper} >

      {isAuth ? linksIfUser.map((item,index) =>(
        <Link to={item.linkTo} className={location.pathname === item.linkTo ? styles.linkItemChange : styles.linkItem} key={index}>

           <p>{item.img} {item.link}</p></Link>
      )) : link.map((item, index) => (
        <Link to={linkTo[index]} className={location.pathname === linkTo[index] ? styles.linkItemChange : styles.linkItem} key={index}> <p  >{item}</p></Link>
      )
      )
      }
    </div>
  )
}

export default Navigation