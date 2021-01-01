// Axios
import axios from "axios";
import Config from './config';

const Auth = {

    login(userCredentials){
        return axios.post(`${Config.api_url}/user/login/`, userCredentials).then(json => {
            if (json.data.success) {
                const { name, id, user_name, role, auth_token, expire_time } = json.data.data;
                let userData = {
                    name,
                    id,
                    user_name,
                    auth_token,
                    role,
                    expire_time,
                    timestamp: new Date().toString()
                };
                let appState = {
                    isLoggedIn: true,
                    user: userData
                };
                return appState;
            } else {
                return `${json.data.data}. Intenta nuevamente!`;
            };
        })
        .catch(error => {
            return 'Error interno del servidor';
        });
    },

    logout(auth_token){
        return axios.get(`${Config.api_url}/user/logout/`, {
            headers : {
                Authorization : `Bearer ${auth_token}`
            }
        }).then(json => {
            if (json.data.success) {
                return json.data.data;
            } else {
                return `${json.data.data}. Intenta nuevamente!`;
            };
        })
        .catch(error => {
            return 'Error interno del servidor';
        });
    }
}

export default Auth;