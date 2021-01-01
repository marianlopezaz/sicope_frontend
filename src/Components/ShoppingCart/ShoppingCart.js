import React, { useEffect, useState } from 'react';
import CrudProductos from '../../Utils/CrudProductos';
import { Row, Col } from 'react-bootstrap';
import Alert from 'react-s-alert';
import { Button, Dialog, DialogTitle, DialogActions, TextField, DialogContent } from '@material-ui/core';

import '../Usuarios/Usuarios.scss';
import './ShoppingCart.scss';
import ProductSearched from '../SearchRender/ProductSearched';
import { NavLink } from 'react-router-dom';
var _ = require('lodash');

const ShoppingCart = (props) => {

    const [searchTerms, setSearchTerms] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [products, setProducts] = useState([]);


    useEffect(() => {
        CrudProductos.getAll(props.user.auth_token).then(result => {

            if (result.success) {

                let allProducts = result.result;
                let existingProducts = props.existingProducts;
                let showProducts = allProducts;
                let existingProductsNames = [];

                if(existingProducts.length > 0){
                    existingProducts.map((existingProduct) => {
                        existingProductsNames.push(existingProduct.name);
                    })
                }

                if(existingProducts.length > 0){
                    existingProductsNames.map((name, ind) => {
                        allProducts.map((product, i) => {
                            if (product.name === name) {
                                showProducts.splice(i, 1)
                            }
                        })
                    })
                }

                setProducts(showProducts);
                setSearchResults(showProducts);

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

    const handleChangeSearch = (e) => {
        let value = e.target.value;
        setSearchTerms(value);
    }

    useEffect(() => {
        const results = products.filter(product =>
            ((product.name).toLowerCase()).includes(searchTerms.toLowerCase())
        );
        setSearchResults(results);
    }, [searchTerms])

    const handleSelectedProducts = (product, quantity) => {
        let modified = false;

        product['quantity'] = quantity;

        if (selectedProducts.length > 0) {
            selectedProducts.map((sProduct, index) => {
                if (sProduct.id === product.id) {
                    let newSelectedProducts = [...selectedProducts]
                    newSelectedProducts[index] = product
                    setSelectedProducts(newSelectedProducts);
                    modified = true;
                }
            })
        }

        if (!modified) {
            let newProduct = product;
            newProduct = selectedProducts.concat(newProduct);
            setSelectedProducts(newProduct)
        }



    }

    const [cancel_modal_open, set_cancel_modal_open] = useState(false);
    const [accept_modal_open, set_accept_modal_open] = useState(false);
    const [warning_modal_open, set_warning_modal_open] = useState(false);

    const handleAcceptModal = (value) => {
        if (selectedProducts.length === 0 && value) {
            set_warning_modal_open(true)
        } else {
            set_accept_modal_open(value)
        }

    }
    const handleCancelModal = (value) => {
        set_cancel_modal_open(value);
    }


    const handleSaveShoppingCart = () => {
        setSelectedProducts([]);
        handleAcceptModal(false)
        props.saveShoppingCart(selectedProducts)
        props.closeShoppingCart();
    }

    return (
        <div>
            {/* CANCEL MODAL */}
            <Dialog open={cancel_modal_open}>
                <DialogTitle id="alert-dialog-slide-title">¡Alerta, se perderán los cambios realiados!. ¿Continuar?</DialogTitle>

                <DialogActions>
                    <Button color="primary" onClick={() => handleCancelModal(false)}>Cancelar</Button>
                    <Button color="primary" onClick={() => props.closeShoppingCart()}>Continuar</Button>
                </DialogActions>

            </Dialog>

            {/* WARNING MODAL */}
            <Dialog open={warning_modal_open}>
                <DialogTitle id="alert-dialog-slide-title">Primero debes agregar algun producto!</DialogTitle>

                <DialogActions>
                    <Button color="primary" onClick={() => set_warning_modal_open(false)}>Aceptar</Button>
                </DialogActions>

            </Dialog>

            {/* ACCEPT MODAL */}

            <Dialog open={accept_modal_open} maxWidth={'sm'} fullWidth={true}>
                <DialogTitle className="center">Confirmar datos</DialogTitle>
                <DialogContent scroll={'paper'}>

                    {selectedProducts.map((product, i) => {
                        return (
                          <Row
                            md={12}
                            sm={12}
                            xs={12}
                            className="list_item_container"
                            key={i}
                          >
                            <Col
                              md={8}
                              sm={8}
                              xs={8}
                              className="product_name_list_container"
                            >
                              <Col md={12}>
                                <span className="product_name_list">
                                  {product.name}
                                </span>
                              </Col>

                              <Col md={12}>
                                <span className="product_price_list">
                                  ${product.price}
                                </span>
                              </Col>
                            </Col>
                            <Col md={4} sm={4} xs={4}>
                              <TextField
                                name={product.name}
                                inputProps={{ min: 0 }}
                                margin="dense"
                                id="text_field_shopping_cart"
                                label="Cantidad"
                                type="numeric"
                                value={product.quantity}
                                onChange={(e) =>
                                  handleSelectedProducts(
                                    product,
                                    e.target.value
                                  )
                                }
                              />
                            </Col>
                          </Row>
                        );
                    })}

                </DialogContent>

                <DialogActions>
                    <Button color="primary" onClick={() => handleAcceptModal(false)}>Cancelar</Button>
                    <Button color="primary" onClick={() => handleSaveShoppingCart()}>Guardar</Button>
                </DialogActions>

            </Dialog>

            <Row md={12} className='center' style={{ display: 'block' }}>
                <Row md={12} >

                    <Col className="search_input_sopping_cart_container" md={12} sm={12} xs={12}>
                        <input
                            id="search_input_sopping_cart"
                            name=""
                            placeholder="Buscar Producto por Nombre"
                            type='text'
                            value={searchTerms}
                            onChange={handleChangeSearch.bind(this)}
                        />
                    </Col>

                </Row>

                <Row>

                    <Col md={12} sm={12} xs={12}>
                        {
                            (searchResults.length === 0) ?

                                <Row md={12} style={{ color: 'grey', margin: 'auto', textAlign: 'center', marginTop: '50px' }}>
                                    <Col md={12}>
                                        <p className='default_text'>No se encontraron productos nuevos para agregar, crea uno en la sección de <NavLink to="/dashboard/productos" style={{color: 'var(--main_color)'}}>Productos</NavLink></p>
                                    </Col>
                                </Row>
                                :
                                (searchResults).map((product, i) => {
                                    let quantity = 0;
                                    selectedProducts.map((Sproduct) => { (Sproduct.id === product.id) && (quantity = Sproduct.quantity) })
                                    return (
                                        <ProductSearched key={i}
                                            product={product}
                                            handleSelectedProducts={handleSelectedProducts}
                                            quantity={quantity}
                                        />
                                    )


                                })

                        }

                    </Col>
                </Row>

                <Row md={12}>

                    <Col md={12} className="shopping_cart_button_container">

                        <Button color="primary" onClick={() => handleAcceptModal(true)} className="shopping_cart_button">
                            Aceptar
                        </Button>

                        <Button color="primary" onClick={() => handleCancelModal(true)} className="shopping_cart_button">
                            Cancelar
                        </Button>

                    </Col>
                </Row>
            </Row>
        </div>
    );
}



export default ShoppingCart;