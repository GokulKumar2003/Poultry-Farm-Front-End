import React, { useState } from 'react';
import '../styles/style.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const showToast = (type) => {
    // Dismiss all previous toasts before showing a new one
    toast.dismiss();

    switch (type) {
      case "success":
        toast.success("Logged in!",{
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
        break;
      case "error":
        toast.error("Error in logging in..",{
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
   
  
    if(username === ''){
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

    try {
      const response = await axios.post("https://your-backend.up.railway.app/api/1.0/auth/login",
      {username, password},
      {headers: { "Content-Type": "application/json" }});
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
      showToast("success");
    } catch (error) {
      console.error('Error in logging in.', error);
      showToast("error")
    }
   
  };

  return (

    <>
    <form>
    <table className='loginFormStyle'>
        <thead>
          <tr>
            <th className="headerStyle" colSpan={2}>Anbhazhagan Poultry Farm</th>
          </tr>
        </thead>
        
        <tbody>
          <tr>
            <td className="subHeaderStyle" colSpan={2}></td>
          </tr>
          <tr>
            <td className="subHeaderStyle" colSpan={2}>
              <div class="input-container">
                <label for="username">Username</label>
                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              </div> 
              
            </td>
          </tr>
          <tr>
            <td className="subHeaderStyle" colSpan={2}>
              <div class="input-container">
                <label for="password">Password</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
              </div> 
              
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
