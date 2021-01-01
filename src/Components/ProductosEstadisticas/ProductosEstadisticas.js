import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Import Services
import StatsService from '../../Utils/StatsService';

// Import dependencias
import { Row, Col } from 'react-bootstrap';
import Alert from 'react-s-alert';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// Import Componentes
import Table from '../Layouts/Table/Table';
import '../PedidosDia/PedidosDia.scss';
import '../Usuarios/Usuarios.scss';

var dias = new Array(7);
dias[0] = "Domingo";
dias[1] = "Lunes";
dias[2] = "Martes";
dias[3] = "Miercoles";
dias[4] = "Jueves";
dias[5] = "Viernes";
dias[6] = "Sábado";

class ProductosEstadisticas extends Component {
    constructor(props){
        super(props);
        this.state = {
            day_id: this.props.match.params.day_id, 
            date: '',
            products: [],
            inputFocusStyle:{
                outline: 'none', 
                border:'none', 
                borderBottom:'solid',
                borderWidth:2,
                color: 'black',
                borderColor:'var(--main_color)',
            },
            inputStyle: {
                outline: 'none', 
                border:'none', 
                borderBottom:'solid',
                borderWidth:1.5,
                color:'black',
                borderColor:'grey'
            
            },          
            tableColumns: [
                { title: 'id', field: 'id', hidden:true},
                { title: 'Nombre', field: 'name_prod', cellStyle:{textAlign: 'center'}}, 
                { title: 'Precio', field: 'actual_price', cellStyle:{ textAlign: 'center'}, render: rowData => '$ ' + rowData.actual_price},
                { title: 'Stock Total', field: 'total_stock', cellStyle:{ textAlign: 'center'}},
                { title: 'Stock Restante', field: 'remaining_stock', cellStyle:{ textAlign: 'center'}},
                { title: 'Porcentaje Vendido', field: 'percentage_sold', cellStyle:{ textAlign: 'center'}, render: rowData => rowData.percentage_sold + ' %'}
            ]
        }
    }

    componentDidMount(){
        StatsService.getProductsByDay(this.state.day_id, this.props.user.auth_token).then(result => {
            if(result.success){
                result.result.day_date =  new Date(`${result.result.day_date}T03:00:00.000000Z`);
                result.result.day_date = `${dias[result.result.day_date.getDay()]} ${result.result.day_date.getDate()}/${result.result.day_date.getMonth() + 1}/${result.result.day_date.getFullYear()}`
                this.setState({ date: result.result.day_date, products: result.result.products })
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

    render() {
        return (
            <Row md={12} sm={12} xs={12} style={{width: '100%'}} className='center'>
                <Row md={12} sm={12} xs={12} style={{width: '100%'}} className='center'>
                    <Col md={1} sm={1} xs={1}>
                        <NavLink title='Volver' to='/dashboard/estadisticas' className="arrow_back_navlink">
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
                        <Table user_role={this.props.user.role} tableName='Productos' data={this.state.products} columns={this.state.tableColumns}></Table>
                    </Col>
                </Row>
            </Row>
        )
    }
}

export default withRouter(ProductosEstadisticas);
