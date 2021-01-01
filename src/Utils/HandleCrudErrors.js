const handleCrudErrors = (error) =>{
    let response = {}
        if(error.response){
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
        }else{
            response = {
                success : false,
                result: [
                    {
                        message: 'Error de conexión'
                    }
                ]
            }
        }
        return response;
}

export default handleCrudErrors;