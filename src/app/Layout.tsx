import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-screen overflow-x-hidden bg-gray-100">
      <Header />
      <main className="m-0 bg-white mx-4 mb-4 rounded-lg shadow-lg">
        <div className="border-1 rounded-md bg-white p-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
