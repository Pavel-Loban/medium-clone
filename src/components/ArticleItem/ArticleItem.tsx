import React from 'react';
import styles from './articleItem.module.scss';
import { ReactComponent as Heart } from '../../assets/images/heart2.svg';
import { useNavigate} from 'react-router-dom';
import { useAppDispatch} from 'hooks/redux-hooks';
import { setPaginatePage } from 'store/articleSlice';
import InfoArticle from 'components/InfoArticle/InfoArticle';
import { instance } from 'services';




interface Props {
    image: string,
    authorName: string,
    description: string,
    title: string,
    updatedAt:string,
    favoritesCount: number,
    tagList: string[],
    slug: string,
    favorited: boolean,
    body: string,
}

const ArticleItem: React.FC<Props> = ({ image, authorName, description, title, updatedAt, favoritesCount, tagList, slug, favorited, body }) => {

    const dispatch = useAppDispatch();

    const push = useNavigate();
    const [count, setCount] = React.useState(favoritesCount);
    const [like,setLike] = React.useState(favorited);


    const favoritedRef = React.useRef<HTMLDivElement>(null)

    const addOrRemoveLikePost = async(id:string) => {

            try {
                if(like){
                    const data =
                    await instance.delete(`/api/articles/${id}/favorite`)
            setCount(count - 1);
            setLike(favorited => !favorited );
            console.log(data);
                }else{
                    const data =
                    await instance.post(`/api/articles/${id}/favorite`)
            setCount(count + 1);
            setLike(favorited => !favorited );
            console.log(data);
                }
            } catch (error) {
                push('/login');
                console.log(error);
            }
    }


    const getAuthor = async() => {


      dispatch(setPaginatePage(0))
        push(`/profile/${authorName}`);
    }

    const getArticlBody = (text:string) => {
        push(`/article/${slug}`);
    }


    const color = '#5cb85c';
    return (
        <div className={styles.wrapper}  >
            <div className={styles.articleBlock}>
                <div className={styles.infoArticle}>
                    <InfoArticle
                    image={image}
                    authorName={authorName}

                    updatedAt={updatedAt}
                    getAuthor={getAuthor}
                    />
                    <div ref={favoritedRef} className={!like ? styles.likeArticle  : styles.activeLikeArticle }
                    onClick={ () => addOrRemoveLikePost(slug)}
                     >
                        <Heart width={15} height={15} fill={color} className={styles.heart} />
                        <p

                        >
                            {count}
                        </p>
                    </div>
                </div>

                <div className={styles.article} onClick={() =>  getArticlBody(slug)}>
                    <div className={styles.titleArticle}>
                        {title}
                    </div>
                    <div className={styles.textArticle}>
                        {description}
                    </div>
                </div>
                <div className={styles.footerArticle} >
                    <div className={styles.footerReadMore} onClick={() => getArticlBody(slug)} >Read more...</div>
                    <div className={styles.footerWords} onClick={() => getArticlBody(slug)}>
                        {tagList.map((item, index) => (
                            <p key={index}  >{item}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleItem