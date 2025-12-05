import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { PATHS } from "../constants/paths";
import Loader from "../components/common/Loader";

const ProtectedRoute = ({ children, roles }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <Loader message="Checking authentication..." />;
  }

  if (!user) {
    return <Navigate to={PATHS.LOGIN} replace />;
  }

  // Route restricted by role (ex: admin-only)
  if (roles && !roles.includes(user.role)) {
    return <Navigate to={PATHS.HOME} replace />;
  }

  return children;
};

export default ProtectedRoute;
