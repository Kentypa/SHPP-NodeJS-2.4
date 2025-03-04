import { Request, Response } from 'express';
import Item from '../models/Item';

export const getItems = async (req: Request, res: Response): Promise<void> => {
  const userId = req.session.user;
  const items = await Item.find({ userId });
  const formattedItems = items.map((item) => ({
    id: item._id.toString(),
    text: item.text,
    checked: item.checked,
  }));
  res.json({ items: formattedItems });
};

export const createItem = async (req: Request, res: Response): Promise<void> => {
  const userId = req.session.user;
  const item = new Item({ text: req.body.text, checked: false, userId });
  await item.save();
  res.json({ id: item._id });
};

export const updateItem = async (req: Request, res: Response): Promise<void> => {
  const userId = req.session.user;
  const item = await Item.findOne({ _id: req.body.id, userId });
  if (item) {
    item.text = req.body.text;
    item.checked = req.body.checked;
    await item.save();
    res.json({ ok: true });
  } else {
    res.status(404).json({ ok: false, error: 'Task not found' });
  }
};

export const deleteItem = async (req: Request, res: Response): Promise<void> => {
  const userId = req.session.user;
  const result = await Item.findOneAndDelete({ _id: req.body.id, userId });
  if (result) {
    res.json({ ok: true });
  } else {
    res.status(404).json({ ok: false, error: 'Task not found' });
  }
};
