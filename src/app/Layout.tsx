import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-screen overflow-x-hidden">
      <main className="m-0 bg-white p-4">
        <div className="border-1 rounded-md bg-gray-100 p-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
