import { Routes, Route } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminHome from "./AdminHome";
import AdminQuote from "./AdminQuote";
import AdminClients from "./AdminClients";
import AdminAbout from "./AdminAbout";

const Dashboard = () => {
  return (
    <div>
      <AdminNavbar />
      <Routes>
        <Route index element={<AdminHome />} />
        <Route path="clients" element={<AdminClients />} />
        <Route path="about" element={<AdminAbout />} />
        <Route path="quote" element={<AdminQuote />} />
      </Routes>
    </div>
  );
};

export default Dashboard;