import React, { useState } from "react"
import '../styles/style.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      console.log(stockUpdateData);

      if(stockUpdateData.date === ''){
        toast.error("Enter a valid date..", {
          position: "top-right",
          autoClose: 2000,
        });
        return;
      }

      if(isNaN(stockUpdateData.largeProduction) || isNaN(stockUpdateData.largeSale) ||
        isNaN(stockUpdateData.smallProduction) || isNaN(stockUpdateData.smallSale) ||
        isNaN(stockUpdateData.brokenProduction) || isNaN(stockUpdateData.brokenSale) ||
        isNaN(stockUpdateData.dirtyProduction) || isNaN(stockUpdateData.dirtySale) ||
        isNaN(stockUpdateData.deathCnt)){
          toast.error("Enter valid value..", {
            position: "top-right",
            autoClose: 2000,
          });
          return;
      }

      // Update info toast  
      toast.info("Updating..", {
        position: "top-right",
        autoClose: 1000,
      });
      try {
        
        await fetch('http://localhost:8080/api/1.0/stocks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(stockUpdateData),
          });

          toast.success("Update successful..", {
            position: "top-right",
            autoClose: 3000,
          });
      }
      catch(err){
        console.log(err);
        toast.error("Error in Updating..", {
          position: "top-right",
          autoClose: 3000,
        });
      }
      
    }

    return(
      <>
        <form>
        <table className="tableStyle">
        <thead>
          <tr>
            <th className="headerStyle" colSpan={2}>Stock Update</th>
          </tr>
        </thead>
        
        <tbody>
          <tr>
            <td className="subHeaderStyle"> 
              <select  name="shedId" value={stockUpdateData.shedId} onChange={handleChange}>
                <option value="1">Shed 1</option>
                <option value="2">Shed 2</option>
                <option value="3">Shed 3</option>
                <option value="4">Shed 4</option>
                <option value="5">Shed 5</option>
              </select>
            </td>
            <td className="subHeaderStyle">
              <input type = "date" className="dateInput" name="date" value={stockUpdateData.date} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td className="subHeaderStyle">Production</td>
            <td className="subHeaderStyle">Sale</td>
          </tr>
          <tr>
            <td className="cellStyle"><span>Large</span>
            <input className = {stockUpdateData.largeProduction === "" | isNaN(stockUpdateData.largeProduction) ? "error_input" : "" }
              type= " text" name="largeProduction" value={stockUpdateData.largeProduction} onChange={handleChange} />
            </td>
            <td className="cellStyle"><span>Large</span>
            <input className = {stockUpdateData.largeSale === "" | isNaN(stockUpdateData.largeSale) ? "error_input" : "" } 
              type= " text" name="largeSale" value={stockUpdateData.largeSale} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td className="cellStyle"><span>Small</span> 
            <input className = {stockUpdateData.smallProduction === "" | isNaN(stockUpdateData.smallProduction) ? "error_input" : "" } 
              type= " text" name="smallProduction" value={stockUpdateData.smallProduction} onChange={handleChange} />
            </td>
            <td className="cellStyle"><span>Small</span> 
            <input className = {stockUpdateData.smallSale === "" | isNaN(stockUpdateData.smallSale) ? "error_input" : "" }
              type= " text" name="smallSale" value={stockUpdateData.smallSale} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td className="cellStyle"><span>Broken</span> 
            <input className = {stockUpdateData.brokenProduction === "" | isNaN(stockUpdateData.brokenProduction) ? "error_input" : "" }
              type= " text" name="brokenProduction" value={stockUpdateData.brokenProduction} onChange={handleChange} />
            </td>
            <td className="cellStyle"><span>Broken</span> 
            <input className = {stockUpdateData.brokenSale === "" | isNaN(stockUpdateData.brokenSale) ? "error_input" : "" }
              type= " text" name="brokenSale" value={stockUpdateData.brokenSale} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td className="cellStyle"><span>Dirty</span>
            <input className = {stockUpdateData.dirtyProduction === "" | isNaN(stockUpdateData.dirtyProduction) ? "error_input" : "" }
              type= " text" name="dirtyProduction" value={stockUpdateData.dirtyProduction} onChange={handleChange} />
            </td>
            <td className="cellStyle"><span>Dirty</span> 
            <input className = {stockUpdateData.dirtySale === "" | isNaN(stockUpdateData.dirtySale) ? "error_input" : "" }
              type= " text" name="dirtySale" value={stockUpdateData.dirtySale} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td className="subHeaderStyle" colSpan={2}><p>Death Cnt</p>
            <input className = {stockUpdateData.deathCnt === "" | isNaN(stockUpdateData.deathCnt) ? "error_input" : "" }
              type= " text" name="deathCnt" value={stockUpdateData.deathCnt} onChange={handleChange} />
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
      <ToastContainer />
      </>
    )
}