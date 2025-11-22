import { prisma } from '../config/prisma.js';

export const listDepartments = async (req, res, next) => {
  try {
    const departments = await prisma.department.findMany({
      include: { categories: true },
      orderBy: { name: 'asc' },
    });
    res.json(departments);
  } catch (err) {
    next(err);
  }
};

export const listCategories = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({ include: { department: true } });
    res.json(categories);
  } catch (err) {
    next(err);
  }
};
