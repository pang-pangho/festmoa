// src/pages/InternationalPerformances.jsx
import React, { useEffect, useState } from "react";
import { fetchPerformances } from "../api/kopisApi"; // API 호출 함수 임포트

const InternationalPerformances = () => {
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
        console.log("내한공연 데이터:", data);

        // 필터링된 내한공연 데이터만 설정
        if (data?.dbs?.db) {
          setPerformances(data.dbs.db);
        } else {
          setPerformances([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPerformances();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
    <div>
      <h1>내한공연</h1>
      {performances.length > 0 ? (
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
        <p>내한공연 정보를 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default InternationalPerformances;
