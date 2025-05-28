import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute: React.FC = () => {

    const { user, loading } = useAuth(); //useAuth to get the context from AuthContext

    if (loading) return <div>Loading...</div>;

    if (!user) return <Navigate to="/login" replace />; //redirect if no user

    return <Outlet />; //to Render the children routes
}   

export default ProtectedRoute;