import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "@/app/Layout";
import Fracking from "@/pages/Fracking";
import NoMatch from "@/pages/NoMatch";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/fracking" />} />
          <Route path="/fracking" element={<Fracking />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
