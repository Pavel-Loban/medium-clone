import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

interface Author {
  username:string,
  image: string,
  following: boolean,
}

export type Article = {
  image: string,
  body: string,
  author: Author,
  slug:string,
  description: string,
  title:string,
  updatedAt:number,
  favoritesCount:number,
  tagList: string[],
  favorited:boolean,
  }

  export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
  }

interface ArticleState {
    articles: Article[];
    status: Status;
    paginatePage: number;
    paginateCount: number;
    namesLink: string,
    paginatePagesTag: number;
    sendLastPage: string;
  }

const initialState: ArticleState = {
    articles: [],
    status: Status.LOADING,
    paginatePage: 0,
    paginateCount: 0,
    namesLink: 'uuu',
    paginatePagesTag:0,
    sendLastPage: '',
}


export const fetchArticles = createAsyncThunk(
    'article/fetchArticlesStatus',

    async (baseUrl:string) => {
      try {
        // const { baseUrl } = params;
      const  data = await axios.get(baseUrl)
      console.log(data)
      return data.data.articles;
      } catch (error) {
        console.log(error)
      }
    }
  )

const articleSlice = createSlice({
    name: "article",
    initialState,
    reducers: {
        setArticles: (state, action: PayloadAction<any>) => {
            state.articles=action.payload;
            console.log(state.articles)
          },
          setPaginatePage: (state, action: PayloadAction<any>) => {
            state.paginatePage=action.payload;
          },
          setPaginatePagesTag: (state, action: PayloadAction<number>) => {
            state.paginatePagesTag=action.payload;
          },
          setPaginateCount: (state, action: PayloadAction<any>) => {
            state.paginateCount=action.payload;
          },
          setNameLink: (state, action: PayloadAction<string>) => {
            state.namesLink= action.payload;
          },
          setSendLastPage: (state, action: PayloadAction<string>) => {
            state.sendLastPage= action.payload;
          },
    },

    extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.status = Status.LOADING;
      state.articles = [];
      // state.articlesOnTag = [];
    })

    builder.addCase(fetchArticles.fulfilled, (state, action: PayloadAction<any>) => {
      state.articles =action.payload;
      // state.articlesOnTag =action.payload;
      state.status = Status.SUCCESS;
    })

    builder.addCase(fetchArticles.rejected, (state) => {
      state.status = Status.ERROR;
      state.articles = [];
      // state.articlesOnTag = [];
    })

  },
  })



export const { setArticles, setPaginatePage, setPaginateCount, setPaginatePagesTag,setNameLink, setSendLastPage } =
articleSlice.actions;

export default articleSlice.reducer;