
# Bookstore Web App

A full-stack bookstore web application built with **React**, **Node.js**, and **Firebase/MongoDB**.  
Users can browse books, add to cart, and place orders. Admins can manage books.

---

##  Features (V1)

- **User Authentication**
  - Google Sign-In + Email/Password
  - User profiles stored in Firestore/MongoDB
- **Book Listing**
  - View all books with title, author, price, and cover image
  - Add to cart
- **Cart & Orders**
  - Add/remove books to/from cart
  - Checkout with shipping address
  - Order history per user
- **Role-based Access**
  - Normal users → browse, add to cart, place orders
  - Admins → manage books via API (add/update/delete)

---

##  Tech Stack

- **Frontend:** React + TailwindCSS
- **Backend:** Node.js + Express
- **Database:** Firebase Realtime DB / Firestore OR MongoDB
- **Authentication:** Firebase Auth (Google + Email/Password)
- **Deployment:** Firebase Hosting / Vercel (frontend), Render / Railway / Firebase Functions (backend)

---

##  Project Structure

```

frontend/
├─ src/
│  ├─ pages/       # Checkout, BookList, etc.
│  ├─ components/  # BookCard, Navbar, etc.
│  └─ context/     # AuthContext, CartContext
backend/
├─ models/         # User, Book, Cart, Order
├─ controllers/    # authController, bookController, cartController, orderController
├─ routes/         # authRoutes, bookRoutes, cartRoutes, orderRoutes
└─ middleware/     # authMiddleware

````

---

##  Getting Started

### Frontend

```bash
cd frontend
npm install
npm start
````

### Backend

```bash
cd backend
npm install
npm run dev
```

### Environment Variables

Create a `.env` in the backend:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY="your_firebase_private_key"
```

---

##  API Endpoints (V1)

* **Auth**

  * `POST /api/auth/signup`
  * `POST /api/auth/login`
* **Books**

  * `GET /api/books`
  * `POST /api/books` (admin)
  * `PUT /api/books/:id` (admin)
  * `DELETE /api/books/:id` (admin)
* **Cart**

  * `GET /api/carts`
  * `POST /api/carts` (add book)
  * `DELETE /api/carts` (remove book)
* **Orders**

  * `POST /api/orders` (checkout)
  * `GET /api/orders` (user order history)

---


Do you want me to do that?
```
