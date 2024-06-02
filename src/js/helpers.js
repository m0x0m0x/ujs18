/*
Function that will be reused over and over 
*/
import { TIMEOUT_SEC } from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(5)]);
    console.log("Response:", res);

    const data = await res.json();
    console.log("Data:", data);

    if (!res.ok) throw new Error(`${data.message} - ${res.status}`);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
