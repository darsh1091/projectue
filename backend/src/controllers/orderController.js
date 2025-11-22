import { prisma } from '../config/prisma.js';
import { clearCart } from './cartController.js';
import { orderSchema } from '../utils/validators.js';

export const createOrder = async (req, res, next) => {
  try {
    const payload = orderSchema.parse(req.body);
    const cartItems = await prisma.cartItem.findMany({ where: { userId: req.user.id }, include: { product: true } });
    if (!cartItems.length) return res.status(400).json({ message: 'Cart is empty' });
    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const tax = Number((subtotal * 0.07).toFixed(2));
    const total = subtotal + tax;
    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        total,
        tax,
        shippingAddress: payload.shippingAddress,
        shippingMethod: payload.shippingMethod,
        items: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: { items: true },
    });
    await clearCart(req.user.id);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const listOrders = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const listAllOrders = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      include: { items: { include: { product: true } }, user: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const updated = await prisma.order.update({ where: { id: Number(req.params.id) }, data: { status } });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const requestCancel = async (req, res, next) => {
  try {
    const order = await prisma.order.findUnique({ where: { id: Number(req.params.id) } });
    if (!order || order.userId !== req.user.id) return res.status(404).json({ message: 'Order not found' });
    if (['SHIPPED', 'DELIVERED'].includes(order.status))
      return res.status(400).json({ message: 'Order already shipped, request return instead' });
    const updated = await prisma.order.update({ where: { id: order.id }, data: { status: 'CANCELLED' } });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const requestReturn = async (req, res, next) => {
  try {
    const order = await prisma.order.findUnique({ where: { id: Number(req.params.id) } });
    if (!order || order.userId !== req.user.id) return res.status(404).json({ message: 'Order not found' });
    const updated = await prisma.order.update({ where: { id: order.id }, data: { status: 'RETURN_REQUESTED' } });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};
