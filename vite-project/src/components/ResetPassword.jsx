import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

const ResetPassword = () => {
    const { token } = useParams(); // Extract the token from the URL
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/reset-password', { token, newPassword });
            alert(data.message);
            navigate('/login'); // Redirect to login page
        } catch (error) {
            alert(error.response?.data?.error || 'Failed to reset password');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Reset Password</h2>
            <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
            <button type="submit">Reset Password</button>
        </form>
    );
};

export default ResetPassword;
