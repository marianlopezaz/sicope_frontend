import React, { useEffect } from 'react';
import './Login.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Logo from '../../Components/Layouts/Images/logo.png';
import TextField from '@material-ui/core/TextField';

const Login = (props) => {

    const [ user_credentials, setCredentials ] = React.useState({
        user_name: '',
        password: ''
    });

    useEffect(() => {
        var link = document.createElement('meta');
        link.setAttribute('name', 'theme-color');
        link.content = '#333333';
        document.getElementsByTagName('head')[0].appendChild(link);
    }, []);

    const handleChange = e => {
        setCredentials({...user_credentials, [e.target.name] : e.target.value});
    }

    const handleLogin = e => {
        e.preventDefault();
        props.loginUser(user_credentials);
    };
    return (
        <Container fluid>
            <Row>
                <Col className='center'>
                    <img id='logo_cliente_login' src={Logo} alt='Logo' />
                </Col>
            </Row>
            <Row >
                <Col>
                    <Col className='center' id='datafields_container'>
                        <Row className='center'>
                            <Col>
                                <p id='p_iniciar_sesion'>Iniciar Sesión</p>
                            </Col>
                        </Row>
                        <form id="login-form" action="" onSubmit={handleLogin} method="post">
                        
                        <Row className='center'>
                            <Col>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Usuario"
                                    type="text"
                                    fullWidth
                                    title='Usuario'
                                    value={user_credentials.user_name}
                                    onChange={handleChange}
                                    id="user-input"
                                    name="user_name"
                                />
                            </Col>
                        </Row>
                        <Row className='center'>
                            <Col>
                                <TextField
                                    margin="dense"
                                    label="Contraseña"
                                    fullWidth
                                    title='Contraseña'
                                    value={user_credentials.password}
                                    onChange={handleChange}
                                    id="password-input"
                                    name="password"
                                    type="password"
                                />
                            </Col>
                        </Row>
                        <Row className='center'>
                            <Col id='ingresar_btn'>
                
                            <button title='Iniciar Sesión'
                            type="submit"
                            className="landing-page-btn center-block text-center"
                            id="user-login-btn"
                            >
                            INGRESAR
                            </button>
                        
                            </Col>
                        </Row>
                        </form>
                    </Col>
                </Col>
            </Row>
        </Container>
        
    );
}

export default Login;