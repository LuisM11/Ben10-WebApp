// export function isAuthenticated() {
//   const token = localStorage.getItem("token");
//   if (!token) return false;

//   try {
//     // Verify token validity
//     const tokenPayload = JSON.parse(atob(token.split(".")[1]));
//     const expirationTime = tokenPayload.exp * 1000;
//     return Date.now() < expirationTime;
//   } catch (error) {
//     console.error("Error verifying token:", error);
//     return false;
//   }
// }
