import React from 'react';
import styles from './articleGlobal.module.scss';
import icon from '../../assets/images/person.svg';
import { ReactComponent as Heart } from '../../assets/images/heart2.svg';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { RootState } from 'store';
import { fetchArticles} from '../../store/articleSlice';
import axios from 'axios';
import ArticleItem from 'components/ArticleItem/ArticleItem';
import { setUser,removeUser } from 'store/userSlice';
import { setArticles } from 'store/articleSlice';
import { useAuth } from 'hooks/use-auth';



const ArticleGlobal: React.FC = () => {

    const [tag, setTag] = React.useState<string>('');
    const [articlesOnTag, setArticlesOnTag] = React.useState<string[]>([]);
    const dispatch = useAppDispatch();
    const { status, articles, paginatePage } = useAppSelector((state: RootState) => state.article);

    const {isAuth} = useAuth();

    const baseUrl = `https://api.realworld.io/api/articles?limit=10&offset=${paginatePage}`;



    const getArticles = async () => {
        await dispatch(fetchArticles(baseUrl));
        // window.scrollTo(0, 0);
        console.log('3', articles);
    }

    const token = localStorage.getItem('tokenData');

    React.useEffect(() => {

        if (token !== null) {
            axios.interceptors.request.use((config: any) => {
                const token = localStorage.getItem('tokenData')
                if(token !== null){
                    config.headers.Authorization = `Token ${token}`;
                return config;
                }else{
                    config.headers.Authorization = '';
                    return config;
                }

              });

            axios
      .get('https://conduit.productionready.io/api/user '

      ).then((response) => {
        localStorage.setItem('tokenData', response.data.user.token);
        dispatch(setUser({
            userEmail: response.data.user.email,
            userToken: response.data.user.token,
            userName: response.data.user.username,
          }));
          getArticles();
      }
      ).catch((err) => {
        console.log(err);
      })

        }else{

            // axios.defaults.headers.common['Authorization'] = ''
            // axios.interceptors.request.use((config: any) => {
            //     delete config.headers.Authorization
            //     return config;
            //   });
            dispatch(removeUser())
            console.log('2', articles);
            getArticles();
        }
    }, []);


    React.useEffect(() => {
        getArticles();
    }, [paginatePage]);


    return (
        <>

            {status === 'loading' ?
                <p style={{ marginTop: '20px' }} >Loading articles...</p> :

                articles.map((item, index) => (
                    <ArticleItem key={index} image={item.author.image} username={item.author.username} description={item.description} title={item.title} updatedAt={item.updatedAt} favoritesCount={item.favoritesCount} tagList={item.tagList} slug={item.slug} favorited={item.favorited} />
                ))
            }
            {/* {status === 'loading' ? '' :<Pagination  />} */}
        </>
    )

}

export default ArticleGlobal