// import { useEffect, useState } from "react";
// import Cookies from "js-cookie";

// export function useCookAuth() {
//   const [isAuth, setIsAuth] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     const isAuth = Cookies.get("isAuth");
//     const isAdmin = Cookies.get("ADMIN");
//     if (isAuth === "true") {
//       setIsAuth(true);
//     }
//     if (isAdmin === "true") {
//       setIsAdmin(true);
//     }
//   }, []);

//   return { isAuth, isAdmin };
// }
