import React, { Component } from 'react'
import CrudDays from '../../Utils/CrudDays';
import Alert from 'react-s-alert';
import { Dialog, DialogTitle, DialogActions, Button, IconButton } from '@material-ui/core';
import ClipLoader from "react-spinners/ClipLoader";
import { Row, Col } from 'react-bootstrap';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import ModalAddDays from './Modals/ModalAddDays';
import DiasSkeleton from '../Layouts/Skeletons/GralSkeleton';
import DiasSkeletonResponsive from '../Layouts/Skeletons/GralSkeletonResponsive';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { NavLink, withRouter } from 'react-router-dom';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import '../Stock/Stock.scss';
import './Dias.scss';

var dias = new Array(7);
dias[0] = "Domingo";
dias[1] = "Lunes";
dias[2] = "Martes";
dias[3] = "Miercoles";
dias[4] = "Jueves";
dias[5] = "Viernes";
dias[6] = "Sábado";

class Days extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: {
                is_loading: true
            },
            delete_modal_days_open: false,
            day_delete_id: null,
            day_delete_index: null,

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

    handleDeleteClick(day_delete_id, day_delete_index) {
        this.setState({
            delete_modal_days_open: true,
            day_delete_id: day_delete_id,
            day_delete_index: day_delete_index,
        })
    }

    handleDelete() {
        CrudDays.deleteDay(this.state.day_delete_id, this.props.user.auth_token).then((result) => {
            if (result.success) {
                let days = this.state.days;
                days.splice(this.state.day_delete_index, 1)
                this.setState({ days: days, delete_modal_days_open: false });
                Alert.success('El día fue eliminado correctamente', {
                    position: 'bottom-left',
                    effect: 'genie',
                })

            } else {
                this.setState({ delete_modal_days_open: false });
                Alert.error(result.result, {
                    position: 'bottom-left',
                    effect: 'genie',
                })
            }
        }).catch((e) => {/* Do something here */ })
    }

    handleClose() {
        this.setState({ delete_modal_days_open: false })
    }


    handleOpenCloseDay (day_id,index){
        let data = {
            id: day_id
        }

        CrudDays.openCloseDay(data, this.props.user.auth_token).then((result) => {

            if (result.success) {
               let closedDay = this.state.days;
               closedDay[index] = result.result;
               let message = ''
               if(closedDay[index].closed === 1){
                message = "El día se ha cerrado correctamente"
               }else{
                message = "El día se abrió correctamente"
               }

               this.setState({days: closedDay});
               Alert.success(message, {
                position: 'bottom-left',
                effect: 'genie',
            })
               
            } else {
                    Alert.error(result.result, {
                        position: 'bottom-left',
                        effect: 'genie',
                    })
               
            }
        })
    }

    handleSubmitModalAddDay(day) {

        let newDay = { date: day };
        CrudDays.addNewDay(newDay, this.props.user.auth_token).then((result) => {
            if (result.success) {
                let newDays = (this.state.days.concat(result.result)).sort(function (a, b) {
                    return new Date(a.date) - new Date(b.date);
                });
                this.setState({ days: newDays })
                this.props.history.push({
                    pathname: `/dashboard/dias/${result.result.id}`,
                    state: { shopping_cart: true, date: day }
                })
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

                {/* Modale Delete */}
                <Dialog open={this.state.delete_modal_days_open} onClose={this.handleClose}>
                    <DialogTitle id="alert-dialog-slide-title">¿Seguro que deseas eliminar este Día?</DialogTitle>
                    {
                        !this.state.loading_delete ?
                            <DialogActions>
                                <Button onClick={this.handleClose.bind(this)} color="primary">Cancelar</Button>
                                <Button onClick={this.handleDelete.bind(this)} color="primary">Eliminar</Button>
                            </DialogActions>
                            :
                            <ClipLoader
                                css={[
                                    { display: 'flex' },
                                    { margin: '0 auto' },
                                    { marginBottom: 25 },
                                    { borderColor: this.props.client.main_color }
                                ]}
                                size={35}
                                loading={this.state.loading_delete}
                            />
                    }
                </Dialog>
                {/* Vista */}
                {
                    (this.state.days.is_loading === true) ?
                        (window.screen.width <= '600') ?
                            <DiasSkeletonResponsive />
                            :
                            <DiasSkeleton />
                        :
                        <div>
                            <Row md={12} sm={12} xs={12} className='center row_titles'>
                                <Col md={12} sm={12} xs={12}>
                                    <p className='info_field'>¡Seleccioná un día para asignar el Stock!</p>
                                </Col>
                            </Row>
                            <Row md={12} sm={12} xs={12} style={{width: '100%'}}> 
                                {
                                    ((this.state.days).length > 0) ?
                                        (this.state.days).map((day, index) => {
                                            let indexFormatDate = (day.date).indexOf('T');
                                            (indexFormatDate > 0) && (day.date = (day.date).substring(0, indexFormatDate));
                                            let date = new Date(`${day.date}T03:00:00.000000Z`);
                                            let date_send =`${dias[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                                            date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                                            return (
                                                <Row key={index} style={(day.closed === 1 ? { 'opacity': '0.5' } : {})} className="day_container center">
                                                    <Col md={10} sm={10} xs={10} className="day_info_container">
                                                        <Row md={12}>
                                                            <Col md={6} sm={6} xs={6}>
                                                                <Row md={12}>
                                                                    <Col md={12}>
                                                                        <p className='card_name'>Dia</p>
                                                                    </Col>
                                                                    <Col md={12} style={{ color: 'var(--main_color)' }}>
                                                                        <p className='card_atr'>{date}</p>
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
                                                                                <p className='card_atr' style={{ color: 'green' }}>Abierto</p>
                                                                                :
                                                                                <p className='card_atr' style={{ color: 'red' }}>Cerrado</p>
                                                                        }
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                        <Row md={12} className='center'>
                                                            <Col md={6} sm={6} xs={6} >
                                                                <IconButton color='inherit' onClick={() => this.handleDeleteClick(day.id, index)} title='Eliminar Día' className="days_card_icons">
                                                                    <ClearOutlinedIcon />
                                                                </IconButton>
                                                            </Col>

                                                            <Col md={6} sm={6} xs={6} >
                                                                <IconButton color='inherit' onClick={() => this.handleOpenCloseDay(day.id,index)} title='Cerrar Día' className="days_card_icons">
                                                                    {(day.closed === 1) ? <LockIcon /> : <LockOpenIcon />}
                                                                </IconButton>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col md={2} sm={2} xs={2} id="card_view_action">
                                                        <NavLink to={{ pathname: `/dashboard/dias/${day.id}`, state: { shopping_cart: false, date: date_send } }} style={{ position: 'absolute', width: '100%', left: 0, height: '100%' }}>
                                                            <ArrowForwardIosIcon className="arrow_action" />
                                                        </NavLink>
                                                    </Col>
                                                </Row>
                                            )
                                        })
                                        :
                                        <Row style={{ color: 'grey', margin: 'auto', textAlign: 'center', marginTop: '50px' }}>
                                            <Col>
                                                <p className='default_text'>No se encontraron días disponibles, crea uno!</p>
                                            </Col>
                                        </Row>
                                }

                            </Row>
                            <Row>
                                <Col style={{ textAlign: 'rigth' }}>
                                    {<ModalAddDays
                                        handleSubmitModalAddDay={this.handleSubmitModalAddDay.bind(this)}
                                    />}
                                </Col>
                            </Row>
                        </div>
                }
            </div>
        );

    }
}


export default withRouter(Days);