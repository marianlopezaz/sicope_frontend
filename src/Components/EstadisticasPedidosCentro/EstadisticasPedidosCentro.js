import React, { Component } from "react";
import '../PedidosDia/PedidosDia.scss';
import '../Usuarios/Usuarios.scss';
import './EstadisticasPedidosCentro.scss';

// Import dependecias
import { Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Alert from 'react-s-alert';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// Import Servicios
import StatsService from '../../Utils/StatsService';

// Import Componentes
import Table from '../Layouts/Table/Table';

var dias = new Array(7);
dias[0] = "Domingo";
dias[1] = "Lunes";
dias[2] = "Martes";
dias[3] = "Miercoles";
dias[4] = "Jueves";
dias[5] = "Viernes";
dias[6] = "Sábado";

class EstadisticasPedidosCentro extends Component {
    constructor(props){
        super(props);
        this.state = {
            day_id: this.props.match.params.day_id, 
            user_id: this.props.match.params.user_id, 
            date: '',
            orders: [],          
            tableColumns: [
                { title: 'N°', field: 'order_id', cellStyle:{textAlign: 'center'}},
                { title: 'Nombre y Apellido', field: 'client_name', cellStyle:{textAlign: 'center'}}, 
                { title: 'Dirección', field: 'client_address', cellStyle:{ textAlign: 'center'}},
                { title: 'Recaudación Total', field: 'total_amount', cellStyle:{ textAlign: 'center'}, render: rowData => `$ ${rowData.total_amount}`}
            ]
        }
    }

    componentDidMount(){
        if(this.props.user.auth_token){
            StatsService.getOrdersByCenterDay(this.state.day_id, this.state.user_id, this.props.user.auth_token).then(result => {
                if(result.success){
                    console.log(result.result)
                    result.result.day_date =  new Date(`${result.result.day_date}T03:00:00.000000Z`);
                    result.result.day_date = `${dias[result.result.day_date.getDay()]} ${result.result.day_date.getDate()}/${result.result.day_date.getMonth() + 1}/${result.result.day_date.getFullYear()}`
                    this.setState({ orders : result.result.orders, date: result.result.day_date})
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

    render(){
        return(
            <Row md={12} sm={12} xs={12} style={{width: '100%'}} className='center'>
                <Row md={12} sm={12} xs={12} style={{width: '100%'}} className='center'>
                    <Col md={1} sm={1} xs={1}>
                        <NavLink title='Volver' to={(this.props.user.role === 'admin') ? `/dashboard/estadisticas/${this.state.day_id}` : `/dashboard/estadisticas`} className="arrow_back_navlink">
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
                    <Col md={11} style={{marginTop: '50px', marginLeft: 'auto', marginRight: 'auto'}} >
                        <Table is_view={true} user_role={this.props.user.role} tableName='Pedidos' data={this.state.orders} columns={this.state.tableColumns}></Table>
                    </Col>
                </Row>
            </Row>
        )
    }
}

export default withRouter(EstadisticasPedidosCentro);