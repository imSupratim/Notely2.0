import { GoogleGenerativeAI } from "@google/generative-ai";
import Roadmap from "../models/Roadmap.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getRoadmap = async (req, res) => {
  try {
    const { topic, days, hours } = req.body;
    const totalDays = Number(days);
    const dailyHours = Number(hours);
    const model = genAI.getGenerativeModel({
      // model: "gemini-3.6-flash",
      model: "gemini-3.5-flash-lite",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `You are an expert technical instructor and learning planner.

      Create a practical learning roadmap for: "${topic.trim()}".

      Available days: ${totalDays}
      Study hours per day: ${dailyHours}
      Total study hours: ${totalDays * dailyHours}

      Requirements:
      1. Create exactly ${totalDays} days.
      2. Arrange topics from beginner to advanced where appropriate.
      3. Give each day a clear learning objective.
      4. Include specific topics, practical tasks, and revision.
      5. Estimate task durations in hours.
      6. The sum of task durations for each day must not exceed
         ${dailyHours} hours.
      7. Make the roadmap achievable within the available time.
      8. Include hands-on practice and a final project when appropriate.
      9. Do not include markdown or explanations outside the JSON.

      Return JSON using this structure:
      {
        "title": "Learning roadmap title",
        "topic": "${topic.trim()}",
        "totalDays": ${totalDays},
        "hoursPerDay": ${dailyHours},
        "totalHours": ${totalDays * dailyHours},
        "days": [
          {
            "day": 1,
            "title": "Day title",
            "goal": "Learning objective",
            "tasks": [
              {
                "title": "Task title",
                "description": "What to learn or practice",
                "duration": 1,
                "type": "learn"
              }
            ]
          }
        ]
      }

      Task duration must be a positive number of hours.
      Task type must be one of: learn, practice, revision, project.`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    const roadmap = JSON.parse(response);

    return res.status(200).json({
      success: true,
      message: "Roadmap generated successfully.",
      roadmap,
    });
  } catch (error) {
    console.error("Roadmap generation error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to generate roadmap. Please try again.",
    });
  }
};

export const saveRoadmap = async (req, res) => {
  try {
    const { title, topic, totalDays, hoursPerDay, totalHours, days } = req.body;

    const roadmap = await Roadmap.create({
      title,
      topic,
      totalDays,
      hoursPerDay,
      totalHours,
      days,
      user: req.userId,
    });

    res.status(201).json({
      success: true,
      message: "Roadmap saved successfully",
      roadmap,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ user: req.userId })
      .select("_id title topic createdAt")
      .sort({ createdAt: -1 });

    res.status(200).json(roadmaps);
  } catch (error) {
    console.error("Error occured while fetching roadmaps: ", error.message);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching roadmaps" });
  }
};

export const getRoadmapById = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }

    res.status(200).json(roadmap);
  } catch (error) {
    console.error("Get roadmap error: ", error.message);
    res
      .status(500)
      .json({ message: "Something went wrong on while fetching the roadmap" });
  }
};

export const deleteRoadmapById = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }

    await Roadmap.deleteOne({ _id: roadmap._id });
    return res.status(200).json({
      success: true,
      message: "Roadmap deleted successfully",
    });
  } catch (error) {
    console.error("Delete roadmap error:", error.message);
    res.status(500).json({ message: "Failed to delete roadmap" });
  }
};
