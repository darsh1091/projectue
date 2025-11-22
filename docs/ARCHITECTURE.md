# Architecture

## High-level
- **Frontend:** React SPA (Vite, Tailwind). Pages for home, product listings, product detail with reviews, cart/checkout, orders, account/addresses, and service scheduling. Auth & cart managed with React Context; API client wraps axios with token header interceptor.
- **Backend:** Express API with modular routes → controllers → Prisma ORM (SQLite). JWT auth middleware sets `req.user`; role guard for admin/technician actions. Centralized error handler surfaces validation errors.
- **Database:** Prisma schema includes Users, Roles, Departments, Categories, Products, Reviews, CartItems, Orders/OrderItems, ServiceRequests, Addresses. Seed script populates departments, categories, products, and baseline users/addresses.

## Module map
- Routes: `auth`, `departments`, `products`, `reviews`, `cart`, `orders`, `services`, `addresses`
- Controllers: validation via Zod schemas (see `src/utils/validators.js`), business logic (order totals, rating aggregation), and role checks
- Middlewares: JWT auth (`requireAuth`), role guard, error handler for API-safe responses

## Requirements coverage
- **Browsing & discovery:** departments/categories, search/filter/sort across price, brand, rating.
- **Cart/checkout:** server-side cart, tax calculation, shipping options, dummy payment placeholder, order creation with items and totals.
- **Orders & returns:** status updates, cancellation/return requests, admin status management.
- **Reviews:** customer reviews per product with aggregated rating updates.
- **Services/repairs:** scheduling with technician/admin visibility.
- **Account:** profile + address book stored in `Address` model.

## Developer workflow
- Run migrations + seed via `npx prisma migrate dev` and `npm run seed`.
- Start API with `npm run dev` (nodemon) and frontend with `npm run dev` under `frontend`.
- Tests: Jest + Supertest for API health (extendable); Vitest scaffold on frontend.
