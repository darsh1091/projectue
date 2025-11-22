import { prisma } from '../config/prisma.js';
import { cartSchema } from '../utils/validators.js';

export const getCart = async (req, res, next) => {
  try {
    const items = await prisma.cartItem.findMany({
      where: { userId: req.user.id },
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const payload = cartSchema.parse({ ...req.body, productId: Number(req.body.productId), quantity: Number(req.body.quantity) });
    const existing = await prisma.cartItem.findFirst({ where: { userId: req.user.id, productId: payload.productId } });
    let item;
    if (existing) {
      item = await prisma.cartItem.update({ where: { id: existing.id }, data: { quantity: existing.quantity + payload.quantity } });
    } else {
      item = await prisma.cartItem.create({ data: { userId: req.user.id, ...payload } });
    }
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const quantity = Number(req.body.quantity);
    if (!quantity || quantity < 1) return res.status(400).json({ message: 'Quantity must be at least 1' });
    const updated = await prisma.cartItem.update({ where: { id: Number(req.params.id) }, data: { quantity } });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const removeCartItem = async (req, res, next) => {
  try {
    await prisma.cartItem.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Removed' });
  } catch (err) {
    next(err);
  }
};

export const clearCart = async (userId) => {
  await prisma.cartItem.deleteMany({ where: { userId } });
};
