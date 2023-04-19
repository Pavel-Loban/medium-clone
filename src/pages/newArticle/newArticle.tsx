import React from 'react';
import {useNavigate } from 'react-router-dom';
import { Formik } from 'formik';

import { SchemaNewArticle } from 'validations-shema';
import { FormArticle } from 'components/FormArticle/FormArticle';
import { newArticleUser } from 'api/api';

import styles from './newArticle.module.scss';

const NewArticle: React.FC = () => {

  const push = useNavigate();

  const postNewArticle = async (title: string,
    description: string,
    body: string,
    tagList:  string[]) => {


    const article = {
      title: title,
      description: description,
      body: body,
      tagList: tagList
    }

    newArticleUser(article)
      .then((res) => {
        console.log(res)
        push(`/article/${res.article.slug}`)
      })
      .catch((err) => {
        console.log(err)
      })
  }


  return (
    <div className={styles.wrapper_new_article}>

      <Formik
        initialValues={{
          title: '',
          description: '',
          body: '',
          tagList: '',
        }}
        validationSchema={SchemaNewArticle}
        onSubmit={(values) => postNewArticle(

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

export default NewArticle