import axios from "axios";
import { convertXmlToJson } from "../utils/xmlToJson";

const API_KEY = process.env.REACT_APP_KOPIS_API_KEY;
const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BASE_URL_PROD
    : process.env.REACT_APP_BASE_URL_LOCAL;

console.log("API Key:", API_KEY); // API 키 확인
console.log("Base URL:", baseURL); // baseURL 확인

const kopisApi = axios.create({
  baseURL,
  params: { service: API_KEY },
});

// 공연 목록을 가져오는 함수
export const fetchPerformances = async (params) => {
  try {
    const response = await kopisApi.get("/pblprfr", { params });
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
    const response = await kopisApi.get(`/pblprfr/${performanceId}`, {
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
