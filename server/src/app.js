import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
    credentials: true
}));


//settings up for data acceptation

// app.use(express.json({limit: "16kb"}));
app.use(
  express.json({
    // UPDATED: Preserve the original body for Stream signature verification
    verify: (req, res, buffer) => {
      req.rawBody = Buffer.from(buffer);
    },
  })
);

//url
app.use(express.urlencoded({extended: true, limit: "16kb"}));

//static files on server

app.use(express.static("public"));

//cookie-parser

app.use(cookieParser());

// Health check route
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "OK",
        message: "Chat application backend is running",
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

//routes import

import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import chatRouter from "./routes/chat.routes.js"
import notificationRouter from "./routes/notification.routes.js"
import pushSubscribe from "./routes/pushSubscriptions.routes.js";
import streamWebhookRouter from "./routes/streamWebhook.routes.js";

//routes declaration
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/chats", chatRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/notifications/subscriptions", pushSubscribe);
app.use("/api/v1/webhooks/stream", streamWebhookRouter);

import { errorHandler } from "./middleware/errorHandler.middleware.js";
app.use(errorHandler)

export {app}