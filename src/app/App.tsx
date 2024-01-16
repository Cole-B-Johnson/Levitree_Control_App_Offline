import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "@/app/Layout";
import Controls from "@/pages/Controls";
import NoMatch from "@/pages/NoMatch";
import { Toaster } from "react-hot-toast";
import Dashboard from "@/pages/Dashboard";
import Autopilot from "@/pages/Autopilot";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/controls" />} />
          <Route path="/controls" element={<Controls />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/autopilot" element={<Autopilot />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
