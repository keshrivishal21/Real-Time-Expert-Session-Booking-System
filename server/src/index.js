require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/database");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");

connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(cors({
  origin: ["http://localhost:5173","https://real-time-expert-session-booking-sy-six.vercel.app"],
  credentials: true
}));
app.use(express.json());

app.set("io", io);

app.use("/api/experts", require("./routes/expertRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));


app.use(notFound);
app.use(errorHandler);

server.listen(process.env.PORT || 5000, () =>
  console.log("Server running...")
);