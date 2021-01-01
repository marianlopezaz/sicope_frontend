// Axios
import axios from "axios";
import Config from './config';
import handleCrudErrors from "./HandleCrudErrors";

const CrudOrders = {

    getDayOrdersUser(day_id, auth_token){
        return axios.get(`${Config.api_url}/order/${day_id}`, {
            headers : {
                Authorization : `Bearer ${auth_token}`, 
            }
        }).then(json => {
            if(json.data.success){
                let response = {
                    success : true,
                    result: json.data.data
                }
                return response;
            }else{
                let response = {
                    success : false,
                    result: json.data.data
                }
                return response;
            }
        })
        .catch(error => { return handleCrudErrors(error)})
    },

    add(data, auth_token){
        return axios.post(`${Config.api_url}/order/add`, data, {
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

    edit(data, auth_token){
        return axios.post(`${Config.api_url}/order/edit`, data, {
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

    delete(order_id, auth_token){
        return axios.delete(`${Config.api_url}/order/${order_id}`, {
            headers : {
                Authorization : `Bearer ${auth_token}`, 
            }
        }).then(json => {
            if(json.data.success){
                let response = {
                    success : true,
                    result: json.data.data
                }
                return response;
            }else{
                let response = {
                    success : false,
                    result: json.data.data
                }
                return response;
            }
        })
        .catch(error => { return handleCrudErrors(error)})
    }

}

export default CrudOrders;