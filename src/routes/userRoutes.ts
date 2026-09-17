import express from 'express';
import { getAllUsers, getUser, patchUser, deleteUser } from '../controllers/userController';
import { verifyToken } from '../middleware/verifyToken';
import { verifyAdmin } from '../middleware/verifyAdmin';

const router = express.Router();

router.get('/', verifyToken, verifyAdmin, getAllUsers);
router.get('/:id', verifyToken, getUser);
router.patch('/:id', verifyToken, patchUser);
router.delete('/:id', verifyToken, deleteUser);

export default router;
