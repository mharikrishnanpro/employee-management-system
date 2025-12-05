import EmployeeForm from "../../components/employees/EmployeeForm";
import { showSuccess, showError } from "../../utils/toast";
import { createEmployee } from "../../services/employeeService";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/paths";

const AddEmployee = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    designation: "",
    salary: "",
    profileImage: "",
  };

  const handleSubmit = async (formData) => {
    try {
      await createEmployee(formData);
      showSuccess("Employee added successfully");
      navigate(PATHS.HOME);
    } catch (error) {
      showError(error.response?.data?.message || "Failed to add employee");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Add Employee</h2>

      <EmployeeForm
        initialValues={initialValues}
        isEdit={false}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddEmployee;
