"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  BookOpen,
  Code,
  Calculator,
  Globe,
  Palette,
  Music,
  Beaker,
  Users,
} from "lucide-react";

interface OnboardingPageProps {
  userName: string;
  onComplete: (skills: string[]) => void;
}

const skillOptions = [
  { id: "mathematics", name: "Mathematics", icon: Calculator, color: "blue" },
  { id: "programming", name: "Programming", icon: Code, color: "green" },
  {
    id: "english",
    name: "English Literature",
    icon: BookOpen,
    color: "purple",
  },
  { id: "languages", name: "Foreign Languages", icon: Globe, color: "orange" },
  { id: "art", name: "Art & Design", icon: Palette, color: "fuchsia" },
  { id: "music", name: "Music", icon: Music, color: "indigo" },
  { id: "science", name: "Science", icon: Beaker, color: "red" },
  { id: "business", name: "Business Studies", icon: Users, color: "yellow" },
];

export function OnboardingPage({ userName, onComplete }: OnboardingPageProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleSkillToggle = (skillId: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillId)
        ? prev.filter((id) => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleContinue = () => {
    if (selectedSkills.length > 0) {
      onComplete(selectedSkills);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome, {userName}! 👋
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Let's personalize your learning experience. Choose the skills you'd
            like to develop:
          </p>
        </div>

        {/* Skills Selection */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Select Your Learning Interests
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {skillOptions.map((skill) => (
                <div
                  key={skill.id}
                  className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedSkills.includes(skill.id)
                      ? `border-${skill.color}-500 text-${skill.color}-800 bg-${skill.color}-100`
                      : `border-gray-200 bg-white hover:border-${skill.color}-300`
                  }`}
                  onClick={() => handleSkillToggle(skill.id)}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        selectedSkills.includes(skill.id)
                          ? `bg-${skill.color}-600`
                          : `bg-${skill.color}-100`
                      }`}
                    >
                      <skill.icon
                        className={`h-8 w-8 ${
                          selectedSkills.includes(skill.id)
                            ? "text-white"
                            : `text-${skill.color}-600`
                        }`}
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      {skill.name}
                    </h3>
                    <Checkbox
                      checked={selectedSkills.includes(skill.id)}
                      onChange={() => handleSkillToggle(skill.id)}
                      className="absolute top-4 right-4"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-6">
                Selected {selectedSkills.length} skill
                {selectedSkills.length !== 1 ? "s" : ""}
              </p>
              <Button
                onClick={handleContinue}
                disabled={selectedSkills.length === 0}
                className="px-12 py-3 text-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
              >
                Continue to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
