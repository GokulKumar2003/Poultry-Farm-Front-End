import React, { useEffect, useState } from "react";

import '../styles/style.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthListener from "./AuthListener";

export default function Dashboard() {
  const [shedData, setShedData] = useState([]);
  const [chickData, setChickData] = useState([]);
  const [growerData, setGrowerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingErr, setLoadingErr] = useState(false);
  const token = localStorage.getItem('token');
  const fetchShedData = async () => {
    try {
      const [layerResponse, chickResponse, growerResponse] = await Promise.all([
          fetch('https://api.anbupf.com/api/1.0/stocks/layer', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              redirect: "follow"
          }),
          fetch('https://api.anbupf.com/api/1.0/stocks/chick', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              redirect: "follow"
          }),
          fetch('https://api.anbupf.com/api/1.0/stocks/grower', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              redirect: "follow"
          })
      ]);

      if (!layerResponse.ok || !chickResponse.ok || !growerResponse.ok) {
          throw new Error('Failed to fetch stock');
      }

      const [layerData, chickData, growerData] = await Promise.all([
          layerResponse.json(),
          chickResponse.json(),
          growerResponse.json()
      ]);

      setShedData(layerData);
      setChickData(chickData);
      setGrowerData(growerData);

  } catch (err) {
      console.error(err);
      setLoadingErr(true);
  } finally {
      setLoading(false);
  }
  };

  useEffect(() => {
    fetchShedData();
  }, []);

  if(loading){
    return(
      <>
        <AuthListener />
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
        <AuthListener />
        <table className="dashboard">
          <tr className="dashboard-title">
            <td>Error in Loading Stock..</td>
          </tr>
          </table>
          <Reset />
          <ToastContainer />
      </>
    )
  }
  return (
      <>
        <AuthListener />
        <table className="dashboard">
          <tr>
            <td className="dashboard-title" colSpan={9}>LAYER</td>
          </tr>
          <tr className="dashboard-title">
            <td>SHED ID</td>
            <td>START DATE</td>
            <td>BATCH AGE</td>
            <td>LARGE</td>
            <td>SMALL</td>
            <td>BROKEN</td>
            <td>DIRTY</td>
            <td>BIRDS</td>
            <td>DEATH</td>
          </tr>
            {shedData.map((shed) => (
                <Shed shed={shed} key={shed.shedId}/>
            ))}
         
        </table>
        <Chick chickData={chickData}/>
        <Grower growerData={growerData}/>
        <Reset />
        <ToastContainer />
      </>
      
  
  );
};

function Shed({shed}) {

  const currentDate = new Date(shed.batchStartDate); 

  const day = currentDate.getDate().toString().padStart(2, '0'); 
  const month = currentDate.toLocaleString('default', { month: 'short' }); 
  const year = currentDate.getFullYear();

  const days = Math.floor(Math.abs(new Date() - currentDate)/(1000*60*60*24));
  const age = Math.floor(days/7);

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

        <td className="dashboard-cell">{shed.birdsCnt}</td>
        <td className="dashboard-cell">{shed.deathCnt}</td>
        
      </tr>
    </>
  )
}


function Chick({chickData}){
  return (
    <>
      <table className="chick-dashboard">
        <tr>
          <td className="chick-dashboard-title" colSpan={5}>CHICK</td>
        </tr>
        <tr className="chick-dashboard-title">
          <td>SHED ID</td>
          <td>START DATE</td>
          <td>BATCH AGE</td>
          <td>BIRDS</td>
          <td>DEATH</td>
        </tr>
          {chickData.map((shed) => (
              <ChickShed shed={shed} key={shed.shedId}/>
          ))}
       
      </table>
    </>
    

);
}

function ChickShed({shed}){
  const currentDate = new Date(shed.batchStartDate); 

  const day = currentDate.getDate().toString().padStart(2, '0'); 
  const month = currentDate.toLocaleString('default', { month: 'short' }); 
  const year = currentDate.getFullYear();

  const days = Math.floor(Math.abs(new Date() - currentDate)/(1000*60*60*24));
  const age = Math.floor(days/7);

  const formattedDate = `${day}-${month}-${year}`;
  return (
    <>
      <tr className={(shed.shedId%2) ? "even-row" : "odd-row"}>
        <td className="dashboard-cell">Chick {shed.shedId}</td>
        <td className="dashboard-cell">{formattedDate}</td>
        <td className="dashboard-cell">{days < 7 ? days <= 1 ? `${days} day` : `${days} days` : age <= 1 ? `${age} week` : `${age} weeks`} </td>
        <td className="dashboard-cell">{shed.birdsCnt}</td>
        <td className="dashboard-cell">{shed.deathCnt}</td>
        
      </tr>
    </>
  )
}

function Grower({growerData}){
  return (
    <>
      <table className="chick-dashboard">
        <tr>
          <td className="chick-dashboard-title" colSpan={5}>GROWER</td>
        </tr>
        <tr className="chick-dashboard-title">
          <td>SHED ID</td>
          <td>START DATE</td>
          <td>BATCH AGE</td>
          <td>BIRDS</td>
          <td>DEATH</td>
        </tr>
          {growerData.map((shed) => (
              <GrowerShed shed={shed} key={shed.shedId}/>
          ))}
       
      </table>
    </>
    

);
}

function GrowerShed({shed}){
  const currentDate = new Date(shed.batchStartDate); 

  const day = currentDate.getDate().toString().padStart(2, '0'); 
  const month = currentDate.toLocaleString('default', { month: 'short' }); 
  const year = currentDate.getFullYear();

  const days = Math.floor(Math.abs(new Date() - currentDate)/(1000*60*60*24));
  const age = Math.floor(days/7);

  const formattedDate = `${day}-${month}-${year}`;
  return (
    <>
      <tr className={(shed.shedId%2) ? "even-row" : "odd-row"}>
        <td className="dashboard-cell">Grower {shed.shedId}</td>
        <td className="dashboard-cell">{formattedDate}</td>
        <td className="dashboard-cell">{days < 7 ? days <= 1 ? `${days} day` : `${days} days` : age <= 1 ? `${age} week` : `${age} weeks`} </td>
        <td className="dashboard-cell">{shed.birdsCnt}</td>
        <td className="dashboard-cell">{shed.deathCnt}</td>
        
      </tr>
    </>
  )
}

function Reset(){

  const [birdsCnt, setBirdsCnt] = useState('');
  const [shedName, setShedName] = useState('');
  const [confirmMsg, setConfirmMsg] = useState("");
  const [batchStartDate, setBatchStartDate] = useState("");
  const token = localStorage.getItem("token");
  
  async function handleReset(){

    if(isNaN(birdsCnt)){
      toast.error("Enter valid birds cnt..", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
      });
      return;
    }
    if(shedName === ''){
      toast.error("Select shed..", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
      });
      return;
    }

    if(batchStartDate === ""){
      toast.error("Select Date..", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
      });
      return;
    }
    if(confirmMsg !== (""+shedName+"-"+birdsCnt)){
      toast.error("Type the correct msg..", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
      });
      return;
    }
    var api = 'https://api.anbupf.com/api/1.0/stocks/layer-reset';
    if(shedName.includes("chick")){
        api = 'https://api.anbupf.com/api/1.0/stocks/chick-reset';
    }
    else if(shedName.includes("grower")){
        api = 'https://api.anbupf.com/api/1.0/stocks/grower-reset'
    }
    const shedId = Number(shedName.slice(-1));
    try {
      await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({shedId, birdsCnt, batchStartDate}),
        });
        toast.success("Reset successful. Stock updation for the previous batch is now not possible from now.", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
    }
    catch(err){
      console.log(err);
      toast.error("Error in reset..", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
      });
    }
  }
  return(
    <>
      <table className="tableStyle">
        <tr >
          <td style={{color: 'red'}} className="subHeaderStyle" colSpan={3}>
              Stock Reset
          </td>
        </tr>
        <tr>
          <td className="cellStyle" colSpan={3}>
            <p><span style={{color: 'red'}}>|</span> Stock of the current batch will be reset and can't be updated further <span style={{color: 'red'}}>|</span></p>
          </td>
        </tr>
        <tr>
          <td className="cellStyle">
              <select  name="shedName" value={shedName} onChange={(e)=>{setShedName(e.target.value)}}>
                <option value="0">Select Shed</option>
                <option value="layer1">Shed 1</option>
                <option value="layer2">Shed 2</option>
                <option value="layer3">Shed 3</option>
                <option value="layer4">Shed 4</option>
                <option value="layer5">Shed 5</option>
                <option value="chick1">Chick 1</option>
                <option value="grower1">Grower 1</option>
              </select>
          </td>
          <td className="cellStyle">
            <div class="input-container">
              <label for="birds">Birds</label>
              <input autoComplete="off" type = "text" name="birds" value={birdsCnt} onChange={(e)=>{setBirdsCnt(e.target.value)}} />
            </div>
            
          </td>
          <td className="cellStyle">
            <div class="input-container">
              <label for="batch-start-date">Date</label>
              <input type = "date" name="batch-start-date" value={batchStartDate} onChange={(e)=>{setBatchStartDate(e.target.value)}} />
            </div> 
          </td>
        </tr>
        <tr>
          <td className="cellStyle">
            <span><b>{shedName}-{birdsCnt}</b></span>
          </td>
          <td className="cellStyle">
            <div class="input-container">
              <label for="confirmMsg">Msg</label>
              <input autocomplete="off" type = "text" name="confirmMsg" value={confirmMsg} onChange={(e)=>{setConfirmMsg(e.target.value)}} />
            </div>   
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

