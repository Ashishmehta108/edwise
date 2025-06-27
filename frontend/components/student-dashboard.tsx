"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sidebar } from "@/components/sidebar"
import { BookOpen, Clock, Trophy, TrendingUp } from "lucide-react"

interface StudentDashboardProps {
  onNavigate: (page: "dashboard" | "lessons" | "progress" | "messages") => void
}

export function StudentDashboard({ onNavigate }: StudentDashboardProps) {
  const upcomingLessons = [
    { id: 1, title: "Introduction to Algebra", progress: 75, duration: "45 min", subject: "Mathematics" },
    { id: 2, title: "World War II History", progress: 30, duration: "60 min", subject: "History" },
    { id: 3, title: "Chemical Reactions", progress: 0, duration: "50 min", subject: "Chemistry" },
  ]

  const suggestions = [
    { title: "Complete Algebra Quiz", description: "You're 75% through this lesson", icon: BookOpen, color: "blue" },
    { title: "Review History Notes", description: "Strengthen your understanding", icon: Clock, color: "green" },
    {
      title: "Practice Chemistry Problems",
      description: "Get ready for the next lesson",
      icon: Trophy,
      color: "purple",
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage="dashboard" onNavigate={onNavigate} />

      <main className="flex-1 p-6 lg:p-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">Hi Alex! 👋</h1>
          <p className="text-blue-100 text-lg">Ready to continue your learning journey today?</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personalized Suggestions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Personalized for You
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center bg-${suggestion.color}-100`}
                    >
                      <suggestion.icon className={`h-6 w-6 text-${suggestion.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{suggestion.title}</h3>
                      <p className="text-gray-600 text-sm">{suggestion.description}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Lessons */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  Upcoming Lessons
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                        <p className="text-sm text-gray-600">
                          {lesson.subject} • {lesson.duration}
                        </p>
                      </div>
                      <Button size="sm" onClick={() => onNavigate("lessons")} className="bg-blue-600 hover:bg-blue-700">
                        Continue
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{lesson.progress}%</span>
                      </div>
                      <Progress value={lesson.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-gray-600">Lessons Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">8.5</div>
                  <div className="text-sm text-gray-600">Hours Studied</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">95%</div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => onNavigate("messages")}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Schedule Session
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => onNavigate("progress")}
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  View Progress
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => onNavigate("messages")}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Ask Teacher
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
