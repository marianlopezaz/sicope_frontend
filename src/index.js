import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css?v=2';
// Componentes y Utilities
import App from './App';
// Router
import { BrowserRouter, withRouter} from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";
import ErrorHandler from './ErrorHandler';
const AppContainer = withRouter(props => <App {...props} />)

if (localStorage["appState"]) {
  var state = localStorage["appState"];
}else{
  let appState = {
    isLoggedIn: false,
    user: {}
  };
  localStorage["appState"] = JSON.stringify(appState);
  state = localStorage["appState"];
}

ReactDOM.render(
 
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
      <ErrorHandler>
        <AppContainer state={state}/>
      </ErrorHandler>
      </MuiPickersUtilsProvider>
    </BrowserRouter>,
  document.getElementById('root')
);


serviceWorker.unregister();
