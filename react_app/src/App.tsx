import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Router/AppRoutes';
import store from './store';
import { Provider} from 'react-redux';
import NavbarComponent from './Components/navbar/NavbarComponent';

function App() {
  return (
    <Provider store={store} >
      
      <Router>
        <NavbarComponent/>
        <AppRoutes />
      </Router>
    </Provider>
    
  );
}

export default App;
