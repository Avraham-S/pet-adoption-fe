const token = JSON.parse(localStorage.getItem("token"));
console.log(token);

export const headersConfig = { headers: { Authorization: `Bearer ${token}` } };
