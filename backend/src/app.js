// import express from 'express';
// import authRouter from './routes/authRoutes.js';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import interviewRouter from './routes/interviewRoutes.js'

// const app = express();
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.static("public"))
// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
// }));


// //mount all routes here
// app.use('/api/auth', authRouter);
// app.use('/api/interview',interviewRouter)

// export default app;


import express from "express";
import authRouter from "./routes/authRoutes.js";
import interviewRouter from "./routes/interviewRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Enable CORS only during development
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
}

// Serve React build
app.use(express.static(path.join(__dirname, "../public")));

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

// React Router fallback (Express 5)
app.use((req, res) => {
  // Don't return index.html for unknown API routes
  if (req.path.startsWith("/api")) {
    return res.status(404).json({
      success: false,
      message: "API route not found",
    });
  }

  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

export default app;