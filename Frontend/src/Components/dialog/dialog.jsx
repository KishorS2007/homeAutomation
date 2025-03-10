import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Alert } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Mydialogbox(props) {
  const [open, setOpen] = React.useState(false);

React.useEffect(()=>{
  setOpen(props.warningStatus)
},[props.warningStatus]);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment
    >
    
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Your {props.name} is running for about {props.time} minutes, please consider turning it off

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{props.setonoff(false);handleClose(  )}}>Turn Off Now</Button>
          <Button onClick={handleClose}>Ignore This Time</Button>
        </DialogActions>
      </Dialog>
      {/* </Alert> */}

    </React.Fragment>
  );
}
