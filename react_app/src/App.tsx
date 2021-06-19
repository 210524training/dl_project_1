import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Router/AppRoutes';
import store from './store';
import { Provider} from 'react-redux';

function App() {
  return (
    <Provider store={store} >
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
    
  );
}

export default App;
