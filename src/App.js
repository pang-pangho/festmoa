import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Footer from "./layout/Footer";
import MainPage from "./pages/MainPage";
import DomesticPerformances from "./pages/DomesticPerformances";
import DomesticFestivals from "./pages/DomesticFestivals";
import InternationalPerformances from "./pages/InternationalPerformances";
import FestivalDetail from "./pages/FestivalDetail";

function App() {
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
        <Route
          path="/international-performances"
          element={<InternationalPerformances />}
        />
        <Route path="/detail/:id" element={<FestivalDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
