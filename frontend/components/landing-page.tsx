"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Award, Clock } from "lucide-react";
import { DockDemo } from "./Dock";
import Image from "next/image";
import logo from "../public/logo.png";
import { RetroGridDemo } from "./Landingbg";
import { HeroSection } from "./Herosection";
interface LandingPageProps {
  onLogin: () => void;
  onGetStarted: () => void;
}

export function LandingPage({ onLogin, onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className=" container max-w-7xl mx-auto  px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BookOpen />
          <span className="text-2xl font-bold text-gray-900">Edwise</span>
        </div>
        <Button
          variant="outline"
          onClick={onLogin}
          className="hover:bg-blue-50 bg-transparent"
        >
          Login
        </Button>
      </header>
      <div className="fixed sm:hidden left-[15%] bottom-6 z-50">
        <DockDemo />
      </div>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 text-center">
        {/* DotPattern background */}

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <RetroGridDemo>
            <div className="relative lg:max-w-4xl z-10 max-w-md mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Personalized Learning for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-indigo-600/80 via-indigo-600 to-indigo-600/30">
                  Every Student
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Experience the future of education with AI-powered personalized
                learning, interactive lessons, and dedicated virtual teachers.
              </p>
              <div className="flex z-10 flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={onGetStarted}
                  className="bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white px-8 py-3 text-lg"
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={onLogin}
                  className="border-blue-600 rounded-xl text-blue-600 hover:bg-indigo-50 px-8 py-3 text-lg bg-transparent"
                >
                  Login
                </Button>
              </div>
            </div>{" "}
          </RetroGridDemo>

          {/* Hero Image */}
          <HeroSection />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Edwise?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with proven
            educational methods
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Interactive Lessons
              </h3>
              <p className="text-gray-600">
                Engage with dynamic content and hands-on exercises
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Expert Teachers
              </h3>
              <p className="text-gray-600">
                Learn from qualified educators available 24/7
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Track Progress
              </h3>
              <p className="text-gray-600">
                Monitor your learning journey with detailed analytics
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Flexible Schedule
              </h3>
              <p className="text-gray-600">
                Learn at your own pace, anytime, anywhere
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">LearnHub</span>
          </div>
          <p className="text-gray-400">© 2024 LearnHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
