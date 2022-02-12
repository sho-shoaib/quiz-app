import { Highscore } from "../model/highscoreModel.js";

export const getHighScores = async (req, res) => {
  const data = await Highscore.find();

  try {
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "success",
      message: err.message,
    });
  }
};

export const addHighscore = async (req, res) => {
  try {
    await Highscore.create(req.body);

    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    res.status(400).json({
      status: "success",
      message: err.message,
    });
  }
};
