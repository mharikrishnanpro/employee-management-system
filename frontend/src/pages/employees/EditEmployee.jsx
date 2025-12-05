import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmployeeForm from "../../components/employees/EmployeeForm";
import { getEmployee, updateEmployee } from "../../services/employeeService";
import { showError, showSuccess } from "../../utils/toast";
import Loader from "../../components/common/Loader";
import { PATHS } from "../../constants/paths";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const emp = await getEmployee(id);

        setInitialValues({
          name: emp.name || "",
          email: emp.email || "",
          phone: emp.phone || "",
          designation: emp.designation || "",
          salary: emp.salary || "",
          profileImage: emp.profileImage || null,
        });
      } catch (err) {
        showError("Failed to load employee");
      } finally {
        setLoading(false);
      }
    };

    loadEmployee();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await updateEmployee(id, formData);
      showSuccess("Employee updated successfully");
      navigate(PATHS.HOME);
    } catch (err) {
      showError(err.response?.data?.message || "Failed to update employee");
    }
  };

  if (loading) return <Loader message="Loading employee..." />;

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>

      <EmployeeForm
        initialValues={initialValues}
        isEdit={true}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditEmployee;
