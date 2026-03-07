import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-slate-900 shadow-lg border-b border-base-300 pt-3 px-6">
      <div className="flex-1">
        <div className="text-2xl md:text-2xl font-bold text-red-600">Blood Donation Management System</div>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-2 text-base">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "text-red-400 font-semibold" : ""}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/add" className={({ isActive }) => isActive ? "text-red-400 font-semibold" : ""}>Add Donor</NavLink>
          </li>
          <li>
            <NavLink to="/history" className={({ isActive }) => isActive ? "text-red-400 font-semibold" : ""}>Donor History</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;