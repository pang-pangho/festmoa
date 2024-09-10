// src/components/TestCompo.jsx
import React from "react";
import useApiData from "../hooks/useApiData"; // 경로는 실제 구조에 따라 다를 수 있습니다.
import "./TestCompo.style.css";
const TestCompo = () => {
  const { data, loading, error } = useApiData();
  console.log("데이따:", data);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <div>
      <h1>Data from API</h1>
      {data &&
        data.dbs.db.map((performance, index) => (
          <div key={index}>
            <h2>{performance.prfnm._text}</h2>
            <div
              style={{
                backgroundImage: `url(${performance.poster._text})`,
              }}
              className="perfomance_poster"
            ></div>

            <p>
              공연 기간: {performance.prfpdfrom._text} ~{" "}
              {performance.prfpdto._text}
            </p>
            <p>장소: {performance.fcltynm._text}</p>
            <p>장르: {performance.genrenm._text}</p>
          </div>
        ))}
    </div>
  );
};

export default TestCompo;
