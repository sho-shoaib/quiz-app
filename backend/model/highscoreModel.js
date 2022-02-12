import mongoose from "mongoose";

const highscoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A score must have a name"],
  },
  correct: {
    type: Number,
    required: [true, "A score must have a correct"],
  },
  incorrect: {
    type: Number,
    required: [true, "A score must have a incorrect"],
  },
  time: {
    type: Number,
    required: [true, "A score must have a time"],
  },
});

export const Highscore = mongoose.model("Highscore", highscoreSchema);
