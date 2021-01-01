// Axios
import axios from "axios";
import Config from './config';
import handleCrudErrors from "./HandleCrudErrors";

const StatsService = {

    getStatsByCenterDay(auth_token){
        return axios.get(`${Config.api_url}/stats-by-center-days`, {
            headers : {
                Authorization : `Bearer ${auth_token}`, 
            }
        }).then((json=>{
            if (json.data.success) {
                let response = {
                    success : true,
                    result: json.data.data
                }
                return response;
            } else {
                let response = {
                    success : false,
                    result: json.data.data
                }
                return response;
            }
        })).catch(error => { return handleCrudErrors(error)})
    },

    getStatsByDay(auth_token){
        return axios.get(`${Config.api_url}/stat`, {
            headers : {
                Authorization : `Bearer ${auth_token}`, 
            }
        }).then((json=>{
            if (json.data.success) {
                let response = {
                    success : true,
                    result: json.data.data
                }
                return response;
            } else {
                let response = {
                    success : false,
                    result: json.data.data
                }
                return response;
            }
        })).catch(error => { return handleCrudErrors(error)})
    },

    getUsersByDay(day_id, auth_token){
        return axios.get(`${Config.api_url}/stat/users-by-day/${day_id}`, {
            headers : {
                Authorization : `Bearer ${auth_token}`, 
            }
        }).then((json=>{
            if (json.data.success) {
                let response = {
                    success : true,
                    result: json.data.data
                }
                return response;
            } else {
                let response = {
                    success : false,
                    result: json.data.data
                }
                return response;
            }
        })).catch(error => { return handleCrudErrors(error)})
    },

    getProductsByCenterDay(day_id, user_id, auth_token){
        return axios.get(`${Config.api_url}/stat/products-by-center-day/${day_id}/${user_id}`, {
            headers : {
                Authorization : `Bearer ${auth_token}`, 
            }
        }).then((json=>{
            if (json.data.success) {
                let response = {
                    success : true,
                    result: json.data.data
                }
                return response;
            } else {
                let response = {
                    success : false,
                    result: json.data.data
                }
                return response;
            }
        })).catch(error => { return handleCrudErrors(error)})
    },

    getProductsByDay(day_id, auth_token){
        return axios.get(`${Config.api_url}/stat/products-by-day/${day_id}`, {
            headers : {
                Authorization : `Bearer ${auth_token}`, 
            }
        }).then((json=>{
            if (json.data.success) {
                let response = {
                    success : true,
                    result: json.data.data
                }
                return response;
            } else {
                let response = {
                    success : false,
                    result: json.data.data
                }
                return response;
            }
        })).catch(error => { return handleCrudErrors(error)})
    },

    getOrdersByCenterDay(day_id, user_id, auth_token){
        return axios.get(`${Config.api_url}/stat/orders-by-center-day/${day_id}/${user_id}`, {
            headers : {
                Authorization : `Bearer ${auth_token}`, 
            }
        }).then((json=>{
            if (json.data.success) {
                let response = {
                    success : true,
                    result: json.data.data
                }
                return response;
            } else {
                let response = {
                    success : false,
                    result: json.data.data
                }
                return response;
            }
        })).catch(error => { return handleCrudErrors(error)})
    }

}

export default StatsService;