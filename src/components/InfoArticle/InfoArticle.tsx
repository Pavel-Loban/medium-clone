import React from 'react';
import styles from './infoArticle.module.scss';



interface Props {
    image:string | undefined ,
    authorName: string | undefined ,
    updatedAt:string | undefined ,
    getAuthor: () => void,
}



const InfoArticle:React.FC<Props> = ({
    updatedAt,image, authorName,
    getAuthor}) => {



    return (
        <div className={styles.infoArticleBlock}>
            <div className={styles.iconArticle}>
                <img className={styles.imgArticle} src={image} alt='avatar' onClick={getAuthor}/>
            </div>
            <div className={styles.dateAndNameArticle}>
                <div className={styles.nameAutor} onClick={getAuthor}>{authorName}
                </div>
                <div className={styles.dateArticle}>
                    { updatedAt !== undefined && new Date(updatedAt).toLocaleString('en',
                        {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}
                </div>
            </div>
        </div>
    )
}

export default InfoArticle