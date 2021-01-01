import React from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Row, Col } from 'react-bootstrap';
import './ProductSearched.scss'

const ProductSearched = (props) => {


    const addQuantity = () => {
        let newQuantity = (parseInt(props.quantity) + 1)
        props.handleSelectedProducts(props.product,newQuantity);
    }

    const removeQuantity = () => {
        let newQuantity = (props.quantity - 1)
        if (newQuantity >= 0) {
            props.handleSelectedProducts(props.product,newQuantity);
        }

    }

    const handleQuantityChange = (e) => {

        if (e.target.value >= 0) {
            props.handleSelectedProducts(props.product,e.target.value);
        }

        if(e.target.value === ''){
            props.handleSelectedProducts(props.product,0);
        }

    }

    return (
        <div className={(props.quantity === 0 || props.quantity === ''? "product_container_searched" : "product_container_searched product_selected")}>
            <Row md={12}>
                <Col md={6} sm={6} xs={6}>
                    <Row md={12}>
                        <Col md={12} sm={12}>
                            <p className='card_name_product_searched'>Nombre</p>
                        </Col>
                        <Col md={12}>
                            <p className='card_atr_product_searched'>{props.product.name}</p>
                        </Col>
                    </Row>
                </Col>
                <Col md={6} sm={6} xs={6}>
                    <Row md={12}>
                        <Col md={12}>
                            <p className='card_name_product_searched'>Precio</p>
                        </Col>
                        <Col md={12}>
                            <p className='card_atr_product_searched' style={{ color: 'green' }}>$ {props.product.price}</p>
                        </Col>
                    </Row>
                </Col>
                <Col md={12} sm={12} xs={12} className='center'>
                    <Row md={12}>
                        <Col md={5} sm={5} xs={5} className="products_searched_icons_container">
                            <IconButton color='inherit'
                                title='Eliminar Producto'
                                className="products_searched_icons col-md-5"
                                onClick={removeQuantity}
                            >
                                <RemoveIcon className ="remove_add_searched_icon"/>
                            </IconButton>
                        </Col>
                        <Col md={2} sm={2} xs={2} className="input_quantity_container">
                            <input
                                type='number'
                                min = {0}
                                value={(props.quantity)}
                                onChange={(e) => handleQuantityChange(e)}
                                className = "input_quantity"
                            /> 
                          
                        </Col>

                        <Col md={5} sm={5} xs={5} className="products_searched_icons_container">
                            <IconButton color='inherit'
                                title='Agregar Producto'
                                className="products_searched_icons col-md-5"
                                onClick={addQuantity}
                            >
                                <AddIcon className="remove_add_searched_icon"/>
                            </IconButton>
                        </Col>
                    </Row>

                </Col>
            </Row>
        </div>
    )
}


export default ProductSearched;