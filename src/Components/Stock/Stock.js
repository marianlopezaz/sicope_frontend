import React, { Component } from 'react';

// Import Componentes 
import CrudDays from '../../Utils/CrudDays';
import StockSkeleton from '../Layouts/Skeletons/GralSkeleton';
import StockSkeletonResponsive from '../Layouts/Skeletons/GralSkeletonResponsive';
import './Stock.scss';
import '../Dias/Dias.scss';
import '../Stock/Stock.scss';

// Import dependencias
import Alert from 'react-s-alert';
import { Row, Col } from 'react-bootstrap';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { NavLink, withRouter } from 'react-router-dom';

class Stock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: {
                is_loading: true
            }
        }
    }

    componentDidMount() {
        CrudDays.getDays(this.props.user.auth_token).then((result) => {
            if (result.success) {
                this.setState({ days: result.result })
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

    render() {
        return (
            <div>
                {
                    (this.state.days.is_loading === true) ? 
                        (window.screen.width <= '600') ?
                            <StockSkeletonResponsive />
                        :
                            <StockSkeleton />
                    :
                    <div>
                        <Row>
                            <Row md={12} sm={12} xs={12} className='center row_titles'> 
                                <Col md={12} sm={12} xs={12}>
                                    <p className='info_field'>¡Seleccioná un día para ver el stock!</p>
                                </Col>
                            </Row>
                            <Row md={12} sm={12} xs={12} style={{width: '100%'}}>
                                {
                                    ((this.state.days).length > 0) ?
                                        (this.state.days).map((day) => {
                                            let indexFormatDate = (day.date).indexOf('T');
                                            (indexFormatDate>0) && (day.date = (day.date).substring(0,indexFormatDate));
                                            let date =  new Date(`${day.date}T03:00:00.000000Z`);
                                            date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                                            return (
                                                <Row key={day.id} style={(day.closed === 1 ? {'opacity' : '0.5'} : {})} className="day_container center">
                                                    <Col md={10} sm={10} xs={10} className="day_info_container">
                                                        <Row md={12}>
                                                            <Col md={6} sm={6} xs={6}>
                                                                <Row md={12}>
                                                                    <Col md={12}>
                                                                        <p className='card_name'>Dia</p>
                                                                    </Col>
                                                                    <Col md={12}>
                                                                        <p className='card_atr' style={{color: 'var(--main_color)'}}>{date}</p>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col md={6} sm={6} xs={6}>
                                                                <Row md={12}>
                                                                    <Col md={12}>
                                                                        <p className='card_name'>Estado</p>
                                                                    </Col>
                                                                    <Col md={12}>
                                                                        {
                                                                            (day.closed === 0) ?
                                                                                <p className='card_atr' style={{color: 'green'}}>Abierto</p>
                                                                                :
                                                                                <p className='card_atr' style={{color: 'red'}}>Cerrado</p>
                                                                        }
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col md={2} sm={2} xs={2} id="card_view_action">
                                                        <NavLink to={`/dashboard/stock/${day.id}`}>
                                                            <ArrowForwardIosIcon className="arrow_action_stock" />
                                                        </NavLink>
                                                    </Col>
                                                </Row>
                                            )
                                        })
                                        :
                                        <Row style={{ color: 'grey', margin: 'auto', textAlign: 'center', marginTop: '50px' }}>
                                            <Col>
                                                <p className='default_text'>No se encontraron días disponibles</p>
                                            </Col>
                                        </Row>
                                }
                            </Row>
                        </Row>
                    </div>
                }
            </div>
        );

    }
}

export default withRouter(Stock);
