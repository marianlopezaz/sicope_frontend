// Axios
import axios from "axios";
import Config from './config';
import handleCrudErrors from "./HandleCrudErrors";

const CrudDays = {

    getDay(day_id, auth_token){
        return axios.get(`${Config.api_url}/stock/day/${day_id}`, {
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

    
    addNewDay(day, auth_token){
        return axios.post(`${Config.api_url}/stock/day/add`, day, {
            headers : {
                Authorization : `Bearer ${auth_token}`, 
            },
           
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

    getDays(auth_token){
        return axios.get(`${Config.api_url}/stock/day`, {
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
        }).catch(error => { return handleCrudErrors(error)})
    }, 

    getStockOfTheDay(auth_token){
        return axios.get(`${Config.api_url}/stock/product`, {
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

    
    deleteDay(day_id, auth_token){

        return axios.delete(`${Config.api_url}/stock/day/${day_id}`, {
            headers : {Authorization : `Bearer ${auth_token}`}   
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
        })).catch(error => {return handleCrudErrors(error)})
    },


    openCloseDay(data, auth_token){
        return axios.post(`${Config.api_url}/stock/day/open-close`,data, {
            headers : {
                Authorization : `Bearer ${auth_token}`, 
            },
           
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

    
}

export default CrudDays;