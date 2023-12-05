import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/LoginUser';
import Home from './pages/Home'
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import OrderFood from './components/OrderFood';
import Myorders from './components/Myorders.jsx';

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<PrivateRoute  />}>
              <Route path='/' element={<Home/>}/>
            </Route>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/order' element={<PrivateRoute  />}>
              <Route path='/order' element={<OrderFood/>}></Route>
            </Route>
            <Route path='/my-order' element={<PrivateRoute  />}>
              <Route path='/my-order' element={<Myorders/>}></Route>
            </Route>
          </Routes>

        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
