"use client";
import { Dashboard } from "@/components/dashboard";
import { Navbar } from "@/components/navbar";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const user = useUser();
  useEffect(() => {
    if (user.isSignedIn) {
      const userId = user.user.id;
      const createUser = async () => {
        const response = await fetch("http://localhost:4444/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              id: userId,
              email: user.user?.emailAddresses[0]?.emailAddress || "",
            },
          }),
        });

        if (!response.ok) {
          console.error("Failed to create user");
        }
      };
      createUser();
    }
  }, []);
  const searchParams = useSearchParams();
  const userName = searchParams.get("userName") || "";
  const selectedSkills = searchParams.get("skills")?.split(",") || [];
  return (
    <>
      <Navbar
        currentPage="dashboard"
        onNavigate={() => {}}
        userName={(user.user?.firstName as string) || ""}
      />
      <Dashboard
        userName={user.user?.firstName || userName}
        selectedSkills={selectedSkills}
        onNavigate={() => {}}
      />
    </>
  );
}
