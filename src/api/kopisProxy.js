const axios = require("axios");

exports.handler = async function (event, context) {
  const { queryStringParameters } = event;

  // 필수 파라미터 확인
  if (
    !queryStringParameters.cpage ||
    !queryStringParameters.rows ||
    !queryStringParameters.shcate
  ) {
    return {
      statusCode: 400,
      body: "필수 파라미터(cpage, rows, shcate)가 누락되었습니다.",
    };
  }

  const API_KEY = process.env.KOPIS_API_KEY;

  const API_URL = `https://kopis.or.kr/openApi/restful/pblprfr?service=${API_KEY}&${new URLSearchParams(
    queryStringParameters
  ).toString()}`;

  // API URL을 콘솔에 출력해 확인
  console.log("API URL:", API_URL);

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
