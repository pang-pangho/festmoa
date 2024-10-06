const axios = require("axios");
exports.handler = async function (event, context) {
  const { queryStringParameters } = event;

  // service 필드를 queryStringParameters에서 제거
  const queryParams = { ...queryStringParameters };
  delete queryParams.service;

  // 콘솔 로그로 쿼리 파라미터를 찍습니다.
  console.log("Query Parameters (without service): ", queryParams);

  const API_KEY = process.env.KOPIS_API_KEY;

  // API 키 확인
  console.log("API Key: ", API_KEY);

  const API_URL = `https://kopis.or.kr/openApi/restful/pblprfr?service=${API_KEY}&${new URLSearchParams(
    queryParams
  ).toString()}`;

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
