import React, { useState } from 'react';
import '../styles/style.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx"; // ✅ Correct
import { Download } from 'lucide-react';
import jsPDF from "jspdf";
import "jspdf-autotable";
import AuthListener from './AuthListener';

function DeleteRecord(){

  const [confirmMsg, setConfirmMsg] = useState("");
  const [shed, setShed] = useState("");
  const token = localStorage.getItem("token");
  
  async function handleDeleteRecord(){

    if(shed == 0) {
      toast.error("Select shed..", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
      });
      return;
    }
    if(confirmMsg !== ''+shed+'-delete'){
      toast.error("Type the correct msg..", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
      });
      return;
    }
    try {
      var shedId = Number(shed.slice(-1));
      if(shed === "all"){
        shedId = 0;
      }
      await fetch('https://api.anbupf.com/api/1.0/reports/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({shedId}),
        });
        toast.success("Records deleted..", {
          position: "top-right",
          autoClose: 1000,
          theme: "dark",
        });
    }
    catch(err){
      console.log(err);
      toast.error("Error in deleting..", {
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
          <td className="subHeaderStyle" colSpan={2}>
              Record Delete
          </td>
        </tr>
        <tr>
          <td className="cellStyle" colSpan={2}>
            <p>Note: This will delete all sales and production history permanently.</p>
            <p>Confirmation Msg: <b>{""+shed+"-delete"}</b></p>
          </td>
        </tr>
        <tr>
        <td className="cellStyle">
              <select name="shed" value={shed} onChange={(e)=>{setShed(e.target.value)}}>
                <option value="0">Select Shed</option>
                <option value="all">All Shed</option>
                <option value="shed1">Shed 1</option>
                <option value="shed2">Shed 2</option>
                <option value="shed3">Shed 3</option>
                <option value="shed4">Shed 4</option>
                <option value="shed5">Shed 5</option>
              </select>
          </td>
          <td className="cellStyle">
            <input placeholder = "Confirmation msg.." autocomplete="off" type = "text" name="confirmMsg" value={confirmMsg} onChange={(e)=>{setConfirmMsg(e.target.value)}} />   
          </td>
          </tr>
          <tr>
          <td className="cellStyle" colSpan={2}>
            <button type="button" onClick={handleDeleteRecord} >Delete Record</button>
          </td>
        </tr>
      </table>
    </>
  )
}


export default function DownloadReport(){
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportType, setReportType] = useState('individual-shed');
  const [shedId, setShedId] = useState(1);
  const [isResponseReady, setIsResponseReady] = useState(false);
  const [report, setReport] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);

  const token = localStorage.getItem("token");

  const showToast = (type) => {
    // Dismiss all previous toasts before showing a new one
    toast.dismiss();

    switch (type) {
      case "success":
        toast.success("Report generated..",{
          position: "top-right",
          autoClose: 1000,
          theme: "dark",
        });
        break;
      case "error":
        toast.error("Error in fetching..",{
          position: "top-right",
          autoClose: 1000,
          theme: "dark",
        });
        break;
      case "info":
        toast.info("Generating the report..",{
          position: "top-right",
          autoClose: 1000,
          theme: "dark",
        });
        break;
      case "null-info":
        toast.info("No record Found..",{
          position: "top-right",
          autoClose: 1000,
          theme: "dark",
        });
        break;
      default:
        toast("This is a default toast.");
    }
  }

  const handleSubmit = async () => { 
    
    setIsResponseReady(false);
    const start = new Date(startDate)
    const end = new Date(endDate)
    if(startDate === ''){
      toast.error("Select Start Date..", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
      });
      return;
    }
    if(endDate === ''){
      toast.error("Select End Date", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
      });
      return;
    }
    if(end < start){
      toast.error("Enter valid Range..", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
      });
      return;
    }
    if((end - start)/(1000*60*60*24) > 31){
      toast.error("Select range max of 30 days..", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
      });
      return;
    }
    
    showToast("info")
    // Create the payload with selected data
    const reqMsg = {
      shedId,
      startDate,
      endDate,
    };

    try {
      
      const url =
        reportType === "individual-shed"
        ? "https://api.anbupf.com/api/1.0/reports/shed_report"
        : "https://api.anbupf.com/api/1.0/reports/overall_report";

      const response = await fetch(url, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            'Authorization': `Bearer ${token}`
                          },
                          body: JSON.stringify(reqMsg),
                        });

      // Check if the request was successful
      if (!response.ok) {
        console.log(response);
        showToast("error")
        throw new Error('Failed to fetch report');
      }

      const Report = await response.json();
      setReport(Report);
      setIsResponseReady(true);
      showToast("success");
    } catch (error) {
      console.error('Error downloading the report:', error);
      showToast("error")
    }
   
  };

  function handleReportTypeChange(e){
    if(e.target.value === "overall"){
      setIsDisabled(true);
      setReportType(e.target.value);
    }
    else{
      setIsDisabled(false); 
      setReportType(e.target.value);
    }
  }
  return (

    <>
    <AuthListener />
    <DeleteRecord />
    <form>
    <table className='tableStyle'>
        <thead>
          <tr>
            <th className="headerStyle" colSpan={2}>Reports</th>
          </tr>
        </thead>
        
        <tbody>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td className="subHeaderStyle" >Start Date</td>
            <td className="cellStyle" >
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td className="subHeaderStyle">End Date</td>
            <td className="cellStyle">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td className="subHeaderStyle">Report Type</td>
            <td className="cellStyle">
              <select value={reportType} onChange={handleReportTypeChange}>
                <option value="individual-shed">Individual Shed Report</option>
                <option value="overall">Overall Shed Report</option>
              </select>
          </td>
          </tr>
          <tr>
            <td className="subHeaderStyle">Shed</td>
            <td className="cellStyle">
              <select disabled = {isDisabled} value={shedId} onChange={(e) => setShedId(e.target.value)}>
                <option value="1">Shed 1</option>
                <option value="2">Shed 2</option>
                <option value="3">Shed 3</option>
                <option value="4">Shed 4</option>
                <option value="5">Shed 5</option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="cellStyle" colSpan={2}>
              <button type="button" onClick={handleSubmit}>Get Report</button>
            </td>   
          </tr>
        </tbody>
      </table>
      </form>
      {isResponseReady && <ReportTable report={report}/>}
      <ToastContainer />
    </>
  );
};

function ReportTable({report}){

  function handleDownload(){
    console.log(report);
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(report);

    var filename = 'overall-report.xlsx';
    var sheetname = 'overall-report'
    if(report[0].shedId !== 0){
      filename = 'Shed-'+report[0].shedId+'.xlsx';
      sheetname = 'Shed-'+report[0].shedId;
    }
    XLSX.utils.book_append_sheet(wb, ws, sheetname);
    XLSX.writeFile(wb, filename);
  }

  function handlePDFDownload(){
    const doc = new jsPDF();
  
    // Define table headers based on JSON keys
    var headers;
    if(report[0].shedId === 0){
      headers = Object.keys(report[0]).slice(1);
    }
    else{
      headers = Object.keys(report[0]); 
    }
    // Convert JSON data to an array of arrays
    const data = report.map((item) => headers.map((header) => item[header]));
    
    var title = 'Overall Report';
    var filename = 'Overall_Report.pdf';
    if(report[0].shedId !== 0){
      filename = 'Shed-'+report[0].shedId+'.pdf';
      title = 'Shed '+report[0].shedId;
    }

    // Add title
    doc.text(title, 14, 10);
  
    // Generate table
    doc.autoTable({
      head: [headers],
      body: data,
      startY: 20,
      didParseCell: function (data) {
        if (data.section === "head") {
          // Header row styling
          data.cell.styles.fillColor = [55, 65, 81];
          data.cell.styles.textColor = [255, 255, 255];
          data.cell.styles.fontStyle = "bold";
        } else {
          // Alternate row styling for better readability
          if (data.row.index % 2 === 0) {
            data.cell.styles.fillColor = [241, 245, 249];
          } else {
            data.cell.styles.fillColor = [226, 232, 240];
          }
        }
      },
      columnStyles: {
        0: { cellWidth: "auto" },
        1: { cellWidth: "auto" },  
        2: { cellWidth: "auto" },
        3: { cellWidth: "auto" },
        4: { cellWidth: "auto" },
        5: { cellWidth: "auto" },
        6: { cellWidth: "auto" },
        7: { cellWidth: "auto" },
        8: { cellWidth: "auto" },
        9: { cellWidth: "auto" },
        10: { cellWidth: "auto" },
        11: { cellWidth: "auto" },
        12: { cellWidth: "auto" },
      },
      styles: { overflow: "linebreak" },
    });
  
    // Save the PDF
    doc.save(filename);
  };
  if(Object.keys(report).length == 0){
    return(
      <>
        <table className='tableStyle'>
          <tr>
            <th className="subHeaderStyle">No record Found</th>
          </tr>
        </table>
      </>
    )
  }
  else {
  return(
    <>
      <table className='dashboard'>
        
          <tr>
             <td className='dashboard-cell'><a className="downloadlink" onClick={handleDownload}><Download size={20} />Export to Excel</a></td>
              {report[0].shedId == 0 ? 
                <td className='dashboard-cell' colSpan={10}><b>OVERALL REPORT</b></td> :
                <td className='dashboard-cell' colSpan={10}><b>SHED {report[0].shedId}</b></td>
              }
             <td className='dashboard-cell'><a className="downloadlink" onClick={handlePDFDownload}><Download size={20} />Export to PDF</a></td>
          </tr>
        
        <tr className="dashboard-title">
          <td rowSpan={2}>DATE</td>
          <td colSpan={4}>PRODUCTION</td>
          <td colSpan={4}>SALE</td>
          <td rowSpan={2}>DEATH</td>
          <td rowSpan={2}>PROD. %</td>
          <td rowSpan={2}>Death %</td>
        </tr>
        <tr className="dashboard-title">
          <td>Large</td>
          <td>Small</td>
          <td>Broken</td>
          <td>Dirty</td>
          <td>Large</td>
          <td>Small</td>
          <td>Broken</td>
          <td>Dirty</td>
        </tr>
        {report.map((r, index) => (
                <ReportTableEntry reportEntry={r} key={index} i={index}/>
        ))}
        
      </table>
    </>
  )
}
}

function ReportTableEntry({reportEntry, i}){
  return(
    <>
    <tr className={(i%2 === 0) ? "even-row" : "odd-row"}>
      <td className='dashboard-cell'>{reportEntry.date}</td>
      <td className='dashboard-cell'>{reportEntry.largeProd}</td>
      <td className='dashboard-cell'>{reportEntry.smallProd}</td>
      <td className='dashboard-cell'>{reportEntry.brokenProd}</td>
      <td className='dashboard-cell'>{reportEntry.dirtyProd}</td>
      <td className='dashboard-cell'>{reportEntry.largeSale}</td>
      <td className='dashboard-cell'>{reportEntry.smallSale}</td>
      <td className='dashboard-cell'>{reportEntry.brokenSale}</td>
      <td className='dashboard-cell'>{reportEntry.dirtySale}</td>
      <td className='dashboard-cell'>{reportEntry.death}</td>
      <td className='dashboard-cell'>{reportEntry.productionRatio}</td>
      <td className='dashboard-cell'>{reportEntry.deathPercentage}</td>
    </tr>
  </>
  )
}
