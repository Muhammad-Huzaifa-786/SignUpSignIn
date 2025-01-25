import express from 'express';
import { register, login, forgotPassword, resetPassword,confirmToken } from '../controllers/authController.js'; // Add `.js` extension

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/confirm-token/:email', confirmToken);

export default router;
