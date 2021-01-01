// Axios
import axios from "axios";
import Config from './config';
import handleCrudErrors from "./HandleCrudErrors";

const CrudStock = {

    // Este devuelve los productos con su stock para el dia que se le manda
    getDayStockProducts(day_id, auth_token){
        return axios.get(`${Config.api_url}/stock/${day_id}`, {
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


    //AGREGA UN PRODUCTO AL DÍA CON UN DETERMINADO STOCK 

    addStockProductForTheDay(data,auth_token){

        return axios.post(`${Config.api_url}/stock/save-stock`, data,{
            headers : {
                Authorization : `Bearer ${auth_token}`
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
        .catch(error => { 
            
            return handleCrudErrors(error)});
    }, 


    //ELIMINA UN STOCK DEL DÍA (DA ERROR SI QUANTITY ES DISTINTO A REMAINING)

    deleteStockProductForTheDay(product_id,auth_token){

        return axios.delete(`${Config.api_url}/stock/product/${product_id}`,{
            headers : {
                Authorization : `Bearer ${auth_token}`
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
        .catch(error => { return handleCrudErrors(error)});
    }, 

}

export default CrudStock;