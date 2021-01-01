import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import AddBox from '@material-ui/icons/AddBox';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { GithubPicker } from 'react-color';

export default function ModalAdd(props) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const emptyProduct = {
        name: '',
        price: '',
        color: ''
    }
    const [product, setProduct] = useState({
        name: '',
        price: '',
        color: '#272727'
    });


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setProduct({...emptyProduct})
    };

    const handleChange = (prop) => (event) => {
        setProduct({ ...product, [prop]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSubmitModalAdd(product)
        handleClose();
    }
    const handleColorChange = (color) =>{
        setProduct({...product,['color']: color.hex});
    }
  return (
    <div>
      <Dialog fullScreen={fullScreen} maxWidth={'sm'} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className='center'>Nuevo Producto</DialogTitle>
        <form id="add_health_insurance_form" action="" onSubmit={handleSubmit} method="post">
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="add_product_input_name"
                    name="name"
                    label="Nombre"
                    type="text"
                    fullWidth 
                    required
                    value={product.name}
                    onChange={handleChange('name')}
                />
                <TextField
                    margin="dense"
                    id="add_product_input_price"
                    name="price"
                    label="Precio"
                    type="number"
                    fullWidth
                    required
                    value={product.price}
                    onChange={handleChange('price')}
                />
                  <TextField
                    margin="dense"
                    id="add_product_input_color"
                    name="color"
                    label="Color"
                    fullWidth
                    value={product.color}
                    InputProps={{
                        readOnly: true,
                      }}
                />
                <GithubPicker
                    width='33%'
                    onChangeComplete = {(color)=>handleColorChange(color)}
                    colors={['#272727','#FCCB00', '#008B02', '#1273DE', '#5300EB','#CE3DC1','#31E5CF']}
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
                    <span>Nuevo Producto</span>
                </Action>
            </Fab>
            :
            null
      }
    </div>
  );
}