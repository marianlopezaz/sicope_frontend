// Axios
import axios from "axios";
import Config from './config';
import handleCrudErrors from "./HandleCrudErrors";

const OrderService = {

    changeLoad(data, auth_token){
        return axios.post(`${Config.api_url}/order/load`, data, {
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

    printMultipleOrders(data, auth_token){
        return axios.post(`${Config.api_url}/order/print`, data, {
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

    printOrder(data){
        return axios.post(`${Config.print_url}`, data).then((json=>{
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

export default OrderService;