"use client";
import { OnboardingPage } from "@/components/onboarding-page";
import { Navbar } from "@/components/navbar";
import { useRouter, useSearchParams } from "next/navigation";

export default function Onboarding() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userName = searchParams.get("userName") || "";
  const handleComplete = (skills: string[]) => {
    router.push(
      `/dashboard?userName=${encodeURIComponent(
        userName
      )}&skills=${encodeURIComponent(skills.join(","))}`
    );
  };
  return (
    <>
      <Navbar
        currentPage="onboarding"
        onNavigate={() => {}}
        userName={userName}
      />
      <OnboardingPage userName={userName} onComplete={handleComplete} />
    </>
  );
}
