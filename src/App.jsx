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

import { ArrowLeftFromLine, ChevronDown, ChevronUp } from 'lucide-react';

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

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            setMenuOpen(false);
            setActiveSubmenu(null);
        }
    }, [location.pathname]);

    // Toggle sidebar
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Toggle submenus
    const toggleSubmenu = (id) => {
        setActiveSubmenu(activeSubmenu === id ? null : id);
    };

    // Close menu when clicking the close button
    const closeMenu = () => {
        setMenuOpen(false);
        setActiveSubmenu(null);
    };

    const isLoginPage = location.pathname === "/";

    return (
        <>
            {!isLoginPage && (
                <>
                    {/* Navbar */}
                    <div className="navbar">
                        {/* Menu Toggle Button */}
                        <div className={`menu-toggle ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
                            <div className="menu-bar"></div>
                            <div className="menu-bar"></div>
                            <div className="menu-bar"></div>
                        </div>

                        {/* Logo on the Right */}
                        <div className="navbar-logo">Anbhazhagan Poultry Farm</div>
                    </div>

                    {/* Sidebar Navigation */}
                    <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
                        <ul>
                            <li>
                                <NavLink className='menu-title' to="/dashboard">
                                    Dashboard
                                </NavLink>
                            </li>

                            {/* Eggs Submenu */}
                            <li onClick={() => toggleSubmenu('submenu1')} className="menu-title has-submenu">
                                Eggs {activeSubmenu === 'submenu1' ? <ChevronUp size={15}/> : <ChevronDown size={15}/>}
                            
                            <ul id="submenu1" className={`submenu ${activeSubmenu === 'submenu1' ? "active" : ""}`}>
                                <li >
                                    <NavLink className='submenu-options' to="/stock-update">
                                        Egg Stock Update
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className='submenu-options' to="/report">
                                        Report
                                    </NavLink>
                                </li>
                            </ul>
                            </li>

                            {/* Feed Submenu */}
                            <li onClick={() => toggleSubmenu('submenu2')} className="menu-title has-submenu">
                                Feed {activeSubmenu === 'submenu2' ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                            
                                <ul id="submenu2" className={`submenu ${activeSubmenu === 'submenu2' ? "active" : ""}`}>
                                    <li className='submenu-options'>Feed Dashboard</li>
                                    <li className='submenu-options'>Feed Stock Update</li>
                                </ul>
                            </li>

                            <li>
                                <NavLink className='menu-title' to="/logout">
                                    Logout
                                </NavLink>
                            </li>
                        </ul>

                        {/* Close Menu Button */}
                        <button className="close-menu" onClick={closeMenu}><ArrowLeftFromLine size={20} /> Close</button>
                    </div>
                </>
            )}
        </>
    );
}

export default App
