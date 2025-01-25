import React, { useState } from 'react';
import API from '../api';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/forgot-password', { email });
            alert(data.message);
        } catch (error) {
            alert(error.response?.data?.error || 'Failed to send reset link');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Forgot Password</h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit">Send Reset Link</button>
        </form>
    );
};

export default ForgotPassword;
