import React from 'react';
import styles from './articleItem.module.scss';
import { ReactComponent as Heart } from '../../assets/images/heart2.svg';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';


interface Item {
    image: string,
    username: string,
    description: string,
    title: string,
    updatedAt: number,
    favoritesCount: number,
    tagList: string[],
}

interface Props {
    image: string,
    username: string,
    description: string,
    title: string,
    updatedAt: number,
    favoritesCount: number,
    tagList: string[],
    slug: string,
    favorited: boolean,
}

const ArticleItem: React.FC<Props> = ({ image, username, description, title, updatedAt, favoritesCount, tagList,slug, favorited }) => {

    const push = useNavigate();
const [like,setLike] = React.useState(favorited);

    const addOrRemoveLikePost = async(id:string) => {
        const token = localStorage.getItem('tokenData');

        if (token) {
            try {
                if(favorited){
                    const data = await fetch(`https://conduit.productionready.io/api/articles/${id}/favorite`, {
              method: 'DELETE',
              headers: {
                Authorization: `Token ${token}`,
              },
            });
            console.log(data)
            console.log(favorited)
                }else{
                    const data = await fetch(`https://conduit.productionready.io/api/articles/${id}/favorite`, {
              method: 'POST',
              headers: {
                Authorization: `Token ${token}`,
              },
            });
            console.log(data);
                }
            } catch (error) {
                console.log(error);
            }
          } else {
            push('/login')
          }
    }

    const getFavorite = async (slug:string, favorited:boolean) => {
        console.log(slug, favorited,like);
        setLike(favorited => !favorited );

        addOrRemoveLikePost(slug);
    }

    React.useEffect(() => {

    }, [favorited])
    const color = '#5cb85c';
    return (
        <div className={styles.wrapper}  >
            <div className={styles.articleBlock}>
                <div className={styles.infoArticle}>
                    <div className={styles.infoArticleBlock}>
                        <div className={styles.iconArticle}>
                            <img className={styles.imgArticle} src={image} />
                        </div>
                        <div className={styles.dateAndNameArticle}>
                            <div className={styles.nameAutor}>{username}
                            </div>
                            <div className={styles.dateArticle}>
                                {new Date(updatedAt).toLocaleString('en',
                                    {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                            </div>
                        </div>
                    </div>
                    <div className={!favorited ? styles.likeArticle : styles.activeLikeArticle }
                    onClick={ () => getFavorite(slug, favorited)}
                     >
                        <Heart width={15} height={15} fill={color} className={styles.heart} />
                        <p

                        >
                            {favoritesCount}
                        </p>
                    </div>
                </div>

                <div className={styles.article}>
                    <div className={styles.titleArticle}>
                        {title}
                    </div>
                    <div className={styles.textArticle}>
                        {description}
                    </div>
                </div>
                <div className={styles.footerArticle} >
                    <div className={styles.footerReadMore}>Read more...</div>
                    <div className={styles.footerWords}>
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