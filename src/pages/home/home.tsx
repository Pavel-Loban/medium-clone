import Banner from 'components/Banner/Banner'
import React from 'react';
import styles from './home.module.scss';
import { Link} from 'react-router-dom';
import loading from '../../assets/images/loading.png';
import sound from '../../audioClips/sound.mp3';
import { Howl, Howler } from 'howler';
import { text } from 'node:stream/consumers';
import ArticleGlobal from 'components/ArticleGlobal/ArticleGlobal';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store/index';
import { setPaginatePage, setPaginateCount, setNameLink, setPaginatePagesTag,setSendLastPage} from '../../store/articleSlice';
import Pagination from 'Pagination/Pagination';
import axios from 'axios';
import Tag from '../../pages/tag/tag';
import { useNavigate } from 'react-router-dom';
import YourFeed from 'pages/yourFeed/yourFeed';
import { useAuth } from 'hooks/use-auth';

interface Text {
    nameLink: string,
    active: Boolean,
    id: number,
    display: boolean,
}



const Home: React.FC = () => {

    const push = useNavigate();
    const [tag, setTag] = React.useState<string[]>([]);
    const [tags, setTags] = React.useState<string>('');
    const { paginatePage, paginatePagesTag, paginateCount, namesLink, sendLastPage} = useAppSelector((state: RootState) => state.article);
    const {isAuth,userEmail,userToken} = useAuth()
    // const [paginateCount, setPaginateCount] = React.useState(0);
    const baseUrl = `https://api.realworld.io/api/articles`;

    const dispatch = useAppDispatch();
    // console.log(isAuth,userEmail,userToken)
    const textLink = [
        {
            nameLink: 'Your Feed',
            active: false,
            id: 1,
            display: true,
        },
        {
            nameLink: 'Global Feed',
            active: true,
            id: 2,
            display: true,
        },
        {
            nameLink: '',
            active: false,
            id: 3,
            display: true,
        }
    ];

    const getPaginate = async () => {

         try {
            console.log(paginateCount)
            await  axios.get(baseUrl)
                .then(res => {
                    dispatch(setPaginateCount(Math.ceil(res.data.articlesCount / 10)))
                }
                )
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        const token = localStorage.getItem('tokenData');
        if(token !== null) {
            axios.get(baseUrl,{
                    headers: {
                      Authorization: `Token ${token}`,
                    },
                  });
            getPaginate();
        }else{
            getPaginate();
        }
    }, [paginateCount])
    // console.log('pagg', paginateCount)

    const getTags = async () => {
        const data = await axios.get('https://conduit.productionready.io/api/tags');
        setTag(data.data.tags);
    }


    React.useEffect(() => {
        const token = localStorage.getItem('tokenData');
        if(token !==null){
            try {
                axios.get('https://conduit.productionready.io/api/tags'
                ,{
                    headers: {
                      Authorization: `Token ${token}`,
                    },
                  }
                  );
                getTags();
            } catch (error) {
                console.log(error);
            }
        }else{
            try {
                getTags();
            } catch (error) {
                console.log(error);
            }
        }

    }, []);



    // const audioClip = [
    //     {sound: sound , label: 'sound'}
    // ]

    // const soundPlay = (src: string) => {
    //     const sound = new Howl({
    //         src
    //     })
    //     sound.play()
    // }



    // const renderSound = () => {
    //     return audioClip.map((soundObj, index) => {
    //         return (
    //             <button key={index} onClick={() =>  soundPlay(soundObj.sound)}>
    //                 {soundObj.label}
    //             </button>
    //         )
    //     })
    // }



    // const anime = () => {
    //     setFrame((previousState ) => !previousState )
    //     soundPlay(sound)
    // }
    Howler.volume(1.0)




    const [text, setText] = React.useState<Text[]>(textLink)

    const getActiveTextLink = (id: number) => {
        const activeLink = text.map((item) =>
            item.id === id ? { ...item, active: true } : { ...item, active: false }
        )
        setText(activeLink);
    }

    const getTag = (tag: string) => {
        dispatch(setPaginatePagesTag(0))
        dispatch(setNameLink(tag));
        const getTag = text.map((item, index) =>
            index === 2 ? { ...item, nameLink: `#${tag}`, active: true } : { ...item, nameLink: item.nameLink, active: false }
        )
        setText(getTag);
    }

    React.useEffect(() => {

    }, [tag,text])

    const pagPage1 = (e: { selected: number; }) => {
        if (e) {
            dispatch(setPaginatePage(e.selected))
        }
    }

    const pagPage2 = (e: { selected: number; }) => {
        if (e) {
            dispatch(setPaginatePagesTag(e.selected))
        }
    }

    React.useEffect(() => {
        if(sendLastPage === '/login'){
            getActiveTextLink(1);
            dispatch(setSendLastPage(''));
        }
    },[sendLastPage])

    return (
        <>
        {!isAuth ? <Banner /> : ''}
        <div className={styles.home_wrapper}>

            <div className={styles.home_content}>
                <div className={styles.home_content_main}>
                    <div className={styles.home_header}>
                        {text.map((link) => (
                            <p key={link.id} className={link.active ? styles.pp : (link.display ? styles.p : styles.hide)} onClick={() => getActiveTextLink(link.id)}>{link.nameLink}</p>
                        ))}
                    </div>
                    {text[0].active ?
                         <YourFeed/>
                        : ''}
                    {text[1].active ?
                        <ArticleGlobal />

                        : ''}
                    {text[2].active ?
                        <Tag />
                        : ''}
                </div>
                <div className={styles.home_aside_wrapper}>
                    <div className={styles.home_aside}>
                        <div className={styles.home_aside_title}>Popular Tags</div>
                        <div className={styles.home_aside_content}>
                            {tag.map((item, index) => {
                                return <Link key={index} to='#' className={styles.home_content_text} >
                                    <p onClick={() => getTag(item)} >{item}</p>
                                </Link>
                            })}
                        </div>
                        {/* {renderSound()} */}
                    </div>
                </div>
            </div>
            {text[1].active ?  <Pagination paginateCounts={paginateCount} pagPage={pagPage1} />  : ''}
            {text[2].active ? (paginateCount ? <Pagination paginateCounts={paginatePagesTag} pagPage={pagPage2} />: ''): ''}
        </div>
        </>
    )
}

export default Home