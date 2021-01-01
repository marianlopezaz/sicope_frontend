import React, { Component } from 'react';
import './Estadisticas.scss';

// Import componentes
import RenderUserStats from './RenderViews/RenderUserStats';
import RenderAdminStats from './RenderViews/RenderAdminStats';
import EstadisticasSkeletonResponsive from '../Layouts/Skeletons/GralSkeletonResponsive';
import EstadisticasSkeleton from '../Layouts/Skeletons/GralSkeleton';

// Import Services
import StatsService from '../../Utils/StatsService';

// Import dependencias
import Alert from 'react-s-alert';

class Estadisticas extends Component {
    constructor(props){
        super(props);
        this.state = {
            is_loading: true,
            user_day_stats: []
        }
    }

    componentDidMount(){
        if(this.props.user.auth_token){
            if(this.props.user.role === 'admin'){
                StatsService.getStatsByDay(this.props.user.auth_token).then(result => {
                    if(result.success){
                        result.result.forEach(day => {
                            day.day_date =  new Date(`${day.day_date}T03:00:00.000000Z`);
                        })
                        this.setState({ user_day_stats : (result.result).reverse(), is_loading: false})
                    }else{
                        this.setState({ is_loading: false})
                        result.result.forEach(element => {
                            Alert.error(element.message, {
                            position: 'bottom-left',
                            effect: 'genie', 
                            })
                        });
                    }
                })
            }else{
                StatsService.getStatsByCenterDay(this.props.user.auth_token).then(result => {
                    if(result.success){
                        result.result.forEach(day => {
                            day.day_date =  new Date(`${day.day_date}T03:00:00.000000Z`);
                        })
                        this.setState({ user_day_stats : (result.result).reverse(), is_loading: false})
                    }else{
                        this.setState({ is_loading: false})
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
    }

    render() {
        return (
            <div>
                {   
                    (this.state.is_loading) ?
                        (window.screen.width <= '600') ?
                            <EstadisticasSkeletonResponsive />
                        :
                            <EstadisticasSkeleton />
                    : 
                        (this.props.user.role === 'admin') ?
                            <RenderAdminStats user_role={this.props.user.role} days={this.state.user_day_stats}/>
                        :
                            <RenderUserStats user_role={this.props.user.role} days={this.state.user_day_stats}/>
                }
            </div>
        );
    }
}

export default Estadisticas;