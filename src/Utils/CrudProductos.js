// Axios
import axios from "axios";
import Config from './config';
import handleCrudErrors from "./HandleCrudErrors";

const CrudProductos = {

    getAll(auth_token){
        return axios.get(`${Config.api_url}/product-template`, {
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
        .catch(error => { return handleCrudErrors(error)});
    }, 

    add(product, auth_token){
        return axios.post(`${Config.api_url}/product-template/add`, product, {
            headers : {
                Authorization : `Bearer ${auth_token}`, 
            },
           
        }).then((json=>{
            let response = {
                success : true,
                result: json.data.data
            }
            return response;
        })).catch(error => { return handleCrudErrors(error)});
    }, 

    delete(product_id, auth_token){
        return axios.delete(`${Config.api_url}/product-template/${product_id}`, {
            headers : {
                Authorization : `Bearer ${auth_token}`
            }
        }).then(json => {
            let response = {
                success : true,
                result: json.data.data
            }
            return response;
        }).catch(error => { return handleCrudErrors(error)})
    }, 

    edit(product, auth_token){
        return axios.post(`${Config.api_url}/product-template/edit`, product, {
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

export default CrudProductos