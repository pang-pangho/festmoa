const axios = require("axios");

exports.handler = async function (event, context) {
  const { queryStringParameters } = event;
  const API_KEY = process.env.REACT_APP_KOPIS_API_KEY;
  const API_URL = `https://kopis.or.kr/openApi/restful/pblprfr?service=${API_KEY}&${new URLSearchParams(
    queryStringParameters
  ).toString()}`;

  try {
    const response = await axios.get(API_URL);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: error.response?.status || 500,
      body: error.message,
    };
  }
};
