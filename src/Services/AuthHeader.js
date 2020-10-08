export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return {
      "Content-Type": "application/jsoncharset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
      "Authorization": "Bearer " + user.token
    };
  } else {
    return {};
  }
}