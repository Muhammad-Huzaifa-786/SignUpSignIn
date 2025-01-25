import React from 'react';
import { Navigate } from 'react-router-dom';
import Product from './Product.jsx';
import AddProducts from './AddProducts.jsx';
import Counter from '../Pages/Counter.jsx';
import Jobs from '../Pages/Jobs.jsx';

const Dashboard = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" />;
    }
    return (
        <>
            <h2>Welcome to your Dashboard</h2>
            <AddProducts />
            <Product />

            <Counter/>
            <Jobs/>
        </>
    )
};

export default Dashboard;
