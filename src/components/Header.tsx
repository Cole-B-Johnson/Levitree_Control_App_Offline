import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="flex w-full justify-center my-4">
        <div className="flex justify-evenly w-full max-w-lg">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              ` p-2 rounded-s-lg flex-grow text-center text-lg font-light border border-blue-600 ${isActive ? "text-white bg-blue-600" : "text-blue-600 hover:bg-gray-100"}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/autopilot"
            className={({ isActive }) =>
              ` p-2 flex-grow text-center text-lg font-light border border-blue-600 ${isActive ? "text-white bg-blue-600" : "text-blue-600 hover:bg-gray-100"}`
            }
          >
            Autopilot
          </NavLink>
          <NavLink
            to="/controls"
            className={({ isActive }) =>
              ` p-2 rounded-e-lg flex-grow text-center text-lg font-light border border-blue-600 ${isActive ? "text-white bg-blue-600" : "text-blue-600 hover:bg-gray-100"}`
            }
          >
            Controls
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Header;
