import React, { useState } from "react"
import '../styles/stockupdate.css'

const tableStyle = {
    borderCollapse: 'collapse', 
    width: '50%',               
    margin: '10% auto',         
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)', 
    borderRadius: '10px',        
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
  };
  
  const subHeaderStyle = {
    
    padding: '10px',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    fontSize: '25px',
  };

export default function StockUpdate(){
    const [stockUpdateData, setStockUpdateData] = useState({shedId: 0,
                                                            date: '',
                                                            largeProduction: 0,
                                                            smallProduction: 0,
                                                            brokenProduction: 0,
                                                            dirtyProduction: 0,
                                                            largeSale: 0,
                                                            smallSale: 0,
                                                            brokenSale: 0,
                                                            dirtySale: 0,
                                                            deathCnt: 0,    
                                                            })
    
    const handleChange = (e) => {
        const { name, value } = e.target;
            setStockUpdateData((prevData) => ({
                ...prevData, // Keep existing data
                [name]: value, // Dynamically update the field
            }));
    };
    
    async function handleSubmit(){
      console.log(setStockUpdateData);
      try {
        
        await fetch('http://localhost:8080/api/1.0/stocks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(stockUpdateData),
          });
      }
      catch(err){
        console.log(err);
      }
    }

    return(
        <form>
        <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerStyle} colSpan={2}>Stock Update</th>
          </tr>
        </thead>
        
        <tbody>
          <tr>
            <td style={subHeaderStyle}>Shed</td>
            <td style={subHeaderStyle}> 
              <select  name="shedId" value={stockUpdateData.shedId} onChange={handleChange}>
                <option value="0">Select Shed ID</option>
                <option value="1">Shed 1</option>
                <option value="2">Shed 2</option>
                <option value="3">Shed 3</option>
                <option value="4">Shed 4</option>
                <option value="5">Shed 5</option>
              </select>
            </td>
          </tr>
          <tr>
            <td style={subHeaderStyle}>Date</td>
            <td style={subHeaderStyle}>
              <input type = "date" className="dateInput" name="date" value={stockUpdateData.date} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={2}></td>
          </tr>
          <tr>
            <td style={subHeaderStyle}>Production</td>
            <td style={subHeaderStyle}>Sale</td>
          </tr>
          <tr>
            <td style={cellStyle}><p>Large</p> 
            <input type= " text" name="largeProduction" value={stockUpdateData.largeProduction} onChange={handleChange} />
            </td>
            <td style={cellStyle}><p>Large</p>
            <input type= " text" name="largeSale" value={stockUpdateData.largeSale} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td style={cellStyle}><p>Small</p> 
            <input type= " text" name="smallProduction" value={stockUpdateData.smallProduction} onChange={handleChange} />
            </td>
            <td style={cellStyle}><p>Small</p> 
            <input type= " text" name="smallSale" value={stockUpdateData.smallSale} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td style={cellStyle}><p>Broken</p> 
            <input type= " text" name="brokenProduction" value={stockUpdateData.brokenProduction} onChange={handleChange} />
            </td>
            <td style={cellStyle}><p>Broken</p> 
            <input type= " text" name="brokenSale" value={stockUpdateData.brokenSale} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td style={cellStyle}><p>Dirty</p>
            <input type= " text" name="dirtyProduction" value={stockUpdateData.dirtyProduction} onChange={handleChange} />
            </td>
            <td style={cellStyle}><p>Dirty</p> 
            <input type= " text" name="dirtySale" value={stockUpdateData.dirtySale} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td style={subHeaderStyle} colSpan={2}>Death Cnt</td>
          </tr>
          <tr>
          <td style={subHeaderStyle} colSpan={2}>
            <input type= " text" name="deathCnt" value={stockUpdateData.deathCnt} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td style={cellStyle} colSpan={2}>
                <button type="button" onClick={handleSubmit}>Update Stock</button>
            </td>
          </tr>
        </tbody>
      </table> 
      </form> 
    )
}