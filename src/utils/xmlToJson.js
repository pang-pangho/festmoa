import { xml2json } from "xml-js";

export const convertXmlToJson = (xmlData) => {
  try {
    return JSON.parse(xml2json(xmlData, { compact: true, spaces: 2 }));
  } catch (error) {
    console.error("XML 변환 오류:", error);
    throw error;
  }
};
