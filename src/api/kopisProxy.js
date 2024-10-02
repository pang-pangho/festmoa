const axios = require("axios");

export default async function handler(req, res) {
  const { query } = req;
  const API_KEY = process.env.KOPIS_API_KEY; // 서버 환경 변수
  const API_URL = `https://kopis.or.kr/openApi/restful/pblprfr?service=${API_KEY}&${new URLSearchParams(
    query
  ).toString()}`;
  console.log("서버측 API 키 :", API_KEY);
  try {
    const response = await axios.get(API_URL);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.message,
      status: error.response?.status || 500,
    });
  }
}
