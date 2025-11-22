import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@onmart.com' },
    update: {},
    create: { name: 'Admin User', email: 'admin@onmart.com', password, role: 'ADMIN' },
  });
  const customer = await prisma.user.upsert({
    where: { email: 'customer@onmart.com' },
    update: {},
    create: { name: 'Jane Shopper', email: 'customer@onmart.com', password, role: 'CUSTOMER' },
  });

  const departments = await prisma.department.createMany({
    data: [
      { name: 'Electronics', description: 'Devices and entertainment' },
      { name: 'Home & Kitchen', description: 'Furniture, decor, and appliances' },
      { name: 'Grocery', description: 'Everyday essentials' },
      { name: 'Clothing & Shoes', description: 'Wardrobe and lifestyle' },
      { name: 'Office & School', description: 'Work-ready supplies' },
    ],
    skipDuplicates: true,
  });

  const departmentsList = await prisma.department.findMany();
  const byName = Object.fromEntries(departmentsList.map((d) => [d.name, d.id]));

  const categories = await prisma.category.createMany({
    data: [
      { name: 'Laptops', departmentId: byName['Electronics'] },
      { name: 'Televisions', departmentId: byName['Electronics'] },
      { name: 'Cameras', departmentId: byName['Electronics'] },
      { name: 'Furniture', departmentId: byName['Home & Kitchen'] },
      { name: 'Appliances', departmentId: byName['Home & Kitchen'] },
      { name: 'Pantry', departmentId: byName['Grocery'] },
      { name: 'Produce', departmentId: byName['Grocery'] },
      { name: 'Men', departmentId: byName['Clothing & Shoes'] },
      { name: 'Women', departmentId: byName['Clothing & Shoes'] },
      { name: 'School Supplies', departmentId: byName['Office & School'] },
    ],
    skipDuplicates: true,
  });

  const cats = await prisma.category.findMany();
  const cat = Object.fromEntries(cats.map((c) => [c.name, c.id]));

  await prisma.product.createMany({
    data: [
      { name: 'Apex Ultrabook 14" Laptop', description: 'Lightweight productivity laptop with 16GB RAM and 1TB SSD', price: 1099.99, stock: 25, brand: 'Apex', categoryId: cat['Laptops'], image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8' },
      { name: 'Nimbus 4K Smart TV 55"', description: 'Vivid colors with Dolby Vision and integrated voice assistant', price: 799.5, stock: 30, brand: 'Nimbus', categoryId: cat['Televisions'], image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04' },
      { name: 'Cozia Fabric Sectional Sofa', description: 'Family-sized comfort with modular pieces and spill-resistant fabric', price: 1299.0, stock: 10, brand: 'Cozia', categoryId: cat['Furniture'], image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e' },
      { name: 'EverFresh Countertop Blender', description: 'Smoothies and soups in seconds with stainless steel blades', price: 149.0, stock: 40, brand: 'EverFresh', categoryId: cat['Appliances'], image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc' },
      { name: 'Daily Harvest Organic Oats', description: 'Hearty breakfast staple sourced from small farms', price: 7.99, stock: 200, brand: 'Daily Harvest', categoryId: cat['Pantry'], image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836' },
      { name: 'Summit Noise-Cancelling Headphones', description: 'Comfortable travel headset with 35-hour battery life', price: 249.99, stock: 50, brand: 'Summit', categoryId: cat['Cameras'], image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d' },
      { name: 'Aurora Cotton T-Shirt', description: 'Breathable everyday tee with moisture-wicking tech', price: 19.99, stock: 150, brand: 'Aurora', categoryId: cat['Men'], image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab' },
      { name: 'Stellar Running Shoes', description: 'Supportive sneakers built for miles with responsive foam', price: 129.99, stock: 70, brand: 'Stellar', categoryId: cat['Women'], image: 'https://images.unsplash.com/photo-1528701800489-20be9e62fd16' },
      { name: 'Campus Classic Notebook 6-Pack', description: 'Durable, bleed-resistant paper ideal for school and work', price: 14.5, stock: 300, brand: 'Campus', categoryId: cat['School Supplies'], image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f' },
    ],
    skipDuplicates: true,
  });

  await prisma.address.createMany({
    data: [
      {
        line1: '123 Market Street',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94103',
        country: 'USA',
        userId: customer.id,
        isDefault: true,
      },
      {
        line1: '45 Warehouse Way',
        city: 'Oakland',
        state: 'CA',
        postalCode: '94607',
        country: 'USA',
        userId: admin.id,
        isDefault: true,
      },
    ],
    skipDuplicates: true,
  });

  console.log({ admin, customer, categories, departments });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
