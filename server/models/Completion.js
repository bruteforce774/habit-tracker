import mongoose from "mongoose";

const completionSchema = new mongoose.Schema({
  habitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Habit",
    required: true
  },
  date: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Completion", completionSchema);
