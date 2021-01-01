import React, { useEffect } from 'react';
// Import Dependencias
import $ from "jquery";
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

var total_price = 0;

export default function SelectProductModal(props) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const [state, setState] = React.useState({
        observation: ''
    });

    const handleClickOpen = () => {
        $('#review_modal_pedidos .MuiPaper-root').css({'opacity' : 0})
        $('#select_productos_modal_pedidos .MuiPaper-root').css({'opacity' : 0})
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.closeModal()
    };

    const handleGoBack = () => {
        setOpen(false);
        total_price = 0;
        $('#select_productos_modal_pedidos .MuiPaper-root').css({'opacity' : 1});
    }

    const handleChangeObservation = (e) =>{
      total_price = 0;
      setState({...state, observation: e.target.value})
    }

    const handleSave = () => {
      setLoading(true);
      (props.products).forEach(product => {
        delete product.name;
        delete product.price;
      })
      let data = {
        client_id: props.client.id,
        observation: state.observation,
        day_id: parseInt(props.day_id),
        products: props.products
      }
      props.handleSubmitModalAdd(data);
      props.closeModals();
    }

  return (
      <div>
        {/* Modal Busqueda */}
        <Dialog fullScreen={fullScreen} maxWidth={'sm'} disableBackdropClick={true} disableEscapeKeyDown={true} fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" id='review_modal_pedidos'>
          <p style={{display: 'none'}}>{total_price = 0}</p>
          <DialogTitle id="form-dialog-title" className='center'>{`Pedido: ${props.date}`}</DialogTitle>
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
                        <Row className='client_search_card' md={12} sm={12} xs={12} style={{width: '100%'}}>
                          <Col md={12} sm={12} xs={12}>
                              <Col md={12} sm={12} xs={12}>
                                  <p className='name'>{`${props.client.name} ${props.client.surname}`}</p>
                              </Col>
                              <Col md={12} sm={12} xs={12}>
                                  <p>{props.client.dni}</p>
                              </Col>
                              <Col md={12} sm={12} xs={12}>
                                  <p>{props.client.address}</p>
                              </Col>
                          </Col>
                        </Row>
                        <Row md={12} sm={12} xs={12} style={{width: '100%'}}>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="observation_modal_add_order"
                            label="Observaciones"
                            type="text"
                            fullWidth
                            value={state.observation}
                            onChange={handleChangeObservation}
                          />
                        </Row>
                        <Row md={12} sm={12} xs={12} style={{width: '100%'}}>
                          <Row md={12} sm={12} xs={12} style={{width: '100%'}}>
                            <p className='title_review' style={{fontSize: '15px', fontWeight: '600', marginTop: '10px'}}>Productos</p>
                          </Row>
                          <Row md={12} sm={12} xs={12} style={{width: '100%'}} id='products_resume_container'>
                            {
                                (props.products).map(product => {
                                    return (
                                        <Row className='client_search_card' key={product.id} md={12} sm={12} xs={12} style={{width: '100%'}}>
                                            <Col md={12} sm={12} xs={12}>
                                                <Col md={12} sm={12} xs={12}>
                                                    <p className='name'>{product.name}</p>
                                                </Col>
                                                <Col md={12} sm={12} xs={12}>
                                                    <p style={{color: 'var(--main_color)'}}>{product.quantity} unidad/es</p>
                                                </Col>
                                                <Col md={12} sm={12} xs={12}>
                                                    <p className='card_atr' style={{color: 'green'}}>$ {product.price}</p>
                                                </Col>
                                            </Col>
                                        </Row>
                                    )
                                })
                            }
                          </Row>
                        </Row>
                    </DialogContent>
                    <DialogActions className='responsive_actions'>
                        <Row md={12} sm={12} xs={12} className='center' style={{width: '100%', textAlign: 'right', marginTop: '10px'}}>
                          <Col md={4} sm={4} xs={4}>
                            {
                              (open) ?
                                (props.products).forEach(product => {
                                  total_price += (product.price)*(product.quantity)
                                })
                              :
                                null
                              
                            }
                            <p className='title_review' style={{fontSize: '15px', fontWeight: '600', marginTop: '10px', marginBottom: '0px'}}>Total <p className='title_review' style={{color: 'green', display:'inline-block'}}>$ {total_price}</p></p>
                          </Col>
                          <Col md={8} sm={8} xs={8}>
                            <Button onClick={handleGoBack} color="primary">Volver</Button>
                            <Button onClick={handleSave} color="primary">Confirmar</Button>
                          </Col>
                        </Row>
                    </DialogActions>
                  </div>
                }
        </Dialog>
        {
            (open === false) ?
                <Button type='submit' disabled={props.disabled} color="primary" onClick={handleClickOpen}>Siguiente</Button>
            :
                null
        }
      </div>
  );
}