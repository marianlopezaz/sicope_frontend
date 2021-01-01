// Axios
import axios from "axios";
import Config from './config';
import handleCrudErrors from "./HandleCrudErrors";

const CrudClients = {

    get(auth_token){

        return axios.get(`${Config.api_url}/client/`, {
            headers : {
                Authorization : `Bearer ${auth_token}`
            }
        }).then(json => {
            let response = {
                success : true,
                result: json.data.data
            }
            return response;
        })
        .catch(error => { return handleCrudErrors(error)})
    },

    delete(client_id, auth_token){
        return axios.delete(`${Config.api_url}/client/${client_id}`, {
            headers : {
                Authorization : `Bearer ${auth_token}`
            }
        }).then(json => {
            let response = {
                success : true,
                result: json.data.data
            }
            return response;
        })
        .catch(error => { return handleCrudErrors(error)})
    },

    edit(dataClient, auth_token){
        return axios.post(`${Config.api_url}/client/edit`, dataClient, {
            headers : {
                Authorization : `Bearer ${auth_token}`
            },
           
        }).then((json=>{
            let response = {
                success : true,
                result: json.data.data
            }
            return response;
        })).catch(error => { return handleCrudErrors(error)})
    },

    add(dataClient, auth_token){
        return axios.post(`${Config.api_url}/client/add`, dataClient, {
            headers : {
                Authorization : `Bearer ${auth_token}`
            },
           
        }).then((json=>{
            let response = {
                success : true,
                result: json.data.data
            }
            return response;
        })).catch(error => { return handleCrudErrors(error)})
    }
}

export default CrudClients;