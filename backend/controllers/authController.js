import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const tokenss = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        // Create and save the new user
        const user = new User({ name, email, password, token: tokenss, isLogin: false });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Token',
            html: `
                <h2>Token</h2>
                <p>${tokenss}</p>
                <p>This token will expire in 15 minutes.</p>
            `,
        };
        console.log(mailOptions);

        await transporter.sendMail(mailOptions);

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
}; export const confirmToken = async (req, res) => {
    try {
        const { email } = req.params; // Extract email from URL params
        const { token } = req.body; // Extract token from the body

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        // Check if the token matches the user's token
        if (token === user.token) {
            return res.status(200).json({ message: "Valid Token, Thank you" });
        } else {
            return res.status(400).json({ message: "Invalid Token, Sorry" });
        }

    } catch (error) {
        console.error('Error during token confirmation:', error);
        res.status(500).json({ error: 'Error confirming token' });
    }
};



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        console.log('Email received:', email);

        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        console.log('Reset token generated:', resetToken);

        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
        await user.save();
        console.log('User updated with reset token');

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        console.log('Reset link:', resetLink);

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: user.email,
            subject: 'Password Reset Request',
            html: `
                <h2>Password Reset</h2>
                <p>Click the link below to reset your password:</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>This link will expire in 15 minutes.</p>
            `,
        };
        console.log(mailOptions);

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');

        res.status(200).json({ message: 'Password reset link sent' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error sending password reset link' });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decoded.id, resetToken: token });
        if (!user || user.resetTokenExpiry < Date.now())
            return res.status(400).json({ error: 'Invalid or expired token' });

        user.password = newPassword;
        user.resetToken = '';
        user.resetTokenExpiry = null;
        await user.save();
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error resetting password' });
    }
};
