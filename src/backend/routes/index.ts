import express from 'express';
import { register, login, logout } from '../controllers/authController';
import { getItems, createItem, updateItem, deleteItem } from '../controllers/itemController';
import checkAuth from '../middleware/auth';

const router = express.Router();

router.post('/api/v1/register', register);
router.post('/api/v1/login', login);
router.post('/api/v1/logout', logout);

router.get('/api/v1/items', checkAuth, getItems);
router.post('/api/v1/items', checkAuth, createItem);
router.put('/api/v1/items', checkAuth, updateItem);
router.delete('/api/v1/items', checkAuth, deleteItem);

export default router;
