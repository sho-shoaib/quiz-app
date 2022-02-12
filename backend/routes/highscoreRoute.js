import express from "express";
import {
  getHighScores,
  addHighscore,
} from "../controllers/highscoreController.js";

export const router = express.Router();

router.route("/").get(getHighScores).post(addHighscore);
