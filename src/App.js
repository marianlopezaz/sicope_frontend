// Imports uso en el App
import React from 'react';

// Imports dependencias
import { Switch, Route } from 'react-router-dom';
import $ from "jquery";
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css?v=12';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';

// Imports Componentes
import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import NotFound404 from '../src/Pages/Errors/404/NotFound404';


// Import Utils
import Auth from './Utils/Auth';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: JSON.parse(this.props.state).isLoggedIn,
      user: JSON.parse(this.props.state).user
    }; 

  }

  componentDidMount(){
    if(Object.keys(this.state.user).length > 0){
      if(this.state.user.role === 'admin'){
        $(':root').css({'--main_background': '#f5f5f5' })
      }else if(this.state.user.role === 'user'){
        $(':root').css({'--main_background': '#ECBB3E' })
      }
    }else{
      $(':root').css({'--main_background': '#333333' })
    }
  }

  loginUser = (userCredentials) => {
    // Disable del botton del login
    $("#user-login-btn").attr("disabled", "disabled").html('<i class="fas fa-circle-notch fa-spin"></i>').css({opacity: 0.8, cursor: 'default'});
    // Llamo al Auth
    Auth.login(userCredentials).then(result => {
      if(result.isLoggedIn){
        // Se guarda la data en el localStorage
        localStorage["appState"] = JSON.stringify(result);
        this.setState({
            isLoggedIn: result.isLoggedIn,
            user: result.user
        });
      }else{
        Alert.error(result, {
          position: 'bottom-left',
          effect: 'genie', 
        });
      }
      $("#login-form button").removeAttr("disabled").html("INGRESAR");
    })
  };

  logoutUser = () => {
    Auth.logout(this.state.user.auth_token).then(result => {
      let appState = {
        isLoggedIn: false,
        user: {}
      };
      // Se guarda la data en el localStorage
      localStorage["appState"] = JSON.stringify(appState);
      this.setState(appState);
      this.props.history.push("/login");
      $(':root').css({'--main_background': '#333333' })
      Alert.success(result, {
        position: 'bottom-left',
        effect: 'genie', 
      });
    })
  };
  
  render() {
    if (
      !this.state.isLoggedIn &&
      (this.props.location.pathname !== "/login" ||
      this.props.location.pathname === "/")
    ) {
      this.props.history.push("/login");
    }
    if (
      this.state.isLoggedIn &&
      (this.props.location.pathname === "/login" ||
      this.props.location.pathname === "/" || 
      this.props.location.pathname === "/dashboard")
    ) {
      if(this.state.user.role === 'admin'){
        $(':root').css({'--main_background': '#f5f5f5' })
        this.props.history.push("/dashboard/estadisticas");
      }else if(this.state.user.role === 'user'){
        $(':root').css({'--main_background': '#ECBB3E' });
        this.props.history.push("/dashboard/estadisticas");
      }
    }
    return (
      <div>
        <Alert timeout={5000} stack={true}/>
        <Switch>
            <Route
              path="/dashboard"
              render={(props) => (
                <Dashboard
                  {...props}
                  logoutUser={this.logoutUser}
                  user={this.state.user}
                  location={this.props.location}
                  client={this.state.client}
                />
              )}
            />
            <Route
              path="/login"
              render={() => <Login loginUser={this.loginUser}/>}
            />
            {/* Redirect 404 Error */}
            <Route component={NotFound404} />
        </Switch>
      </div>
    );
  }
}

export default App;
