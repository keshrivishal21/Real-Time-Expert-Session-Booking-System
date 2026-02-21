# ExpertBook — Expert Session Booking System

A full-stack web application that allows users to browse expert profiles, view real-time availability, and book one-on-one sessions. Built with React, Express, MongoDB, and Socket.IO.

## Features

- **Expert Directory** — Search and filter experts by name and category with pagination
- **Real-Time Availability** — Slot updates broadcast instantly via WebSockets
- **Session Booking** — Book a time slot with validation and instant confirmation
- **Booking Lookup** — View all your bookings by email
- **Centralized Error Handling** — Custom `AppError` class, async handler wrapper, and global error middleware
- **Input Validation** — express-validator chains with automatic error responses
- **Responsive UI** — Tailwind CSS with mobile-first design
- **404 Pages** — Client-side and server-side catch-all routes

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 7, React Router 7, Tailwind CSS 3 |
| **Backend** | Node.js, Express 5 |
| **Database** | MongoDB with Mongoose 9 |
| **Real-Time** | Socket.IO 4 |
| **Validation** | express-validator |
| **HTTP Client** | Axios |

## Project Structure

```
expert-session-booking-system/
├── client/                     # React front-end
│   ├── src/
│   │   ├── api/                # Axios instance & Socket.IO client
│   │   ├── components/         # Navbar, Footer, ExpertCard
│   │   ├── pages/              # ExpertList, ExpertDetail, BookingPage, MyBookings, NotFound
│   │   ├── App.jsx             # Root layout & routes
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Tailwind directives & custom classes
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                     # Express back-end
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js     # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── expertController.js
│   │   │   └── bookingController.js
│   │   ├── middlewares/
│   │   │   ├── errorMiddleware.js      # Global error handler & 404
│   │   │   └── validateMiddleware.js   # Reusable validation chains
│   │   ├── models/
│   │   │   ├── Expert.js
│   │   │   └── Booking.js
│   │   ├── routes/
│   │   │   ├── expertRoutes.js
│   │   │   └── bookingRoutes.js
│   │   ├── utils/
│   │   │   ├── AppError.js     # Custom error class
│   │   │   └── asyncHandler.js # Async try/catch wrapper
│   │   └── index.js            # Server entry point
│   ├── .env
│   └── package.json
│
└── README.md                   # ← You are here
```

## API Endpoints

### Experts

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/experts` | List experts (supports `?search`, `?category`, `?page`, `?limit`) |
| `GET` | `/api/experts/:id` | Get expert by ID |

### Bookings

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/bookings` | Create a new booking |
| `GET` | `/api/bookings?email=` | Get bookings by email |
| `PATCH` | `/api/bookings/:id/status` | Update booking status (`Pending`, `Confirmed`, `Completed`) |

### WebSocket Events

| Event | Direction | Payload |
|-------|-----------|---------|
| `slotBooked` | Server → Client | `{ expertId, date, timeSlot }` |

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **MongoDB** running locally on `mongodb://127.0.0.1:27017` (or update `.env`)

### 1. Clone the Repository

```bash
git clone <repo-url>
cd expert-session-booking-system
```

### 2. Set Up the Server

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory (or verify the existing one):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/expert_booking_db
```

Start the server:

```bash
npm run dev      # Development (with nodemon)
npm start        # Production
```

### 3. Set Up the Client

```bash
cd client
npm install
npm run dev
```

The app opens at **http://localhost:5173**.

### 4. Seed Sample Data (Optional)

Connect to MongoDB and insert sample experts:

```js
db.experts.insertMany([
  {
    name: "Sarah Johnson",
    category: "Career Guidance",
    experience: 12,
    rating: 4.8,
    availableSlots: [
      { date: "2026-02-25", slots: ["09:00 AM", "10:00 AM", "02:00 PM"] },
      { date: "2026-02-26", slots: ["11:00 AM", "03:00 PM"] }
    ]
  },
  {
    name: "Mike Chen",
    category: "Fitness",
    experience: 8,
    rating: 4.6,
    availableSlots: [
      { date: "2026-02-25", slots: ["08:00 AM", "12:00 PM", "04:00 PM"] },
      { date: "2026-02-27", slots: ["09:00 AM", "01:00 PM"] }
    ]
  },
  {
    name: "Emily Davis",
    category: "Finance",
    experience: 15,
    rating: 4.9,
    availableSlots: [
      { date: "2026-02-25", slots: ["10:00 AM", "11:00 AM"] },
      { date: "2026-02-26", slots: ["09:00 AM", "02:00 PM", "04:00 PM"] }
    ]
  }
]);
```

## Scripts

### Server (`/server`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with nodemon (auto-restart) |
| `npm start` | Start in production mode |

### Client (`/client`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## License

MIT
