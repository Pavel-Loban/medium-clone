import React from 'react';
import Navbar from 'components/Navbar/Navbar';
import styles from './App.module.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from 'pages/home/home';
import LoginPage from "pages/Login/LoginPage";
import RegisterPage from "pages/Register/RegisterPage";
import NewArticle from 'pages/newArticle/newArticle';
import YourFeed from 'pages/yourFeed/yourFeed';
import Footer from 'components/Footer/Footer';
import Settings from 'pages/settings/settings';
import AuthorArticles from 'pages/AuthorArticles/authorArticles';
import ArticleBody from 'pages/Article/articleBody';
import { EditArticle } from 'pages/EditArticle/EditArticle';

function App() {

  return (
    <React.StrictMode>
    <Router basename="/medium-clone">
      <div className={styles.App}>
        <Navbar />

        <div className={styles.content}>


          <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/yourfeed" element={<YourFeed /> }  />
            <Route path="/login" element={<LoginPage /> }  />
            <Route path="/register" element={<RegisterPage /> }  />
            <Route path="/editor" element={<NewArticle /> }  />
            <Route path="/editor/:slug" element={<EditArticle /> }  />
            <Route path="/settings" element={<Settings /> }  />
            <Route path="/profile/:authorName" element={<AuthorArticles /> }  />
            <Route path="/article/:slug" element={<ArticleBody /> }  />

          </Routes>
        </div>
        <Footer/>
      </div>

    </Router>
    </React.StrictMode>
  );
}

export default App;
