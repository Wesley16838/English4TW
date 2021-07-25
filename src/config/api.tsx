import axios from "axios";
export const apiConfig = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon/?limit=5",
  headers: {
    Accept: "application/json",
  },
  timeout: 3000,
});
export default apiConfig;
