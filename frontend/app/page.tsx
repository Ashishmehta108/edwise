"use client";

import { LandingPage } from "@/components/landing-page";
import { Navbar } from "@/components/navbar";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Navbar currentPage="landing" onNavigate={() => {}} userName={""} />
      <LandingPage
        onGetStarted={() => router.push("/signup")}
        onLogin={() => router.push("/dashboard")}
      />
    </>
  );
}
