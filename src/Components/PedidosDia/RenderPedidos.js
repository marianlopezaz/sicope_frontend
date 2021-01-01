import React from 'react';
import { Row, Col } from 'react-bootstrap';

const RenderProductos = (props) => {
    const render = order =>{
        return(
            <div key={order.id}>
                <Row md={12} sm={12} xs={12} style={{width: '95%', marginLeft: 'auto', marginRight: 'auto'}}>
                    <Col md={12} sm={12} xs={12} style={{width: '100%', marginTop: '15px', padding: '0px'}}>
                        <Row md={12} sm={12} xs={12} style={{width: '100%'}}>
                            <Row className='client_search_card' md={12} sm={12} xs={12} style={{width: '100%'}}>
                                <Col md={12} sm={12} xs={12}>
                                    <Col md={12} sm={12} xs={12}>
                                        <p className='name' style={{display: 'inline-block'}}>Número de pedido:</p>
                                        <p className='card_atr' style={{display: 'inline-block'}}>{order.id}</p>
                                    </Col>
                                    <Col md={12} sm={12} xs={12}>
                                        <p className='name' style={{display: 'inline-block'}}>Valor total:</p>
                                        <p className='card_atr' style={{display: 'inline-block', color: 'green'}}>$ {order.total}</p>
                                    </Col>
                                </Col>
                            </Row>
                            <Row md={12} sm={12} xs={12} className='center' style={{width: '100%', marginTop: 10}}>
                                <p class='title_review' style={{fontSize: '15px', fontWeight: '600', marginTop: '10px'}}>Cliente</p>
                            </Row>
                            <Row className='client_search_card' md={12} sm={12} xs={12} style={{width: '100%'}}>
                                <Col md={12} sm={12} xs={12}>
                                    <Col md={12} sm={12} xs={12}>
                                        <p className='name'>{`${order.client.name} ${order.client.surname}`}</p>
                                    </Col>
                                    <Col md={12} sm={12} xs={12}>
                                        <p>{order.client.dni}</p>
                                    </Col>
                                    <Col md={12} sm={12} xs={12}>
                                        <p>{order.client.address}</p>
                                    </Col>
                                </Col>
                            </Row>
                            <Row md={12} sm={12} xs={12} className='center' style={{width: '100%', marginTop: 10}}>
                                <p class='title_review' style={{fontSize: '15px', fontWeight: '600', marginTop: '10px'}}>Productos</p>
                            </Row>
                            <Row md={12} sm={12} xs={12} style={{width: '100%'}} id='products_resume_container'>
                                {
                                    (order.order_products).map(order_product => {
                                        return (
                                            <Row className='client_search_card' key={order_product.id} md={12} sm={12} xs={12} style={{width: '100%'}}>
                                                <Col md={12} sm={12} xs={12}>
                                                    <Col md={12} sm={12} xs={12}>
                                                        <p className='name'>{order_product.product.name}</p>
                                                    </Col>
                                                    <Col md={12} sm={12} xs={12}>
                                                        <p style={{color: 'var(--main_color)'}}>{order_product.quantity} unidades</p>
                                                    </Col>
                                                    <Col md={12} sm={12} xs={12}>
                                                        <p className='card_atr' style={{color: 'green'}}>$ {order_product.price}</p>
                                                    </Col>
                                                </Col>
                                            </Row>
                                        )
                                    })
                                }
                            </Row>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }

    return ((props.orders).map(render));
}

export default RenderProductos