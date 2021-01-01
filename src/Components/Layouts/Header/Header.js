import React, { Component } from 'react';

//Import dependencias
import logout_user_icon from './images/logout.svg'
import './Header.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Avatar from 'react-avatar';
import Logo from '../Images/logo.png'

class Header extends Component {
    render() {
     
        return (
            
            <Row md={12} className="header_container">
 
                    <Col md={6} sm={6} xs={5}>
                        <img alt='Logo' id="logo_cliente_header" src={Logo}></img>
                    </Col>

                    <Col md={5} sm={5} xs={5} className="col_user_name_container">
                        <Row>
                            <Col>
                                <Avatar className='user_avatar' name={this.props.user.name} size="50" round={true} color='rgb(48, 48, 48)'/>
                                <Row className='user_container_row'>
                                    <Row>
                                        <Col className="col_user_name">
                                            <span id="user_name">{this.props.user.name}</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="col_user_rol">
                                            {
                                                (this.props.user.role === 'user') ?
                                                    <span id="user_rol">Centro de Distribución</span>
                                                :
                                                    <span id="user_rol">Administrador</span>
                                            }
                                        </Col>   
                                    </Row> 
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    
                    <Col md={1} sm={1} xs={2} className="col_logout_icon_container">
                        <img alt='Logout' title='Cerrar Sesión' id="logout_user_icon" src={logout_user_icon} onClick={()=>this.props.logoutUser()}></img>
                    </Col>
                       

            </Row>


        );
    }
}

export default Header;