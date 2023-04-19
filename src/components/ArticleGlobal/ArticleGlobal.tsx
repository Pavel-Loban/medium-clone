import React from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { RootState } from 'store';
import { fetchArticles} from '../../store/articleSlice';
import ArticleItem from 'components/ArticleItem/ArticleItem';



const ArticleGlobal: React.FC = () => {


    const dispatch = useAppDispatch();
    const { status, articles, paginatePage, reload } = useAppSelector((state: RootState) => state.article);

    React.useEffect(() => {

        const baseUrl = `https://conduit.productionready.io/api/articles?limit=10&offset=${paginatePage}`;

        const getArticles = async () => {

                await dispatch(fetchArticles(baseUrl));
        }
            getArticles();

    }, [paginatePage,reload, dispatch]);


    return (
        <>

            {status === 'loading' ?
                <p style={{ marginTop: '20px' }} >Loading articles...</p> :

articles?.articles.map((item, index) => (
                    <ArticleItem key={index}
                    image={item.author.image} authorName={item.author.username} description={item.description} title={item.title} updatedAt={item.updatedAt} favoritesCount={item.favoritesCount} tagList={item.tagList} slug={item.slug} favorited={item.favorited} body={item.body}
                    />
                ))
            }


        </>
    )

}

export default ArticleGlobal