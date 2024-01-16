import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="flex w-full justify-center my-4">
        <div className="flex justify-evenly w-full max-w-lg gap-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              ` p-2 rounded-lg flex-grow text-center text-lg font-light border ${isActive ? "text-white bg-gray-500" : "text-gray-500 hover:bg-gray-50"}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/autopilot"
            className={({ isActive }) =>
              ` p-2 rounded-lg flex-grow text-center text-lg font-light border ${isActive ? "text-white bg-gray-500" : "text-gray-500 hover:bg-gray-50"}`
            }
          >
            Autopilot
          </NavLink>
          <NavLink
            to="/controls"
            className={({ isActive }) =>
              ` p-2 rounded-lg flex-grow text-center text-lg font-light border ${isActive ? "text-white bg-gray-500" : "text-gray-500 hover:bg-gray-50"}`
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
