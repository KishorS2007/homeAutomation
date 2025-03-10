import styles from './user.module.css'
import Gadgets from '../../Components/Gadgets/Gadgets'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import AddDevice from '../../Components/AddDevice/AddDevice';
import { useState,useEffect } from 'react';
import { Button, Typography } from '@mui/material';

const User = () => {
  const [arr,Setarr] = useState([]);
  const [val,Setval] = useState(0);
const id = localStorage.getItem('id');
// Get Request
const FetchData = async()=>{
  try{
      // console.log("Id:",id);
      const res = await fetch(`http://localhost:8000/${id}`);
      if(!res.ok){
          throw new Error("http error");
      }
      const data = await res.json();
      Setarr(data.data);  
      // console.log(data.data) 
      // console.log(arr)
  }
  catch(e){
      console.log(e.message);
  }
}
useEffect(()=>{
  FetchData();
},[]);


const name = localStorage.getItem('name');
const [Ismodalopen , SetIsModalOpen] = useState(false);
const device = arr.map((v,i)=>(
  <Gadgets deviceName={v.device_name}
   id ={v.id} 
   status={v.status} 
   temperature={v.temperature} 
   lastactivetime = {v.last_active}
   lastboottime = {v.last_boot_time}
   homeid = {v.home_id}
   fetcher = {FetchData}
   key={i}/>
  ))

  return (<>
  <h3>WELCOME BACK {name.toLocaleUpperCase()} !</h3>
  <center>
  {!arr.length>0?
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"60vh"}}>
    <h1>Lets Add Your Devices to AuraHome And Control Them Anywhere Anytime</h1>

    </div>
:<></>}
  <div className={styles.userbody}>
  {arr.length>0?device:<></>}
    {/* <Box className={`${styles.addicon}`}> */}
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"20vw"}}>

    <Button onClick={()=>Setval(prev=>prev+1)}> increment</Button>
    <h1>{val}</h1>
    <Button onClick={()=>val>0?Setval(prev=>prev-1):""}>decrement</Button>
    </div>
      <Tooltip title="Add New Device To Aura Home" placement="left" arrow enterDelay={150} leaveDelay={250}>
    <Fab color="primary" aria-label="add" sx={{bgcolor:"black"}} className={`${styles.fab}`} onClick={()=>SetIsModalOpen(prev=>!prev)}>
        <AddIcon/>
      </Fab>
            
        </Tooltip>
  </div>
    <AddDevice isopen={Ismodalopen} className={`${styles.adddevice}`} fetchdata = {FetchData}/>
    </center>

</>)}

export default User
