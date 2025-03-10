
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json())
const port = process.env.port || 8000;
const bcrypt = require('bcrypt'); 
const mysql = require('mysql2');
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Kishor@2007",
    database:"home_automation",
});

app.get('/',(req,res)=>{
   return res.status(200).json({"port successfuly running:":"hi"})
})

app.get('/:id',(req,res)=>{
    const {id} = req.params
    // console.log("id:",id);
    const sql = `SELECT * from devices where home_id = ?`; 

    db.query(sql,[id],(err,result)=>{  
        if(err){
           return res.status(500).json({err:"failed to Fetch Data"});
        }

       return res.status(200).json({data:result}); 
    })
})

//login
app.post('/check-user',(req,res)=>{
    const {email,password} = req.body
    const sql = `SELECT password_hash,id,name,role FROM user where email = ? `;

    db.query(sql,[email],async (err,result)=>{
        if(err){
        return res.status(500).json({Error:"Get Request Failed"});  
        }
        if (result.length === 0) {
            return res.status(404).json({ Error: "User not found" });
        }
        const hashedPassword = result[0].password_hash;
        const isMatch = await bcrypt.compare(req.body.password, hashedPassword); 
            console.log("post Request Successful");
        if(isMatch){
            console.log("matched")
           return res.status(200).json({password:result});
        }
        else{
            console.log("not matched")
        }
    })
})



// Signup
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password_hash, phone_number,role } = req.body;
        console.log("receving data",req.body)
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password_hash, saltRounds);
        const sql = `INSERT INTO user (name, email, password_hash,phone_number,role) VALUES (?, ?, ?, ?,?)`;

        db.query(sql, [name, email, hashedPassword, phone_number,role ], (err, result) => {
            if (err) {
                console.error(err);
                return  res.status(500).json({ Error: "Failed to save data to DB" });
            }

           return res.status(201).json({ Message: "User registered successfully!" });
            // console.log(result);
        });

    } catch (error) {
        console.error(error);
       return res.status(500).json({ Error: "Server Error" });
    }
});

// add new device
app.post('/device',(req,res)=>{
    const currentTime = new Date().toISOString().slice(0, 19).replace("T", " ");
    const { device_name,device_type,home_id,status,temperature} = req.body                   
    const sql = `INSERT INTO devices (device_name,device_type,home_id,status,temperature,last_active,last_boot_time)
                 VALUES (?,?,?,?,?,?,?)`                           
    db.query(sql,[device_name,device_type,home_id,status,temperature,null,currentTime],(err,result)=>{
        if(err){
           return res.status(500).json({Error:"Failed to Send data to db"});
            // console.log(err);
            
        }
       return res.status(200).json({Message:"Posting Successful"});
        // console.log(result);
    })

})

app.put('/update/:id',(req,res)=>{
    const deviceid = req.params.id;
    // console.log("req.params.id:",req.params.id);
    const {status,last_active,last_boot_time,temperature} = req.body;
    // console.log(status,last_active,last_boot_time,temperature);
    const query = `UPDATE devices 
      SET status = ?, last_active = ?, last_boot_time = ?, temperature = ?
      WHERE id = ?`
      db.query(query,[status,last_active,last_boot_time,temperature,deviceid],(err,result)=>{
        if(err){
            return  res.status(500).json({error:"unable to put data"})
        }
        return res.status(200).json({msg:result});
      })
})
app.get('/update/admin',async (req,res)=>{
    const sql = `SELECT * FROM user`
    console.log("hi")
    db.query(sql,(err,result)=>{
        if(err){
            // console.log(err);
            return res.status(500).json({error:"internal server error"});
            }
            console.log("Query Result:", result); // Debugging Log
            if(!result){
                // console.log("no data")
                return res.status(404).json({ error: "No data found" });
                }
                // console.log(result)
                return  res.status(200).json({d:result})
                })
   
               
})
app.listen(port,()=>{
    console.log(`port running at localhost:${port}`)
})