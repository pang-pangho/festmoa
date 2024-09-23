import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Footer from "./layout/Footer"; // Footer 추가
import Home from "./pages/Home";
import DomesticPerformances from "./pages/DomesticPerformances";
import DomesticFestivals from "./pages/DomesticFestivals";
import InternationalPerformances from "./pages/InternationalPerformances";
import FestivalDetail from "./pages/FestivalDetail";

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
        <Route path="/detail/:id" element={<FestivalDetail />} />
      </Routes>
      <Footer /> {/* Footer 컴포넌트 추가 */}
    </Router>
  );
}

export default App;
