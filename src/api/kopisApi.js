// src/api/kopisApi.js
import axios from "axios";
import { convertXmlToJson } from "../utils/xmlToJson";

const API_KEY = process.env.REACT_APP_KOPIS_API_KEY;
const baseURL = "/openApi/restful/pblprfr";

const kopisApi = axios.create({
  baseURL,
  params: { service: API_KEY },
});

export const fetchPerformances = async (params) => {
  try {
    const response = await kopisApi.get("", { params });
    const jsonResult = convertXmlToJson(response.data);
    return jsonResult;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};
