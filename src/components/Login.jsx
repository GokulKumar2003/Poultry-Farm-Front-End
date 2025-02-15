import React, { useState } from 'react';
import '../styles/style.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Login(){
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

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
    
    if(userName === ''){
      toast.error("Username can't be empty.", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
      return;
    }
    if(password === ''){
      toast.error("Password can't be empty", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
      return;
    }
    
    // Create the payload with selected data
    const reqMsg = {
      userName,
      password
    };

    try {
      
      const url =
        "http://localhost:8080/api/1.0/auth/login";

      const response = await post(url, {
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
      showToast("success");
    } catch (error) {
      console.error('Error in logging in.', error);
      showToast("error")
    }
   
  };

  return (

    <>
    <form>
    <table className='tableStyle'>
        <thead>
          <tr>
            <th className="headerStyle" colSpan={2}>Anbhazhagan Poultry Farm</th>
          </tr>
        </thead>
        
        <tbody>
          <tr>
            <td className="cellStyle" colSpan={2}>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder='Username..'
              />
            </td>
          </tr>
          <tr>
            <td className="cellStyle" colSpan={2}>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password..'
              />
            </td>
          </tr>
          <tr>
            <td className="cellStyle" colSpan={2}>
              <button type="button" onClick={handleSubmit}>Login</button>
            </td>   
          </tr>
        </tbody>
      </table>
      </form>
      <ToastContainer />
    </>
  );
};
