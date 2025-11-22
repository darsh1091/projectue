import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['CUSTOMER', 'ADMIN', 'TECHNICIAN']).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  brand: z.string().min(2),
  image: z.string().url().optional(),
  categoryId: z.number().int(),
});

export const cartSchema = z.object({
  productId: z.number().int(),
  quantity: z.number().int().positive(),
});

export const orderSchema = z.object({
  shippingAddress: z.string().min(5),
  shippingMethod: z.string().min(3),
});

export const serviceSchema = z.object({
  type: z.string().min(3),
  description: z.string().min(5),
  preferredDate: z.string(),
});

export const reviewSchema = z.object({
  productId: z.number().int(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(3),
});

export const addressSchema = z.object({
  line1: z.string().min(3),
  line2: z.string().optional(),
  city: z.string().min(2),
  state: z.string().min(2),
  postalCode: z.string().min(3),
  country: z.string().min(2),
  isDefault: z.boolean().optional(),
});
