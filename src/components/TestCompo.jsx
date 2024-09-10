// src/components/TestCompo.jsx
import React, { useEffect, useState } from "react";
import { fetchPerformances } from "../api/kopisApi";
import "./TestCompo.style.css";

const TestCompo = () => {
  const [performances, setPerformances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPerformances = async () => {
      try {
        setLoading(true);
        const data = await fetchPerformances({
          cpage: 1,
          rows: 10,
          shcate: "CCCD",
        });
        console.log("API 응답 데이터:", data);

        if (data?.dbs?.db) {
          setPerformances(data.dbs.db);
        } else {
          setPerformances([]); // 데이터가 없을 경우 빈 배열로 설정
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPerformances();
  }, []);

  if (loading) return <div>데이터를 불러오는 중입니다...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
    <div>
      <h1>공연 정보</h1>
      {Array.isArray(performances) && performances.length > 0 ? (
        performances.map((performance, index) => (
          <div key={index}>
            <h2>{performance.prfnm._text}</h2>
            <div
              style={{
                backgroundImage: `url(${performance.poster._text})`,
              }}
              className="performance_poster"
            ></div>
            <p>
              공연 기간: {performance.prfpdfrom._text} ~{" "}
              {performance.prfpdto._text}
            </p>
            <p>장소: {performance.fcltynm._text}</p>
            <p>장르: {performance.genrenm._text}</p>
          </div>
        ))
      ) : (
        <p>공연 정보를 불러올 수 없습니다.</p>
      )}
    </div>
  );
};

export default TestCompo;
