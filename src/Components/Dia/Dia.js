//DEPENDENCIAS
import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import { IconButton, Dialog, DialogTitle, Button, DialogActions, DialogContent, TextField } from '@material-ui/core';
import { Fab, Action } from 'react-tiny-fab';
import AddBox from '@material-ui/icons/AddBox';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import Alert from 'react-s-alert';
import ClipLoader from "react-spinners/ClipLoader";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

//CSS & SCSS
import 'react-tiny-fab/dist/styles.css';
import './Dia.scss';
import '../PedidosDia/PedidosDia.scss';
import '../Dias/Dias.scss';

//CRUDS
import CrudStock from '../../Utils/CrudStock';

// Import componentes
import DiaSkeleton from '../Layouts/Skeletons/GralSkeleton';
import DiaSkeletonResponsive from '../Layouts/Skeletons/GralSkeletonResponsive';

class Dia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delete_modal_product_open: false,
            confirm_edit_modal_product_open: false,
            edit_modal_product_open: false,
            loading: false,

            product_operation_id: null,
            product_delete_index: null,             //DATA QUE SE USA PARA ENVIAR EN LAS APIS
            product_price: null,
            product_quantity: null,

            day_id: this.props.match.params.day_id,
            products_day: {
                is_loading: true
            },
            shopping_cart: (this.props.location.state !== null) ? this.props.location.state.shopping_cart : false
        }

    }

    componentDidMount() {
        CrudStock.getDayStockProducts(this.state.day_id, this.props.user.auth_token).then((result) => {
            if (result.success) {
                this.setState({ products_day: result.result.products });
            } else {
                result.result.forEach(element => {
                    Alert.error(element.message, {
                        position: 'bottom-left',
                        effect: 'genie',
                    })
                });
            }
        })
    }







    handleChangeEdit(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleAddClick() {
        this.setState({ shopping_cart: true });
    }

    closeShoppingCart() {
        this.setState({ shopping_cart: false });
    }

    handleClose() {
        this.setState({
            delete_modal_product_open: false,
            edit_modal_product_open: false
        })
    }

    handleDeleteClick(product_delete_id, product_delete_index) {
        this.setState({
            delete_modal_product_open: true,
            product_operation_id: product_delete_id,
            product_delete_index: product_delete_index,
        })
    }

    handleEditClick(product_edit_id, product_price, product_quantity) {
        this.setState({
            edit_modal_product_open: true,
            product_price: product_price,
            product_operation_id: product_edit_id,
            product_quantity: product_quantity,
        })
    }

    handleEditProduct() {
        this.setState({ loading: true })

        let dataProducts = [{
            id: this.state.product_operation_id,
            price: this.state.product_price,
            quantity: this.state.product_quantity
        }];


        let dataProductsForThisDay = {
            day_id: this.state.day_id,
            products: dataProducts
        }

        CrudStock.addStockProductForTheDay(dataProductsForThisDay, this.props.user.auth_token).then((result) => {
            this.setState({ loading: false, edit_modal_product_open: false })

            if (result.success) {
                this.setState({ products_day: result.result.products });
                Alert.success(`Producto ${result.result.products[0].name} editado correctamente.`, {
                    position: 'bottom-left',
                    effect: 'genie',
                })
            } else {

                result.result.forEach(element => {
                    Alert.error(element.message, {
                        position: 'bottom-left',
                        effect: 'genie',
                    })
                });
            }
        }).catch((e) => {
            Alert.error(e, {
                position: 'bottom-left',
                effect: 'genie',
            })
        })

    }

    handleDeleteProduct() {
        this.setState({ loading: true })

        CrudStock.deleteStockProductForTheDay(this.state.product_operation_id, this.props.user.auth_token).then((result) => {
            this.setState({ loading: false })
            if (result.success) {
                let products = this.state.products_day;
                products.splice(this.state.product_delete_index, 1)
                this.setState({ products_day: products, delete_modal_product_open: false });
                Alert.success('El Producto fue eliminado correctamente', {
                    position: 'bottom-left',
                    effect: 'genie',
                })

            } else {
                this.setState({delete_modal_product_open: false });
                    Alert.error(result.result, {
                        position: 'bottom-left',
                        effect: 'genie',
                    })
               
            }
        }).catch((e) => {/* Do something with the error */ })
    }

    saveShoppingCart = (selectedProducts) => {

        let dataProducts = [];

        selectedProducts.map((sProduct) => {
            let data = {
                name: sProduct.name,
                price: sProduct.price,
                quantity: sProduct.quantity
            }
            dataProducts = dataProducts.concat(data)
        })

        let dataProductsForThisDay = {
            day_id: this.state.day_id,
            products: dataProducts
        }

        CrudStock.addStockProductForTheDay(dataProductsForThisDay, this.props.user.auth_token).then((result) => {

            if (result.success) {
                this.setState({ products_day: result.result.products });

                Alert.success(`Productos creados correctamente.`, {
                    position: 'bottom-left',
                    effect: 'genie',
                })
            } else {
                result.result.forEach(element => {
                    Alert.error(element.message, {
                        position: 'bottom-left',
                        effect: 'genie',
                    })
                });
            }
        }).catch((e) => {
            Alert.error(e, {
                position: 'bottom-left',
                effect: 'genie',
            })
        })

    }

    render() {


        if (this.state.shopping_cart) {
            return (
                <ShoppingCart
                    existingProducts={this.state.products_day}
                    user={this.props.user}
                    closeShoppingCart={this.closeShoppingCart.bind(this)}
                    saveShoppingCart={this.saveShoppingCart.bind(this)}

                />
            )
        }
        return (

            <div>
                {/* Modal Confirm Delete */}
                <Dialog open={this.state.delete_modal_product_open} onClose={this.handleClose}>
                    <DialogTitle id="alert-dialog-slide-title">¿Seguro que deseas eliminar este Producto?</DialogTitle>
                    {
                        !this.state.loading ?
                            <DialogActions>
                                <Button onClick={this.handleClose.bind(this)} color="primary">Cancelar</Button>
                                <Button onClick={this.handleDeleteProduct.bind(this)} color="primary">Eliminar</Button>
                            </DialogActions>
                            :
                            <ClipLoader
                                css={[
                                    { display: 'flex' },
                                    { margin: '0 auto' },
                                    { marginBottom: 25 },
                                    { borderColor: 'var(--main_color)' }
                                ]}
                                size={35}
                                loading={this.state.loading}
                            />
                    }
                </Dialog>

                {/* Modal Edit */}
                <Dialog open={this.state.edit_modal_product_open} onClose={this.handleClose.bind(this)}>
                    <DialogTitle className='center'>Editar producto por el día</DialogTitle>

                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="product_quantity_input"
                            name="product_quantity"
                            label="Cantidad"
                            type="text"
                            fullWidth
                            value={this.state.product_quantity}
                            onChange={this.handleChangeEdit.bind(this)}
                        />
                        <TextField
                            margin="dense"
                            id="product_price_input"
                            name="product_price"
                            label="Precio"
                            type="numeric"
                            fullWidth
                            value={this.state.product_price}
                            onChange={this.handleChangeEdit.bind(this)}
                        />
                    </DialogContent>

                    {
                        !this.state.loading ?
                            <DialogActions>
                                <Button onClick={this.handleClose.bind(this)} color="primary">Cancelar</Button>
                                <Button onClick={this.handleEditProduct.bind(this)} color="primary">Guardar</Button>
                            </DialogActions>
                            :
                            <ClipLoader
                                css={[
                                    { display: 'flex' },
                                    { margin: '0 auto' },
                                    { marginBottom: 25 },
                                    { borderColor: 'var(--main_color)' }
                                ]}
                                size={35}
                                loading={this.state.loading}
                            />
                    }
                </Dialog>


                {/* Vista */}
                {
                    (this.state.products_day.is_loading === true) ? 
                        (window.screen.width <= '600') ?
                            <Row md={12} sm={12} xs={12} className='center'>
                                <Col md={1} sm={1} xs={1} className="arrow_back_container">
                                    <NavLink title='Volver' to="/dashboard/pedidos" className="arrow_back_navlink">
                                        <IconButton color='inherit' className="arrow_back_container" style={{backgroundColor:'var(--main_color)'}}>
                                            <ArrowBackIcon className="arrow_back" style={{color:'#fff'}}/>
                                        </IconButton>
                                    </NavLink>
                                </Col>
                                <Col md={11} sm={11} xs={11} style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px'}}>
                                    <DiaSkeletonResponsive />
                                </Col>
                            </Row>
                        :
                            <Row md={12} sm={12} xs={12} className='center'>
                                <Col md={1} sm={1} xs={1} className="arrow_back_container">
                                    <NavLink title='Volver' to="/dashboard/pedidos" className="arrow_back_navlink">
                                        <IconButton color='inherit' className="arrow_back_container" style={{backgroundColor:'var(--main_color)'}}>
                                            <ArrowBackIcon className="arrow_back" style={{color:'#fff'}}/>
                                        </IconButton>
                                    </NavLink>
                                </Col>
                                <Col md={11} sm={11} xs={11} style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px'}}>
                                    <DiaSkeleton />
                                </Col>
                            </Row>
                    :

                <div style={{ marginBottom: 50 }}>
                    <Row md={12} sm={12} xs={12} style={{width: '100%'}} className='center'>
                        <Col md={1} sm={1} xs={1}>
                            <NavLink title='Volver' to="/dashboard/dias" className="arrow_back_navlink">
                                <IconButton color='inherit' className="arrow_back_container" style={{backgroundColor:'var(--main_color)'}}>
                                    <ArrowBackIcon className="arrow_back" style={{color:'#fff'}}/>
                                </IconButton>
                            </NavLink>
                        </Col>
                        <Col md={11} sm={11} xs={11} id="col_arrow_back_container" className='center'>
                            <p className='day_reference'>{this.props.location.state.date}</p>
                        </Col>
                    </Row>
                    <Row md={12} sm={12} xs={12} style={{width: '100%'}} className='center'>
                        {

                            (this.state.products_day.length === 0) ?
                                <Row style={{ color: 'grey', margin: 'auto', textAlign: 'center', marginTop: '50px' }}>
                                    <Col>
                                        <p className='default_text'>No se encontraron productos disponibles para este dia, asigna algunos!</p>
                                    </Col>
                                </Row>

                                :

                                this.state.products_day.map((product_day, i) => {
                                    return (
                                        <Row key={i} className="product_card_container center">
                                            <Col md={12} sm={12} xs={12} className="product_info_container">
                                                <Row md={12}>
                                                    <Col md={4} sm={4} xs={4}>
                                                        <Row md={12}>
                                                            <Col md={12}>
                                                                <p className='card_name'>Nombre: </p>
                                                            </Col>
                                                            <Col md={12} style={{ color: 'var(--main_color)' }}>
                                                                <p className='card_atr'>{product_day.name}</p>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col md={4} sm={4} xs={4}>
                                                        <Row md={12}>
                                                            <Col md={12}>
                                                                <p className='card_name'>Precio: </p>
                                                            </Col>
                                                            <Col md={12} style={{ color: 'green' }}>
                                                                <p className='card_atr'>${product_day.price}</p>
                                                            </Col>
                                                        </Row>
                                                    </Col>

                                                    <Col md={4} sm={4} xs={4}>
                                                        <Row md={12}>
                                                            <Col md={12}>
                                                                <p className='card_name'>Cantidad: </p>
                                                            </Col>
                                                            <Col md={12} style={{ color: 'var(--main_color)' }}>
                                                                <p className='card_atr'>{product_day.pivot.remaining}/{product_day.pivot.quantity}</p>
                                                            </Col>
                                                        </Row>
                                                    </Col>

                                                </Row>


                                                <Row md={12}>
                                                    <Col md={6} sm={6} xs={6}>
                                                        <IconButton color='inherit' title='Editar Producto' className="days_card_icons" onClick={() => { this.handleEditClick(product_day.id, product_day.price, product_day.pivot.quantity) }}>
                                                            <EditOutlinedIcon />
                                                        </IconButton>
                                                    </Col>

                                                    <Col md={6} sm={6} xs={6}>
                                                        <IconButton color='inherit' title='Eliminar Producto' className="days_card_icons" onClick={() => { this.handleDeleteClick(product_day.id, i) }}>
                                                            <ClearOutlinedIcon />
                                                        </IconButton>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    )
                                })
                        }

                    </Row>
                    <Row>
                        <Fab icon={<AddBox />} mainButtonStyles={{
                            backgroundColor: 'var(--main_color)',
                            position: 'relative',
                            top: 0
                        }}
                            onClick={this.handleAddClick.bind(this)}>
                            <Action style={{
                                width: 190,
                                height: 30,
                                borderRadius: 0,
                                borderBottomLeftRadius: 30,
                                borderTopLeftRadius: 30,
                                backgroundColor: 'var(--main_color)',
                                position: 'relative',
                                top: 72,
                                right: 60
                            }}
                            >
                                <span>Agregar Productos</span>
                            </Action>
                        </Fab>
                    </Row>
                </div>
            }
            </div>
        );
    }

}

export default withRouter(Dia);