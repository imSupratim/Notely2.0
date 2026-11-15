
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["learn", "practice", "project", "revision"],
    default: "learn",
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const daySchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  goal: {
    type: String,
    required: true,
  },
  tasks: [taskSchema],
});

const roadmapSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    totalDays: {
      type: Number,
      required: true,
    },
    hoursPerDay: {
      type: Number,
      required: true,
    },
    totalHours: {
      type: Number,
      required: true,
    },
    days: [daySchema],

    // Associate roadmap with logged-in user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Roadmap = mongoose.model("Roadmap", roadmapSchema);

export default Roadmap;
