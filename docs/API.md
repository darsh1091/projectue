# API Reference

Base URL: `/api`

## Auth
- `POST /auth/register` – `{name,email,password}` → token + user
- `POST /auth/login` – `{email,password}` → token + user
- `GET /auth/me` – profile + addresses (auth)

## Departments & Categories
- `GET /departments` – list departments with categories
- `GET /departments/categories` – flat category list with department

## Products
- `GET /products` – query params: `search`, `categoryId`, `departmentId`, `brand`, `minPrice`, `maxPrice`, `sort`
- `GET /products/:id` – product detail with reviews and category/department
- `POST /products` – admin only; create product
- `PUT /products/:id` – admin only; update product
- `DELETE /products/:id` – admin only; delete product

## Reviews
- `GET /reviews/:productId` – list reviews for a product
- `POST /reviews` – auth; `{productId, rating, comment}`

## Cart (auth)
- `GET /cart` – list cart items with products
- `POST /cart` – `{productId, quantity}` add/update
- `PUT /cart/:id` – update quantity
- `DELETE /cart/:id` – remove item

## Orders (auth)
- `GET /orders` – list current user orders
- `POST /orders` – `{shippingAddress, shippingMethod}` creates order from cart
- `POST /orders/:id/cancel` – customer cancel if not shipped
- `POST /orders/:id/return` – customer request return
- `PUT /orders/:id/status` – admin update status
- `GET /orders/admin/all` – admin view all

## Addresses (auth)
- `GET /addresses` – list saved addresses
- `POST /addresses` – create address
- `PUT /addresses/:id` – update address
- `DELETE /addresses/:id` – remove address

## Services (auth)
- `GET /services/mine` – current user requests
- `POST /services` – `{type, description, preferredDate}` create request
- `GET /services` – admin/technician view all
- `PUT /services/:id/status` – admin/technician update
