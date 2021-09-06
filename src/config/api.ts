import axios from "axios";
export const apiPokeMonConfig = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon/?limit=5",
  headers: {
    Accept: "application/json",
  },
  timeout: 3000,
});
export const apiConfig = axios.create({
  baseURL: "https://www.english4tw.com",
  headers: {
    Accept: "multipart/form-data",
  },
  timeout: 3000,
});
