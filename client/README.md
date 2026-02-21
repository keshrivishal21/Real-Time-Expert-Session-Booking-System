# ExpertBook — Client

The React front-end for **ExpertBook**, a session-booking platform that lets users browse experts, view real-time availability, and book appointments.

## Tech Stack

| Tool | Purpose |
|------|---------|
| **React 19** | UI library |
| **Vite 7** | Build tool & dev server |
| **React Router 7** | Client-side routing |
| **Tailwind CSS 3** | Utility-first styling |
| **Axios** | HTTP client for the REST API |
| **Socket.IO Client** | Real-time slot updates |

## Project Structure

```
src/
├── api/
│   ├── axios.js          # Axios instance (baseURL: http://localhost:5000/api)
│   └── socket.js         # Socket.IO client connection
├── components/
│   ├── ExpertCard.jsx    # Expert card with avatar, rating, category badge
│   ├── Navbar.jsx        # Sticky top navigation bar
│   └── Footer.jsx        # Site footer
├── pages/
│   ├── ExpertList.jsx    # Home — search, filter, paginated expert grid
│   ├── ExpertDetail.jsx  # Expert profile with real-time available slots
│   ├── BookingPage.jsx   # Booking form (name, email, phone, notes)
│   ├── MyBookings.jsx    # Look up bookings by email
│   └── NotFound.jsx      # 404 catch-all page
├── App.jsx               # Root layout + route definitions
├── main.jsx              # Entry point
└── index.css             # Tailwind directives + custom component classes
```

## Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | ExpertList | Browse & search experts |
| `/expert/:id` | ExpertDetail | View expert profile & pick a time slot |
| `/booking/:id` | BookingPage | Fill in details & confirm booking |
| `/my-bookings` | MyBookings | Search bookings by email |
| `*` | NotFound | 404 page |

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- The [server](../server) must be running on `http://localhost:5000`

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app runs at **http://localhost:5173** by default.

### Build for Production

```bash
npm run build
npm run preview   # Preview the production build locally
```

## Environment

The API base URL is configured in `src/api/axios.js`. To change it, update the `baseURL` value:

```js
const API = axios.create({
  baseURL: "http://localhost:5000/api"
});
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |