import { StrictMode } from 'react'
import HomePage from './pages/HomePage/HomePage';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import PulpPage from './pages/PulpPage/PulpPage';
import Fracking from './pages/Fracking/Fracking';
import ChipInjectionSystem from './pages/ChipInjectionSystem/ChipInjectionSystem';
import Peripherals from './pages/Peripherals/Peripherals';

function App() {
  return (
    <StrictMode>

      <BrowserRouter>
        <HomePage />
        <Routes>
          <Route path="/" element={<Navigate to="/fracking" />} />
          <Route path="pulp" element={<PulpPage />} />
          <Route path="fracking" element={<Fracking />} />
          <Route path="chip-injection-system" element={<ChipInjectionSystem />} />
          <Route path="peripherals" element={<Peripherals />} />
          <Route path="*" element={<h1>404 Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>

    </StrictMode>
  )
}

export default App
