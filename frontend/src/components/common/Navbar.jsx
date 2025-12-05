import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { PATHS } from "../../constants/paths";
import { showSuccess } from "../../utils/toast";
import Button from "../ui/Button";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showSuccess("Logged out successfully");
    navigate(PATHS.LOGIN);
  };

  return (
    <nav className="bg-white shadow p-4 mb-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to={PATHS.HOME} className="font-bold text-lg">
          Employee Manager
        </Link>

        <div className="flex items-center gap-4">
          <p className="text-gray-700">
            {user?.name} ({user?.role})
          </p>

          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
