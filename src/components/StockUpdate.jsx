import React, { useState } from "react"
import '../styles/style.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthListener from "./AuthListener";
import { use } from "react";

export default function StockUpdate(){
    
    const [stockUpdateData, setStockUpdateData] = useState({shedId: '',
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
                                                            });
    
    const [isHidden, setIsHidden] = useState(false);
                                                      
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
          autoClose: 1000,
          theme: "dark",
        });
        return;
      }

      if(stockUpdateData.date === ''){
        toast.error("Enter a valid date..", {
          position: "top-right",
          autoClose: 1000,
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
            autoClose: 1000,
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
      var api = 'https://api.anbupf.com/api/1.0/stocks/layer-update';
      if(stockUpdateData.shedId.includes("chick")){
          api = 'https://api.anbupf.com/api/1.0/stocks/chick-update';
      }
      else if(stockUpdateData.shedId.includes("grower")){
          api = 'https://api.anbupf.com/api/1.0/stocks/grower-update'
      }
      const reqBodyData = { ...stockUpdateData, shedId: Number(stockUpdateData.shedId.slice(-1))};
      console.log(reqBodyData);
      try {
        const token = localStorage.getItem("token");
        await fetch(api, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(reqBodyData),
          });

          toast.success("Update successful..", {
            position: "top-right",
            autoClose: 1000,
            theme: "dark",
          });
      }
      catch(err){
        console.log(err);
        toast.error("Error in Updating..", {
          position: "top-right",
          autoClose: 1000,
          theme: "dark",
        });
      }
      
    }

    function handleShedChange(e){
      if(e.target.value === "chick1" || e.target.value === "grower1"){
        setIsHidden(true);
      }
      else{
        setIsHidden(false); 
      }

      const { name, value } = e.target;

        setStockUpdateData((prevData) => ({
            ...prevData, // Keep existing data
            shedId: value,
            largeProduction: '',
            largeSale:'',
            smallProduction:'',
            smallSale:'',
            brokenProduction:'',
            brokenSale:'',
            dirtyProduction:'',
            dirtySale:''
        }));
    }
    return(
      <>
        <AuthListener />
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
              <select  name="shedId" value={stockUpdateData.shedId} onChange={handleShedChange}>
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
            <td className="subHeaderStyle">
           
              <input type = "date" id = "date" className="dateInput" name="date" value={stockUpdateData.date} onChange={handleChange} />
              
            </td>
          </tr>
          <tr hidden={isHidden}>
            <td className="subHeaderStyle">Production</td>
            <td className="subHeaderStyle">Sale</td>
          </tr>
          <tr hidden={isHidden}>
            <td className="cellStyle">
              <div class="input-container">
                <label for="largeProduction">Large</label>
                <input autoComplete="off" className = {stockUpdateData.largeProduction === "" | isNaN(stockUpdateData.largeProduction) ? "error_input" : "" }
                  type= " text" name="largeProduction" value={stockUpdateData.largeProduction} onChange={handleChange} />
              </div>
            
            </td>
            <td className="cellStyle">
              <div class="input-container">
                <label for="largeSale">Large</label>
                <input autoComplete="off" className = {stockUpdateData.largeSale === "" | isNaN(stockUpdateData.largeSale) ? "error_input" : "" } 
                  type= " text" name="largeSale" value={stockUpdateData.largeSale} onChange={handleChange} />
              </div>
            
            </td>
          </tr>
          <tr hidden={isHidden}>
            <td className="cellStyle">
              <div class="input-container">
                <label for="smallProduction">Small</label>
                <input autoComplete="off" className = {stockUpdateData.smallProduction === "" | isNaN(stockUpdateData.smallProduction) ? "error_input" : "" } 
                type= " text" name="smallProduction" value={stockUpdateData.smallProduction} onChange={handleChange} />
              </div> 
            
            </td>
            <td className="cellStyle">
              <div class="input-container">
                <label for="smallSale">Small</label>
                <input autoComplete="off" className = {stockUpdateData.smallSale === "" | isNaN(stockUpdateData.smallSale) ? "error_input" : "" }
                  type= " text" name="smallSale" value={stockUpdateData.smallSale} onChange={handleChange} />
              </div> 
            </td>
          </tr>
          <tr hidden={isHidden}>
            <td className="cellStyle">
              <div class="input-container">
                <label for="brokenProduction">Broken</label>
                <input autoComplete="off" className = {stockUpdateData.brokenProduction === "" | isNaN(stockUpdateData.brokenProduction) ? "error_input" : "" }
              type= " text" name="brokenProduction" value={stockUpdateData.brokenProduction} onChange={handleChange} />
              </div> 
            
            </td>
            <td className="cellStyle">
              <div class="input-container">
                <label for="brokenSale">Broken</label>
                <input autoComplete="off" className = {stockUpdateData.brokenSale === "" | isNaN(stockUpdateData.brokenSale) ? "error_input" : "" }
              type= " text" name="brokenSale" value={stockUpdateData.brokenSale} onChange={handleChange} />
              </div>  
            
            </td>
          </tr>
          <tr hidden={isHidden}>
            <td className="cellStyle">
              <div class="input-container">
                <label for="dirtyProduction">Dirty</label>
                <input autoComplete="off" className = {stockUpdateData.dirtyProduction === "" | isNaN(stockUpdateData.dirtyProduction) ? "error_input" : "" }
              type= " text" name="dirtyProduction" value={stockUpdateData.dirtyProduction} onChange={handleChange} />
              </div> 
            
            </td>
            <td className="cellStyle">
              <div class="input-container">
                <label for="dirtySale">Dirty</label>
                <input autoComplete="off" className = {stockUpdateData.dirtySale === "" | isNaN(stockUpdateData.dirtySale) ? "error_input" : "" }
              type= " text" name="dirtySale" value={stockUpdateData.dirtySale} onChange={handleChange} />
              </div> 
            
            </td>
          </tr>
          <tr>
            <td className="cellStyle" colSpan={2}>
              <div class="input-container">
                <label for="deathCnt">Death Cnt</label>
                <input autoComplete="off" className = {stockUpdateData.deathCnt === "" | isNaN(stockUpdateData.deathCnt) ? "error_input" : "" }
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

