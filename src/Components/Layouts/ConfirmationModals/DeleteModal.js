import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ClipLoader from "react-spinners/ClipLoader";
import './DeleteModal.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});


const AlertDialogSlide = ({deleteFunction,userId,index,clientColor}) => {

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () =>{

    setLoading(true);

    setTimeout(() => 
    {
           deleteFunction(userId,index);
           setLoading(false);
           setOpen(false);
         
    }, 1000)
      
    
  }
   
  return (
    <div>
         <IconButton 
            aria-label="delete"
            onClick={handleClickOpen}
        >
        <DeleteIcon color='action'/>
        </IconButton>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-slide-title">{"¿Seguro que deseas eliminar este usuario?"}</DialogTitle>
        {!loading?
        <DialogActions>
          <Button onClick={handleClose}>
            No
          </Button>
          <Button onClick={handleDelete}>
            Si
          </Button>
        </DialogActions>:
        
          <ClipLoader
            css={[
                {display:'flex'},
                {margin: '0 auto'},
                {marginBottom: 25},
                {borderColor: clientColor}
              ]}
            size={35}
            loading={loading}
          />
       
        }
      </Dialog>
    </div>
  );
}

export default AlertDialogSlide;