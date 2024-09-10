// src/hooks/useApiData.js
import { useState, useEffect } from "react";
import axios from "axios";

const useApiData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api") // responseType을 제거
      .then((response) => {
        setData(response.data); // 직접 JSON 데이터 사용
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
};

export default useApiData;
