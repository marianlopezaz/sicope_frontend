import React, { Suspense } from 'react';
import './Dashboard.scss'

// Imports dependencias
import { Switch, Route, Redirect} from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";

// Import Componentes
import Navbar from '../../Components/Layouts/NavBar/NavBar';
import Header from '../../Components/Layouts/Header/Header';

// Import Lazy
const Estadisticas =  React.lazy(() => import('../../Components/Estadisticas/Estadisticas'));
const NotFound404 = React.lazy(() => import('../Errors/404/NotFound404'));
const Usuarios = React.lazy(() => import('../../Components/Usuarios/Usuarios'));
const Productos = React.lazy(() => import('../../Components/Productos/Productos'));
const Dias = React.lazy(() => import('../../Components/Dias/Dias'));
const Pedidos = React.lazy(() => import('../../Components/Pedidos/Pedidos'));
const Dia = React.lazy(() => import('../../Components/Dia/Dia'));
const Clientes = React.lazy(() => import('../../Components/Clientes/Clientes'));
// const Stock = React.lazy(() => import('../../Components/Stock/Stock'));
// const StockProductos = React.lazy(() => import('../../Components/StockProductos/StockProductos'));
const PedidosDia = React.lazy(() => import('../../Components/PedidosDia/PedidosDia'));
const DiaUsuarioEstadisticas = React.lazy(() => import('../../Components/DiaUsuarioEstadisticas/DiaUsuarioEstadisticas'));
const EstadisticasPedidosCentro = React.lazy(() => import('../../Components/EstadisticasPedidosCentro/EstadisticasPedidosCentro'));
const DiaEstadisticas = React.lazy(() => import('../../Components/DiaEstadisticas/DiaEstadisticas'));
const ProductosEstadisticas = React.lazy(() => import('../../Components/ProductosEstadisticas/ProductosEstadisticas'));

const Loader = () => {
    return(
        <ClipLoader
            css={[
                {display:'flex'},
                {margin: '0 auto'},
                {marginBottom: 25},
                {borderColor: 'var(--main_color)'},
                {position: 'absolute'},
                {top: '49%'},
                {left: '48%'}
            ]}
            size={35}
        />
    )
}

const Dashboard = (props) =>{


        return (
            <div>
                <div id='navigation_container'>
                    <Header user={props.user} logoutUser={props.logoutUser}/>
                    <Navbar user={props.user} />
                </div>
                <Suspense fallback={<Loader />}>
                    <Switch>                                                                 
                        <Route exact path='/dashboard/estadisticas' component={() => <Estadisticas user={props.user}/>}/>
                        {
                            (props.user.role === 'admin') ?
                                <div> 
                                    <Route exact path='/dashboard/productos' component={() => <Productos user={props.user}/>}/>
                                    <Route exact path='/dashboard/usuarios' component={() => <Usuarios user={props.user}/>}/>
                                    <Route exact path='/dashboard/clientes' component={() => <Clientes user={props.user}/>}/>
                                    <Route exact path='/dashboard/dias' component = {()=><Dias user={props.user}/>}/>
                                    <Route exact path='/dashboard/dias/:day_id' component = {()=><Dia user={props.user}/>}/>
                                    <Route exact path='/dashboard/estadisticas/:day_id' component={() => <DiaEstadisticas user={props.user}/>}/>
                                    <Route exact path='/dashboard/estadisticas/:day_id/:user_id' component={() => <DiaUsuarioEstadisticas user={props.user}/>}/>
                                    <Route exact path='/dashboard/admin/estadisticas/:day_id' component={() => <ProductosEstadisticas user={props.user}/>}/>
                                </div>
                            : (props.user.role === 'user') ?
                                <div>
                                    <Route exact path='/dashboard/pedidos' component={() => <Pedidos user={props.user}/>}/>
                                    {/* <Route exact path='/dashboard/stock' component={()=><Stock user={props.user}/>}/>
                                    <Route exact path='/dashboard/stock/:day_id' component={()=><StockProductos user={props.user}/>}/> */}
                                    <Route exact path='/dashboard/pedidos/:day_id' component={()=><PedidosDia user={props.user}/>}/>
                                    <Route exact path='/dashboard/estadisticas/:day_id/:user_id' component={() => <EstadisticasPedidosCentro user={props.user}/>}/>
                                </div>
                            :
                                <Redirect to='/404' />
                        }
                        {/* Redirect 404 Error */}
                        <Route path='/404' component={NotFound404} />
                        <Redirect to='/404' />
                    </Switch>
                </Suspense>
            </div>
        );
    
}

export default Dashboard;