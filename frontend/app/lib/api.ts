export type User = {
  id?: number;
  clerkid: string;
  name?: string;
  email?: string;
  // add other user fields as needed
};

export type Skill = {
  id: number;
  name: string;
};

export type Goal = {
  id: number;
  userId: string;
  skillId: number;
  targetDate: string;
  completed?: boolean;
};

export type Achievement = {
  id: number;
  userId: string;
  title: string;
  description: string;
};

export type AIChat = {
  id: number;
  userId: string;
  message: string;
  sender: "user" | "ai";
};

export type VoiceTranscript = {
  id: number;
  userId: string;
  transcript: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
const MCP_API_URL = process.env.NEXT_PUBLIC_MCP_API_URL || "http://localhost:5001";

// User APIs
export async function createUser(user: User): Promise<{ user: User }> {
  const res = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user }),
  });
  if (!res.ok) throw new Error("Failed to create user");
  return res.json();
}

export async function getUser(clerkid: string): Promise<{ user: User }> {
  const res = await fetch(`${API_BASE_URL}/users/${clerkid}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export async function updateUser(clerkid: string, updates: Partial<User>): Promise<{ user: User }> {
  const res = await fetch(`${API_BASE_URL}/users/${clerkid}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: updates }),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
}

export async function deleteUser(clerkid: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE_URL}/users/${clerkid}`, {
    method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
}

export async function listUsers(): Promise<{ users: User[] }> {
  const res = await fetch(`${API_BASE_URL}/users`);
  if (!res.ok) throw new Error("Failed to list users");
  return res.json();
}

// Skills
export async function addSkills(userId: string, skillIds: number[]): Promise<{ message: string; newSkillIds: number[] }> {
  const res = await fetch(`${API_BASE_URL}/users/skills/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, skillIds }),
  });
  if (!res.ok) throw new Error("Failed to add skills");
  return res.json();
}

// Goals
export async function createGoal(userId: string, skillId: number, targetDate: string): Promise<{ goal: Goal }> {
  const res = await fetch(`${API_BASE_URL}/goals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, skillId, targetDate }),
  });
  if (!res.ok) throw new Error("Failed to create goal");
  return res.json();
}

export async function completeGoal(goalId: number): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE_URL}/goals/${goalId}/complete`, {
    method: "PATCH" });
  if (!res.ok) throw new Error("Failed to complete goal");
  return res.json();
}

export async function listGoals(): Promise<{ goals: Goal[] }> {
  const res = await fetch(`${API_BASE_URL}/goals`);
  if (!res.ok) throw new Error("Failed to list goals");
  return res.json();
}

// Achievements
export async function createAchievement(userId: string, title: string, description: string): Promise<{ achievement: Achievement }> {
  const res = await fetch(`${API_BASE_URL}/achievements`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, title, description }),
  });
  if (!res.ok) throw new Error("Failed to create achievement");
  return res.json();
}

export async function listAchievements(): Promise<{ achievements: Achievement[] }> {
  const res = await fetch(`${API_BASE_URL}/achievements`);
  if (!res.ok) throw new Error("Failed to list achievements");
  return res.json();
}

// AI Chats
export async function addAIChat(userId: string, message: string, sender: "user" | "ai"): Promise<{ chat: AIChat }> {
  const res = await fetch(`${API_BASE_URL}/ai-chats`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, message, sender }),
  });
  if (!res.ok) throw new Error("Failed to add AI chat");
  return res.json();
}

export async function listAIChats(): Promise<{ chats: AIChat[] }> {
  const res = await fetch(`${API_BASE_URL}/ai-chats`);
  if (!res.ok) throw new Error("Failed to list AI chats");
  return res.json();
}

// Voice Transcripts
export async function addVoiceTranscript(userId: string, transcript: string): Promise<{ transcript: VoiceTranscript }> {
  const res = await fetch(`${API_BASE_URL}/voice-transcripts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, transcript }),
  });
  if (!res.ok) throw new Error("Failed to add voice transcript");
  return res.json();
}

export async function listVoiceTranscripts(): Promise<{ transcripts: VoiceTranscript[] }> {
  const res = await fetch(`${API_BASE_URL}/voice-transcripts`);
  if (!res.ok) throw new Error("Failed to list voice transcripts");
  return res.json();
}

export async function aiChat(userId: string, message: string): Promise<{ response: string }> {
  const res = await fetch(`${MCP_API_URL}/ai-chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, message }),
  });
  if (!res.ok) throw new Error("Failed to get AI chat response");
  return res.json();
}

export async function suggestGoal(userId: string, skills: string[]): Promise<{ skillId: number; targetDate: string }> {
  const res = await fetch(`${MCP_API_URL}/suggest-goal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, skills }),
  });
  if (!res.ok) throw new Error("Failed to get goal suggestion");
  return res.json();
}

export async function transcribeVoice(audioBlob: Blob): Promise<{ transcript: string }> {
  const formData = new FormData();
  formData.append("audio", audioBlob);
  const res = await fetch(`${MCP_API_URL}/transcribe`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to transcribe audio");
  return res.json();
} 