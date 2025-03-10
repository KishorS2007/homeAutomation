import styles from './navbar.module.css'
// import home from '.../assets/home.png'
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" 
    // sx={{  background: `linear-gradient(120deg,
    //   rgb(255, 0, 76) 0%,
    //    rgb(255, 15, 87) 20%, 
    //    rgb(255, 38, 103) 40%, 
    //    rgb(255, 63, 121) 60%, 
    //    rgb(255, 16, 87) 75%, 
    //    rgb(255, 16, 87) 80%, 
    //    rgb(255, 0, 76) 100%)`}}
       sx={{bgcolor:"black"}}
       >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <div className={`${styles.maindiv}`}>

        {/* logo */}

            <div className={styles.items}>

            {/* <i className='fas fa-laptop-house'></i> */}
            {/* <img src="/assets/home.png" alt="Home Icon" /> */}
    <AddHomeWorkIcon sx={{marginRight:"15px",scale:1.2}}/>
            {/* <img src="Frontend\src\assets\home-automation.png" alt="img" /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            // href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display:  'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            >
            AuraHome
          </Typography>

              </div>
              <div className={styles.item2}>


{/* profile */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>


            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>Logout
                    <IconButton disableRipple onClick={()=>{navigate('/');localStorage.removeItem('id');localStorage.removeItem('role')}} > <LogoutIcon  ></LogoutIcon> </IconButton>
                  </Typography>
                </MenuItem>

            </Menu>
          </Box>
          </div>

          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
