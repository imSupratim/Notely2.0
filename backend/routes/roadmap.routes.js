import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  deleteRoadmapById,
  getAllRoadmaps,
  getRoadmap,
  getRoadmapById,
  saveRoadmap,
} from "../controllers/roadmap.controller.js";

const router = express.Router();

router.post("/", protect, getRoadmap);
router.post("/saveroadmap", protect, saveRoadmap);
router.get("/getallroadmaps", protect, getAllRoadmaps);
router.get("/:id", protect, getRoadmapById);
router.delete("/:id", protect, deleteRoadmapById);

export default router;
