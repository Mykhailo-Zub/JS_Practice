import axios from "axios";

const API_KEY = "pub_45694d96d03c034d56d185ce6930f000819f";

function getLatestNews(lang, cat, q, page) {
  return axios
    .get(`https://newsdata.io/api/1/news?apikey=${API_KEY}&category=${cat}&language=${lang}${q ? `&q=${q}` : ""}${page ? `&page=${page}` : ""}`)
    .then(({ data }) => data);
}

export default getLatestNews;
