import axios from "axios";
import { convertXmlToJson } from "../utils/xmlToJson";

// 환경 변수에서 baseURL 가져오기
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://proxy.cors.sh/https://kopis.or.kr/openApi/restful"
    : "http://localhost:3000/openApi/restful"; // 로컬 테스트 시에는 KOPIS API를 직접 호출

console.log(process.env.NODE_ENV);
const API_KEY = process.env.REACT_APP_KOPIS_API_KEY;
const CORS_API_KEY = "temp_5eb2645376d1df14021a05db0b16c3a5"; // 발급받은 cors.sh API 키
console.log("API Key:", API_KEY); // API 키 확인
console.log("Base URL:", baseURL); // baseURL 확인

const kopisApi = axios.create({
  baseURL,
  params: { service: API_KEY },
  headers: {
    "x-cors-api-key": CORS_API_KEY, // cors.sh API 키 헤더에 추가
  },
});

// 공연 목록을 가져오는 함수
export const fetchPerformances = async (params) => {
  try {
    const response = await kopisApi.get("/pblprfr", { params });
    console.log("Params:", params);
    const jsonResult = convertXmlToJson(response.data);
    return jsonResult;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};

// 공연 상세 정보를 가져오는 함수
export const fetchPerformanceDetails = async (performanceId) => {
  try {
    console.log("Fetching details for performance ID:", performanceId);
    const response = await kopisApi.get(`/pblprfr/${performanceId}`, {
      params: { service: API_KEY },
    });
    console.log("Performance details response:", response.data);
    const jsonResult = convertXmlToJson(response.data);
    return jsonResult;
  } catch (error) {
    console.error("Performance details fetching failed:", error.message);
    throw error;
  }
};

// 예매처 URL 추출 함수
export const getTicketUrls = (details) => {
  if (details?.dbs?.db?.styurls?.styurl) {
    return details.dbs.db.styurls.styurl.map((url) => ({
      url: url._text,
      site: url._attributes.sty,
    }));
  }
  return [];
};
