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
  
    return(
      <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Login</Link></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/stock-update">Update Stock</Link></li>
                        <li><Link to="/report">Report</Link></li>
                    </ul>
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
