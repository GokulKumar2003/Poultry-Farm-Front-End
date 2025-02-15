import React, { useEffect, useState } from "react";

import '../styles/style.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const [shedData, setShedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingErr, setLoadingErr] = useState(false);

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
        setLoadingErr(true)
      } finally {
        setLoading(false);
      }
    };

    fetchShedData();
  }, []);

  if(loading){
    return(
      <>
        <table className="dashboard">
          <tr className="dashboard-title">
            <td>Loading Stock..</td>
          </tr>
          </table>
      </>
    )
  }
  
  if(loadingErr){
    return(
      <>
        <table className="dashboard">
          <tr className="dashboard-title">
            <td>Error in Loading Stock..</td>
          </tr>
          </table>
      </>
    )
  }
  return (
      <>
        <table className="dashboard">
          <tr className="dashboard-title">
            <td>SHED ID</td>
            <td>START DATE</td>
            <td>BATCH AGE</td>
            <td>LARGE</td>
            <td>SMALL</td>
            <td>BROKEN</td>
            <td>DIRTY</td>
            <td>PROD. %</td>
            <td>BIRDS</td>
            <td>DEATH</td>
            

          </tr>
            {shedData.map((shed) => (
                <Shed shed={shed} key={shed.shedId}/>
            ))}
         
        </table>
        <Reset />
        <ToastContainer />
      </>
      
  
  );
};

function Shed({shed}) {

  console.log(shed)
  const currentDate = new Date(shed.batchStartDate); 

  const day = currentDate.getDate().toString().padStart(2, '0'); 
  const month = currentDate.toLocaleString('default', { month: 'short' }); 
  const year = currentDate.getFullYear();

  const days = Math.floor(Math.abs(new Date() - currentDate)/(1000*60*60*24));
  const age = Math.floor(days/7);
  const percentage = (shed.productionRatio.toFixed(4))*100;

  const formattedDate = `${day}-${month}-${year}`;
  return (
    <>
      <tr className={(shed.shedId%2) ? "even-row" : "odd-row"}>
        <td className="dashboard-cell">Shed {shed.shedId}</td>
        <td className="dashboard-cell">{formattedDate}</td>
        <td className="dashboard-cell">{days < 7 ? days <= 1 ? `${days} day` : `${days} days` : age <= 1 ? `${age} week` : `${age} weeks`} </td>
        <td className="dashboard-cell">{shed.large}</td>
        <td className="dashboard-cell">{shed.small}</td>
        <td className="dashboard-cell">{shed.broken}</td>
        <td className="dashboard-cell">{shed.dirty}</td>
        <td className="dashboard-cell">{percentage}</td>

        <td className="dashboard-cell">{shed.birdsCnt}</td>
        <td className="dashboard-cell">{shed.deathCnt}</td>
        
      </tr>
    </>
  )
}

function Reset(){

  const [birdsCnt, setBirdsCnt] = useState('');
  const [shedId, setShedId] = useState(0);
  const [confirmMsg, setConfirmMsg] = useState("");
  const [batchStartDate, setBatchStartDate] = useState("");

  async function handleReset(){

    if(isNaN(birdsCnt)){
      toast.error("Enter valid birds cnt..", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
      return;
    }
    if(shedId == 0){
      toast.error("Select shed..", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
      return;
    }

    if(batchStartDate === ""){
      toast.error("Select Date..", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
      return;
    }
    if(confirmMsg !== ("shed"+shedId+"-"+birdsCnt)){
      toast.error("Type the correct msg..", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
      return;
    }
    try {
     
      await fetch('http://localhost:8080/api/1.0/stocks/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({shedId, birdsCnt, batchStartDate}),
        });
        toast.success("Reset successful..", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
    }
    catch(err){
      console.log(err);
      toast.error("Error in reset..", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  }
  return(
    <>
      <table className="tableStyle">
        {/* <tr >
          <td className="subHeaderStyle" colSpan={3}>
              Stock Reset
          </td>
        </tr> */}
        <tr>
          <td className="cellStyle">
              <b><p>Select Shed ID</p></b>
              <select  name="shedId" value={shedId} onChange={(e)=>{setShedId(e.target.value)}}>
                <option value="0">Shed</option>
                <option value="1">Shed 1</option>
                <option value="2">Shed 2</option>
                <option value="3">Shed 3</option>
                <option value="4">Shed 4</option>
                <option value="5">Shed 5</option>
              </select>
          </td>
          <td className="cellStyle">
            <b><p>No of Birds</p></b>
            <input type = "text" name="birds" value={birdsCnt} onChange={(e)=>{setBirdsCnt(e.target.value)}} />
          </td>
          <td className="cellStyle">
            <b><p>Batch Start Date</p></b>
            <input type = "date" name="batch-start-date" value={batchStartDate} onChange={(e)=>{setBatchStartDate(e.target.value)}} />
          </td>
        </tr>
        <tr>
          <td className="cellStyle">
            <span>Type this: <b>shed{shedId}-{birdsCnt}</b></span>
          </td>
          <td className="cellStyle">
            <input autocomplete="off" type = "text" name="birds" value={confirmMsg} onChange={(e)=>{setConfirmMsg(e.target.value)}} placeholder="type here.." />
          </td>
          <td className="cellStyle" colSpan={3}>
            <button type="button" onClick={handleReset} >Reset Stock</button>
          </td>
        </tr>
      </table>
      <ToastContainer />
    </>
  )
}

