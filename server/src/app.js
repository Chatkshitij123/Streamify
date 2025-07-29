import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}));


//settings up for data acceptation

app.use(express.json({limit: "16kb"}));

//url
app.use(express.urlencoded({extended: true, limit: "16kb"}));

//static files on server

app.use(express.static("public"));

//cookie-parser

app.use(cookieParser());

//routes import

import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import chatRouter from "./routes/chat.routes.js"

//routes declaration
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/chats", chatRouter);

import { errorHandler } from "./middleware/errorHandler.middleware.js";
app.use(errorHandler)

export {app}