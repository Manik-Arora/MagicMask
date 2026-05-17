# MagicMask

MagicMask is a full-stack web app for removing image backgrounds and managing credits with user authentication, Razorpay payments, and Clerk webhooks. It includes a React + Vite frontend and an Express + MongoDB backend.

## Features

- User authentication with Clerk
- Image background removal using remove.bg API
- Credit-based usage tracking per user
- Razorpay purchase flow for buying image credits
- MongoDB persistence for users and transactions
- Separate client and server projects for easier deployment and development

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Clerk, Axios, React Router
- Backend: Node.js, Express, MongoDB, Mongoose, dotenv, Razorpay, Svix
- Image processing: remove.bg API
- Authentication: Clerk

## Repository Structure

- `client/` - React frontend
- `server/` - Express backend

## Environment Variables

### Server

Create a `.env` file inside `server/` with the following variables:

```env
PORT=4000
MONGODB_URI=<your-mongodb-connection-string>
BG_REMOVER_API_KEY=<your-remove-bg-api-key>
RAZOR_PAY_KEY_ID=<your-razorpay-key-id>
RAZOR_PAY_KEY_SECRET=<your-razorpay-key-secret>
CURRENCY=INR
CLERK_WEBHOOK_SECRET=<your-clerk-webhook-secret>
```

- `MONGODB_URI` should point to your MongoDB server (Atlas or local). The backend appends `/MagicMask` to this URI.
- `BG_REMOVER_API_KEY` is required to remove image backgrounds via the remove.bg API.
- `RAZOR_PAY_KEY_ID` and `RAZOR_PAY_KEY_SECRET` are used to create Razorpay orders.
- `CURRENCY` is used for Razorpay order creation.
- `CLERK_WEBHOOK_SECRET` is used to verify Clerk webhook events.

### Client

Create a `.env` file inside `client/` with the following variables:

```env
VITE_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZOR_PAY_KEY_ID=<your-razorpay-key-id>
```

- `VITE_CLERK_PUBLISHABLE_KEY` is your Clerk frontend publishable key.
- `VITE_BACKEND_URL` should point to the running backend URL.
- `VITE_RAZOR_PAY_KEY_ID` is required by the frontend Razorpay checkout flow.

## Setup

### 1. Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 2. Start the backend

```bash
cd server
npm run dev
```

The backend runs on `http://localhost:4000` by default.

### 3. Start the frontend

```bash
cd client
npm run dev
```

The frontend will start with Vite and usually open at `http://localhost:5173`.

## Available Scripts

### Server

- `npm start` - Run the backend with Node
- `npm run dev` - Run the backend with nodemon

### Client

- `npm run dev` - Start the Vite development server
- `npm run build` - Build the production frontend
- `npm run preview` - Preview the built frontend
- `npm run lint` - Run ESLint

## Backend API Endpoints

### `GET /`

- Simple home endpoint

### `POST /api/user/webhooks`

- Clerk webhook listener to sync user create/update/delete events

### `GET /api/user/credits`

- Returns the signed-in user credit balance
- Requires `token` header with Clerk auth token

### `POST /api/user/purchase`

- Creates a Razorpay order for a purchase plan
- Requires `token` header with Clerk auth token
- Request body should include `planId`

### `POST /api/user/verify-purchase`

- Verifies Razorpay order payment and credits the user

### `POST /api/image/remove-bg`

- Removes the background from an uploaded image
- Requires `token` header with Clerk auth token
- Accepts `multipart/form-data` with `image`

## Notes

- The client uses Clerk for authentication and requires Clerk to be configured in the frontend.
- The backend uses `remove.bg` to remove image backgrounds and decrements the user credit balance on success.
- Credits are tracked in MongoDB and updated after successful Razorpay payment verification.

---
