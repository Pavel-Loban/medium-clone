
import React from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { RootState } from 'store';
import { Article, setPaginatePagesTag } from '../../store/articleSlice';
import axios from 'axios';
import ArticleItem from 'components/ArticleItem/ArticleItem';



const Tag:React.FC = () => {
  const [paginateCount, setPaginateCount] = React.useState(0);
  const [status, setStatus] = React.useState<string>('');

  const [articlesOnTag,setArticlesOnTag] = React.useState<Article[]>([]);
  const {  paginatePage, namesLink,paginatePagesTag } = useAppSelector((state: RootState) => state.article);


  const dispatch = useAppDispatch();



  React.useEffect(() => {


    const getArticlesOnTag = async () => {
      const baseUrl2 = `https://conduit.productionready.io/api/articles?tag=${namesLink}&limit=10&offset=0`;
      try {
        setStatus('loading');
        const data = await  axios.get(baseUrl2);

         setArticlesOnTag(data.data.articles);
         articlesOnTag.length ? setPaginateCount(Math.ceil(data.data.articlesCount/10)) : setPaginateCount(0);

        const pages = data.data.articlesCount;

        pages >= 1 ? dispatch(setPaginatePagesTag(Math.ceil(data.data.articlesCount/10))) : dispatch(setPaginatePagesTag(0))

        setStatus('success');

      } catch (error) {
        setStatus('error');
        console.log(error);
      }
    }

    getArticlesOnTag()
}, [namesLink,paginatePagesTag, articlesOnTag.length, dispatch]);


  return (

    <>

    {status === 'loading' ?
        <p style={{marginTop: '20px'}} >Loading articles...</p> :

        (articlesOnTag.length >= 1 ?
          articlesOnTag.map((item,index) => (
            <ArticleItem key={index} image={item.author.image} authorName={item.author.username} description={item.description} title={item.title} updatedAt={item.updatedAt} favoritesCount={item.favoritesCount} tagList={item.tagList} slug={item.slug} favorited={item.favorited} body={item.body}/>
        ))
        : 'Nothing')
    }
</>
  )
}

export default Tag