import { Navigate } from "react-router-dom";
import { getUser } from "../hooks/user.actions";

const ProtectedRoute = ({children}) => {
    const user = getUser();

    return user  ? <>{children}</> : <Navigate to='/login' />;
}

export default ProtectedRoute;