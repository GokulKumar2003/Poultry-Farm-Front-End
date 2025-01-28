import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
// import './index.css'
import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Dashboard from './components/Dashboard'

import StockUpdate from './components/StockUpdate'
import DownloadReport from './components/DownloadReport'

function App() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    return(
      <Router>
            <div>
                <nav className="navbar">
                    <div className='navbar-container'>
                        <div className="navbar-logo">Anbhazhagan Poultry Farm</div>
                        <ul className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
                            <li><Link to="/">Login</Link></li>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link to="/stock-update">Update Stock</Link></li>
                            <li><Link to="/report">Report</Link></li>
                        </ul>
                        <button className="menu-toggle" onClick={toggleMobileMenu}>
                            <span className="menu-bar"></span>
                            <span className="menu-bar"></span>
                            <span className="menu-bar"></span>
                        </button>
                    </div>
                </nav>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/stock-update" element={<StockUpdate />} />
                    <Route path="/report" element={<DownloadReport />} />
                </Routes>
            </div>
        </Router>
    )
  };

export default App
