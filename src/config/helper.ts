export const get_set_cookies = function (headers: any) {
  const set_cookies = [];
  for (const [name, value] of headers) {
    if (name === "set-cookie") {
      set_cookies.push(value);
    }
  }
  return set_cookies;
};
