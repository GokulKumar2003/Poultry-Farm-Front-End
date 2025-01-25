import React, { useState } from 'react';
import '../styles/report.css'

export default function DownloadReport(){
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportType, setReportType] = useState('');
  const [shedId, setShedId] = useState(1);
  const [downloadLink, setDownloadLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [rangeErr, setRangeErr] = useState(false);
  const [isInvalidRange, setIsInvalidRange] = useState(false);

  const handleSubmit = async () => { 
    setIsInvalidRange(false)
    setRangeErr(false)
    const start = new Date(startDate)
    const end = new Date(endDate)
    
    console.log(start)
    console.log(end)
  
    if(end < start){
      setIsInvalidRange(true);
      return;
    }
    if((end - start)/(1000*60*60*24) > 30){
      setRangeErr(true);
      return;
    }
    
    setLoading(true)
    // Create the payload with selected data
    const reqMsg = {
      shedId,
      startDate,
      endDate,
    };

    try {
      
      let response = null
      if(!reportType.localeCompare("individual-shed")){
        response = await fetch('http://localhost:8080/api/1.0/reports/shed_report', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reqMsg),
        });
      }
      else{
        response = await fetch('http://localhost:8080/api/1.0/reports/overall_report', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reqMsg),
        });
      }

      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Failed to fetch report');
      }

      // Get the response as a Blob (Excel file)
      const data = await response.blob();

      const link = URL.createObjectURL(data);

      // Set the download link
      setDownloadLink(link);
    } catch (error) {
      console.error('Error downloading the report:', error);
    }
    setLoading(false)
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
                <option value="">Select Report Type</option>
                <option value="individual-shed">Individual Shed Report</option>
                <option value="overall">Overall Shed Report</option>
              </select>
          </td>
          </tr>
          <tr>
            <td className="subHeaderStyle">Shed</td>
            <td className="cellStyle">
              <select value={shedId} onChange={(e) => setShedId(e.target.value)}>
                <option value="">Select Shed ID</option>
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
            {isInvalidRange ? (
              <td className="cellStyle" colSpan={2}>Invalid Range</td>
            ) : rangeErr ? (
              <td className="cellStyle" colSpan={2}>Select range of 30 days</td>
            ) : (
              <td className="cellStyle" colSpan={2}></td>
            )} 
          </tr>
  
          <tr>
            <td className="cellStyle" colSpan={2}><DownloadLink loading={loading}
                                                            downloadLink={downloadLink}
                                                            reportType={reportType}
                                                            shedId={shedId} />
            </td>
          </tr>
        </tbody>
      </table>
      </form>
      
    </>
  );
};

function DownloadLink({loading, downloadLink, reportType, shedId}){

  console.log(shedId);
  if(loading){
    return(
      <div>
        <p>Fetching the report...</p>
      </div>
    )
  }
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

