import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";
import { PATHS } from "../constants/paths";
import { ROLES } from "../constants/roles";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Lazy loaded pages
const EmployeeList = lazy(() => import("../pages/employees/EmployeeList"));
const AddEmployee = lazy(() => import("../pages/employees/AddEmployee"));
const EditEmployee = lazy(() => import("../pages/employees/EditEmployee"));
const EmployeeDetails = lazy(() => import("../pages/employees/EmployeeDetails"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public */}
      <Route
        path={PATHS.LOGIN}
        element={
          <PublicRoute Component={Login} Layout={AuthLayout} />
        }
      />

      <Route
        path={PATHS.REGISTER}
        element={
          <PublicRoute Component={Register} Layout={AuthLayout} />
        }
      />

      {/* Protected */}
      <Route
        path={PATHS.HOME}
        element={
          <ProtectedRoute>
            <MainLayout>
              <EmployeeList />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={PATHS.ADD}
        element={
          <ProtectedRoute roles={[ROLES.ADMIN]}>
            <MainLayout>
              <AddEmployee />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={PATHS.EDIT}
        element={
          <ProtectedRoute roles={[ROLES.ADMIN]}>
            <MainLayout>
              <EditEmployee />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={PATHS.DETAILS}
        element={
          <ProtectedRoute>
            <MainLayout>
              <EmployeeDetails />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;
