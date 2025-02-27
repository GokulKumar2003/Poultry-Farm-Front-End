import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Dashboard from './components/Dashboard'

import StockUpdate from './components/StockUpdate'
import DownloadReport from './components/DownloadReport'
import Login from './components/Login';
import Logout from './components/Logout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return(
      <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                        } />
                    <Route path="/stock-update" element={
                        <ProtectedRoute>
                            <StockUpdate />
                        </ProtectedRoute>
                        } />
                    <Route path="/report" element={
                        <ProtectedRoute>
                            <DownloadReport />
                        </ProtectedRoute>
                        } />
                    <Route path="/logout" element={
                        <ProtectedRoute>
                            <Logout />
                        </ProtectedRoute>
                        } />
                </Routes>
            </div>
        </Router>
    )
};

function Navbar(){

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const isLoginPage = location.pathname === "/";
    return(<>
        {
            !isLoginPage && (
                <>
                <nav className="navbar">
                <div className='navbar-container'>
                    <div className="navbar-logo">Anbhazhagan Poultry Farm</div>
                    <ul className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
                        <li><NavLink className={({ isActive }) => isActive ? "current" : ""} to="/dashboard">Dashboard</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? "current" : ""} to="/stock-update">Update Stock</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? "current" : ""} to="/report">Report</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? "current" : ""} to="/logout">Logout</NavLink></li>
                    </ul>
                    <button className="menu-toggle" onClick={toggleMobileMenu}>
                        <span className="menu-bar"></span>
                        <span className="menu-bar"></span>
                        <span className="menu-bar"></span>
                    </button>
                    </div>
                    </nav>
                </>
            )
        }
        </> 
    )
}

export default App
