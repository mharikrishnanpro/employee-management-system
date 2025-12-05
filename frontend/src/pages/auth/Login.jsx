import { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { showError, showSuccess } from "../../utils/toast";
import { loginUser } from "../../services/authService";
import useAuth from "../../hooks/useAuth";
import { PATHS } from "../../constants/paths";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password)
      return showError("Email & password required");

    try {
      setLoading(true);
      const data = await loginUser(form);

      login({
        user: data.user,
        token: data.token,
      });

      showSuccess("Login successful");
      navigate(PATHS.HOME);
    } catch (err) {
      showError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
        />

        <Button type="submit" block loading={loading}>
          Login
        </Button>
      </form>

      <p className="text-center mt-4">
        Don’t have an account?{" "}
        <Link to={PATHS.REGISTER} className="text-blue-600 underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
