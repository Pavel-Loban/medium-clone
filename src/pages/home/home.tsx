import Banner from 'components/Banner/Banner'
import React from 'react';
import styles from './home.module.scss';
import { Link} from 'react-router-dom';
import ArticleGlobal from 'components/ArticleGlobal/ArticleGlobal';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store/index';
import { setPaginatePage, setNameLink, setPaginatePagesTag,setSendLastPage} from '../../store/articleSlice';
import Pagination from 'Pagination/Pagination';
import axios from 'axios';
import Tag from '../../pages/tag/tag';
import YourFeed from 'pages/yourFeed/yourFeed';
import { useAuth } from 'hooks/use-auth';

interface Text {
    nameLink: string,
    active: Boolean,
    id: number,
    display: boolean,
}



const Home: React.FC = () => {

    const [tag, setTag] = React.useState<string[]>([]);
    const {paginatePagesTag, paginateCount, articles, sendLastPage} = useAppSelector((state: RootState) => state.article);
    const {isAuth} = useAuth()



    const dispatch = useAppDispatch();
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





    React.useEffect(() => {

        const getTags = async () => {
            const data = await axios.get('https://conduit.productionready.io/api/tags');
            setTag(data.data.tags);
        }

        getTags();
    }, []);



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
            if(e.selected !== 0) {
                dispatch(setPaginatePage(e.selected * 10))
            }else{
                dispatch(setPaginatePage(e.selected))
            }

        }
    }
    const pagPage2 = (e: { selected: number; }) => {
        if (e) {
            if(e.selected !== 0){
                dispatch(setPaginatePagesTag(e.selected * 10))
            }else{
                dispatch(setPaginatePagesTag(e.selected))
            }
        }
    }

    React.useEffect(() => {
        if(sendLastPage === '/login'){
            getActiveTextLink(1);
            dispatch(setSendLastPage(''));
        }
    },[sendLastPage,dispatch])

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
                        // ''
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
                    </div>
                </div>
            </div>
            {text[1].active ?    <Pagination
            paginateCounts={articles ? Math.ceil(articles?.articlesCount / 10) : 0}


            pagPage={pagPage1} />  : ''}
            {text[2].active ? (paginateCount ? <Pagination paginateCounts={paginatePagesTag} pagPage={pagPage2} />: ''): ''}
        </div>
        </>
    )
}

export default Home;