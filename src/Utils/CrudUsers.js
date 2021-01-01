// Axios
import axios from "axios";
import Config from './config';
import handleCrudErrors from "./HandleCrudErrors";

const CrudUsers = {

    getUsers(auth_token){

        return axios.get(`${Config.api_url}/user/list`, {
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
        .catch(error => {
            if(error.response){
                let response = {}
                if(error.response.status === 400){
                    response = {
                        success : false,
                        result: error.response.data.data
                    }
                }else if(error.response.status === 401){
                    response = {
                        success : false,
                        result: [
                            {
                                message: 'Permisos insuficientes para acceder a esta dirección'
                            }
                        ]
                    }
                }else if(error.response.status === 404){
                    response = {
                        success : false,
                        result: [
                            {
                                message: 'Error interno del servidor'
                            }
                        ]
                    }
                }else if(error.response.status === 500){
                    response = {
                        success : false,
                        result: [
                            {
                                message: 'Error interno del servidor'
                            }
                        ]
                    }
                }
                return response;
            }else{
                return {
                    success : false,
                    result: [
                        {
                            message: 'Error interno del servidor'
                        }
                    ]
                };
            }
        });
    },

    delete(user_id, auth_token){
        return axios.delete(`${Config.api_url}/user/${user_id}`, {
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

    edit(dataUser, auth_token){
        return axios.post(`${Config.api_url}/user/edit`, dataUser, {
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

    add(dataUser, auth_token){
        return axios.post(`${Config.api_url}/user/add`, dataUser, {
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

export default CrudUsers;