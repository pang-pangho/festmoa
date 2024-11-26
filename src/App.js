import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Footer from "./layout/Footer";
import MainPage from "./pages/MainPage";
import DomesticPerformances from "./pages/DomesticPerformances";
import DomesticFestivals from "./pages/DomesticFestivals";
import InternationalPerformances from "./pages/InternationalPerformances";
import FestivalDetail from "./pages/FestivalDetail";
import Community from "./pages/Community";
import Create from "./pages/Create";
import SignUp from "./pages/login/signup/SignUp";
import SignIn from "./pages/login/signin/SignIn";
function App() {
  const [posts, setPosts] = useState([]); // 게시글 상태 관리

  const addPostHandler = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // 새 게시글을 추가
  };

  return (
    <Router>
      <Layout />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/domestic-performances"
          element={<DomesticPerformances />}
        />
        <Route path="/domestic-festivals" element={<DomesticFestivals />} />
        <Route path="/community" element={<Community posts={posts} />} />
        <Route
          path="/community/create"
          element={<Create onAddPost={addPostHandler} />}
        />
        <Route
          path="/international-performances"
          element={<InternationalPerformances />}
        />
        <Route path="/detail/:id" element={<FestivalDetail />} />
        <Route path="/signin" element={<SignIn />} /> {/* 로그인 페이지 */}
        <Route path="/signup" element={<SignUp />} /> {/* 회원가입 페이지 */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
