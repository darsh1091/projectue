import { prisma } from '../config/prisma.js';
import { addressSchema } from '../utils/validators.js';

export const listAddresses = async (req, res, next) => {
  try {
    const addresses = await prisma.address.findMany({ where: { userId: req.user.id } });
    res.json(addresses);
  } catch (err) {
    next(err);
  }
};

export const createAddress = async (req, res, next) => {
  try {
    const payload = addressSchema.parse(req.body);
    if (payload.isDefault) {
      await prisma.address.updateMany({ where: { userId: req.user.id }, data: { isDefault: false } });
    }
    const address = await prisma.address.create({ data: { ...payload, userId: req.user.id } });
    res.status(201).json(address);
  } catch (err) {
    next(err);
  }
};

export const updateAddress = async (req, res, next) => {
  try {
    const payload = addressSchema.partial().parse(req.body);
    const address = await prisma.address.update({ where: { id: Number(req.params.id) }, data: payload });
    res.json(address);
  } catch (err) {
    next(err);
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
    await prisma.address.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Address removed' });
  } catch (err) {
    next(err);
  }
};
