import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import AddBox from '@material-ui/icons/AddBox';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function ModalAdd(props) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const emptyUser = {
        name: '',
        role: 'user',
        user_name: '',
        password: '',
        showPassword: false,
    }
    const [user, setUser] = React.useState({
        name: '',
        role: 'user',
        user_name: '',
        password: '',
        showPassword: false,
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUser({...emptyUser})
    };

    const handleClickShowPassword = () => {
        setUser({ ...user, showPassword: !user.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (prop) => (event) => {
        setUser({ ...user, [prop]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSubmitModalAdd(user)
        handleClose();
    }

  return (
    <div>
      <Dialog fullScreen={fullScreen} maxWidth={'sm'} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className='center'>Nuevo Usuario</DialogTitle>
        <form id="add_user_form" action="" onSubmit={handleSubmit} method="post">
            <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name_modal_add_users"
                        name="name"
                        label="Nombre"
                        type="text"
                        fullWidth
                        value={user.name}
                        required
                        onChange={handleChange('name')}
                    />
                    <TextField
                        margin="dense"
                        id="username_modal_add_users"
                        name="user_name"
                        label="Nombre de Usuario"
                        type="text"
                        fullWidth
                        value={user.user_name}
                        required
                        onChange={handleChange('user_name')}
                    />
                    <InputLabel id='password_modal_add_users-label' htmlFor="password">Contraseña</InputLabel>
                    <Input
                        id="password_modal_add_users"
                        type={user.showPassword ? 'text' : 'password'}
                        value={user.password}
                        onChange={handleChange('password')}
                        name='password'
                        fullWidth
                        required
                        margin='dense'
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                >
                                {user.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
            </DialogContent>
            <DialogActions className='responsive_actions'>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button type='submit' color="primary">
                    Guardar
                </Button>
            </DialogActions>
        </form>
      </Dialog>
      {
        (!open) ? 
            <Fab icon={<AddBox />} mainButtonStyles={{
                                                backgroundColor:'var(--main_color)', 
                                                position:'relative',
                                                top:0}} 
                                                onClick={handleClickOpen}>
                    <Action style={{
                                    width:130, 
                                    height:30,
                                    borderRadius:0,
                                    borderBottomLeftRadius: 30, 
                                    borderTopLeftRadius:30,
                                    backgroundColor: 'var(--main_color)',
                                    position:'relative',
                                    top:72,
                                    right:60       
                                    }}
                        >
                        <span>Nuevo Usuario</span>
                    </Action>
                </Fab>
            :
                null
        }
    </div>
  );
}