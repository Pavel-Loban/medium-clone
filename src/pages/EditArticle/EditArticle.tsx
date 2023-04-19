import React from 'react';
import { useNavigate, useParams,useLocation } from 'react-router-dom';
import { Formik } from 'formik';


import { RootState } from 'store';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { SchemaNewArticle } from 'validations-shema';
import { FormArticle } from 'components/FormArticle/FormArticle';
import { editArticleUser, getArticle} from 'api/api';
import { setArticleClear } from 'store/articleSlice';

import styles from './editor.module.scss';

export const EditArticle: React.FC = () => {

    const location = useLocation()
    const { slug } = useParams();
    console.log(location.pathname.slice(8))
    const push = useNavigate();
    const dispatch = useAppDispatch();
    const {article } = useAppSelector((state: RootState) => state.article);




    React.useEffect(() => {

        const article = async () => {
            dispatch(setArticleClear(null));
           const data = await getArticle(location.pathname.slice(8));
            console.log(data)
        }
        article()
    }, [dispatch,location])

    const putEditArticle = async (
        slug:string,
        title: string,
        description: string,
        body: string,
        tagList: string[]) => {


        const article = {
            title: title,
            description: description,
            body: body,
            tagList: tagList
        }

        editArticleUser(slug, article)
            .then((res) => {
                console.log(res)
                push(`/article/${res.article.slug}`);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className={styles.wrapper_new_article}>

            <Formik
                initialValues={{
                    title: `${article?.title}`,
                    description: `${article?.description}`,
                    body: `${article?.body}`,
                    tagList: ``,
                }}
                validationSchema={SchemaNewArticle}
                onSubmit={(values) => putEditArticle(
                    slug!,
                    values.title,
                    values.description,
                    values.body,
                    values.tagList.split(',')

                )}
            >
                {({
                    values,
                    errors,
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    dirty,
                    touched,
                }) => {

                    return (



                        <FormArticle valueTitle={values.title} valueDescription={values.description} valueBody={values.body} valueTags={values.tagList} handleChangeBody={handleChange} handleChangeDescription={handleChange} handleChangeTitle={handleChange} handleChangeTags={handleChange} handleSubmit={handleSubmit} />

                    );
                }}
            </Formik>

        </div>
    )
}
