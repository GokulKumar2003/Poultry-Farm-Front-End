import React, { useEffect, useState } from "react";
import '../styles/Loading.css'
import '../styles/dashboard.css'

export default function Dashboard() {
  const [shedData, setShedData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchShedData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/1.0/stocks');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setShedData(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShedData();
  }, []);

  if(loading){
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }
  return (
      <>
        {shedData.map((shed) => (
          <ShedGrid shed={shed} key={shed.shedId}/>
        ))}
      </>
      
  
  );
};

const tableStyle = {
  borderCollapse: 'collapse', 
  width: '50%',               
  margin: '5% auto',         
  boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)', 
  borderRadius: '10px',
  font: 'collins',       
};

const headerStyle = {
 
  padding: '10px',
  textAlign: 'center',
  backgroundColor: '#007BFF',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '25px',
  borderRadius: '5px',

};

const cellStyle = {
  
  padding: '10px',
  textAlign: 'center',
  backgroundColor: '#f0f0f0',
  fontSize: '20px',
};

const subHeaderStyle = {
  
  padding: '10px',
  textAlign: 'center',
  backgroundColor: '#f0f0f0',
  fontWeight: 'bold',
  fontSize: '20px',
};

function ShedGrid({shed}){
  const currentDate = new Date(); 
  currentDate.setDate(currentDate.getDate() - shed.duration); 

  const day = currentDate.getDate().toString().padStart(2, '0'); 
  const month = currentDate.toLocaleString('default', { month: 'short' }); 
  const year = currentDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  
  return(
    <>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerStyle} colSpan={2}>SHED {shed.shedId}</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={subHeaderStyle} colSpan={2}>Egg Stock</td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={2}>Large <b>{shed.large}</b> </td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={2}>Small <b>{shed.small}</b></td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={2}>Broken <b>{shed.broken}</b></td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={2}>Dirty <b>{shed.dirty}</b></td>
          </tr>
          <tr>
            <td style={subHeaderStyle}>Birds</td>
            <td style={subHeaderStyle}>Dead</td>
          </tr>
          <tr>
            <td style={cellStyle}>{shed.birdsCnt}</td>
            <td style={cellStyle}>{shed.deathCnt}</td>
          </tr>
          <tr>
            <td style={subHeaderStyle}>Production Ratio</td>
            <td style={subHeaderStyle}>Batch Start Date</td>
          </tr>
          <tr>
            <td style={cellStyle}>{shed.productionRatio}</td>
            <td style={cellStyle}>{formattedDate}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

