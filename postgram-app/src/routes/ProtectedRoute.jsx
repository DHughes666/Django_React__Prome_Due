import { Navigate } from "react-router-dom";


function getUser() {
    const auth = JSON.parse(localStorage.getItem("auth")) || null;
    if (auth) {
      return auth.user;
    } else {
      return null;
    }
  }

const ProtectedRoute = ({children}) => {
    const user = getUser();

    return user ? <>{children}</> : <Navigate to="/login/" />;
}

export default ProtectedRoute