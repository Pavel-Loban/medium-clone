// import React from 'react';
import Banner from 'components/Banner/Banner';
import Navbar from 'components/Navbar/Navbar';
import styles from './App.module.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from 'pages/home/home';
import LoginPage from "pages/Login/LoginPage";
import RegisterPage from "pages/Register/RegisterPage";
import {useAuth} from './hooks/use-auth';
import NewArticle from 'pages/newArticle/newArticle';
import YourFeed from 'pages/yourFeed/yourFeed';
import Footer from 'components/Footer/Footer';
import Settings from 'pages/settings/settings';

function App() {

  const { isAuth } = useAuth()
  return (
    <Router basename="/">
      <div className={styles.App}>
        <Navbar />

        {/* <Banner/> */}
        <div className={styles.content}>
          {/* content */}


          <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/yourfeed" element={<YourFeed /> }  />
            <Route path="/login" element={<LoginPage /> }  />
            <Route path="/register" element={<RegisterPage /> }  />
            <Route path="/newArticle" element={<NewArticle /> }  />
            <Route path="/settings" element={<Settings /> }  />


          </Routes>
        </div>
        <Footer/>
      </div>

    </Router>

  );
}

export default App;
