import { prisma } from '../config/prisma.js';
import { productSchema } from '../utils/validators.js';

export const listProducts = async (req, res, next) => {
  try {
    const { search, categoryId, departmentId, sort, brand, minPrice, maxPrice } = req.query;
    const where = {};
    if (search) where.name = { contains: search, mode: 'insensitive' };
    if (categoryId) where.categoryId = Number(categoryId);
    if (departmentId) where.category = { departmentId: Number(departmentId) };
    if (brand) where.brand = { contains: brand, mode: 'insensitive' };
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }
    const orderBy = sort === 'price_asc'
      ? { price: 'asc' }
      : sort === 'price_desc'
      ? { price: 'desc' }
      : sort === 'rating'
      ? { rating: 'desc' }
      : { createdAt: 'desc' };
    const products = await prisma.product.findMany({
      where,
      include: { category: { include: { department: true } }, reviews: true },
      orderBy,
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        reviews: { include: { user: true }, orderBy: { createdAt: 'desc' } },
        category: { include: { department: true } },
      },
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const payload = productSchema.parse({ ...req.body, price: Number(req.body.price), stock: Number(req.body.stock), categoryId: Number(req.body.categoryId) });
    const product = await prisma.product.create({ data: payload });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const payload = productSchema.partial().parse({ ...req.body, price: req.body.price ? Number(req.body.price) : undefined, stock: req.body.stock ? Number(req.body.stock) : undefined, categoryId: req.body.categoryId ? Number(req.body.categoryId) : undefined });
    const updated = await prisma.product.update({ where: { id: Number(req.params.id) }, data: payload });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await prisma.product.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};
