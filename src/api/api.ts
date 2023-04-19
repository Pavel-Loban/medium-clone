import axios from "axios";
import { instance } from "services";


interface NewArticle {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  }

export const editArticleUser = async (slug:string,article: NewArticle) => {
    const result = await instance.put(`/api/articles/${slug}`, {article});

    return result.data;
  };

  export const newArticleUser = async (article: NewArticle) => {
    const result = await instance.post('/api/articles', {article});

    return result.data;
  };

  export const deleteArticleUser = async (article: string) => {
    try {
      const result = await instance.delete(`/api/articles/${article}`);

    return result.data;
    } catch (error) {
      console.log(error)
    }

  };

  interface InfoUser {
    username: string;
    email: string;
    password: string;
    bio: string;
    image: string;

  }
  export const updateInfoUser = async (user: InfoUser) => {
    const result = await instance.put('/api/user', {user});
localStorage.setItem('userConduit', JSON.stringify(result.data.user))
    return result.data;
  };


  interface Auth {
    email: string;
    password: string;
  }
  export const postAuth = async (user: Auth) => {
    const result = await instance.post('/api/users/login', {user});
    return result.data;
  };

  interface Reg {
    username: string;
    email: string;
    password: string;

  }
  export const postRegister = async (user: Reg) => {
    const baseUrl = 'https://conduit.productionready.io/api/users';

    const result = await axios.post(baseUrl, {user});
    console.log('result',result)
    return result.data ;
  };


  export const getArticle = async (nameArticle: string) => {
    const baseUrl = `https://conduit.productionready.io/api/articles/${nameArticle}`;

    const result = await axios.get(baseUrl);
    return result.data.article ;
  };