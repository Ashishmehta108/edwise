import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { TrendingUp, Award, Clock, BookOpen, CheckCircle, Circle } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface ProgressPageProps {
  onNavigate: (page: "dashboard" | "lessons" | "progress" | "messages") => void
}

export function ProgressPage({ onNavigate }: ProgressPageProps) {
  const progressData = [
    { week: "Week 1", hours: 8, score: 85 },
    { week: "Week 2", hours: 12, score: 88 },
    { week: "Week 3", hours: 10, score: 92 },
    { week: "Week 4", hours: 15, score: 95 },
    { week: "Week 5", hours: 11, score: 89 },
    { week: "Week 6", hours: 13, score: 94 },
  ]

  const subjectProgress = [
    { subject: "Mathematics", completed: 12, total: 15, score: 94 },
    { subject: "History", completed: 8, total: 12, score: 88 },
    { subject: "Chemistry", completed: 6, total: 10, score: 91 },
    { subject: "Literature", completed: 10, total: 14, score: 87 },
  ]

  const recentLessons = [
    { title: "Introduction to Algebra", subject: "Mathematics", status: "completed", score: 95, date: "2024-01-15" },
    { title: "World War II Timeline", subject: "History", status: "completed", score: 88, date: "2024-01-14" },
    { title: "Chemical Bonding", subject: "Chemistry", status: "in-progress", score: null, date: "2024-01-13" },
    { title: "Shakespeare Analysis", subject: "Literature", status: "pending", score: null, date: "2024-01-12" },
    { title: "Quadratic Equations", subject: "Mathematics", status: "completed", score: 92, date: "2024-01-11" },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage="progress" onNavigate={onNavigate} />

      <main className="flex-1 p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Progress</h1>
          <p className="text-gray-600">Track your learning journey and achievements</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">36</div>
              <div className="text-sm text-gray-600">Lessons Completed</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">69</div>
              <div className="text-sm text-gray-600">Hours Studied</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">91%</div>
              <div className="text-sm text-gray-600">Average Score</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-600">Achievements</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Progress Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Weekly Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Study Hours Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                Study Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Subject Progress */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-600" />
                Subject Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {subjectProgress.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">{subject.subject}</h3>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {subject.score}% avg
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>
                      {subject.completed}/{subject.total} lessons
                    </span>
                    <span>{Math.round((subject.completed / subject.total) * 100)}% complete</span>
                  </div>
                  <Progress value={(subject.completed / subject.total) * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Lessons */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-orange-600" />
                Recent Lessons
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentLessons.map((lesson, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                  <div className="flex-shrink-0">
                    {lesson.status === "completed" ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : lesson.status === "in-progress" ? (
                      <div className="h-5 w-5 border-2 border-blue-600 rounded-full flex items-center justify-center">
                        <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                      </div>
                    ) : (
                      <Circle className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{lesson.title}</h3>
                    <p className="text-sm text-gray-600">{lesson.subject}</p>
                  </div>
                  <div className="text-right">
                    {lesson.score && <div className="text-sm font-medium text-gray-900">{lesson.score}%</div>}
                    <div className="text-xs text-gray-500">{lesson.date}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
