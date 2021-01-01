import React from "react";

// Import dependecias
import { Col } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

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

        <Col md={12} sm={12} xs={12} className='center'>
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
                        <NavLink onClick={(e)=>{handleNavLink(e)}} title='Ver detalles del día' style={(day.total_product === 0 ? {opacity:'0.5', cursor: 'default'} : {opacity:'1'})} key={i} to={ `/dashboard/estadisticas/${day.day_id}/${day.user_id}`} className="day_stats_container center">
                            <Col md={12} sm={12} xs={12} style={{width: '100%'}} className='center'>
                                <p className='day_name'>{`${dias[day.day_date.getDay()]} ${day.day_date.getDate()}/${day.day_date.getMonth() + 1}/${day.day_date.getFullYear()}`}</p>
                            </Col>
                            <Col md={12} sm={12} xs={12}>
                                <p className='card_name' style={{display: 'inline-block'}}>Total de Productos:</p>
                                <p className='card_atr stats_days_atrs' style={{display: 'inline-block'}}>{day.total_product}</p>
                            </Col>
                            <Col md={12} sm={12} xs={12}>
                                <p className='card_name' style={{display: 'inline-block'}}>Recaudación Total:</p>
                                <p className='card_atr stats_days_atrs' style={{display: 'inline-block', color: 'green'}}>$ {day.total_amount}</p>
                            </Col>
                            <Col md={12} sm={12} xs={12} className='center'>
                                <p className='day_name'>Lo más vendido!</p>
                            </Col>
                            <div className='most_sold'>
                                <Col md={12} sm={12} xs={12}>
                                    <p className='card_name' style={{display: 'inline-block'}}>Producto:</p>
                                    {
                                        (day.name_max === '') ?
                                            <p className='card_atr stats_days_atrs' style={{display: 'inline-block'}}>-</p>
                                        :
                                            <p className='card_atr stats_days_atrs' style={{display: 'inline-block'}}>{day.name_max}</p>
                                    }
                                </Col>
                                <Col md={12} sm={12} xs={12}>
                                    <p className='card_name' style={{display: 'inline-block'}}>Cantidad:</p>
                                    <p className='card_atr stats_days_atrs' style={{display: 'inline-block', color: 'var(--main_color)'}}>{day.product_max}</p>
                                </Col>
                            </div>
                        </NavLink>
                    )
                })
            }
        </Col>
    )
}