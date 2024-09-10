// // src/api/api.js
// import axios from "axios";

// const API_KEY = process.env.REACT_APP_KOPIS_API_KEY;
// const baseURL = "https://www.kopis.or.kr/openApi/restful/";

// const api = axios.create({
//   baseURL,
//   headers: {
//     Accept: "application/json",
//     Authorization: `Bearer ${API_KEY}`,
//   },
// });

// export const fetchPerformances = async (params) => {
//   try {
//     const response = await api.get("pblprfr", { params });
//     return response.data;
//   } catch (error) {
//     console.error("API 호출 실패:", error);
//     throw error;
//   }
// };

// export default api;

import axios from "axios";

// 환경 변수에서 API 키를 가져오기
const API_KEY = process.env.REACT_APP_KOPIS_API_KEY;
const baseURL = "https://www.kopis.or.kr/openApi/restful/";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// 공연 정보를 가져오는 함수
export const fetchPerformances = async (params) => {
  try {
    const response = await api.get("pblprfr", {
      params: {
        service: API_KEY,
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

export default api;
