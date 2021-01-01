import React, { Component } from 'react';

// Import Dependencias
import { withRouter } from 'react-router-dom';
import Alert from 'react-s-alert';
import { Row, Col } from 'react-bootstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
//import ClipLoader from "react-spinners/ClipLoader";
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// Import Componentes
import SelectClientModal from './Modals/SelectClientModal';
import Table from './OrderTable';
import CrudOrders from '../../Utils/CrudOrders';
import OrderService from '../../Utils/OrderService';
import RenderPedidos from './RenderPedidos';
import '../Usuarios/Usuarios.scss';
import './PedidosDia.scss';

var dias = new Array(7);
dias[0] = "Domingo";
dias[1] = "Lunes";
dias[2] = "Martes";
dias[3] = "Miercoles";
dias[4] = "Jueves";
dias[5] = "Viernes";
dias[6] = "Sábado";
class PedidosDia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            day_id: this.props.match.params.day_id, 
            date:'', 
            day_closed: 1,
            orders: [], 
            order_success_id: 0,
            is_success_add_modal_open: false, 
            is_detail_modal_open: false, 
            order_details: {},
            loading_delete : false,
            tableColumns: [
                { title: 'N°', field: 'id', cellStyle:{textAlign: 'center'}, render: rowData => (rowData.loaded === 1) ? <p style={{backgroundColor: 'green', color: '#fff'}}>{rowData.id}</p> : <p>{rowData.id}</p>, editable: false},
                { title: 'Nombre y Apellido', field: 'client.name', cellStyle:{textAlign: 'center'}, render: rowData => `${rowData.client.name} ${rowData.client.surname}`, editable: false},
                { title: 'DNI', field: 'client.dni', cellStyle:{textAlign: 'center'}, editable: false},
                { title: 'Dirección', field: 'client.address', cellStyle:{textAlign: 'center'}, render: rowData => rowData.client.address, editable: false},
                { title: 'Observación', field: 'observation', cellStyle:{textAlign: 'center'}},
                { title: 'Importe Total', field: 'total', cellStyle:{textAlign: 'center'}, render: rowData => `$ ${rowData.total}`, editable: false},
            ]
        }
        this.handleSubmitModalAdd = this.handleSubmitModalAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.print = this.print.bind(this);
        this.printAll = this.printAll.bind(this);
        this.openDetailsModal = this.openDetailsModal.bind(this);
        this.handleCloseDetail = this.handleCloseDetail.bind(this);
        this.handleCloseSuccess = this.handleCloseSuccess.bind(this);
    }

    componentDidMount(){
        CrudOrders.getDayOrdersUser(this.state.day_id, this.props.user.auth_token).then(result => {
            if (result.success) {
                let date =  new Date(`${result.result[0].date}T03:00:00.000000Z`);
                date = `${dias[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                result.result[0].orders.forEach(order => {
                    let total = 0;
                    order.total = order.order_products.map(order_product => {
                        return (order_product.product.price * order_product.quantity)
                    })
                    order.total.forEach(sub_total_item => {
                        total += sub_total_item
                    })
                    order.total = total;
                })
                this.setState({ date: date, orders: result.result[0].orders, day_closed: result.result[0].closed})
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

    handleSubmitModalAdd(data){
        CrudOrders.add(data, this.props.user.auth_token).then(result => {
            if (result.success) {
                if(!(this.state.orders.find(order => {return order.id === result.result.id}))){
                    let orders = this.state.orders;
                    let total = 0;
                    result.result.total = result.result.order_products.map(order_product => {
                        return (order_product.product.price * order_product.quantity)
                    })
                    result.result.total.forEach(sub_total_item => {
                        total += sub_total_item
                    })
                    result.result.total = total;
                    orders.push(result.result);
                    console.log(orders);
                    this.setState({ orders: orders, is_success_add_modal_open: true, order_success_id: result.result.id })
                }
                Alert.success('Pedido creado correctamente!', {
                    position: 'bottom-left',
                    effect: 'genie', 
                })
            } else {
                result.result.forEach(element => {
                    Alert.error(`${element.message}, intentá nuevamente!`, {
                    position: 'bottom-left',
                    effect: 'genie', 
                    })
                });
            }
        })
    }

    handleDelete(order_id,indexTable){
        this.setState({is_loading: true})
        CrudOrders.delete(order_id, this.props.user.auth_token).then(result => {
            if (result.success) {
                let data = this.state.orders;
                data.splice(indexTable, 1);
                this.setState({orders: data});
                Alert.success(result.result, {
                    position: 'bottom-left',
                    effect: 'genie', 
                })
            } else {
                this.setState({
                    is_loading: false, 
                    is_delete_modal_open: false
                })
                result.result.forEach(element => {
                    Alert.error(element.message, {
                    position: 'bottom-left',
                    effect: 'genie', 
                    })
                });
            }
        })
    }

    handleEdit(editedIndex, data, newData){
        let data_send = {
            id: newData.id, 
            observation: newData.observation
        }
        CrudOrders.edit(data_send, this.props.user.auth_token).then(result => {
            if (result.success) {
                data[editedIndex] = newData;
                this.setState({ orders: data })
                Alert.success('Pedido editado correctamente!', {
                    position: 'bottom-left',
                    effect: 'genie', 
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

    print(data){
        let data_send = {
            id: parseInt(data.id)
        }
        OrderService.changeLoad(data_send, this.props.user.auth_token).then(result => {
            if (result.success) {
                let new_orders = this.state.orders.map(order => {
                    if(order.id === data.id){
                        order.loaded = 1;
                    }
                    return order;
                })
                this.setState({ orders: new_orders })
                OrderService.printOrder([data]).then((result)=>{
                    if(result.success){
                        Alert.success(result.result, {
                            position: 'bottom-left',
                            effect: 'genie', 
                        })
                    }else{
                       Alert.success(result.result, {
                            position: 'bottom-left',
                            effect: 'genie', 
                        }) 
                    }
                });
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

    printAll(data){
        let data_send = { orders: data.map(order => { return { id: order.id } }) };
        OrderService.printMultipleOrders(data_send, this.props.user.auth_token).then(result => {
            if (result.success) {
                let new_orders = this.state.orders.map(order => {
                    result.result.orders.forEach(order_result => {
                        if(order.id === order_result.id && order.loaded === 0){
                            order.loaded = 1;
                        }
                    })
                    return order;
                })
                this.setState({ orders: new_orders })
                OrderService.printOrder(data).then((result)=>{
                    if(result.success){
                        Alert.success(result.result, {
                            position: 'bottom-left',
                            effect: 'genie', 
                        })
                    }else{
                       Alert.success(result.result, {
                            position: 'bottom-left',
                            effect: 'genie', 
                        }) 
                    }
                });
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

    handleCloseDetail(){
        this.setState({ is_detail_modal_open: false })
    }

    openDetailsModal(data){
        this.setState({ is_detail_modal_open: true, order_details: [data] })
    }

    handleCloseSuccess(){
        this.setState({ is_success_add_modal_open: false })
    }

    render() {
        return (
            <div>
                {/* Modal Success */}
                <Dialog maxWidth={'md'} fullWidth={true} open={this.state.is_success_add_modal_open} onClose={this.handleCloseSuccess}>
                    <DialogTitle id="alert-dialog-slide-title" className='center'>El pedido se creó con éxito!</DialogTitle>
                    <DialogContent>
                        <Row md={12} sm={12} xs={12} style={{width: '100%', marginTop: '10px'}}>
                            <Col md={12} sm={12} xs={12}>
                                <p className='default_text' style={{color: '#000000', fontWeight: '600'}}>Número de Pedido: {this.state.order_success_id}</p>
                            </Col>
                            <Col md={12} sm={12} xs={12}>
                                <p className='default_text' style={{color: '#a9a9aa'}}>*Recordá indicarle este número al cliente para poder llevar el seguimiento de la orden.</p>
                            </Col>
                        </Row>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseSuccess} color="primary">Aceptar</Button>
                    </DialogActions>
                </Dialog>
                {/* Modal Detalles */}
                <Dialog maxWidth={'sm'} fullWidth={true} open={this.state.is_detail_modal_open} onClose={this.handleCloseDetail}>
                    <DialogTitle id="alert-dialog-slide-title" className='center'>Detalles</DialogTitle>
                    <DialogContent>
                        <RenderPedidos orders={this.state.order_details}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDetail} color="primary">Cerrar</Button>
                    </DialogActions>
                </Dialog>
                {/* Vista */}
                <Row md={12} sm={12} xs={12} style={{width: '100%'}} className='center'>
                    <div id='orders_fixed_container'>
                        <Row md={12} sm={12} xs={12} style={{width: '100%'}} className='center'>
                            <Col md={1} sm={1} xs={1}>
                                <NavLink title='Volver' to="/dashboard/pedidos" className="arrow_back_navlink">
                                    <IconButton color='inherit' className="arrow_back_container" style={{backgroundColor:'var(--main_color)'}}>
                                        <ArrowBackIcon className="arrow_back" style={{color:'#fff'}}/>
                                    </IconButton>
                                </NavLink>
                            </Col>
                            <Col md={11} sm={11} xs={11}>
                                <Col md={12} sm={12} xs={12}>
                                    <p className='day_reference'>{this.state.date}</p>
                                </Col>
                                {
                                    (this.state.day_closed === 0) ?
                                        <Col md={12} sm={12} xs={12}>
                                            <SelectClientModal day_closed={this.state.day_closed} date={this.state.date} day_id={this.state.day_id} handleSubmitModalAdd={this.handleSubmitModalAdd.bind(this)} auth_token={this.props.user.auth_token}/>
                                        </Col>
                                    : 
                                        <Col md={12} sm={12} xs={12}>
                                            <p className='day_reference'>¡DÍA CERRADO!</p>
                                        </Col>
                                }
                            </Col>
                        </Row>
                    </div>
                    <Row md={12} sm={12} xs={12} style={{width: '100%', marginTop: '110px'}} className='center'>
                        <Col md={11} style={{marginLeft: 'auto', marginRight: 'auto'}} >
                            <Table show_details={this.openDetailsModal} is_day_closed={this.state.day_closed} print={this.print} printAll={this.printAll} handleDeleteRow={this.handleDelete} handleEditRow={this.handleEdit} tableName='Pedidos' data={this.state.orders} columns={this.state.tableColumns}></Table>
                        </Col>
                    </Row>
                </Row>
            </div>
        );
    }
}

export default withRouter(PedidosDia);