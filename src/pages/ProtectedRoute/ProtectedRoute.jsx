/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { validateJWT } from "../../service/jwtService";

function ProtectedRoute({ errorPage, targetPage, roles = [] }) {
  const [page, setPage] = useState(<></>);

  function renderPage() {
    const token = sessionStorage.getItem("token");
    const email = sessionStorage.getItem("email");
    const user = validateJWT(token, email);

    if (
      !token ||
      !email ||
      !user
      // || !roles.find(user.data.role)
    ) {
      setPage(errorPage);
      return;
    }

    setPage(targetPage);
  }

  useEffect(() => {
    renderPage();
  }, []);

  return page;
}

export default ProtectedRoute;
