import {
  integer,
  pgTable,
  varchar,
  PgArray,
  text,
  timestamp,
  boolean,
  serial,
} from "drizzle-orm/pg-core";

/** USERS TABLE */
export const usersTable = pgTable("users", {
  clerkid: varchar("clerkid", { length: 255 }).notNull().unique(),
});

/** SKILLS TABLE */
export const skillsTable = pgTable("skills", {
  id: serial("id").primaryKey(),
  skillname: varchar("skillname", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 255 }).notNull(),
});

/** USER-SKILL MAPPINGS */
export const userSkillsTable = pgTable("user_skills", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => usersTable.clerkid)
    .notNull(),
  skillId: integer("skill_id")
    .references(() => skillsTable.id)
    .notNull(),
  progress: integer("progress").default(0), // percentage of skill completion
});

/** STREAKS & HOURS TRACKING */
export const userProgressTable = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => usersTable.clerkid)
    .notNull(),
  streakDays: integer("streak_days").default(0).notNull(),
  totalHoursStudied: integer("total_hours_studied").default(0).notNull(),
  lastStudyDate: timestamp("last_study_date").defaultNow().notNull(),
});

export const voiceTranscriptsTable = pgTable("voice_transcripts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => usersTable.clerkid)
    .notNull(),
  transcript: text("transcript").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** AI TEXT CHAT TRANSCRIPTS */
export const aiChatsTable = pgTable("ai_chats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => usersTable.clerkid)
    .notNull(),
  message: text("message").notNull(),
  sender: varchar("sender", { length: 20 }).notNull(), // "user" or "ai"
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** GOALS FOR SKILL COMPLETION */
export const goalsTable = pgTable("goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => usersTable.clerkid)
    .notNull(),
  skillId: integer("skill_id")
    .references(() => skillsTable.id)
    .notNull(),
  targetDate: timestamp("target_date").notNull(),
  completed: boolean("completed").default(false).notNull(),
});

/** ACHIEVEMENTS */
export const achievementsTable = pgTable("achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => usersTable.clerkid)
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  achievedAt: timestamp("achieved_at").defaultNow().notNull(),
});
