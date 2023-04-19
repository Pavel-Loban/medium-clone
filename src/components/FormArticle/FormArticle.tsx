import { Button } from 'common/button/button';
import React from 'react';

import styles from './formArticle.module.scss';

interface Props {
    valueTitle: string,
    valueDescription: string,
    valueBody: string,
    valueTags: string,
    handleChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleChangeDescription: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleChangeBody: (e: React.ChangeEvent<HTMLTextAreaElement>) => void | undefined,
    handleChangeTags: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: (e:any ) => void
}

export const FormArticle:React.FC<Props> = ({valueTitle,
    valueDescription,
    valueBody,
    valueTags,
    handleChangeTitle,
    handleChangeDescription,
    handleChangeBody,
    handleChangeTags,
    handleSubmit}) => {
  return (
    <form className={styles.form_new_article}
              onSubmit={handleSubmit} >
              <fieldset>
              <input
                className={styles.input_title_article}
                name='title'
                value={valueTitle}
                onChange={handleChangeTitle}
                placeholder='Article Title'
              />
              </fieldset>

              <fieldset>
              <input
                className={styles.input_about_article}
                name='description'
                value={valueDescription}
                onChange={handleChangeDescription}
                placeholder='What&#39;s this article about?'
              />
              </fieldset>
              <fieldset>
              <textarea
                className={styles.text_article}
                name='body'
                value={valueBody}
                onChange={handleChangeBody}
                placeholder='Write your article (in markdown)'
              />
              </fieldset>

              <fieldset>
              <input
                className={styles.input_tags_article}
                name='tagList'
                value={valueTags}
                onChange={handleChangeTags}
                placeholder='Enter tags'
              />
              </fieldset>

              <Button typeSubmit={true} title='Publish Article' />

            </form>
  )
}
