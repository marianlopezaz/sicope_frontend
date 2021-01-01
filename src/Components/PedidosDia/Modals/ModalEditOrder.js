import React from 'react';
// Import Dependencias
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Row, Col } from 'react-bootstrap';
import ClipLoader from "react-spinners/ClipLoader";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';


export default function SelectProductModal(props) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const [state, setState] = React.useState({
        observation: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setLoading(true);
    };

    const handleChangeObservation = (e) =>{
      setState({...state, observation: e.target.value});
    }

    const handleEdit = (order_id) => {
      setLoading(true);
      props.handleEdit({id: order_id, observation: state.observation});
      handleClose();
    }

  return (
      <div>
        {/* Modal Busqueda */}
        <Dialog fullScreen={fullScreen} maxWidth={'sm'} fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title" className='center'>Editar Pedido</DialogTitle>
            {
                loading ?
                    <ClipLoader
                        css={[
                            {display:'flex'},
                            {margin: '0 auto'},
                            {marginBottom: 25},
                            {borderColor: 'var(--main_color)'}
                        ]}
                        size={30}
                        loading={loading}
                    />
                :
                  <div>
                    <DialogContent>
                        <Row md={12} sm={12} xs={12} style={{width: '100%'}}>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="observation_modal_add_order"
                            label="Observaciones"
                            type="text"
                            fullWidth
                            required
                            value={state.observation}
                            onChange={handleChangeObservation}
                          />
                        </Row>
                    </DialogContent>
                    <DialogActions className='responsive_actions'>
                        <Button onClick={handleClose} color="primary">Cancelar</Button>
                        <Button onClick={handleEdit.bind(this, props.order_id)} color="primary">Guardar</Button>
                    </DialogActions>
                  </div>
                }
        </Dialog>
        <Button title='Editar observación del pedido' type='submit' color="primary" onClick={handleClickOpen}>Editar</Button>
    </div>
  );
}