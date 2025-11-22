import { prisma } from '../config/prisma.js';
import { serviceSchema } from '../utils/validators.js';

export const createServiceRequest = async (req, res, next) => {
  try {
    const payload = serviceSchema.parse(req.body);
    const request = await prisma.serviceRequest.create({
      data: {
        type: payload.type,
        description: payload.description,
        preferredDate: new Date(payload.preferredDate),
        userId: req.user.id,
      },
    });
    res.status(201).json(request);
  } catch (err) {
    next(err);
  }
};

export const listMyServices = async (req, res, next) => {
  try {
    const requests = await prisma.serviceRequest.findMany({ where: { userId: req.user.id } });
    res.json(requests);
  } catch (err) {
    next(err);
  }
};

export const listAllServices = async (req, res, next) => {
  try {
    const requests = await prisma.serviceRequest.findMany({ include: { user: true } });
    res.json(requests);
  } catch (err) {
    next(err);
  }
};

export const updateServiceStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const updated = await prisma.serviceRequest.update({ where: { id: Number(req.params.id) }, data: { status } });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};
