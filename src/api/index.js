// import axios from "axios";
import fetchJsonp from "fetch-jsonp";
// import { Configuration, OpenAIApi } from 'openai';

/**
 * 音乐播放器
 */

// 获取音乐播放列表
export const getPlayerList = async (server, type, id) => {
  const res = await fetch(
    `${import.meta.env.VITE_SONG_API}?server=${server}&type=${type}&id=${id}`,
  );
  const data = await res.json();

  if (data[0].url.startsWith("@")) {
    // eslint-disable-next-line no-unused-vars
    const [handle, jsonpCallback, jsonpCallbackFunction, url] = data[0].url.split("@").slice(1);
    const jsonpData = await fetchJsonp(url).then((res) => res.json());
    const domain = (
      jsonpData.req_0.data.sip.find((i) => !i.startsWith("http://ws")) ||
      jsonpData.req_0.data.sip[0]
    ).replace("http://", "https://");

    return data.map((v, i) => ({
      name: v.name || v.title,
      artist: v.artist || v.author,
      url: domain + jsonpData.req_0.data.midurlinfo[i].purl,
      cover: v.cover || v.pic,
      lrc: v.lrc,
    }));
  } else {
    return data.map((v) => ({
      name: v.name || v.title,
      artist: v.artist || v.author,
      url: v.url,
      cover: v.cover || v.pic,
      lrc: v.lrc,
    }));
  }
};

/**
 * 一言
 */

// 获取一言数据
export const getHitokoto = async () => {
  const res = await fetch("https://v1.hitokoto.cn");
  return await res.json();
};

// export const getHitokoto = async (apiKey, apiUrl) => {
//   // 检查是否提供了 API Key 和 URL
//   if (!apiKey || !apiUrl) {
//     throw new Error('API Key and API URL must be provided');
//   }

//   const configuration = new Configuration({
//     apiKey: apiKey,
//     basePath: apiUrl,
//   });

//   const openai = new OpenAIApi(configuration);

//   try {
//     const completion = await openai.createCompletion({
//       model: "furry-3.5",
//       prompt: "Generate a philosophical quote and provide the source using its origin language. It can from China, France, Germen or English.The format is: quote | source. PLEASE do NOT include any additional content.",
//       max_tokens: 100,
//       n: 1,
//       stop: null,
//       temperature: 0.7,
//     });

//     const [hitokoto, from] = completion.data.choices[0].text.trim().split('|');

//     return {
//       id: Math.floor(Math.random() * 10000),
//       uuid: crypto.randomUUID(),
//       hitokoto,
//       type: "i",
//       from,
//       from_who: null,
//       creator: "OpenAI",
//       creator_uid: 0,
//       reviewer: 0,
//       commit_from: "api",
//       created_at: Math.floor(Date.now() / 1000).toString(),
//       length: hitokoto.length
//     };
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

/**
 * 天气
 */

// 获取高德地理位置信息
export const getAdcode = async (key) => {
  const res = await fetch(`https://restapi.amap.com/v3/ip?key=${key}`);
  return await res.json();
};

// 获取高德地理天气信息
export const getWeather = async (key, city) => {
  const res = await fetch(
    `https://restapi.amap.com/v3/weather/weatherInfo?key=${key}&city=${city}`,
  );
  return await res.json();
};

// 获取教书先生天气 API
// https://api.oioweb.cn/doc/weather/GetWeather
export const getOtherWeather = async () => {
  const res = await fetch("https://api.oioweb.cn/api/weather/GetWeather");
  return await res.json();
};
