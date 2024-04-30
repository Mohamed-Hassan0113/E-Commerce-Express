# E-Commerce Backend with Express and Stripe Integration

This project is a backend application for an E-Commerce platform built using Express.js. It integrates Stripe as a payment gateway to handle online transactions securely.

## Features

- **User Authentication**: Secure user authentication and authorization system.
- **Product Management**: CRUD operations for managing products in the inventory.
- **Stripe Integration**: Seamless integration with Stripe API for processing payments.
- **Middleware**: Implementation of middleware for logging.

## Prerequisites

Before running the project locally, ensure you have the following installed:

- Node.js
- npm
- MongoDB

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/e-commerce-backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd e-commerce-backend
   ```

3. Install dependencies:

   ```bash
   npm i
   ```

4. Set up environment variables:

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/local
   JWT_ACCESS_TOKEN_SECRET_KEY
   JWT_ACCESS_TOKEN_EXPIRE_AT
   GMAIL_EMAIL
   GMAIL_PASSWORD
   STRIPE_SK
   WEBHOOK_SK
   ```

   Make sure to provide valid information in the .env files to have a smooth run of the application.

5. Run the server:

   ```bash
   npm start
   ```

6. The server will start running at `http://localhost:3000`.

## Usage

- Use API endpoints to interact with the backend:
  - `/auth`: User authentication and authorization.
  - `/user`: CRUD operations for managing users.
  - `/product`: CRUD operations for managing products.
  - `/cart`: Operations to manipulate the cart of the user.
  - `/payment`: Endpoints for processing payments using Stripe.
