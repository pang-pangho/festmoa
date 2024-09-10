import React from "react";
import TestCompo from "./components/TestCompo";
import "./App.css";

//레이아웃 -> 국내공연, 국내 페스티벌, 내한공연, 해외 페스티벌
//각 탭마다 인기순 기능 적용

function App() {
  return (
    <div className="App">
      <TestCompo />
    </div>
  );
}

export default App;
