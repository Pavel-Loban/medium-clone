import React from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Pagination from 'Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { setPaginatePage, setPaginateCount, setPaginatePagesTag, setAuthorArticles} from '../../store/articleSlice';
import { ReactComponent as Setting } from '../../assets/images/settings.svg';
import { RootState } from 'store';
import ArticleItem from 'components/ArticleItem/ArticleItem';
import styles from './authorArticles.module.scss';
import { Link } from 'react-router-dom';


const AuthorArticles: React.FC = () => {
    const [status, setStatus] = React.useState<string>('');
    const [image, setImage] = React.useState<string>('');
    console.log()
    const { authorName } = useParams();

    const { authorArticles, paginatePage, paginateCount } = useAppSelector((state: RootState) => state.article);
    const { userName, userImage } = useAppSelector((state: RootState) => state.user);



    const dispatch = useAppDispatch();


    const getAuthor = async () => {
        const token = localStorage.getItem('tokenConduit');
        try {
            setStatus('loading')
            if (token !== null) {
                const data = await axios.get(`https://conduit.productionready.io/api/articles?author=${authorName}&limit=10&offset=${paginatePage}`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
                );
                setImage(data.data.articles[0].author.image);
                dispatch(setAuthorArticles(data.data.articles));
                dispatch(setPaginateCount(Math.ceil(data.data.articlesCount / 10)))
                setStatus('')
            } else {
                const data = await axios.get(`https://conduit.productionready.io/api/articles?author=${authorName}&limit=10&offset=${paginatePage}`);
                dispatch(setAuthorArticles(data.data.articles));
                dispatch(setPaginateCount(Math.ceil(data.data.articlesCount / 10)))
            }
            setStatus('')
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {

        getAuthor();
    }, [authorName, paginatePage])



    const pagPage1 = (e: { selected: number; }) => {
        if (e) {
            if (e.selected !== 0) {
                dispatch(setPaginatePage(e.selected * 10))
            } else {
                dispatch(setPaginatePage(e.selected))
            }

        }
    }

    const pagPage2 = (e: { selected: number; }) => {
        if (e) {
            if (e.selected !== 0) {
                dispatch(setPaginatePagesTag(e.selected * 10))
            } else {
                dispatch(setPaginatePagesTag(e.selected))
            }

        }
    }

console.log('fff',authorArticles)

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <img src={userName === authorName ? userImage : image} alt='avatar' />

                <div className={styles.nameAuthor_header}>{authorName}
                </div>
                {userName === authorName
                    ?
                    <Link to='/settings'>
                        <button className={styles.button_follow}>
                            <Setting width={15} height={15} className={styles.heart} />
                            Edit Profile Settings
                        </button>
                    </Link>
                    :
                    <button className={styles.button_follow}>
                        <div className={styles.plus}>
                            +
                        </div>
                        Follow to {authorName}
                    </button>
                }

            </div>
            {
                status === 'loading'  ?
                    <p style={{ marginTop: '20px' }} >Loading articles...</p> :
                          authorArticles.map((item) => (
                        <ArticleItem key={item.slug} image={item.author.image} authorName={item.author.username} description={item.description} title={item.title} updatedAt={item.updatedAt} favoritesCount={item.favoritesCount} tagList={item.tagList} slug={item.slug} favorited={item.favorited} body={item.body} />

                    ))
                    }
            <div className={status === 'loading' ? styles.hide : ''}>


                {paginateCount > 1 ?
                    <Pagination paginateCounts={paginateCount} pagPage={pagPage1} />
                    :
                    ''
                }
            </div>
        </div>
    )
}

export default AuthorArticles