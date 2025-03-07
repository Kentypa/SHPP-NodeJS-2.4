import { Router } from 'express';
import { register, login, logout } from '../controllers/authController';
import { getItems, createItem, updateItem, deleteItem } from '../controllers/itemController';
import checkAuth from '../middleware/auth';
import { routerHandler } from '../config/routes';

const router = Router();

router.all('/api/v2/router', (req, res) => {
  const action = req.query.action as string;

  if (!routerHandler[action]) {
    res.status(404).json({ error: `Action '${action}' not found` });
  }

  Promise.all(
    routerHandler[action].map(
      (handler) =>
        new Promise<void>((resolve, reject) => {
          handler(req, res, (err) => (err ? reject(err) : resolve()));
        }),
    ),
  );
});

router.post('/api/v1/register', register);
router.post('/api/v1/login', login);
router.post('/api/v1/logout', logout);

router.get('/api/v1/items', checkAuth, getItems);
router.post('/api/v1/items', checkAuth, createItem);
router.put('/api/v1/items', checkAuth, updateItem);
router.delete('/api/v1/items', checkAuth, deleteItem);

export default router;
