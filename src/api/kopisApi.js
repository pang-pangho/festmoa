import axios from "axios";
import { convertXmlToJson } from "../utils/xmlToJson";

// 환경 변수에서 baseURL 가져오기
const baseURL =
  process.env.NODE_ENV === "production"
    ? "/api/kopisProxy"
    : "http://localhost:3000/openApi/restful"; // 로컬 테스트 시에는 KOPIS API를 직접 호출
console.log(process.env.NODE_ENV);
const API_KEY = process.env.REACT_APP_KOPIS_API_KEY;
console.log("API Key:", API_KEY); // API 키 확인
console.log("Base URL:", baseURL); // baseURL 확인
const kopisApi = axios.create({
  baseURL,
  params: { service: process.env.REACT_APP_KOPIS_API_KEY },
});

// 공연 목록을 가져오는 함수
export const fetchPerformances = async (params) => {
  try {
    // 한글이나 특수 문자를 인코딩
    const encodedParams = { ...params };
    for (let key in encodedParams) {
      if (encodedParams[key]) {
        encodedParams[key] = encodeURIComponent(encodedParams[key]);
      }
    }

    const response = await kopisApi.get("/pblprfr", { params: encodedParams });
    console.log("Raw XML Response:", response.data); // 응답 데이터 확인
    const jsonResult = convertXmlToJson(response.data);
    console.log("JSON Result:", jsonResult); // 변환된 JSON 데이터 확인
    return jsonResult;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

// 공연 상세 정보를 가져오는 함수
export const fetchPerformanceDetails = async (performanceId) => {
  try {
    const encodedPerformanceId = encodeURIComponent(performanceId); // 공연 ID 인코딩
    const response = await kopisApi.get(`/pblprfr/${encodedPerformanceId}`, {
      params: { service: API_KEY },
    });
    const jsonResult = convertXmlToJson(response.data);
    return jsonResult;
  } catch (error) {
    console.error(
      "상세 정보 호출 실패:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
