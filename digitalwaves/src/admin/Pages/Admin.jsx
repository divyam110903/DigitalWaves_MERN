import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";

const Admin = () => {
  const adminKey = localStorage.getItem("adminKey");
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="login" />} />
      <Route path="login" element={<Login />} />
      <Route
        path="dashboard/*"
        element={
          adminKey ? (
            <Dashboard />
          ) : (
            <Navigate to="/admin/login" state={{ from: location }} replace />
          )
        }
      />
    </Routes>
  );
};

export default Admin;