import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import App from './App';
import { Provider } from 'react-redux';
import {store} from './store';
import {BrowserRouter as Router} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

ReactDOM.render(
  <ChakraProvider theme={theme}>
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
      <ToastContainer />
    </Provider>
  </React.StrictMode>
  </ChakraProvider>,
  
  document.getElementById('root')
);