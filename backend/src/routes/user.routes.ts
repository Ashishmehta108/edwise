import { Router } from "express";
// Controllers
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  listUsers,
  addSkills,
} from "../controllers/user.controller";

import {
  createGoal,
  completeGoal,
  listGoals,
} from "../controllers/user.controller";

import {
  createAchievement,
  listAchievements,
} from "../controllers/user.controller";

import { addAIChat, listAIChats } from "../controllers/user.controller";

import {
  addVoiceTranscript,
  listVoiceTranscripts,
} from "../controllers/user.controller";

const router = Router();

// ✅ Users
router.post("/users", (req, res, next) => {
  createUser(req, res).catch(next);
});
router.get("/users/:id", (req, res, next) => {
  getUser(req, res).catch(next);
});
router.put("/users/:id", (req, res, next) => {
  updateUser(req, res).catch(next);
});
router.delete("/users/:id", (req, res, next) => {
  deleteUser(req, res).catch(next);
});
router.get("/users", (req, res, next) => {
  listUsers(req, res).catch(next);
});

// ✅ Skills for user
router.post("/users/skills/add", (req, res, next) => {
  addSkills(req, res).catch(next);
}); // body: { userId, skillIds: [] }

// ✅ Goals
router.post("/goals", (req, res, next) => {
  createGoal(req, res).catch(next);
});
router.patch("/goals/:id/complete", (req, res, next) => {
  completeGoal(req, res).catch(next);
});
router.get("/goals", (req, res, next) => {
  listGoals(req, res).catch(next);
});

// ✅ Achievements
router.post("/achievements", (req, res, next) => {
  createAchievement(req, res).catch(next);
});
router.get("/achievements", (req, res, next) => {
  listAchievements(req, res).catch(next);
});

// ✅ AI Chats
router.post("/ai-chats", (req, res, next) => {
  addAIChat(req, res).catch(next);
});
router.get("/ai-chats", (req, res, next) => {
  listAIChats(req, res).catch(next);
});

// ✅ Voice Transcripts
router.post("/voice-transcripts", (req, res, next) => {
  addVoiceTranscript(req, res).catch(next);
});
router.get("/voice-transcripts", (req, res, next) => {
  listVoiceTranscripts(req, res).catch(next);
});

export default router;
