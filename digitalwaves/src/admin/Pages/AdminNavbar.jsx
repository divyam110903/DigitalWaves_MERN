import { Link, useNavigate } from "react-router-dom";
import { LogOut, Users, House, FolderKanban, MailCheck } from "lucide-react";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminKey");
    navigate("/admin/login");
  };

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-[rgb(24,42,58)] text-white">
      <div className="flex gap-8 font-medium text-orange-500">
        <Link to="/admin/dashboard/" className="flex items-center gap-2 transition hover:text-white">
          <House size={18} /> Home
        </Link>
        <Link to="/admin/dashboard/clients" className="flex items-center gap-2 transition hover:text-white">
          <Users size={18} /> Clients
        </Link>
        <Link to="/admin/dashboard/about" className="flex items-center gap-2 transition hover:text-white">
          <FolderKanban size={18} /> About
        </Link>
        <Link to="/admin/dashboard/quote" className="flex items-center gap-2 transition hover:text-white">
          <MailCheck size={18} /> Quote
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-orange-500 transition hover:text-white"
      >
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
};

export default AdminNavbar;