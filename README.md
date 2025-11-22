# OnMart Superstore

A production-style, Amazon-inspired ecommerce experience featuring departments, product browsing, cart + checkout, orders, returns, reviews, and service scheduling. Backend powered by Express/Prisma (SQLite), frontend by React + Tailwind.

## Project structure
- `backend` – Node.js/Express API, Prisma schema, seeders, Jest tests
- `frontend` – React SPA with Vite, Tailwind UI, auth & cart context
- `docs` – architecture, API surface, UX notes

## Getting started
1. **Backend**
```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run seed
npm run dev
```

2. **Frontend**
```bash
cd frontend
npm install
npm run dev
```

## Environment variables
Copy `backend/.env.example` to `backend/.env`:
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="supersecret"
PORT=4000
```

## Seeded accounts
- Admin: `admin@onmart.com` / `password123`
- Customer: `customer@onmart.com` / `password123`

## Key features
- Departments & categories with rich product listings, filters, search, and ratings
- Secure auth with role-based admin controls for catalog and order status
- Cart + checkout with dummy payment, tax calculation, and saved addresses
- Order history with cancellation/return requests and status badges
- Reviews tied to products and average rating updates
- Service/repair scheduling with technician/admin visibility
- Account area for profile and address book management

## Tests
- Backend: `cd backend && npm test`
- Frontend: `cd frontend && npm test` (Vitest)

## Repository workflow
To push this code to your GitHub repository on the `main` branch:
1. Add your remote: `git remote add origin https://github.com/darsh1091/projectue.git`
2. Ensure you are on `main` (create it from current work if needed):
   ```bash
   git checkout -B main
   ```
3. Push all contents: `git push -u origin main`

All application source is already present in `backend`, `frontend`, `prisma`, and `docs` along with the root documentation.
