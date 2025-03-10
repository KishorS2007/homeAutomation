// import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
// import * as React from 'react';
// import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styles from './adddevice.module.css'
import { useEffect, useState } from 'react';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  // width: { xs: "90%", sm: "70%", md: "50%" },
  // maxWidth: "400",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color:"black",
};

export default function AddDevice(props) {
  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [Device, setDevice] =useState('');
  const [DeviceName, setDeviceName] =useState('');
  const id = localStorage.getItem('id');

/* 
  <Gadgets deviceName={v.device_name}
   id ={v.id}  // unique
   status={v.status}  // off
   temperature={v.temperature} // 0
   homeid = {v.home_id}
   lastactivetime = {v.last_active}
   lastboottime = {v.last_boot_time}
   key={i}/>
*/

  const handleChange = (event) => {
    setDevice(event.target.value);
  };

  const HandleSubmit = async(e)=>{
    try{
        e.preventDefault();
        const res = await fetch(`http://localhost:8000/device`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            device_name:DeviceName,
            device_type:Device,
            home_id:id,
            status:"OFF",
            temperature:0
          })
         
        });
        if(!res.ok){
            throw new Error("http error");
        }
        const data = await res.json();  
          
        handleClose();
        setDevice("");
        setDeviceName("");
        props.fetchdata();
      }
    catch(e){
        console.log(e.message);
    }
  }
  
  
useEffect(()=>{
  props.isopen?setOpen(true):setOpen(false);
},[props.isopen])
  return (
    <div>
      {/* <Button onClick={handleOpen} variant='filled' >Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={`${styles.modal}`}
      >

        <form onSubmit={HandleSubmit}>

{/* Device Name */}
        <Box sx={style}>
          <div  className={`${styles.name}`}>
            <h3 >Device Name:</h3>
        <TextField variant='outlined' 
        label="Enter Device Name" 
        required
        value={DeviceName}
        onChange={(e)=>setDeviceName(e.target.value)}
        ></TextField>
          </div>

          <div  className={`${styles.type}`}>
            <h3 >Device Type:</h3>

{/* Device Type */}
{/* <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}> */}
      <FormControl sx={{width:"60%",marginTop:"10px"}} required>
        <InputLabel id="demo-simple-select-label"  sx={{ width: "fit-content", backgroundColor: "white", px: 1 }} >DeviceType</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Device}
          label="Device"
          onChange={handleChange}
          className={`${styles.select}`}
          // autoWidth
          fullWidth
          sx={{width:"100%"}}
          
          >
          <MenuItem value="LED">LED</MenuItem>
          <MenuItem value="TV">TV</MenuItem>
          <MenuItem value="Refrigerator">Refrigerator</MenuItem>
          <MenuItem value="Washing Machine">Washing Machine</MenuItem>
          <MenuItem value="Fan">Fan</MenuItem>
          <MenuItem value="AC">AC</MenuItem>
          <MenuItem value="Water Heater">Water Heater</MenuItem>
          <MenuItem value="Exhaust Fan">Exhaust Fan</MenuItem>

        </Select>
      </FormControl>
      {/* </Box> */}
          </div>
      <Button fullWidth className={`${styles.submit}` }  type='submit'>Add</Button>
        </Box>
            </form>
      </Modal>
    </div>
  );
}
