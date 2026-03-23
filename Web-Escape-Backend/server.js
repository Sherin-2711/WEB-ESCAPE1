import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config({});

import cookieParser from "cookie-parser";
import cors from "cors";
import connectDb from "./utils/database.js";
import authRoutes from "./routes/authRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import levelRoutes from "./routes/levelRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. Postman, server-to-server)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS: origin '${origin}' not allowed`));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.get("/home", (req, res) => {
    res.send("i am coming from backend");
});

app.use("/api/v1/user", authRoutes);
app.use("/api/v1/game", gameRoutes);
app.use("/api/v1/level", levelRoutes);
app.use("/api/v1/upload", uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDb();
    console.log(`app is listening on port ${PORT}`);
});
