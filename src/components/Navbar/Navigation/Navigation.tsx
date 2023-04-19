import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './navigation.module.scss';
import { useAuth } from 'hooks/use-auth';
import { setUser } from 'store/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { ReactComponent as Settings } from '../../../assets/images/settings.svg';
import { RootState } from 'store';

const Navigation: React.FC = () => {


  const dispatch = useAppDispatch();
  const [link, setLink] = React.useState<string[]>([]);
  const links = ['Home', 'Sing in', 'Sing up'];
  const linkTo = ['/', '/login', '/register'];
  const token = localStorage.getItem('tokenConduit');

  const {userName, userImage} = useAppSelector((state:RootState) => state.user);
  const {article} = useAppSelector((state:RootState) => state.article)
  const { isAuth } = useAuth();


  const linksIfUser = [
    {
      link: 'Home',
      img: '',
      linkTo: '/' || '/yourfeed',
    },
    {
      link: 'New Article',
      img: <Settings width={15} height={15} className={styles.img} />,
      linkTo:   '/editor' || `/editor/${article?.slug}`,
    },
    {
      link: 'Settings',
      img: <Settings width={15} height={15} className={styles.img} />,
      linkTo: '/settings',
    },
    {
      link: userName ,
      img: userImage,
      linkTo: `/profile/${userName}`,
    },
  ]

  React.useEffect(() => {

  }, [isAuth])

  React.useEffect(() => {
    setLink(links)
  }, [])

  const userLocal = localStorage.getItem('userConduit') || null;

  React.useEffect(() => {


    if (userLocal) {
      dispatch(setUser({
        userEmail: JSON.parse(userLocal).email,
        userToken: JSON.parse(userLocal).token,
        userName: JSON.parse(userLocal).username,
        userBio: JSON.parse(userLocal).bio,
        userImage: JSON.parse(userLocal).image,
      }))
    }
  }, [dispatch, userLocal])

  const location = useLocation();
  return (
    <div className={styles.linkWrapper} >

      {

        token ? linksIfUser.map((item, index) => (
          <Link to={item.linkTo} className={
            location.pathname === item.linkTo
            ? styles.linkItemChange : styles.linkItem} key={index}>

<div className={styles.wrapper_image}>
{item.link === userName ? <img className={styles.image} src={userImage} alt='imag' /> : item.img}
<p>{item.link}</p>
</div>
            </Link>
        )) : link.map((item, index) => (
          <Link to={linkTo[index]} className={location.pathname === linkTo[index] ? styles.linkItemChange : styles.linkItem} key={index}> <p  >{item}</p></Link>
        )
        )
      }
    </div>
  )
}

export default  Navigation;




