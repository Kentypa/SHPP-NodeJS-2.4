import { Request, Response } from 'express';
import User from '../models/User';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { login, pass } = req.body;
    const existingUser = await User.findOne({ login });
    if (existingUser) {
      res.status(400).json({ ok: false, error: 'User already exists' });
    } else {
      const user = new User({ login, pass });
      await user.save();
      res.json({ ok: true });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { login, pass } = req.body;
    const user = await User.findOne({ login });
    if (user && user.pass === pass) {
      req.session.user = user._id.toString();
      res.json({ ok: true });
    } else {
      res.status(401).json({ ok: false, error: 'Invalid credentials' });
    }
  } catch {
    res.status(500).json({ ok: false, error: 'Server error' });
  }
};

export const logout = (req: Request, res: Response): void => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ ok: false, error: 'Logout failed' });
      }
      res.clearCookie('connect.sid');
      res.json({ ok: true });
    });
  } catch {
    res.status(500).json({ error: `Internal server error` });
  }
};
