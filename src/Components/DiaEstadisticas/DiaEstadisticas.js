import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './DiaEstadisticas.scss';
import '../PedidosDia/PedidosDia.scss';
import '../Estadisticas/Estadisticas.scss';

// Import componentes
import EstadisticasSkeletonResponsive from '../Layouts/Skeletons/GralSkeletonResponsive';
import EstadisticasSkeleton from '../Layouts/Skeletons/GralSkeleton';

// Import Services
import StatsService from '../../Utils/StatsService';

// Import dependencias
import Alert from 'react-s-alert';
import { Col, Row } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

var dias = new Array(7);
dias[0] = "Domingo";
dias[1] = "Lunes";
dias[2] = "Martes";
dias[3] = "Miercoles";
dias[4] = "Jueves";
dias[5] = "Viernes";
dias[6] = "Sábado";

class DiaEstadisticas extends Component {
    constructor(props){
        super(props);
        this.state = {
            is_loading: true,
            day_id: this.props.match.params.day_id, 
            date:'',
            users_stats: []
        }
    }

    componentDidMount(){
        if(this.props.user.auth_token){
            StatsService.getUsersByDay(this.state.day_id, this.props.user.auth_token).then(result => {
                if(result.success){
                    result.result[0].day_date =  new Date(`${result.result[0].day_date}T03:00:00.000000Z`);
                    result.result[0].day_date = `${dias[result.result[0].day_date.getDay()]} ${result.result[0].day_date.getDate()}/${result.result[0].day_date.getMonth() + 1}/${result.result[0].day_date.getFullYear()}`
                    this.setState({ users_stats : result.result[0].centers, is_loading: false, date: result.result[0].day_date})
                }else{
                    result.result.forEach(element => {
                        Alert.error(element.message, {
                        position: 'bottom-left',
                        effect: 'genie', 
                        })
                    });
                }
            })
        }
    }

    render() {
        return (
            <div>
                
                {   
                    (this.state.is_loading) ?
                        (window.screen.width <= '600') ?
                            <Row md={12} sm={12} xs={12} className='center'>
                                <Col md={1} sm={1} xs={1} className="arrow_back_container">
                                    <NavLink title='Volver' to="/dashboard/estadisticas" className="arrow_back_navlink">
                                        <IconButton color='inherit' className="arrow_back_container" style={{backgroundColor:'var(--main_color)'}}>
                                            <ArrowBackIcon className="arrow_back" style={{color:'#fff'}}/>
                                        </IconButton>
                                    </NavLink>
                                </Col>
                                <Col md={11} sm={11} xs={11} style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px'}}>
                                    <EstadisticasSkeletonResponsive />
                                </Col>
                            </Row>
                        :
                            <Row md={12} sm={12} xs={12} className='center'>
                                <Col md={1} sm={1} xs={1} className="arrow_back_container">
                                    <NavLink title='Volver' to="/dashboard/estadisticas" className="arrow_back_navlink">
                                        <IconButton color='inherit' className="arrow_back_container" style={{backgroundColor:'var(--main_color)'}}>
                                            <ArrowBackIcon className="arrow_back" style={{color:'#fff'}}/>
                                        </IconButton>
                                    </NavLink>
                                </Col>
                                <Col md={11} sm={11} xs={11} style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px'}}>
                                    <EstadisticasSkeleton />
                                </Col>
                            </Row>
                    : 
                        <Row md={12} sm={12} xs={12} style={{width: '100%'}} className='center'>
                            <Row md={12} sm={12} xs={12} style={{width: '100%'}} className='center'>
                                <Col md={1} sm={1} xs={1}>
                                    <NavLink title='Volver' to="/dashboard/estadisticas" className="arrow_back_navlink">
                                        <IconButton color='inherit' className="arrow_back_container" style={{backgroundColor:'var(--main_color)'}}>
                                            <ArrowBackIcon className="arrow_back" style={{color:'#fff'}}/>
                                        </IconButton>
                                    </NavLink>
                                </Col>
                                <Col md={11} sm={11} xs={11}>
                                    <p className='day_reference'>{this.state.date}</p>
                                </Col>
                            </Row>
                            <Row md={12} sm={12} xs={12} style={{width: '100%'}} className='center'>
                                <Col md={12} sm={12} xs={12} className='center'>
                                {
                                    (this.state.users_stats).map(user => {

                                            let linkDisabled = false;
                                            if(user.total_product === 0) {
                                                linkDisabled = true
                                            }

                                            const handleNavLink = (e) => {
                                                if(linkDisabled) e.preventDefault()
                                            }

                                        return(
                                            <NavLink title='Ver detalles del día' onClick = {(e)=>{handleNavLink(e)}} style={(user.total_product === 0 ? {opacity:'0.5', cursor: 'default'} : {opacity:'1'})} key={user.user_id} to={`/dashboard/estadisticas/${this.state.day_id}/${user.user_id}`} className="day_stats_container center">
                                                <Col md={12} sm={12} xs={12} style={{width: '100%'}} className='center'>
                                                    <p className='day_name'>{user.user_name}</p>
                                                </Col>
                                                <Col md={12} sm={12} xs={12}>
                                                    <p className='card_name' style={{display: 'inline-block'}}>Total de Productos:</p>
                                                    <p className='card_atr stats_days_atrs' style={{display: 'inline-block'}}>{user.total_product}</p>
                                                </Col>
                                                <Col md={12} sm={12} xs={12}>
                                                    <p className='card_name' style={{display: 'inline-block'}}>Recaudación Total:</p>
                                                    <p className='card_atr stats_days_atrs' style={{display: 'inline-block', color: 'green'}}>$ {user.total_amount}</p>
                                                </Col>
                                                <Col md={12} sm={12} xs={12} className='center'>
                                                    <p className='day_name'>Lo más vendido!</p>
                                                </Col>
                                                <div className='most_sold'>
                                                    <Col md={12} sm={12} xs={12}>
                                                        <p className='card_name' style={{display: 'inline-block'}}>Producto:</p>
                                                        {
                                                            (user.name_max === '') ?
                                                                <p className='card_atr stats_days_atrs' style={{display: 'inline-block'}}>-</p>
                                                            :
                                                                <p className='card_atr stats_days_atrs' style={{display: 'inline-block'}}>{user.name_max}</p>
                                                        }
                                                    </Col>
                                                    <Col md={12} sm={12} xs={12}>
                                                        <p className='card_name' style={{display: 'inline-block'}}>Cantidad:</p>
                                                        <p className='card_atr stats_days_atrs' style={{display: 'inline-block', color: 'var(--main_color)'}}>{user.product_max}</p>
                                                    </Col>
                                                </div>
                                            </NavLink>
                                        )
                                    })
                                }
                                </Col>
                            </Row>
                        </Row>
                }
            </div>
        );
    }
}

export default withRouter(DiaEstadisticas);