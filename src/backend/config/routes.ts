import { Request, Response, NextFunction } from 'express';
import { register, login, logout } from '../controllers/authController';
import { getItems, createItem, deleteItem, updateItem } from '../controllers/itemController';
import checkAuth from '../middleware/auth';

type RouteHandler = (req: Request, res: Response, next: NextFunction) => void;

export const routerHandler: Record<string, RouteHandler[]> = {
  register: [register],
  login: [login],
  logout: [logout],
  getItems: [checkAuth, getItems],
  addItem: [checkAuth, createItem],
  deleteItem: [checkAuth, deleteItem],
  editItem: [checkAuth, updateItem],
};
