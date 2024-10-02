const axios = require("axios");

exports.handler = async function (event) {
  const { queryStringParameters } = event;
  const API_KEY = process.env.KOPIS_API_KEY;
  const API_URL = `https://kopis.or.kr/openApi/restful/pblprfr?service=${API_KEY}&${new URLSearchParams(
    queryStringParameters
  ).toString()}`;

  try {
    const response = await axios.get(API_URL);
    return {
      statusCode: 200,
      body: response.data,
    };
  } catch (error) {
    return {
      statusCode: error.response?.status || 500,
      body: error.message,
    };
  }
};
