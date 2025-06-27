"use client";

import { RetroGrid } from "@/components/magicui/retro-grid";
import React from "react";

export function RetroGridDemo({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background">
      {children}

      <RetroGrid />
    </div>
  );
}
