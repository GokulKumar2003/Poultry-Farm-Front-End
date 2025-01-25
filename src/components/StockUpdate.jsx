import React, { useState } from "react"
import '../styles/stockupdate.css'

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
        <table className="tableStyle">
        <thead>
          <tr>
            <th className="headerStyle" colSpan={2}>Stock Update</th>
          </tr>
        </thead>
        
        <tbody>
          <tr>
            <td className="subHeaderStyle">Shed</td>
            <td className="subHeaderStyle"> 
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
            <td className="subHeaderStyle">Date</td>
            <td className="subHeaderStyle">
              <input type = "date" className="dateInput" name="date" value={stockUpdateData.date} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td className="subHeaderStyle">Production</td>
            <td className="subHeaderStyle">Sale</td>
          </tr>
          <tr>
            <td className="cellStyle"><p>Large</p> 
            <input type= " text" name="largeProduction" value={stockUpdateData.largeProduction} onChange={handleChange} />
            </td>
            <td className="cellStyle"><p>Large</p>
            <input type= " text" name="largeSale" value={stockUpdateData.largeSale} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td className="cellStyle"><p>Small</p> 
            <input type= " text" name="smallProduction" value={stockUpdateData.smallProduction} onChange={handleChange} />
            </td>
            <td className="cellStyle"><p>Small</p> 
            <input type= " text" name="smallSale" value={stockUpdateData.smallSale} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td className="cellStyle"><p>Broken</p> 
            <input type= " text" name="brokenProduction" value={stockUpdateData.brokenProduction} onChange={handleChange} />
            </td>
            <td className="cellStyle"><p>Broken</p> 
            <input type= " text" name="brokenSale" value={stockUpdateData.brokenSale} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td className="cellStyle"><p>Dirty</p>
            <input type= " text" name="dirtyProduction" value={stockUpdateData.dirtyProduction} onChange={handleChange} />
            </td>
            <td className="cellStyle"><p>Dirty</p> 
            <input type= " text" name="dirtySale" value={stockUpdateData.dirtySale} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td className="subHeaderStyle" colSpan={2}><p>Death Cnt</p>
            <input type= " text" name="deathCnt" value={stockUpdateData.deathCnt} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td className="cellStyle" colSpan={2}>
                <button type="button" onClick={handleSubmit}>Update Stock</button>
            </td>
          </tr>
        </tbody>
      </table> 
      </form> 
    )
}