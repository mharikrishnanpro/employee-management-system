import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { PATHS } from "../constants/paths";
import Loader from "../components/common/Loader";

const PublicRoute = ({ Component, Layout }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <Loader message="Checking authentication..." />;
  }

  if (user) {
    return <Navigate to={PATHS.HOME} replace />;
  }

  return (
    <Layout>
      <Component />
    </Layout>
  );
};

export default PublicRoute;
