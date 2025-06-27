import { Request, Response } from "express";
import {
  usersTable,
  skillsTable,
  userSkillsTable,
} from "../database/schema/schema";
import { db } from "../database/db";
import { eq } from "drizzle-orm";
export const createUser = async (req: Request, res: Response) => {
  try {
    const user: typeof usersTable.$inferInsert = req.body.user;
    const isUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.clerkid, user.clerkid))
      .execute();
    if (isUser.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const result = await db.insert(usersTable).values(user);
    return res.status(201).json({ user: { ...user, id: result.oid } });
  } catch (error: any) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    if (userId) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.clerkid, userId))
      .execute();
    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ user: user[0] });
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const updates: Partial<typeof usersTable.$inferInsert> = req.body.user;
    if (!userId) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.clerkid, userId))
      .execute();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await db
      .update(usersTable)
      .set(updates)
      .where(eq(usersTable.clerkid, userId))
      .execute();
    const [updatedUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.clerkid, userId))
      .execute();
    return res.status(200).json({ user: updatedUser });
  } catch (error: any) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.clerkid, userId))
      .execute();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await db.delete(usersTable).where(eq(usersTable.clerkid, userId)).execute();
    return res.status(200).json({ message: "User deleted" });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const listUsers = async (_req: Request, res: Response) => {
  try {
    const users = await db.select().from(usersTable).execute();
    return res.status(200).json({ users });
  } catch (error: any) {
    console.error("Error listing users:", error);
    return res.status(500).json({ error: error.message });
  }
};

import { and, inArray } from "drizzle-orm";

export const addSkills = async (req: Request, res: Response) => {
  try {
    const { userId, skillIds } = req.body;

    if (!userId || !Array.isArray(skillIds) || skillIds.length === 0) {
      return res
        .status(400)
        .json({ error: "Provide userId and non-empty skillIds array." });
    }

    // Validate user existence
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.clerkid, userId))
      .execute();
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Validate skill IDs existence
    const existingSkills = await db
      .select()
      .from(skillsTable)
      .where(inArray(skillsTable.id, skillIds))
      .execute();
    if (existingSkills.length !== skillIds.length) {
      return res
        .status(400)
        .json({ error: "One or more skillIds are invalid." });
    }

    // Check existing user-skills to avoid duplicates
    const existingUserSkills = await db
      .select({ skillId: userSkillsTable.skillId })
      .from(userSkillsTable)
      .where(
        and(
          eq(userSkillsTable.userId, userId),
          inArray(userSkillsTable.skillId, skillIds)
        )
      )
      .execute();

    const alreadyAddedSkillIds = existingUserSkills.map((s) => s.skillId);
    const newSkillIds = skillIds.filter(
      (id: number) => !alreadyAddedSkillIds.includes(id)
    );

    if (newSkillIds.length === 0) {
      return res.status(400).json({
        error: "All provided skills are already assigned to the user.",
      });
    }

    // Insert new user-skill mappings
    await db
      .insert(userSkillsTable)
      .values(
        newSkillIds.map((skillId: number) => ({
          userId,
          skillId,
        }))
      )
      .execute();

    return res
      .status(200)
      .json({ message: "Skills added successfully.", newSkillIds });
  } catch (error: any) {
    console.error("Error adding skills:", error);
    return res.status(500).json({ error: error.message });
  }
};

import { goalsTable } from "../database/schema/schema";

export const createGoal = async (req: Request, res: Response) => {
  try {
    const { userId, skillId, targetDate } = req.body;

    if (!userId || !skillId || !targetDate) {
      return res
        .status(400)
        .json({ error: "userId, skillId, and targetDate are required." });
    }

    // Check user and skill existence
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.clerkid, userId))
      .execute();
    const [skill] = await db
      .select()
      .from(skillsTable)
      .where(eq(skillsTable.id, skillId))
      .execute();
    if (!user) return res.status(404).json({ error: "User not found." });
    if (!skill) return res.status(404).json({ error: "Skill not found." });

    const [existingGoal] = await db
      .select()
      .from(goalsTable)
      .where(
        and(eq(goalsTable.userId, userId), eq(goalsTable.skillId, skillId))
      )
      .execute();
    if (existingGoal) {
      return res
        .status(400)
        .json({ error: "Goal for this skill already exists." });
    }

    const inserted = await db
      .insert(goalsTable)
      .values({
        userId,
        skillId,
        targetDate: new Date(targetDate),
      })
      .returning();

    return res.status(201).json({ goal: inserted[0] });
  } catch (error: any) {
    console.error("Error creating goal:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const completeGoal = async (req: Request, res: Response) => {
  try {
    const goalId = parseInt(req.params.id, 10);
    if (isNaN(goalId))
      return res.status(400).json({ error: "Invalid goal ID." });

    const [goal] = await db
      .select()
      .from(goalsTable)
      .where(eq(goalsTable.id, goalId))
      .execute();
    if (!goal) return res.status(404).json({ error: "Goal not found." });

    await db
      .update(goalsTable)
      .set({ completed: true })
      .where(eq(goalsTable.id, goalId))
      .execute();

    return res.status(200).json({ message: "Goal marked as completed." });
  } catch (error: any) {
    console.error("Error completing goal:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const listGoals = async (req: Request, res: Response) => {
  try {
    const goals = await db.select().from(goalsTable).execute();
    return res.status(200).json({ goals });
  } catch (error: any) {
    console.error("Error listing goals:", error);
    return res.status(500).json({ error: error.message });
  }
};

import { achievementsTable } from "../database/schema/schema";

export const createAchievement = async (req: Request, res: Response) => {
  try {
    const { userId, title, description } = req.body;
    if (!userId || !title || !description) {
      return res
        .status(400)
        .json({ error: "userId, title, and description are required." });
    }

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.clerkid, userId))
      .execute();
    if (!user) return res.status(404).json({ error: "User not found." });

    const inserted = await db
      .insert(achievementsTable)
      .values({
        userId,
        title,
        description,
      })
      .returning();

    return res.status(201).json({ achievement: inserted[0] });
  } catch (error: any) {
    console.error("Error creating achievement:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const listAchievements = async (req: Request, res: Response) => {
  try {
    const achievements = await db.select().from(achievementsTable).execute();
    return res.status(200).json({ achievements });
  } catch (error: any) {
    console.error("Error listing achievements:", error);
    return res.status(500).json({ error: error.message });
  }
};

import { aiChatsTable } from "../database/schema/schema";

export const addAIChat = async (req: Request, res: Response) => {
  try {
    const { userId, message, sender } = req.body;
    if (!userId || !message || !sender) {
      return res
        .status(400)
        .json({ error: "userId, message, and sender are required." });
    }

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.clerkid, userId))
      .execute();
    if (!user) return res.status(404).json({ error: "User not found." });

    const inserted = await db
      .insert(aiChatsTable)
      .values({
        userId,
        message,
        sender,
      })
      .returning();

    return res.status(201).json({ chat: inserted[0] });
  } catch (error: any) {
    console.error("Error adding AI chat:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const listAIChats = async (req: Request, res: Response) => {
  try {
    const chats = await db.select().from(aiChatsTable).execute();
    return res.status(200).json({ chats });
  } catch (error: any) {
    console.error("Error listing AI chats:", error);
    return res.status(500).json({ error: error.message });
  }
};

import { voiceTranscriptsTable } from "../database/schema/schema";

export const addVoiceTranscript = async (req: Request, res: Response) => {
  try {
    const { userId, transcript } = req.body;
    if (!userId || !transcript) {
      return res
        .status(400)
        .json({ error: "userId and transcript are required." });
    }

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.clerkid, userId))
      .execute();
    if (!user) return res.status(404).json({ error: "User not found." });

    const inserted = await db
      .insert(voiceTranscriptsTable)
      .values({
        userId,
        transcript,
      })
      .returning();

    return res.status(201).json({ transcript: inserted[0] });
  } catch (error: any) {
    console.error("Error adding voice transcript:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const listVoiceTranscripts = async (req: Request, res: Response) => {
  try {
    const transcripts = await db.select().from(voiceTranscriptsTable).execute();
    return res.status(200).json({ transcripts });
  } catch (error: any) {
    console.error("Error listing voice transcripts:", error);
    return res.status(500).json({ error: error.message });
  }
};
