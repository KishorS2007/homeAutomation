import React, { useEffect, useState } from 'react'
import styles from './gadgets.module.css'
import { styled } from "@mui/material/styles";
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import Mydialogbox from '../dialog/dialog';
const BlackSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "black",
      "& + .MuiSwitch-track": {
        backgroundColor: "black",
      },
    },
  }));

const Gadgets = (props) => {
  const [Checked,SetChecked] = useState(props.status === 'ON');

let lastActive = new Date(props.lastactivetime);
let lastBootTime = new Date(props.lastboottime);
let runningTimeMs = lastActive - lastBootTime;
const [runningMinutes,SetrunningMinutes] = useState(Math.floor(runningTimeMs / (100000 * 60 * 60)));
const [randomTemperature, setRandomTemperature] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
     lastActive = new Date(props.lastactivetime);
     lastBootTime = new Date(props.lastboottime);
     runningTimeMs = lastActive - lastBootTime;
    SetrunningMinutes(Math.floor(runningTimeMs / (100000 * 60 * 60))); 
   
  }, 1000); 

    
  return () => clearInterval(interval);
}, [props.lastactivetime, props.lastboottime]); 

useEffect(()=>{
  if (props.status === "ON") {
  if (runningMinutes < 120) {
    setRandomTemperature((Math.random() * 10 + 30).toFixed(2)); 
  } else if (runningMinutes < 360) {
    setRandomTemperature((Math.random() * 10 + 40).toFixed(2)); 
  } else {
    setRandomTemperature((Math.random() * 10 + 50).toFixed(2)); 
  }
} else {
  setRandomTemperature((props.temperature - Math.random() * 5).toFixed(2));
  if (randomTemperature < 20) setRandomTemperature("20.00"); 
}
},[runningMinutes,Checked])


const updateDeviceTime = async () => {

  const currentTime = new Date().toISOString().slice(0, 19).replace("T", " ");
  try {
    const res = await fetch(`http://localhost:8000/update/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        status:Checked?"ON":"OFF",
        last_active: Checked ? currentTime : new Date(props.lastboottime).toISOString().slice(0, 19).replace("T", " "),
        last_boot_time: Checked ? (new Date(props.lastboottime).toISOString().slice(0, 19).replace("T", " ") ?? currentTime) : new Date(props.lastboottime).toISOString().slice(0, 19).replace("T", " "),
        temperature:randomTemperature
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to update timestamps");
    }
  } catch (error) {
    console.error("Error updating device timestamps:", error.message);
  }
};

const handleToggle = async (e) => {
  const newChecked = e.target.checked;
  SetChecked(newChecked);
    SetrunningMinutes(0);

     const updatedData = {
    status: newChecked?"ON":"OFF",
    last_boot_time: newChecked ? new Date().toISOString().slice(0, 19).replace("T", " ") :  new Date(props.lastboottime).toISOString().slice(0, 19).replace("T", " "),
    temperature:randomTemperature
  };

  if (newChecked) { 
    updatedData.last_active = new Date().toISOString().slice(0, 19).replace("T", " ");
  }
  else{
    updatedData.last_active = new Date(props.lastactivetime).toISOString().slice(0, 19).replace("T", " ")

  } 


  try {
    const res = await fetch(`http://localhost:8000/update/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      throw new Error("Failed to update status");
    }
  } catch (error) {
    console.error("Error updating device status:", error.message);
  }
};


useEffect(() => {
  const interval = setInterval(() => {
    updateDeviceTime();
    props.fetcher();
  }, 1000);

  return () => clearInterval(interval);
}, [Checked,updateDeviceTime]);



  return (<>
  <Box className = {`${styles.card}`} sx={{bgcolor:`${runningMinutes>360 ? "rgb(245, 52, 52)":"white"}`}}>
    <Box className={`${styles.top}`}>
        <DevicesOtherIcon />
        <BlackSwitch checked={Checked} onChange={handleToggle}/>
    </Box>
    <Typography variant="h5" color="initial" className={`${styles.text}`}>{props.deviceName}</Typography>

    <Box className={`${styles.bottom}`}>
        <Typography variant="body1" color="initial">Active for {runningMinutes} Minutes</Typography>
        <Typography variant="body1" color="initial">{props.temperature?props.temperature:'0'}°C</Typography>
    </Box>
  </Box>
  <Mydialogbox  warningStatus ={runningMinutes>480?true:false} 
                name = {props.deviceName} 
                time = {runningMinutes}
                setonoff = {SetChecked}
                fetchupdate = {props.fetcher}
                

/>
</>)}

export default Gadgets;
