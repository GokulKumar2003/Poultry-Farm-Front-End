import React, { useState } from "react"
import '../styles/style.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StockUpdate(){
    
    const [stockUpdateData, setStockUpdateData] = useState({shedId: 0,
                                                            date: '',
                                                            largeProduction: '',
                                                            smallProduction: '',
                                                            brokenProduction: '',
                                                            dirtyProduction: '',
                                                            largeSale: '',
                                                            smallSale: '',
                                                            brokenSale: '',
                                                            dirtySale: '',
                                                            deathCnt: '',    
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

      if(stockUpdateData.shedId == 0){
        toast.error("Select a shed..", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
        });
        return;
      }

      if(stockUpdateData.date === ''){
        toast.error("Enter a valid date..", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
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
            theme: "dark",
          });
          return;
      }

      // Update info toast  
      toast.info("Updating..", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
      });
      try {
        const token = localStorage.getItem("token");
        await fetch('http://localhost:8080/api/1.0/stocks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(stockUpdateData),
          });

          toast.success("Update successful..", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
          });
      }
      catch(err){
        console.log(err);
        toast.error("Error in Updating..", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
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
                <option value="0">Select Shed</option>
                <option value="1">Shed 1</option>
                <option value="2">Shed 2</option>
                <option value="3">Shed 3</option>
                <option value="4">Shed 4</option>
                <option value="5">Shed 5</option>
              </select>
            </td>
            <td className="subHeaderStyle">
           
              <input type = "date" id = "date" className="dateInput" name="date" value={stockUpdateData.date} onChange={handleChange} />
              
            </td>
          </tr>
          <tr>
            <td className="subHeaderStyle">Production</td>
            <td className="subHeaderStyle">Sale</td>
          </tr>
          <tr>
            <td className="cellStyle">
              <div class="input-container">
                <label for="largeProduction">Large</label>
                <input className = {stockUpdateData.largeProduction === "" | isNaN(stockUpdateData.largeProduction) ? "error_input" : "" }
                  type= " text" name="largeProduction" value={stockUpdateData.largeProduction} onChange={handleChange} />
              </div>
            
            </td>
            <td className="cellStyle">
              <div class="input-container">
                <label for="largeSale">Large</label>
                <input className = {stockUpdateData.largeSale === "" | isNaN(stockUpdateData.largeSale) ? "error_input" : "" } 
                  type= " text" name="largeSale" value={stockUpdateData.largeSale} onChange={handleChange} />
              </div>
            
            </td>
          </tr>
          <tr>
            <td className="cellStyle">
              <div class="input-container">
                <label for="smallProduction">Small</label>
                <input className = {stockUpdateData.smallProduction === "" | isNaN(stockUpdateData.smallProduction) ? "error_input" : "" } 
                type= " text" name="smallProduction" value={stockUpdateData.smallProduction} onChange={handleChange} />
              </div> 
            
            </td>
            <td className="cellStyle">
              <div class="input-container">
                <label for="smallSale">Small</label>
                <input className = {stockUpdateData.smallSale === "" | isNaN(stockUpdateData.smallSale) ? "error_input" : "" }
                  type= " text" name="smallSale" value={stockUpdateData.smallSale} onChange={handleChange} />
              </div> 
            </td>
          </tr>
          <tr>
            <td className="cellStyle">
              <div class="input-container">
                <label for="brokenProduction">Broken</label>
                <input className = {stockUpdateData.brokenProduction === "" | isNaN(stockUpdateData.brokenProduction) ? "error_input" : "" }
              type= " text" name="brokenProduction" value={stockUpdateData.brokenProduction} onChange={handleChange} />
              </div> 
            
            </td>
            <td className="cellStyle">
              <div class="input-container">
                <label for="brokenSale">Broken</label>
                <input className = {stockUpdateData.brokenSale === "" | isNaN(stockUpdateData.brokenSale) ? "error_input" : "" }
              type= " text" name="brokenSale" value={stockUpdateData.brokenSale} onChange={handleChange} />
              </div>  
            
            </td>
          </tr>
          <tr>
            <td className="cellStyle">
              <div class="input-container">
                <label for="dirtyProduction">Dirty</label>
                <input className = {stockUpdateData.dirtyProduction === "" | isNaN(stockUpdateData.dirtyProduction) ? "error_input" : "" }
              type= " text" name="dirtyProduction" value={stockUpdateData.dirtyProduction} onChange={handleChange} />
              </div> 
            
            </td>
            <td className="cellStyle">
              <div class="input-container">
                <label for="dirtySale">Dirty</label>
                <input className = {stockUpdateData.dirtySale === "" | isNaN(stockUpdateData.dirtySale) ? "error_input" : "" }
              type= " text" name="dirtySale" value={stockUpdateData.dirtySale} onChange={handleChange} />
              </div> 
            
            </td>
          </tr>
          <tr>
            <td className="cellStyle" colSpan={2}>
              <div class="input-container">
                <label for="deathCnt">Death Cnt</label>
                <input className = {stockUpdateData.deathCnt === "" | isNaN(stockUpdateData.deathCnt) ? "error_input" : "" }
              type= " text" name="deathCnt" value={stockUpdateData.deathCnt} onChange={handleChange} />
            
              </div> 
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