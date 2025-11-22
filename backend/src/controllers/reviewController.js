import { prisma } from '../config/prisma.js';
import { reviewSchema } from '../utils/validators.js';

export const createReview = async (req, res, next) => {
  try {
    const payload = reviewSchema.parse({ ...req.body, productId: Number(req.body.productId) });
    const product = await prisma.product.findUnique({ where: { id: payload.productId } });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    const review = await prisma.review.create({
      data: { ...payload, userId: req.user.id },
    });
    const stats = await prisma.review.aggregate({
      where: { productId: payload.productId },
      _avg: { rating: true },
      _count: true,
    });
    await prisma.product.update({
      where: { id: payload.productId },
      data: { rating: stats._avg.rating ?? 0 },
    });
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

export const listReviews = async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    const reviews = await prisma.review.findMany({
      where: { productId },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};
