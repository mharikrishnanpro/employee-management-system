import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEmployee } from "../../services/employeeService";
import Loader from "../../components/common/Loader";
import { PATHS } from "../../constants/paths";
import { formatDate } from "../../utils/formatDate";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const emp = await getEmployee(id);
        setEmployee(emp);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <Loader message="Loading employee..." />;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <img
        src={employee.profileImage}
        alt={employee.name}
        className="w-32 h-32 rounded-full mx-auto object-cover"
      />

      <h2 className="text-center text-2xl font-semibold mt-4">{employee.name}</h2>

      <div className="mt-6 space-y-2">
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Phone:</strong> {employee.phone}</p>
        <p><strong>Designation:</strong> {employee.designation}</p>
        <p><strong>Salary:</strong> ₹ {employee.salary}</p>
        <p><strong>Joined On:</strong> {formatDate(employee.createdAt)}</p>
      </div>

      <div className="mt-6 text-center">
        <Link to={PATHS.HOME} className="text-blue-600 underline">Back to list</Link>
      </div>
    </div>
  );
};

export default EmployeeDetails;
