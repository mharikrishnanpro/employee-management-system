import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { fetchEmployees, deleteEmployee } from "../../services/employeeService";
import { showError, showSuccess } from "../../utils/toast";
import Pagination from "../../components/common/Pagination";
import Loader from "../../components/common/Loader";
import { PATHS } from "../../constants/paths";
import useDebounce from "../../hooks/useDebounce";
import { Icons } from "../../constants/icons";
import useAuth from "../../hooks/useAuth";
import { ROLES } from "../../constants/roles";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/common/PageHeader";

const EmployeeList = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    page: 1,
    limit: 5,
    sort: "-createdAt",
    designation: "",
  });

  const debouncedSearch = useDebounce(filters.search, 500);

  const loadEmployees = useCallback(async () => {
    try {
      setLoading(true);

      const data = await fetchEmployees({
        search: debouncedSearch,
        page: filters.page,
        limit: filters.limit,
        sort: filters.sort,
        designation: filters.designation,
      });

      setEmployees(data.employees);
      setTotal(data.total);
    } catch {
      showError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filters.page, filters.limit, filters.sort, filters.designation]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    try {
      await deleteEmployee(id);
      showSuccess("Employee deleted");
      loadEmployees();
    } catch {
      showError("Delete failed");
    }
  };

  const totalPages = Math.ceil(total / filters.limit);

  const handlePrev = useCallback(
    () => setFilters((prev) => ({ ...prev, page: prev.page - 1 })),
    []
  );

  const handleNext = useCallback(
    () => setFilters((prev) => ({ ...prev, page: prev.page + 1 })),
    []
  );

  return (
    <div>
      <PageHeader title="Employee Management">
        {user?.role === ROLES.ADMIN && (
          <Link to={PATHS.ADD}>
            <Button>Add Employee</Button>
          </Link>
        )}
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        <Input
          placeholder="Search..."
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value, page: 1 })
          }
          className="mb-0"
        />

        <Select
          value={filters.designation}
          onChange={(e) =>
            setFilters({ ...filters, designation: e.target.value, page: 1 })
          }
          className="mb-0"
        >
          <option value="">All Designations</option>
          <option value="HR">HR</option>
          <option value="Developer">Developer</option>
          <option value="Manager">Manager</option>
        </Select>

        <Select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          className="mb-0"
        >
          <option value="-createdAt">Newest</option>
          <option value="createdAt">Oldest</option>
          <option value="name">A–Z</option>
          <option value="-name">Z–A</option>
        </Select>

      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <Loader message="Loading employees..." />
        ) : (
          <table className="w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Designation</th>
                <th className="p-3 text-left">Salary</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="p-6 text-center text-gray-500 italic"
                  >
                    No employees found
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp._id} className="border-b">
                    <td className="p-3">
                      <img
                        src={emp.profileImage}
                        alt={emp.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </td>

                    <td className="p-3">{emp.name}</td>
                    <td className="p-3">{emp.email}</td>
                    <td className="p-3">{emp.phone}</td>
                    <td className="p-3">{emp.designation}</td>
                    <td className="p-3">₹ {emp.salary}</td>

                    <td className="p-3">
                      <p className="flex gap-3">
                        <Link to={`/details/${emp._id}`}>
                          <Icons.Eye className="text-blue-600 cursor-pointer" />
                        </Link>

                        {user?.role === ROLES.ADMIN && (
                          <>
                            <Link to={`/edit/${emp._id}`}>
                              <Icons.Edit className="text-green-600 cursor-pointer" />
                            </Link>

                            <Icons.Trash2
                              className="text-red-600 cursor-pointer"
                              onClick={() => handleDelete(emp._id)}
                            />
                          </>
                        )}
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {!loading && totalPages > 1 && (
        <Pagination
          page={filters.page}
          totalPages={totalPages}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
};

export default EmployeeList;
