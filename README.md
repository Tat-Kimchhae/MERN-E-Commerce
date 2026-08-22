# MERN E-Commerce

A full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js), featuring a customer-facing storefront and a separate admin panel for managing products and orders.

## 🔗 Live Demo

- **Storefront:** https://mern-e-commerce-front-end-ivory.vercel.app/
- **Admin Panel:** https://mern-e-commerce-nine-phi.vercel.app/
- **API:** https://mern-e-commerce-j9we.onrender.com/

> Note: the backend is hosted on Render's free tier, so the first request after a period of inactivity may take 30–60 seconds to spin up.

## 🛠 Tech Stack

**Frontend / Admin**
- React
- Vite

**Backend**
- Node.js / Express
- MongoDB (Mongoose)
- JWT authentication
- Multer (file uploads)
- Cloudinary (image storage)

## 📁 Project Structure

```
MERN-E-Commerce/
├── frontend/   # Customer-facing storefront (React + Vite)
├── admin/      # Admin dashboard (React + Vite)
└── backend/    # REST API (Node/Express/MongoDB)
```

## ✨ Features

- User registration and authentication (JWT-based)
- Product browsing, search, and filtering
- Shopping cart and checkout flow
- Order placement and order history
- Admin dashboard for managing products, orders, and inventory
- Image uploads via Cloudinary

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js
- MongoDB instance (local or Atlas)
- Cloudinary account (for image uploads)

### 1. Clone the repo
```bash
git clone https://github.com/Tat-Kimchhae/MERN-E-Commerce.git
cd MERN-E-Commerce
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
```

Run the server:
```bash
npm start
```

### 3. Frontend setup
```bash
cd ../frontend
npm install
```

Create a `.env` file in `frontend/` with:
```
VITE_BASE_URL=http://localhost:4000
```

Run the dev server:
```bash
npm run dev
```

### 4. Admin panel setup
```bash
cd ../admin
npm install
```

Create a `.env` file in `admin/` with:
```
VITE_BASE_URL=http://localhost:4000
```

Run the dev server:
```bash
npm run dev
```

## 📦 Deployment

- **Frontend & Admin:** Deployed independently on Vercel, each with its own Root Directory (`frontend` and `admin` respectively).
- **Backend:** Deployed on Render as a persistent Node service (Root Directory: `backend`), since it relies on file handling and long-running processes not suited to serverless environments.
