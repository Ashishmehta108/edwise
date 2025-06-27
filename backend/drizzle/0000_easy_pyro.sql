CREATE TABLE "achievements" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"achieved_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ai_chats" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"message" text NOT NULL,
	"sender" varchar(20) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "goals" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"skill_id" integer NOT NULL,
	"target_date" timestamp NOT NULL,
	"completed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"skillname" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"icon" varchar(255) NOT NULL,
	CONSTRAINT "skills_skillname_unique" UNIQUE("skillname")
);
--> statement-breakpoint
CREATE TABLE "user_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"streak_days" integer DEFAULT 0 NOT NULL,
	"total_hours_studied" integer DEFAULT 0 NOT NULL,
	"last_study_date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"skill_id" integer NOT NULL,
	"progress" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerkid" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "users_clerkid_unique" UNIQUE("clerkid"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "voice_transcripts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"transcript" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "achievements" ADD CONSTRAINT "achievements_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_chats" ADD CONSTRAINT "ai_chats_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "goals" ADD CONSTRAINT "goals_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "goals" ADD CONSTRAINT "goals_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_skills" ADD CONSTRAINT "user_skills_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_skills" ADD CONSTRAINT "user_skills_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voice_transcripts" ADD CONSTRAINT "voice_transcripts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;