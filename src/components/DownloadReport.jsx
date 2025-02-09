import React, { useState } from 'react';
import '../styles/style.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function DownloadReport(){
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportType, setReportType] = useState('individual-shed');
  const [shedId, setShedId] = useState(1);
  const [downloadLink, setDownloadLink] = useState('');
  const [report, setReport] = useState({})
  const [isReportReady, setIsReportReady] = useState(false);

  const showToast = (type) => {
    // Dismiss all previous toasts before showing a new one
    toast.dismiss();

    switch (type) {
      case "success":
        toast.success("Report generated..",{
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
        break;
      case "error":
        toast.error("Error in fetching..",{
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
        break;
      case "info":
        toast.info("Generating the report..",{
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
        break;
      default:
        toast("This is a default toast.");
    }
  }

  const handleSubmit = async () => { 
    
    setIsReportReady(false);
    const start = new Date(startDate)
    const end = new Date(endDate)
    setDownloadLink('')
    if(startDate === ''){
      toast.error("Select Start Date..", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
      return;
    }
    if(endDate === ''){
      toast.error("Select End Date", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
      return;
    }
    if(end < start){
      toast.error("Enter valid Range..", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
      return;
    }
    if((end - start)/(1000*60*60*24) > 31){
      toast.error("Select range max of 30 days..", {
        position: "top-right",
        autoClose: 2000,
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
        ? "http://localhost:8080/api/1.0/reports/shed_report"
        : "http://localhost:8080/api/1.0/reports/overall_report";

      const response = await fetch(url, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
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
      setIsReportReady(true);
      console.log(report);
      showToast("success");
    } catch (error) {
      console.error('Error downloading the report:', error);
      showToast("error")
    }
   
  };

  return (

    <>
    <form>
    <table className='tableStyle'>
        <thead>
          <tr>
            <th className="headerStyle" colSpan={2}>Reports</th>
          </tr>
        </thead>
        
        <tbody>
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
              <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                <option value="individual-shed">Individual Shed Report</option>
                <option value="overall">Overall Shed Report</option>
              </select>
          </td>
          </tr>
          <tr>
            <td className="subHeaderStyle">Shed</td>
            <td className="cellStyle">
              <select value={shedId} onChange={(e) => setShedId(e.target.value)}>
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
        
          <tr>
            <td className="cellStyle" colSpan={2}><DownloadLink 
                                                            downloadLink={downloadLink}
                                                            reportType={reportType}
                                                            shedId={shedId} />
            </td>
          </tr>
        </tbody>
      </table>
      </form>
      {isReportReady && <ReportTable report={report}/>}
      <ToastContainer />
    </>
  );
};

function DownloadLink({downloadLink, reportType, shedId}){
 
  return(
    <>
      {downloadLink && (
      <a href={downloadLink} download = {!reportType.localeCompare("report") ? "Shed_"+toString(shedId)+"_report.xlsx" : "overall_report.xlsx"}>
        Click here to download the report
      </a>
    )}
    </>
    
  )
}

function ReportTable({report}){
  return(
    <>
      <table className='dashboard'>
        {report[0].shedId == 0 ? 
          <tr className="report-title">
            <td colSpan={10}>OVERALL REPORT</td>
            <td colSpan={1}><button>Download</button></td>
          </tr> :
          <tr className="report-title">
            <td colSpan={10}>SHED {report[0].shedId}</td>
            <td colSpan={1}><button>Download</button></td>
          </tr>
        }
        <tr className="dashboard-title">
          <td>DATE</td>
          <td colSpan={4}>PRODUCTION</td>
          <td colSpan={4}>SALE</td>
          <td>DEATH</td>
          <td>PROD. %</td>
        </tr>
        <tr className="dashboard-title">
          <td ></td>
          <td>Large</td>
          <td>Small</td>
          <td>Broken</td>
          <td>Dirty</td>
          <td>Large</td>
          <td>Small</td>
          <td>Broken</td>
          <td>Dirty</td>
          <td></td>
          <td></td>
        </tr>
        {report.map((r, index) => (
                <ReportTableEntry reportEntry={r} key={index} i={index}/>
        ))}
        
      </table>
    </>
  )
}

function ReportTableEntry({reportEntry, i}){
  console.log(i)
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


    </tr>
  </>
  )
}
