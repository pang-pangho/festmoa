import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import DomesticPerformances from "./pages/DomesticPerformances";
import DomesticFestivals from "./pages/DomesticFestivals";
import InternationalPerformances from "./pages/InternationalPerformances";
//레이아웃 -> 국내공연, 국내 페스티벌, 내한공연, 해외 페스티벌
//각 탭마다 인기순 기능 적용
function App() {
  return (
    <Router>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/domestic-performances"
          element={<DomesticPerformances />}
        />
        <Route path="/domestic-festivals" element={<DomesticFestivals />} />
        <Route
          path="/international-performances"
          element={<InternationalPerformances />}
        />
      </Routes>
    </Router>
  );
}

export default App;
