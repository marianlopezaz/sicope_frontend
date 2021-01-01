import React, { Component } from 'react';

// Import Componentes
import './StockProductos.scss';
import '../Productos/Productos.scss'
import CrudStock from '../../Utils/CrudStock';
import RenderProductos from '../Productos/RenderProductos';
import ProductosSkeleton from '../Productos/Skeleton/SkeletonProductos';
import ProductosSkeletonResponsive from '../Productos/Skeleton/SkeletonProductosResponsive';

// Import dependecias
import Alert from 'react-s-alert';
import { withRouter } from 'react-router-dom';
import { Row,Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class StockProductos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            day_id: this.props.match.params.day_id,
            stock_products: {
                is_loading: true
            },
            searched_stock_products: []
        }
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
    }

    componentDidMount(){
        CrudStock.getDayStockProducts(this.state.day_id, this.props.user.auth_token).then(result => {
            if(result.success){
                this.setState({ stock_products : result.result.products })
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

    handleChangeSearch(e){
        let value = e.target.value;
        let searched_products = [];
        this.state.stock_products.map(product => {
            if(product.name.toLowerCase().includes(value.toLowerCase())){
                searched_products.push(product);
            }
            return true;
        })
        if(searched_products.length > 0){
            this.setState({
                searched_stock_products : searched_products
            }) 
        }else{
            this.setState({
                searched_stock_products : 'No se encontro el producto ingresado'
            }) 
        }
        
    }

    render() {
        return (
            (this.state.stock_products.is_loading === true) ? 
                    (window.screen.width <= '600') ?
                        <Row md={12} sm={12} xs={12} className='center'>
                            <Col md={1} sm={1} xs={1} className="arrow_back_container">
                                <NavLink title='Volver' to="/dashboard/stock" className="arrow_back_navlink">
                                    <IconButton color='inherit' className="arrow_back_container" style={{backgroundColor:'var(--main_color)'}}>
                                        <ArrowBackIcon className="arrow_back" style={{color:'#fff'}}/>
                                    </IconButton>
                                </NavLink>
                            </Col>
                            <Col md={11} sm={11} xs={11} style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px'}}>
                                <ProductosSkeletonResponsive />
                            </Col>
                        </Row>
                    :
                        <Row md={12} sm={12} xs={12} className='center'>
                            <Col md={1} sm={1} xs={1} className="arrow_back_container">
                                <NavLink title='Volver' to="/dashboard/stock" className="arrow_back_navlink">
                                    <IconButton color='inherit' className="arrow_back_container" style={{backgroundColor:'var(--main_color)'}}>
                                        <ArrowBackIcon className="arrow_back" style={{color:'#fff'}}/>
                                    </IconButton>
                                </NavLink>
                            </Col>
                            <Col md={11} sm={11} xs={11} style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px'}}>
                                <ProductosSkeleton />
                            </Col>
                        </Row>
                :
                <div>
                    <Row md={12} sm={12} xs={12} className='center'>
                        <Col md={1} sm={1} xs={1}>
                            <NavLink title='Volver' to="/dashboard/stock" className="arrow_back_navlink">
                                <IconButton color='inherit' className="arrow_back_container" style={{backgroundColor:'var(--main_color)'}}>
                                    <ArrowBackIcon className="arrow_back" style={{color:'#fff'}}/>
                                </IconButton>
                            </NavLink>
                        </Col>
                        <Col md={11} sm={11} xs={11} id="col_arrow_back_container" style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px'}}>
                            <input id="stock_search_input" name="" placeholder="Buscar Producto por Nombre" type='text' onChange={this.handleChangeSearch}/>
                        </Col>
                    </Row>
                    <Row md={12} sm={12} xs={12} id='col_stock_render' className='center'>
                        {
                            (this.state.searched_stock_products.length > 0 && typeof this.state.searched_stock_products === 'string') ? 
                                <Row md={12} style={{color:'grey',margin:'auto',textAlign:'center', marginTop:'50px'}}>
                                    <Col md={12}>
                                        <p className='default_text'>No se encontro el producto ingresado!</p>
                                    </Col>
                                </Row>
                            : (this.state.searched_stock_products.length > 0 && typeof this.state.searched_stock_products === 'object') ?
                                <RenderProductos is_stock_view={true} products={this.state.searched_stock_products} user_role={this.props.user.role} />
                                : (this.state.stock_products.length > 0) ? 
                                    <RenderProductos is_stock_view={true} products={this.state.stock_products} user_role={this.props.user.role} />
                                :
                                <Row md={12} style={{color:'grey',margin:'auto',textAlign:'center', marginTop:'50px'}}>
                                    <Col md={12}>
                                        <p className='default_text'>No se encontraron productos creados para este día!</p>
                                    </Col>
                                </Row>
                        }
                    </Row>
                </div>
        );
    }
}

export default withRouter(StockProductos);