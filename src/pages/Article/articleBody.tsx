import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { RootState } from 'store';
import axios from 'axios';
import { setArticle, setArticleClear, setReload } from 'store/articleSlice';
import styles from './articleBody.module.scss';
import InfoArticle from 'components/InfoArticle/InfoArticle';
import { ReactComponent as Heart } from '../../assets/images/heart2.svg';
import { ReactComponent as Setting } from '../../assets/images/settings.svg';
import { instance } from 'services';
import { Button } from 'common/button/button';
import { deleteArticleUser } from 'api/api';



const ArticleBody = () => {

  const token = localStorage.getItem('tokenConduit')
  const push = useNavigate();
  const dispatch = useAppDispatch();
  const { article, reload } = useAppSelector((state: RootState) => state.article);
  const { userName, userImage } = useAppSelector((state: RootState) => state.user);



  const { slug } = useParams();
  const [status, setStatus] = React.useState<string>('');
  const [statusFavotite, setStatusFavotite] = React.useState<string>('');


  React.useEffect(() => {

    const getArticle = async () => {
      setStatus('loading')
      dispatch(setArticleClear(null))
      const data = await instance(`https://conduit.productionready.io/api/articles/${slug}`)
      dispatch(setArticle(data.data.article))
      setStatus('');
    }

    const getArticleComments = async () => {
      await instance(`https://conduit.productionready.io/api/articles/${slug}/comments`)
    }

    getArticle();
    getArticleComments();
  }, [dispatch, slug])


  const addOrRemoveLikePost = async () => {
    setStatusFavotite('loading')
    try {
      if (article?.favorited) {
        const data =
          await instance.delete(`/api/articles/${article?.slug}/favorite`)
        dispatch(setArticle(data.data.article))
        setStatusFavotite('')
      } else {
        const data =
          await instance.post(`/api/articles/${article?.slug}/favorite`)
        dispatch(setArticle(data.data.article))
        setStatusFavotite('')
      }
    } catch (error) {
      setStatusFavotite('')
      push('/login');
      console.log(error);
    }
  }

  const followOrUnfollow = async () => {

    try {
      if (article?.author.following) {

          await instance.delete(`/api/profiles/${article?.author.username}/follow`)
      } else {

          await instance.post(`/api/profiles/${article?.author.username}/follow`)
      }
    } catch (error) {
      push('/login');
      console.log(error);
    }
  }

  const getAuthor = async () => {

    try {
      const data = await axios.get(`https://conduit.productionready.io/api/articles?author=${article?.author.username}`);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
    push(`/profile/${article?.author.username}`);
  }



  const deleteArticle = async (art: string) => {
    try {
      deleteArticleUser(art);
      dispatch(setReload(!reload))
      push('/');
    } catch (error) {
      console.log(error)
    }

  }

  const getEditPage = () => {
    push(`/editor/${article?.slug}`)
  }

  const color = '#5cb85c';

  return (
    <div className={styles.wrapper}>
      {status === 'loading' ? <p>Loading...</p> :

        <div
          className={styles.content}>
          <div className={styles.header}>
            <div className={styles.title}>{article?.title}</div>
            <div className={styles.header_footer}>
              <InfoArticle
                image={article?.author.image}
                authorName={article?.author.username}
                updatedAt={article?.updatedAt} getAuthor={getAuthor} />


              {userName === article?.author.username
                ?
                <>
                  <button className={styles.follow}
                  onClick={getEditPage}
                  >
                    <Setting width={15} height={15} fill={color} className={styles.heart} />
                    Edit article
                  </button>
                  <button className={styles.favorite}
                    onClick={() => deleteArticle(article.slug)}
                  >
                    <Setting width={15} height={15} fill={color} className={styles.heart} />
                    Delete Article
                  </button>
                </>
                :
                <>
                  <button className={styles.follow} onClick={followOrUnfollow} ><span>+</span>
                    {article?.author.following ? 'Unfollow ' : 'Follow '}
                    {article?.author.username}</button>
                  <button className={statusFavotite  ? `${styles.favorite} ${styles.cursor}` : styles.favorite} onClick={addOrRemoveLikePost} >
                    <Heart width={15} height={15} fill={color} className={styles.heart} />
                    {article?.favorited ? 'Unfavorite Article ' : 'Favorite Article '}
                    ({article?.favoritesCount})
                  </button>
                </>
              }

            </div>

          </div>
          <div className={styles.content_body}>{article?.body}
            <div className={styles.content_body_tag}>
              {article?.tagList.map((tag) => (
                <p key={tag} >{tag}</p>
              ))}
            </div>
          </div>
          <div className={styles.footer}>
            <InfoArticle
              image={article?.author.image} authorName={article?.author.username}
              updatedAt={article?.updatedAt}
              getAuthor={getAuthor} />


            {userName === article?.author.username
              ?
              <>
                <button className={styles.follow}
                onClick={getEditPage}
                >
                  <Setting width={15} height={15} fill='#cd1313' className={styles.heart} />
                  Edit article
                </button>
                <button className={styles.favorite}
                onClick={() => deleteArticle(article.slug)}
                >
                  <Setting width={15} height={15} fill={color} className={styles.heart} />
                  Delete Article
                </button>
              </>
              :
              <>
                <button className={styles.follow} onClick={followOrUnfollow} ><span>+</span>
                  {article?.author.following ? 'Unfollow ' : 'Follow '}
                  {article?.author.username}</button>
                <button className={statusFavotite  ? `${styles.favorite} ${styles.cursor}` : styles.favorite} onClick={addOrRemoveLikePost} >
                  <Heart width={15} height={15} fill={color} className={styles.heart} />
                  {article?.favorited ? 'Unfavorite Article ' : 'Favorite Article '}
                  ({article?.favoritesCount})
                </button>
              </>
            }
          </div>


          {token ?
            <form className={styles.form_comment} >
              <textarea
                className={styles.input_textarea}
                name='text'
                // value={bio}
                // onChange={(e) => setBio(e.target.value)}
                placeholder='Write a comment...'>

              </textarea>
              <div className={styles.blocl_btn_comment} >
                <img className={styles.footer_avatar} src={userImage} alt='avatar' />
                <Button title='Post Comment' typeSubmit={true} />

              </div>

            </form>
            :
            <div className={styles.links_sign_in}>
              <Link to='/login'><div>Sign in</div> </Link>
              <span>or</span>
              <Link to='/register'><div>sign up</div></Link>
              <span>to add comments on this article.</span>
            </div>}


        </div>
      }

    </div>
  )
}

export default ArticleBody