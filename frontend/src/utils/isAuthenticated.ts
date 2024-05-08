/**
 * @description Check if user is authenticated
 * @returns boolean
 */
export const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("persist:root") as string).user;
  return Boolean(user);
};
