const axios = require("axios");

exports.handler = async function (event, context) {
  const { queryStringParameters } = event;

  // 쿼리 파라미터 인코딩 추가
  const encodedParams = new URLSearchParams();
  for (const [key, value] of Object.entries(queryStringParameters)) {
    encodedParams.append(key, encodeURIComponent(value));
  }

  const API_KEY = process.env.KOPIS_API_KEY;
  const API_URL = `https://kopis.or.kr/openApi/restful/pblprfr?service=${API_KEY}&${encodedParams}`;

  try {
    const response = await axios.get(API_URL);

    // 응답 데이터를 확인
    console.log("Response Data: ", response.data);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.log("Error: ", error.message); // 에러 로그 확인
    return {
      statusCode: error.response?.status || 500,
      body: error.message,
    };
  }
};
