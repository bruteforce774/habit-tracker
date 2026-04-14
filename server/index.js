import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import Habit from "./models/Habit.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const start = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
      console.error("Connection error:", err);
      process.exit(1);
  }
};

start();

app.get("/api/habits", async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch habits" });
  }
});

app.post("/api/habits", async (req, res) => {
  try {
    const habit = await Habit.create({ name: req.body.name });
    res.status(201).json(habit);
  } catch (err) {
    res.status(400).json({ error: "Failed to create habit" });
  }
})

app.delete("/api/habits/:id", async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete habit "});
  }
})
