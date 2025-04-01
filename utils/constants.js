export const getToken = () => {
  const tokenString = localStorage.getItem("token");
  if (!tokenString) return null;

  const { value, expiry } = JSON.parse(tokenString);
  const now = new Date().getTime();

  if (now > expiry) {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    return null;
  }

  return value;
};
