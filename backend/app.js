import express from "express";
import { router as highscoreRouter } from "./routes/highscoreRoute.js";

const app = express();

// middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});
app.use(express.json());

// routes
app.use("/api/v1/highscore", highscoreRouter);

export default app;
