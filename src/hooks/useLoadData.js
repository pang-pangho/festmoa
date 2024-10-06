import { useEffect, useState } from "react";
import { fetchPerformances, fetchPerformanceDetails } from "../api/kopisApi";

const useLoadData = (category, filterVisit = false, cacheKey) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setProgress(0);

        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
          setData(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        const performances = await fetchPerformances({
          cpage: 1,
          rows: 10,
          shcate: category,
        });

        console.log("API Response Data:", performances);

        const performanceList = performances?.dbs?.db || [];
        const total = performanceList.length;

        if (total > 0) {
          const detailedData = [];

          for (let i = 0; i < performanceList.length; i++) {
            const details = await fetchPerformanceDetails(
              performanceList[i].mt20id._text
            );

            if (filterVisit) {
              if (details?.dbs?.db?.visit?._text === "Y") {
                detailedData.push(details.dbs.db);
              }
            } else {
              detailedData.push(details?.dbs?.db || performanceList[i]);
            }

            setProgress(((i + 1) / total) * 100);
          }

          setData(detailedData);
          localStorage.setItem(cacheKey, JSON.stringify(detailedData));
        } else {
          setData([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [category, filterVisit, cacheKey]);

  return { data, loading, error, progress };
};

export default useLoadData;
