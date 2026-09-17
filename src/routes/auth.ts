import express from 'express';
import { login, register, logout, getMe } from '../controllers/authController';
import { verifyToken } from '../middleware/verifyToken';
const router = express.Router();

router.get('/me', verifyToken, getMe);
router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);

export default router;
