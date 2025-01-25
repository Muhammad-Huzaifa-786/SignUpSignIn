import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/Dashboard';
import Welcome from './components/Welcome';
import ConfirmToken from './components/ConfirmToken';
import SingleProduct from './components/SingleProduct';
import Cart from './components/Cart';

const App = () => (
    <Router>
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/confirmtoken" element={<ConfirmToken />} />
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products/:id" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
    </Router>
);

export default App;
