// import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState,useEffect } from 'react';
import { Typography } from '@mui/material';
 


export default function Admin() {
    let a = 0;
    const name = localStorage.getItem('name')
     const [Data,Setdata] = useState([]);
const FetchData = async()=>{
    try{
        const res = await fetch('http://localhost:8000/update/admin',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }

        );
        if(!res.ok){
            throw new error("http error");
        }
        const data = await res.json();   
        Setdata(data.d);
    if(!data){
        console.error("no data")
    }
        // Setdata(data);    
        // console.log(data.d)
    }
    catch(e){
        console.log(e.message);
    }
}
useEffect(()=>{
        FetchData();
},[]);
  if(!Data){
    return(
      <>Loading...</>
    )
  }
  return (
    <>
  <h3>WELCOME BACK {name.toLocaleUpperCase()} !</h3>
  <Typography variant='h4' sx={{textAlign:"center",margin:"10px 0"}}>Here Is The List Of Our Users </Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell> <b>S/No</b> </TableCell>    
            <TableCell> <b>Id</b> </TableCell>
            <TableCell align="left"><b>Name</b> </TableCell>
            <TableCell align="left"><b>Mail id</b> </TableCell>
            <TableCell align="left"><b>PhoneNumber</b> </TableCell>
            <TableCell align="left"><b>Role</b> </TableCell>
          </TableRow>
        </TableHead>
<>
    {Data?.map((d,i)=>(
      
      <TableBody key={i}>
              <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell> {++a} </TableCell>
              <TableCell align="left">{d.id}</TableCell>
              <TableCell component="th" scope="row" align='left'>{d.name}</TableCell>
              <TableCell align="left">{d.email}</TableCell>
              <TableCell align="left">{d.phone_number}</TableCell>
              <TableCell align="left">{d.role}</TableCell>
            </TableRow>

        </TableBody>
            ))}
            </>
      </Table>
    </TableContainer>
    </>
  );
}
