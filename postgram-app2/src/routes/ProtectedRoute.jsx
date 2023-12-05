import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const {user} = JSON.parse(localStorage.getItem("auth"));

    return user.account ? <>{children}</> : <Navigate to='/login' />;
}

export default ProtectedRoute;