import React, { Component } from 'react';
import './NavBar.scss';

// Import Dependecias
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavLink } from 'react-router-dom';
import estadisticas from './Images/stats.svg';
import clientes from './Images/users.svg';
import orders from './Images/orders.svg';
import shipping from './Images/shipping.svg';
//import stock from './Images/stock.svg';
import days from './Images/days.svg';
import productos from './Images/products.svg';

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            isSelected : window.location.href.match(/\/([^/]+)\/?$/)[1]
        }
    }

    getSelected(element){
        if(this.state.isSelected === element){
            return {
                padding: '19px 10px',
                borderBottom: '3px solid var(--main_color)'
            };
        }else{
            return {};
        }
    }

    changeSelected(selected){
        this.setState({isSelected:selected});
    }

    render() {
        return (
            
            <div id='navbar_container'>
                <Row md={12}>
                    <Col md={12} id='navbar_col_container'>
                        {
                             (this.props.user.role === 'admin')?
                                <Row md={12}>    
                                    <Col className='center cols_navbar_admin'>
                                        <NavLink id='estadisticas' onClick={this.changeSelected.bind(this, 'estadisticas')} className='navbar-item' style={this.getSelected('estadisticas')}  title='Estadísticas' to='/dashboard/estadisticas'><span><img id='estadisticas_logo' src={estadisticas} className="navbar_logos" alt="logo" /></span><span className='responsive_name'>Estadísticas</span></NavLink>
                                    </Col>
                                    <Col className='center cols_navbar_admin'>
                                        <NavLink id='dias' onClick={this.changeSelected.bind(this, 'dias')} className='navbar-item' style={this.getSelected('dias')} title='Días' to='/dashboard/dias'><span><img src={days} className="navbar_logos" alt="logo" /></span><span className='responsive_name'>Días</span></NavLink>
                                    </Col>
                                    <Col className='center cols_navbar_admin'>
                                        <NavLink id='productos' onClick={this.changeSelected.bind(this, 'productos')} className='navbar-item' style={this.getSelected('productos')} title='Productos' to='/dashboard/productos'><span><img src={productos} className="navbar_logos users_logo_navbar" alt="logo" /></span><span className='responsive_name'>Productos</span></NavLink>
                                    </Col>
                                    <Col className='center cols_navbar_admin'>
                                        <NavLink id='usuarios' onClick={this.changeSelected.bind(this, 'usuarios')} className='navbar-item' style={this.getSelected('usuarios')} title='Centros de Distribución' to='/dashboard/usuarios'><span><img src={shipping} className="navbar_logos users_logo_navbar" alt="logo" /></span><span className='responsive_name'>Centros de Distribución</span></NavLink>
                                    </Col>
                                    <Col className='center cols_navbar_admin'>
                                        <NavLink id='clientes' onClick={this.changeSelected.bind(this, 'clientes')} className='navbar-item' style={this.getSelected('clientes')} title='Clientes' to='/dashboard/clientes'><span><img src={clientes} className="navbar_logos users_logo_navbar" alt="logo" /></span><span className='responsive_name'>Clientes</span></NavLink>
                                    </Col>
                                </Row>
                            : (this.props.user.role === 'user') ?
                                <Row md={12}>
                                    <Col md={6} sm={6} xs={6} className='center'>
                                        <NavLink id='estadisticas' onClick={this.changeSelected.bind(this, 'estadisticas')} className='navbar-item' style={this.getSelected('estadisticas')}  title='Estadísticas' to='/dashboard/estadisticas'><span><img id='estadisticas_logo' src={estadisticas} className="navbar_logos" alt="logo" /></span><span className='responsive_name'>Estadísticas</span></NavLink>
                                    </Col>
                                    <Col md={6} sm={6} xs={6} className='center'>
                                        <NavLink id='pedidos' onClick={this.changeSelected.bind(this, 'pedidos')} className='navbar-item' style={this.getSelected('pedidos')} title='Pedidos' to='/dashboard/pedidos'><span><img src={orders} className="navbar_logos users_logo_navbar" alt="logo" /></span><span className='responsive_name'>Realizar Pedido</span></NavLink>
                                    </Col>
                                </Row>
                            : <Row md={12}></Row>
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default NavBar;