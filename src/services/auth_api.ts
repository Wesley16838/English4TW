import axios from "axios";
const instance = axios.create({
  baseURL: "https://english4tw.com/api",
  headers: {
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJlbmdsaXNoNHR3LmNvbSIsImF1ZCI6ImVuZ2xpc2g0dHcgYXBwIiwiaWF0IjoxNjUyMDc5MzUwLCJleHAiOjE2NTIxNjU3NTAsInVzZXIiOnsiaWQiOiI4MDU3IiwiZW1haWwiOiJ3ZXNsZXkxNjgzOEBnbWFpbC5jb20iLCJhZG1pbiI6IjAiLCJibG9ja2VkIjoiMCIsImFkdmFuY2VkX2R1ZV9kYXRlIjpudWxsfX0.RTTfuMXuYNAn0WIUpijPI9_ozib4MQP5hdIpmBLiZEFOAZW3ZdQce5DK1Y-wxhDvgIlcYPD2KL9c5SuuPhg9qEyqPl9uL1B64wdauuxKIisZ7vXOIss1VQplZXWWhgeY00Sqnr0es4Cx29LPqFeJgXauMqByCUdNeW_i0Ou2dATqJgHSxjfJdSQNPJlx5ThrXk80n6HmMSS-bGgRH_KdYMVBE8Pze4wAMeYY0DQoabibEdrcGzXV2Jk9okIAv1AcP7N0BnkttxPg0EAfakqMYq4CiN-r0_10_0gm48YUOQtmR3RkNU5fSzjKAOIyiek0AAJDLrIKEuPyV9VVfqA2Od_zqxcdEONuGLrKaZV8htiqPvLOvosShcjXcO7qB3tYVk1tG00Y0y0yKsLvzbY-Vr4JUfU8VeHLlYtpsKekKsCiXRQbxsMe-KVJyZsUUHHOYoD2FmFVz6g_MhhodflMyNJc4oE7Eunht9HNCDfIPiLIsGibk_JNWyLalX7Bb9sgYbcueeX0SFfiWm9UI1IUqmrgz_Ya01ri2099cgc63npAr1E4N0rNkHbKZj53tX-W60CZRbDCM-QXGiCKJPQRdEAHLf3-EyVqG5F26ZVOLSxDUv_HDyFQ7ysIq8nPi-0GJcVHOwbNGYGxwwDZTj8WPJb76Pn_bnnnqSxEqtfWTd4"
  },
});
export default instance;