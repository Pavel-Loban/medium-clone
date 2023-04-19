import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { instance } from "services";

interface Author {
  username:string,
  image: string,
  following: boolean,
  bio:string,
}

export type Article = {
  body: string,
  author: Author,
  slug:string,
  description: string,
  title:string,
  createdAt: string,
  updatedAt:string,
  favoritesCount:number,
  tagList: string[],
  favorited:boolean,
  }

  type Articles={
    articles: Article[],
    articlesCount: number
  }

  export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
  }

interface ArticleState {
    authorArticles: Article[];
    articles: Articles | null;
    article: Article | null;
    status: Status;
    paginatePage: number;
    paginateCount: number;
    namesLink: string,
    paginatePagesTag: number;
    sendLastPage: string;
    reload: boolean;
  }

const initialState: ArticleState = {
   authorArticles: [],
    articles: null,
    article: null,
    status: Status.LOADING,
    paginatePage: 0,
    paginateCount: 0,
    namesLink: 'uuu',
    paginatePagesTag:0,
    sendLastPage: '',
    reload: false,
}


export const fetchArticles = createAsyncThunk(
    'article/fetchArticlesStatus',

    async (baseUrl:string) => {
      try {
      const  data = await instance.get(baseUrl)
      return data.data
      } catch (error) {
        console.log(error)
      }
    }
  )



const articleSlice = createSlice({
    name: "article",
    initialState,
    reducers: {
        setArticles: (state, action: PayloadAction<Articles>) => {
            state.articles=action.payload;
            console.log(state.articles)
          },
          setArticle: (state, action: PayloadAction<Article>) => {
            state.article = action.payload;
          },
          setArticleClear: (state, action) => {
            state.article = action.payload;
          },
          setAuthorArticles: (state, action: PayloadAction<Article[]>) => {
            state.authorArticles=action.payload;
            console.log(state.authorArticles)
          },
          setPaginatePage: (state, action: PayloadAction<number>) => {
            state.paginatePage=action.payload;
          },
          setPaginatePagesTag: (state, action: PayloadAction<number>) => {
            state.paginatePagesTag=action.payload;
          },
          setPaginateCount: (state, action: PayloadAction<number>) => {
            state.paginateCount=action.payload;
          },
          setNameLink: (state, action: PayloadAction<string>) => {
            state.namesLink= action.payload;
          },
          setSendLastPage: (state, action: PayloadAction<string>) => {
            state.sendLastPage= action.payload;
          },
          setReload: (state, action: PayloadAction<boolean>) => {
            state.reload = action.payload;
          },
    },

    extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.status = Status.LOADING;
      state.articles =  null;
    })

    builder.addCase(fetchArticles.fulfilled, (state, action: PayloadAction<Articles>) => {
      state.articles =action.payload;
      state.status = Status.SUCCESS;
    })

    builder.addCase(fetchArticles.rejected, (state) => {

      state.status = Status.ERROR;
      state.articles =  null;
    })
  },
  })



export const { setArticles, setPaginatePage, setPaginateCount, setPaginatePagesTag,setNameLink, setSendLastPage, setAuthorArticles ,  setArticle, setArticleClear, setReload } =
articleSlice.actions;

export default articleSlice.reducer;