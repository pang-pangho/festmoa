const axios = require("axios");

export default async function handler(req, res) {
  const { query } = req; // 요청된 쿼리 파라미터를 가져옵니다.
  const API_KEY = process.env.REACT_APP_KOPIS_API_KEY;
  const API_URL = `https://kopis.or.kr/openApi/restful/pblprfr?service=${
    process.env.REACT_APP_KOPIS_API_KEY
  }&${new URLSearchParams(query).toString()}`;

  try {
    const response = await axios.get(API_URL); // KOPIS API에 요청을 보냅니다.
    res.status(200).json(response.data); // 응답 데이터를 JSON으로 반환합니다.
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.message,
      status: error.response?.status || 500,
    });
  }
}
