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


function ShedGrid({shed}){
  const currentDate = new Date(); 
  currentDate.setDate(currentDate.getDate() - shed.duration); 

  const day = currentDate.getDate().toString().padStart(2, '0'); 
  const month = currentDate.toLocaleString('default', { month: 'short' }); 
  const year = currentDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  
  return(
    <>
      <table className="tableStyle">
        <thead>
          <tr>
            <th className="headerStyle" colSpan={2}>SHED {shed.shedId}</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="subHeaderStyle" colSpan={2}>Egg Stock</td>
          </tr>
          <tr>
            <td className="cellStyle" colSpan={2}>Large <b>{shed.large}</b> </td>
          </tr>
          <tr>
            <td className="cellStyle" colSpan={2}>Small <b>{shed.small}</b></td>
          </tr>
          <tr>
            <td className="cellStyle" colSpan={2}>Broken <b>{shed.broken}</b></td>
          </tr>
          <tr>
            <td className="cellStyle" colSpan={2}>Dirty <b>{shed.dirty}</b></td>
          </tr>
          <tr>
            <td className="subHeaderStyle">Birds</td>
            <td className="subHeaderStyle">Dead</td>
          </tr>
          <tr>
            <td className="cellStyle">{shed.birdsCnt}</td>
            <td className="cellStyle">{shed.deathCnt}</td>
          </tr>
          <tr>
            <td className="subHeaderStyle">Production Ratio</td>
            <td className="subHeaderStyle">Batch Start Date</td>
          </tr>
          <tr>
            <td className="cellStyle">{shed.productionRatio}</td>
            <td className="cellStyle">{formattedDate}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

