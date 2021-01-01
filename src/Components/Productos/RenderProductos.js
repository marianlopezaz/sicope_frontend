import React from 'react';
import { Row, Col } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';

const RenderProductos = (props) => {


    const render = product =>{

        const containerSylte= {
            borderLeftStyle:'solid', 
            borderLeftWidth:15,
            
            borderTopLeftRadius: (product.color) ? 0 : 10,
            borderBottomLeftRadius: (product.color) ? 0 : 10,
            borderLeftColor: (product.color) ? product.color : '#272727'
        }
    
        return(
            <div key={product.id} style={containerSylte} className="product_container center">
                <Row md={12}>
                    {   
                        (props.user_role === 'user' && props.is_stock_view) ? 
                            <Col md={12} sm={12} xs={12}>
                                <Row md={12}>
                                    <Col md={12}>
                                        <p className='card_name'>Nombre</p>
                                    </Col>
                                    <Col md={12}>
                                        <p className='card_atr'>{product.name}</p>
                                    </Col>
                                </Row>
                            </Col>
                        :
                            <Col md={6} sm={6} xs={6}>
                                <Row md={12}>
                                    <Col md={12}>
                                        <p className='card_name'>Nombre</p>
                                    </Col>
                                    <Col md={12}>
                                        <p className='card_atr'>{product.name}</p>
                                    </Col>
                                </Row>
                            </Col>
                    }
                    {
                        (props.user_role === 'user' && props.is_stock_view) ? 
                            <Col md={6} sm={6} xs={6}>
                                <Row md={12}>
                                    <Col md={12}>
                                        <p className='card_name'>Cantidad Restante</p>
                                    </Col>
                                    <Col md={12}>
                                        <p className='card_atr' style={{color: 'var(--main_color)'}}>{product.pivot.remaining}</p>
                                    </Col>
                                </Row>
                            </Col>
                        :
                            null
                    }
                    <Col md={6} sm={6} xs={6}>
                        <Row md={12}>
                            <Col md={12}>
                                <p className='card_name'>Precio p/u</p>
                            </Col>
                            <Col md={12}>
                                <p className='card_atr' style={{color: 'green'}}>$ {product.price}</p>
                            </Col>
                        </Row>
                    </Col>
                    {
                        (props.user_role === 'admin') ? 
                            <Col md={12} sm={12} xs={12} className='center'>
                                <IconButton color='inherit' title='Editar Producto' onClick={props.handleEditClick.bind(this, product.id)} className="products_icons">
                                    <EditOutlinedIcon />
                                </IconButton>
                                <IconButton color='inherit' title='Eliminar Producto' onClick={props.handleDeleteClick.bind(this, product.id)} className="products_icons">
                                    <ClearOutlinedIcon />
                                </IconButton>
                            </Col>
                        :
                            null
                    }
                </Row>
            </div>
        )
    }

    return ((props.products).map(render));
}

export default RenderProductos