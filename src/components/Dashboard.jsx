import React, { useEffect, useState } from "react";
import '../styles/Loading.css'
import '../styles/style.css'

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
        <table className="dashboard">
          <tr className="dashboard-title">
            <td>SHED ID</td>
            <td>LARGE</td>
            <td>SMALL</td>
            <td>DIRTY</td>
            <td>BROKEN</td>
            <td>BIRDS CNT</td>
            <td>DEATH CNT</td>
            <td>BATCH START DATE</td>

          </tr>
            {shedData.map((shed) => (
                <Shed shed={shed} key={shed.shedId}/>
            ))}
         
        </table>
        
      </>
      
  
  );
};

function Shed({shed}) {

  const currentDate = new Date(); 
  currentDate.setDate(currentDate.getDate() - shed.duration); 

  const day = currentDate.getDate().toString().padStart(2, '0'); 
  const month = currentDate.toLocaleString('default', { month: 'short' }); 
  const year = currentDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  return (
    <>
      <tr className={(shed.shedId%2) ? "even-row" : "odd-row"}>
        <td className="dashboard-cell">Shed {shed.shedId}</td>
        <td className="dashboard-cell">{shed.large}</td>
        <td className="dashboard-cell">{shed.small}</td>
        <td className="dashboard-cell">{shed.broken}</td>
        <td className="dashboard-cell">{shed.dirty}</td>
        <td className="dashboard-cell">{shed.birdsCnt}</td>
        <td className="dashboard-cell">{shed.deathCnt}</td>
        <td className="dashboard-cell">{formattedDate}</td>
      </tr>
    </>
  )
}

// function ShedGrid({shed}){
//   const currentDate = new Date(); 
//   currentDate.setDate(currentDate.getDate() - shed.duration); 

//   const day = currentDate.getDate().toString().padStart(2, '0'); 
//   const month = currentDate.toLocaleString('default', { month: 'short' }); 
//   const year = currentDate.getFullYear();

//   const formattedDate = `${day}-${month}-${year}`;
  
//   return(
//     <>
//       <table className="tableStyle">
//         <thead>
//           <tr>
//             <th className="headerStyle" colSpan={2}>SHED {shed.shedId}</th>
//           </tr>
//         </thead>

//         <tbody>
//           <tr>
//             <td className="subHeaderStyle" colSpan={2}>Egg Stock</td>
//           </tr>
//           <tr>
//             <td className="dashboard-cell" colSpan={2}>Large <b>{shed.large}</b> </td>
//           </tr>
//           <tr>
//             <td className="dashboard-cell" colSpan={2}>Small <b>{shed.small}</b></td>
//           </tr>
//           <tr>
//             <td className="dashboard-cell" colSpan={2}>Broken <b>{shed.broken}</b></td>
//           </tr>
//           <tr>
//             <td className="dashboard-cell" colSpan={2}>Dirty <b>{shed.dirty}</b></td>
//           </tr>
//           <tr>
//             <td className="subHeaderStyle">Birds</td>
//             <td className="subHeaderStyle">Dead</td>
//           </tr>
//           <tr>
//             <td className="dashboard-cell">{shed.birdsCnt}</td>
//             <td className="dashboard-cell">{shed.deathCnt}</td>
//           </tr>
//           <tr>
//             <td className="subHeaderStyle">Production Ratio</td>
//             <td className="subHeaderStyle">Batch Start Date</td>
//           </tr>
//           <tr>
//             <td className="dashboard-cell">{shed.productionRatio}</td>
//             <td className="dashboard-cell">{formattedDate}</td>
//           </tr>
//         </tbody>
//       </table>
//     </>
//   )
// }

