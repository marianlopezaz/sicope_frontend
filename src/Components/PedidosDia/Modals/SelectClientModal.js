import React, { useEffect } from 'react';

// Import Componentes
import CrudClientes from '../../../Utils/CrudClients';
import ModalAddCliente from '../Modals/ModalAddCliente';
import SelectProductModal from '../Modals/SelectProductModal';

// Import Dependencias
import Alert from 'react-s-alert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import AddBox from '@material-ui/icons/AddBox';
import { Row, Col } from 'react-bootstrap';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import ClipLoader from "react-spinners/ClipLoader";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import $ from "jquery";

const CustomRadio = withStyles({
    root: {
      color: 'var(--main_color)',
      '&$checked': {
        color: 'var(--main_color)',
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

export default function SelectClientModal(props) {
    const [open, setOpen] = React.useState(false);
    const [openDayClosed, setOpenDayClosed] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const [state, setState] = React.useState({
        clients: [], 
        searched_clients: [], 
        selected_client: 0
    });

    useEffect(() => {
        setLoading(true);
        CrudClientes.get(props.auth_token).then(result => {
            if (result.success) {
                setState({...state, clients: result.result});
                setLoading(false);
            } else {
                result.result.forEach(element => {
                    Alert.error(element.message, {
                    position: 'bottom-left',
                    effect: 'genie', 
                    })
                });
            }
        })
    }, []);

    const handleClickOpen = () => {
        if(props.day_closed === 0){
            $('#select_productos_modal_pedidos .MuiPaper-root').css({'opacity' : 0})
            setOpen(true);
        }else{
            setOpenDayClosed(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setState({...state, searched_clients: [], selected_client: 0});
    };

    const handleCloseDayClosed = () => {
        setOpenDayClosed(false);
    };

    const handleChangeSearch = (e) => {
        let value = e.target.value;
        let searched_clients = [];
        state.clients.map(client => {
            if((client.dni).toString().includes(value.toString())){
                searched_clients.push(client);
            }
            return true;
        })
        if(value === ''){
            searched_clients = [];
        }
        if(searched_clients.length > 0){
            setState({...state, searched_clients: searched_clients});
        }else{
            setState({...state, searched_clients: 'No se encontro el cliente ingresado, agregalo!'});
        }
    }

    const handleChangeSelect = (client_id) =>{
        setState({...state, selected_client: client_id});
    }

    const handleSubmitModalAdd = (client) => {
        CrudClientes.add(client, props.auth_token).then(result => {
            if(result.success){
                let clients = state.clients;
                clients.push(result.result)
                $('#dni_modal_add_order').val('');
                setState({...state, clients: clients, selected_client: result.result.id, searched_clients: [result.result]});
            }else{
                setState({...state, searched_clients: 'Hubo un error, intentalo nuevamente!'});
                result.result.forEach(element => {
                    Alert.error(element.message, {
                    position: 'bottom-left',
                    effect: 'genie', 
                    })
                });
            }
        })
    }

  return (
    <div>
        {/* Modal dia cerrado */}
        <Dialog maxWidth={'xs'} fullWidth={true} open={openDayClosed} onClose={handleCloseDayClosed}>
            <DialogTitle id="alert-dialog-slide-title">Este día se encuentra cerrado. No se pueden agregar mas pedidos!</DialogTitle>
            <DialogActions>
                <Button onClick={handleCloseDayClosed} color="primary">Aceptar</Button>
            </DialogActions>
        </Dialog>
        {/* Modal select de clientes */}
        <Dialog fullScreen={fullScreen} maxWidth={'sm'} scroll={'paper'} disableBackdropClick={true} disableEscapeKeyDown={true} fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" id='select_client_modal_pedidos'>
            <DialogTitle id="form-dialog-title" className='center'>Seleccioná un cliente</DialogTitle>
            <p className='center default_text'>Pedido: {props.date}</p>
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
                                <Row md={12} sm={12} xs={12}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="dni_modal_add_order"
                                        name="dni_search"
                                        label="Ingresá el DNI"
                                        type="numeric"
                                        fullWidth
                                        onChange={handleChangeSearch}
                                    />
                                </Row>
                                {
                                    (state.searched_clients.length > 0 && typeof state.searched_clients === 'object') ?
                                        <Row md={12} sm={12} xs={12} id='clients_modal_container'>
                                            {
                                                (state.searched_clients).map(client => {
                                                    return (
                                                        <Row className='client_search_card' onClick={handleChangeSelect.bind(this, client.id)} key={client.id} md={12} sm={12} xs={12} style={{width: '100%'}}>
                                                            <Col md={10} sm={10} xs={10}>
                                                                <Col md={12} sm={12} xs={12}>
                                                                    <p className='name'>{`${client.name} ${client.surname}`}</p>
                                                                </Col>
                                                                <Col md={12} sm={12} xs={12}>
                                                                    <p>{client.dni}</p>
                                                                </Col>
                                                                <Col md={12} sm={12} xs={12}>
                                                                    <p>{client.address}</p>
                                                                </Col>
                                                            </Col>
                                                            <Col md={2} sm={2} xs={2}>
                                                                <CustomRadio 
                                                                    className='checkbox'
                                                                    checked={state.selected_client === client.id}
                                                                    value={client.id}
                                                                    onChange={handleChangeSelect.bind(this, client.id)}
                                                                    inputProps={{ 'aria-label': client.id }}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    )
                                                })
                                            }
                                        </Row>
                                    : (state.searched_clients.length > 0 && typeof state.searched_clients === 'string') ?
                                        <Row md={12} style={{margin:'auto',textAlign:'center', marginTop:'30px'}}>
                                            <Col md={12}>
                                                <p className='default_text' style={{color: '#000'}}>{state.searched_clients}</p>
                                                <ModalAddCliente handleSubmitModalAdd={handleSubmitModalAdd} />
                                            </Col>
                                        </Row>
                                    : 
                                        null
                                }
                        </DialogContent>
                        <DialogActions className='responsive_actions'>
                            <Button onClick={handleClose} color="primary">Cancelar</Button>
                            {
                                (state.selected_client === 0) ?
                                    <SelectProductModal client={state.clients.find(client => {return client.id === state.selected_client})} date={props.date} disabled={true} handleSubmitModalAdd={props.handleSubmitModalAdd} auth_token={props.auth_token} day_id={props.day_id} closeModals={handleClose}/>
                                :
                                    <SelectProductModal client={state.clients.find(client => {return client.id === state.selected_client})} date={props.date} disabled={false} handleSubmitModalAdd={props.handleSubmitModalAdd}  auth_token={props.auth_token} day_id={props.day_id} closeModals={handleClose}/>
                            }
                        </DialogActions>
                    </div>
            }
        </Dialog>
        <Button id='add_order_button' onClick={handleClickOpen} color="primary">Nuevo Pedido</Button>
    </div>
  );
}