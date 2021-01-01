import React, { useEffect } from 'react';

// Import Componentes
import CrudStock from '../../../Utils/CrudStock';
import ResumeModal from './ResumeModal';

// Import Dependencias
import $ from "jquery";
import Alert from 'react-s-alert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Row, Col } from 'react-bootstrap';
import ClipLoader from "react-spinners/ClipLoader";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function SelectProductModal(props) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const [state, setState] = React.useState({
        products: [], 
        searched_products: [], 
        selected_products: []
    });

    useEffect(() => {
        setLoading(true)
        CrudStock.getDayStockProducts(props.day_id, props.auth_token).then(result => {
            if(result.success){
                setState({...state, products: result.result.products});
                setLoading(false);
            }else{
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
        $('#select_client_modal_pedidos .MuiPaper-root').css({'opacity' : 0})
        $('#select_productos_modal_pedidos .MuiPaper-root').css({'opacity' : 1})
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeSearch = (e) => {
        let value = e.target.value;
        let searched_products = [];
        state.products.map(product => {
            if(product.name.toLowerCase().includes(value.toLowerCase())){
                searched_products.push(product);
            }
            return true;
        })
        if(searched_products.length > 0){
            setState({...state, searched_products: searched_products});
        }else{
            setState({...state, searched_products: 'No se encontro el producto ingresado!'});
        }
    }

    const handleAddQuantity = (product_id, stock_id, product_remainig, product_name, product_price) =>{
        if(state.selected_products.length > 0 && state.selected_products.find(product => {return product.product_id === product_id})){
            let editable_product = state.selected_products.find(product => {return product.product_id === product_id});
            let selected_products = state.selected_products;
            let removeProduct = selected_products.map(product => {
                return product.product_id
            }).indexOf(product_id);
            selected_products.splice(removeProduct, 1);
            let new_product = {}
            if(editable_product.quantity === product_remainig){
                new_product = {
                    name: product_name,
                    price: product_price,
                    product_id: product_id,
                    quantity: product_remainig,
                    stock_id: stock_id
                }
            }else{
                new_product = {
                    name: product_name,
                    price: product_price,
                    product_id: product_id,
                    quantity: editable_product.quantity + 1,
                    stock_id: stock_id
                }
            }
            selected_products.push(new_product);
            setState({...state, selected_products: selected_products});
        }else{
            let editable_product = state.products.find(product => {return product.id === product_id});
            if(!(editable_product.pivot.remaining === 0)){
                let selected_products = state.selected_products;
                selected_products.push({
                    name: product_name,
                    price: product_price,
                    product_id: product_id,
                    quantity: 1,
                    stock_id: stock_id
                })
                setState({...state, selected_products: selected_products});
            }
        }
    }

    const handleSubstatractQuantity = (product_id, stock_id) =>{
        if(state.selected_products.length > 0 && state.selected_products.find(product => {return product.product_id === product_id})){
            let editable_product = state.selected_products.find(product => {return product.product_id === product_id});
            let selected_products = state.selected_products;
            let removeProduct = selected_products.map(product => {
                return product.product_id
            }).indexOf(product_id);
            selected_products.splice(removeProduct, 1);
            let new_product = {};
            if(editable_product.quantity === 1){
                new_product = {
                    name: editable_product.name,
                    price: editable_product.price,
                    product_id: product_id,
                    quantity: 0,
                    stock_id: stock_id
                }
            }else{
                new_product = {
                    name: editable_product.name,
                    price: editable_product.price,
                    product_id: product_id,
                    quantity: editable_product.quantity - 1,
                    stock_id: stock_id
                }
                selected_products.push(new_product);
            }
            setState({...state, selected_products: selected_products});
        }
    }

    const handleGoBack = () => {
        setOpen(false)
        $('#select_client_modal_pedidos .MuiPaper-root').css({'opacity' : 1})
    }

    return (
        <div>
            {/* Modal Busqueda */}
            <Dialog fullScreen={fullScreen} maxWidth={'sm'} disableBackdropClick={true} disableEscapeKeyDown={true} fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" id='select_productos_modal_pedidos'>
                <DialogTitle id="form-dialog-title" className='center'>Seleccioná las cantidades</DialogTitle>
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
                                        id="product_modal_add_order"
                                        name="product_search"
                                        label="Ingresá el nombre del producto"
                                        type="numeric"
                                        fullWidth
                                        onChange={handleChangeSearch}
                                    />
                                </Row>
                                {
                                    (state.searched_products.length > 0 && typeof state.searched_products === 'object') ?
                                        <Row md={12} sm={12} xs={12} className='select_products_container'>
                                            {
                                                (state.searched_products).map(product => {
                                                    return (
                                                        <Row className='client_search_card' key={product.id} md={12} sm={12} xs={12} style={(state.selected_products.length > 0 && state.selected_products.find(selected_product => {return selected_product.product_id === product.id}) && state.selected_products.find(selected_product => {return selected_product.product_id === product.id}).quantity > 0) ? {width: '100%', border: '1px solid var(--main_color)'} : {width: '100%'}}>
                                                            <Col md={8} sm={8} xs={6}>
                                                                <Col md={12} sm={12} xs={12}>
                                                                    <p className='name'>{product.name}</p>
                                                                </Col>
                                                                <Col md={12} sm={12} xs={12}>
                                                                    <p style={{color: 'var(--main_color)'}}>{product.pivot.remaining}/{product.pivot.quantity} unidades</p>
                                                                </Col>
                                                                <Col md={12} sm={12} xs={12}>
                                                                    <p className='card_atr' style={{color: 'green'}}>$ {product.price}</p>
                                                                </Col>
                                                            </Col>
                                                            <Col md={4} sm={4} xs={6} style={{position: 'relative', top: '15%', right:'0px', padding:'0px'}}>
                                                                {
                                                                    (product.pivot.remaining === 0) ?
                                                                        <p className='card_atr' style={{color: 'var(--main_color)', fontWeight: '600', textAlign: 'left', position: 'relative', left: '40px'}}>AGOTADO</p>
                                                                    :
                                                                    <div>
                                                                        <Fab onClick={handleSubstatractQuantity.bind(this, product.id, product.pivot.id)} size="small" color="secondary" aria-label="remove" style={{backgroundColor:'var(--main_color)', width: '35px', height:'25px'}}>
                                                                            <RemoveIcon style={{width: '15px'}}/>
                                                                        </Fab>
                                                                        {
                                                                            (state.selected_products.find(selected_product => {return selected_product.product_id === product.id})) ? 
                                                                                <input
                                                                                    className='inputs_quantities'
                                                                                    type="numeric"
                                                                                    value={state.selected_products.find(selected_product => {return selected_product.product_id === product.id}).quantity}
                                                                                    readOnly={true}
                                                                                />
                                                                            :
                                                                                <input
                                                                                    className='inputs_quantities'
                                                                                    type="numeric"
                                                                                    value={0}
                                                                                    readOnly={true}
                                                                                />
                                                                        }
                                                                        <Fab onClick={handleAddQuantity.bind(this, product.id, product.pivot.id, product.pivot.remaining, product.name, product.price)} size="small" color="secondary" aria-label="add" style={{backgroundColor:'var(--main_color)', width: '35px', height:'25px'}}>
                                                                            <AddIcon style={{width: '15px'}}/>
                                                                        </Fab>
                                                                    </div>
                                                                }
                                                            </Col>
                                                        </Row>
                                                    )
                                                })
                                            }
                                        </Row>
                                    : (state.searched_products.length > 0 && typeof state.searched_products === 'string') ?
                                        <Row md={12} style={{margin:'auto',textAlign:'center', marginTop:'30px'}}>
                                            <Col md={12}>
                                                <p className='default_text' style={{color: '#000'}}>{state.searched_products}</p>
                                            </Col>
                                        </Row>
                                    : 
                                        (state.products.length > 0) ?
                                            <Row md={12} sm={12} xs={12} className='select_products_container'>
                                                {
                                                    (state.products).map(product => {
                                                        return (
                                                            <Row className='client_search_card' key={product.id} md={12} sm={12} xs={12} style={(state.selected_products.length > 0 && state.selected_products.find(selected_product => {return selected_product.product_id === product.id}) && state.selected_products.find(selected_product => {return selected_product.product_id === product.id}).quantity > 0) ? {width: '100%', border: '1px solid var(--main_color)'} : {width: '100%'}}>
                                                                <Col md={8} sm={8} xs={6} style={{padding:'0px'}}>
                                                                    <Col md={12} sm={12} xs={12}>
                                                                        <p className='name'>{product.name}</p>
                                                                    </Col>
                                                                    <Col md={12} sm={12} xs={12}>
                                                                        <p style={{color: 'var(--main_color)'}}>{product.pivot.remaining}/{product.pivot.quantity} unidades</p>
                                                                    </Col>
                                                                    <Col md={12} sm={12} xs={12}>
                                                                        <p className='card_atr' style={{color: 'green'}}>$ {product.price}</p>
                                                                    </Col>
                                                                </Col>
                                                                <Col md={4} sm={4} xs={6} style={{position: 'relative', top: '15%', right:'0px', padding:'0px'}}>
                                                                {
                                                                    (product.pivot.remaining === 0) ?
                                                                        <p className='card_atr' style={{color: 'var(--main_color)', fontWeight: '600', textAlign: 'left', position: 'relative', left: '40px'}}>AGOTADO</p>
                                                                    :
                                                                    <div>
                                                                        <Fab onClick={handleSubstatractQuantity.bind(this, product.id, product.pivot.id)} size="small" color="secondary" aria-label="remove" style={{backgroundColor:'var(--main_color)', width: '35px', height:'25px'}}>
                                                                            <RemoveIcon style={{width: '15px'}}/>
                                                                        </Fab>
                                                                        {
                                                                            (state.selected_products.find(selected_product => {return selected_product.product_id === product.id})) ? 
                                                                                <input
                                                                                    className='inputs_quantities'
                                                                                    type="numeric"
                                                                                    value={state.selected_products.find(selected_product => {return selected_product.product_id === product.id}).quantity}
                                                                                    readOnly={true}
                                                                                />
                                                                            :
                                                                                <input
                                                                                    className='inputs_quantities'
                                                                                    type="numeric"
                                                                                    value={0}
                                                                                    readOnly={true}
                                                                                />
                                                                        }
                                                                        <Fab onClick={handleAddQuantity.bind(this, product.id, product.pivot.id, product.pivot.remaining, product.name, product.price)} size="small" color="secondary" aria-label="add" style={{backgroundColor:'var(--main_color)', width: '35px', height:'25px'}}>
                                                                            <AddIcon style={{width: '15px'}}/>
                                                                        </Fab>
                                                                    </div>
                                                                }
                                                                </Col>
                                                            </Row>
                                                        )
                                                    })
                                                }
                                            </Row>
                                    : 
                                        <Row md={12} style={{margin:'auto',textAlign:'center', marginTop:'30px'}}>
                                            <Col md={12}>
                                                <p className='default_text' style={{color: '#000'}}>No existen producto asignados para este día todavía!</p>
                                            </Col>
                                        </Row>
                                }
                            </DialogContent>
                            <DialogActions className='responsive_actions'>
                                <Button onClick={handleGoBack} color="primary">Volver</Button>
                                {
                                    (state.selected_products.length > 0) ?
                                        <ResumeModal products={state.selected_products} client={props.client} date={props.date} disabled={false} handleSubmitModalAdd={props.handleSubmitModalAdd} auth_token={props.auth_token} day_id={props.day_id} closeModals={props.closeModals}/>
                                    :
                                        <ResumeModal products={state.selected_products} client={props.client} date={props.date} disabled={true} handleSubmitModalAdd={props.handleSubmitModalAdd} auth_token={props.auth_token} day_id={props.day_id} closeModals={props.closeModals}/>
                                }
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