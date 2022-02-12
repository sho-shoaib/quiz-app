import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const data = JSON.parse(fs.readFileSync(`${__dirname}/../data/data.json`));

export const getHighScores = async (req, res) => {
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
    const newData = { scores: [...data.scores, req.body] };

    fs.writeFileSync(
      `${__dirname}/../data/data.json`,
      JSON.stringify(newData),
      (err) => {
        if (err) console.log(err);
      }
    );

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
