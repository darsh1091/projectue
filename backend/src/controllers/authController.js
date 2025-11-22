import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { prisma } from '../config/prisma.js';
import { loginSchema, registerSchema } from '../utils/validators.js';

dotenv.config();

const createToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res, next) => {
  try {
    const payload = registerSchema.parse(req.body);
    const existing = await prisma.user.findUnique({ where: { email: payload.email } });
    if (existing) return res.status(400).json({ message: 'Email already used' });
    const hash = await bcrypt.hash(payload.password, 10);
    const user = await prisma.user.create({ data: { ...payload, password: hash } });
    const token = createToken(user);
    res.json({ token, user: { id: user.id, name: user.name, role: user.role, email: user.email } });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const payload = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: payload.email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(payload.password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    const token = createToken(user);
    res.json({ token, user: { id: user.id, name: user.name, role: user.role, email: user.email } });
  } catch (err) {
    next(err);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { addresses: true },
    });
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role, addresses: user.addresses });
  } catch (err) {
    next(err);
  }
};
