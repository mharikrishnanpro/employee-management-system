import { useState } from "react";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import { showError, showSuccess } from "../../utils/toast";
import { registerUser } from "../../services/authService";
import useAuth from "../../hooks/useAuth";
import { ROLES } from "../../constants/roles";
import { PATHS } from "../../constants/paths";
import { Link, useNavigate } from "react-router-dom";
import { validateRegisterForm } from "../../utils/validators";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: ROLES.USER,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateRegisterForm(form);
    if (error) return showError(error);

    try {
      setLoading(true);

      const data = await registerUser(form);
      login(data);

      showSuccess("Account created successfully");
      navigate(PATHS.HOME);
    } catch (err) {
      showError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
        />

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
          placeholder="Enter a password"
          value={form.password}
          onChange={handleChange}
        />

        <Select
          label="Role"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value={ROLES.ADMIN}>Admin</option>
          <option value={ROLES.USER}>User</option>
        </Select>

        <Button type="submit" block loading={loading}>
          Register
        </Button>
      </form>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link to={PATHS.LOGIN} className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
