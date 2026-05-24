const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Local modules
const userRouter = require("./routes/userRoute");
const taskRouter = require("./routes/taskRoute");
const contactRouter = require("./routes/contactRoute");
const subscriberRouter = require("./routes/subscriberRoute");
const chatRouter = require("./routes/chatRoutes");
const expertRouter = require("./routes/expertRouter");
const notificationRouter = require("./routes/notificationRoute");
const profileRouter = require("./routes/profileRoute");
const taskAssignmentRoute = require("./routes/taskAssignmentRoute");

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.use(userRouter);
app.use(taskRouter);
app.use(contactRouter);
app.use(subscriberRouter);
app.use(chatRouter);
app.use(expertRouter);
app.use(notificationRouter);
app.use(profileRouter);
app.use(taskAssignmentRoute);

// Static folder
app.use("/uploads", express.static("uploads"));

// MongoDB connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};

// Middleware for DB connection
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Export app for Vercel
module.exports = app;