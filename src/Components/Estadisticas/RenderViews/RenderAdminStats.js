import React from "react";

// Import dependecias
import { Col, Row } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

// Import Componentes
import PieChart from './AdminPieChart';

var dias = new Array(7);
dias[0] = "Domingo";
dias[1] = "Lunes";
dias[2] = "Martes";
dias[3] = "Miercoles";
dias[4] = "Jueves";
dias[5] = "Viernes";
dias[6] = "Sábado";




export default function RenderUserStats(props) {
    
    if(props.days.length=== 0) {

        return(<div className="default_text center">No hay estadísticas para mostrar</div>)
    }
    
    return(
        <Row md={12} sm={12} xs={12} style={{width: '100%'}} className='center' id='container_col_admin_stats'>
            <Col md={12} sm={12} xs={12} style={{width: '100%'}} className='center'>
                <p className='default_text admin_stats_text'>¡Deslizá hacia la derecha para ver todos los días!</p>
            </Col>
            <Col md={12} sm={12} xs={12} className='center admin_stats'>
                {
                
                    (props.days).map((day,i) => {
                        let linkDisabled = false;
                        if(day.total_product === 0) {
                            linkDisabled = true
                        }
                        const handleNavLink = (e) => {
                            if(linkDisabled) e.preventDefault()
                        }
                        return(
                            <div className='day_stats_container admin_stats_cards center' style={(day.total_product === 0 ? {opacity:'0.5', cursor: 'default'} : {opacity:'1'})}>
                                <NavLink onClick={(e)=>{handleNavLink(e)}} title='Ver detalles del día' style={(day.total_product === 0 ? {opacity:'0.5', cursor: 'default'} : {opacity:'1'})} key={i} to={`/dashboard/estadisticas/${day.day_id}`}>
                                    <div className='inner_card'>
                                        <Col md={12} sm={12} xs={12} style={{width: '100%'}} className='center'>
                                            <p className='day_name'>{`${dias[day.day_date.getDay()]} ${day.day_date.getDate()}/${day.day_date.getMonth() + 1}/${day.day_date.getFullYear()}`}</p>
                                        </Col>
                                        <Col md={12} sm={12} xs={12}>
                                            <p className='card_name' style={{display: 'inline-block'}}>Total vendido:</p>
                                            <p className='card_atr stats_days_atrs' style={{display: 'inline-block'}}>{day.total_product}</p>
                                        </Col>
                                        <Col md={12} sm={12} xs={12}>
                                            <p className='card_name' style={{display: 'inline-block'}}>Recaudación total:</p>
                                            <p className='card_atr stats_days_atrs' style={{display: 'inline-block', color: 'green'}}>$ {day.total_amount}</p>
                                        </Col>
                                    </div>
                                </NavLink>
                                <Col md={12} sm={12} xs={12} style={{width: '100%', marginTop: '10px'}} className='center'>
                                    <p className='day_name'>Productos</p>
                                </Col>
                                <NavLink onClick={(e)=>{handleNavLink(e)}} title='Ver detalles de los productos vendidos' style={(day.total_product === 0 ? {opacity:'0.5', cursor: 'default'} : {opacity:'1'})} key={i} to={`/dashboard/admin/estadisticas/${day.day_id}`}>
                                    <div className='inner_card' style={{marginTop: '10px'}}>
                                        <Col md={12} sm={12} xs={12} style={{width: '100%'}} className='center'>
                                            <PieChart data={{total_stock: day.total_stock, remaining_stock: day.remaining_stock}}/>
                                        </Col>
                                    </div>
                                </NavLink>
                            </div>
                        )
                    })
                }
            </Col>
        </Row>
    )
}