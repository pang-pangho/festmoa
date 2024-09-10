require("dotenv").config(); // 환경 변수 로드

const express = require("express");
const axios = require("axios");
const converter = require("xml-js");
const cors = require("cors");
const app = express();

app.use(cors()); // CORS 정책 허용

const API_KEY = process.env.REACT_APP_KOPIS_API_KEY; // 환경 변수에서 API 키 가져오기
const BASE_URL = "http://www.kopis.or.kr/openApi/restful/";

app.get("/api", async (req, res) => {
  const params = {
    service: API_KEY,
    stdate: "20240505",
    eddate: "20241220",
    cpage: 1,
    rows: 10,
    shcate: "CCCD",
  };

  try {
    const response = await axios.get(`${BASE_URL}pblprfr`, { params });
    const jsonResult = converter.xml2json(response.data, {
      compact: true,
      spaces: 2,
    });
    res.json(JSON.parse(jsonResult));
  } catch (error) {
    console.error("Error during API request:", error);
    res.status(500).json({ error: "API 요청 실패", details: error.message });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
