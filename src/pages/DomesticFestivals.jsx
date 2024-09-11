// src/pages/DomesticFestivals.jsx
import React, { useEffect, useState } from "react";
import { fetchPerformances } from "../api/kopisApi"; // API 호출 함수 임포트

const DomesticFestivals = () => {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFestivals = async () => {
      try {
        setLoading(true);
        const data = await fetchPerformances({
          cpage: 1,
          rows: 10,
          shcate: "CCCD",
        });
        console.log("국내 페스티벌 데이터:", data);

        if (data?.dbs?.db) {
          setFestivals(data.dbs.db);
        } else {
          setFestivals([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadFestivals();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
    <div>
      <h1>국내 페스티벌</h1>
      {festivals.length > 0 ? (
        festivals.map((festival, index) => (
          <div key={index}>
            <h2>{festival.prfnm._text}</h2>
            <div
              style={{
                backgroundImage: `url(${festival.poster._text})`,
              }}
              className="performance_poster"
            ></div>
            <p>
              공연 기간: {festival.prfpdfrom._text} ~ {festival.prfpdto._text}
            </p>
            <p>장소: {festival.fcltynm._text}</p>
            <p>장르: {festival.genrenm._text}</p>
          </div>
        ))
      ) : (
        <p>페스티벌 정보를 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default DomesticFestivals;
