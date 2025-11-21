import { Link, NavLink } from "react-router-dom";
import { LuHeartPulse } from "react-icons/lu";
import { RiScissorsCutFill } from "react-icons/ri";

const Navbar = () => {
  return (
    <header className="sticky top-4 z-10 bg-white mb-10 border-2 border-purple-300 backdrop-blur-lg p-4 rounded-2xl shadow-lg">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        
        <h1 className="text-3xl font-extrabold tracking-tight text-purple-700 text-center sm:text-left">
          <Link to="/"><RiScissorsCutFill className="inline" /> Shortly </Link>
        </h1>

        <nav className="flex justify-center sm:justify-end space-x-6">
          <NavLink to="/" className={({ isActive }) => 
            `font-medium transition ${
                isActive ? "text-purple-900" : "text-purple-700 hover:text-purple-900" }`
            }>
            Dashboard
          </NavLink>

          <NavLink to="/healthz" className={({ isActive }) =>
              `font-medium flex items-center gap-1 transition ${
                isActive ? "text-purple-900" : "text-purple-700 hover:text-purple-900" }`
            }>
            CheckHealth
            <LuHeartPulse className="inline" />
          </NavLink>
        </nav>
      </div>
    </header>
  )
};

export default Navbar;
