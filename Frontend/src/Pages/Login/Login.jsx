import { Typography, TextField, Button } from '@mui/material';
import styles from './Login.module.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Login(){
    const navigate = useNavigate();
    const [Username,SetUsername] = useState("");
    const [Password,SetPassword] = useState("");
    const [Login,SetLogin] = useState(true);
    
    const [Name,SetName] = useState("");
    const [SignupUserName,SetSignupUserName] = useState("");
    const [SignupPassword,SetSignupPassword] = useState("");
    const [PhoneNumber,SetPhoneNumber] = useState("");
    // const role = 'user';


// login
const HandleSubmit = async(e)=>{
  try{
      e.preventDefault();
      const res = await fetch(`http://localhost:8000/check-user`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          email: Username,
          password: Password
        })
       
      });
      if(!res.ok){
          throw new Error("http error");
      }
      const data = await res.json();

      SetUsername(""); 
      if(data.password){
        navigate('/user');
        localStorage.setItem('name',data.password[0].name);
        localStorage.setItem('id',data.password[0].id);
        localStorage.setItem('role',data.password[0].role);
      }
      // console.log(data)
      // console.log('name',data.password[0].name,'id',data.password[0].id,'role',data.password[0].role);
      SetPassword("");
      if(data.password[0].role == 'admin'){
        navigate('/admin');
      }
      else{
        navigate('/user');
      }
    }
  catch(e){
      console.log(e.message);
  }
}

    const SignupHandleSubmit = async(e)=>{  
      try{
      e.preventDefault()
      const res = await fetch('http://localhost:8000/signup',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          name: Name,
          email: SignupUserName,
          password_hash: SignupPassword,
          phone_number: PhoneNumber,
          role:role
        }),
      });

          if(!res.ok){
              throw new Error("http error");
          }
        localStorage.setItem('name',Name);
        // localStorage.removeItem('id');
          const data = await res.json()
          // FetchData();
          SetSignupUserName("");
          SetSignupPassword("");
          SetPhoneNumber("");
          SetName("")
          // localStorage.setItem('id',data.password[0].id);

         
        
            navigate('/user');
          
      }
      catch(e){
          console.log(e);
      }
  }


return(<>

{/* Login */}

{   Login &&
<div className={`${styles.loginbody} ${styles.Loginanimation}`}>
<div className={styles.welcome}>
    <div className={styles.welcomeinnerbody}>
        <Typography variant='h4' color="white">
            Welcome to login
        </Typography>
        <p>don't have account?</p>
        <Button variant='outlined' onClick={()=>SetLogin(!Login)}>Sign Up</Button>
</div>
    </div>

    <div className={styles.signin}>
        <div className={`${styles.innerbody}`}>

    <form onSubmit={HandleSubmit}>
        <Typography variant='h5'>Sign In</Typography>

        <p>UserName</p>
        
        <TextField
          id="username"
          label="Enter Email"
          value={Username}
          onChange={(e)=>SetUsername(e.target.value)}
          variant='filled'
          fullWidth
          type='email'
          required 
          autoComplete='email'
          />

        <p>Password</p>
        <TextField
          id="password"
          label="Enter Password"
          value={Password}
          onChange={(e)=>SetPassword(e.target.value)}
          variant='filled'
          fullWidth
          type='password'
          required
          autoComplete='new-password'
          />

        <Button fullWidth  type='submit'>Sign in</Button>
          </form>
        </div>
    </div>
   

</div>

}

{/* SignUp */}

{
    !Login &&

        <div className={`${styles.loginbody} ${styles.signupanimation}`}>
        <div className= {`${styles.welcome} ${styles.top}`}>
            <div className={styles.welcomeinnerbody} >

                <Typography variant='h4' color="white">
                    Welcome to Signup
                </Typography>
                <p> have account?</p>
                <Button variant='outlined' onClick={()=>SetLogin(!Login)}>Log in</Button>
        </div>
            </div>
        
            <div className={`${styles.signin} ${styles.signup}`}>
            <div className={`${styles.second} ${styles.innerbody}`}>
        
            <div className={styles.upperspace}></div>
            <form onSubmit={SignupHandleSubmit}>
                <Typography variant='h5'>Sign Up</Typography>
        
                <p>Name</p>
                
                <TextField
                  id="name"
                  label="Enter Name"
                  value={Name}
                  onChange={(e)=>{SetName(e.target.value)}}
                  variant='filled'
                  fullWidth
                  type='text'
                  required 
                  autoComplete='name'
                  />
                <p>UserName</p>
                
                <TextField
                  id="usernamesignin"
                  label="Enter Email"
                  value={SignupUserName}
                  onChange={(e)=>SetSignupUserName(e.target.value)}
                  variant='filled'
                  fullWidth
                  type='email'
                  required 
                  autoComplete='email'
                  />
        
                <p>Password</p>
                <TextField
                  id="passwordsignin"
                  label="Enter Password"
                  value={SignupPassword}
                  onChange={(e)=>SetSignupPassword(e.target.value)}
                  variant='filled'
                  fullWidth
                  type='password'
                  required
                  autoComplete='new-password'
                  />

                <p>Phone Number</p>
                <TextField
                  id="phonenumber"
                  label="Enter Phone Number"
                  value={PhoneNumber}
                  onChange={(e)=>SetPhoneNumber(e.target.value)}
                  variant='filled'
                  fullWidth
                  type='text'
                  required
                  autoComplete='tel'
                  />
                <Button fullWidth  type='submit' className='signupbutton'>Sign Up</Button>
                <div className={styles.underspace}></div>
                  </form>
                </div>
            </div>
           
        
        </div>
}
</>)}

export default Login;