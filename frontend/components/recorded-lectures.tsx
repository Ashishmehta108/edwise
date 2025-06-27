"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Play, Clock, Star, Search, Filter, BookOpen, Calendar, Eye } from "lucide-react"

interface RecordedLecturesProps {
  onNavigate: (page: any) => void
}

export function RecordedLectures({ onNavigate }: RecordedLecturesProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedDuration, setSelectedDuration] = useState("all")

  const lectures = [
    {
      id: 1,
      title: "Introduction to Quadratic Equations",
      instructor: "Dr. Sarah Johnson",
      subject: "Mathematics",
      duration: "45 min",
      views: 1250,
      rating: 4.9,
      thumbnail: "/placeholder.svg?height=200&width=300",
      description: "Learn the fundamentals of quadratic equations and how to solve them step by step.",
      uploadDate: "2024-01-15",
      level: "Beginner",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      title: "Python Functions and Modules",
      instructor: "Prof. Mike Chen",
      subject: "Programming",
      duration: "60 min",
      views: 980,
      rating: 4.8,
      thumbnail: "/placeholder.svg?height=200&width=300",
      description: "Deep dive into Python functions, modules, and best practices for code organization.",
      uploadDate: "2024-01-12",
      level: "Intermediate",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      title: "Shakespeare's Hamlet Analysis",
      instructor: "Ms. Emily Davis",
      subject: "English",
      duration: "50 min",
      views: 750,
      rating: 4.7,
      thumbnail: "/placeholder.svg?height=200&width=300",
      description: "Comprehensive analysis of themes, characters, and literary devices in Hamlet.",
      uploadDate: "2024-01-10",
      level: "Advanced",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      title: "Chemical Bonding and Molecular Structure",
      instructor: "Dr. James Wilson",
      subject: "Chemistry",
      duration: "75 min",
      views: 1100,
      rating: 4.9,
      thumbnail: "/placeholder.svg?height=200&width=300",
      description: "Understanding ionic, covalent, and metallic bonds with real-world examples.",
      uploadDate: "2024-01-08",
      level: "Intermediate",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      title: "Spanish Conversation Basics",
      instructor: "Prof. Maria Garcia",
      subject: "Languages",
      duration: "40 min",
      views: 890,
      rating: 4.8,
      thumbnail: "/placeholder.svg?height=200&width=300",
      description: "Essential phrases and conversation starters for Spanish beginners.",
      uploadDate: "2024-01-05",
      level: "Beginner",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      title: "Business Strategy Fundamentals",
      instructor: "Dr. Robert Kim",
      subject: "Business",
      duration: "65 min",
      views: 650,
      rating: 4.6,
      thumbnail: "/placeholder.svg?height=200&width=300",
      description: "Core principles of business strategy and competitive analysis.",
      uploadDate: "2024-01-03",
      level: "Intermediate",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 7,
      title: "Advanced Calculus: Integration Techniques",
      instructor: "Dr. Sarah Johnson",
      subject: "Mathematics",
      duration: "90 min",
      views: 1350,
      rating: 4.9,
      thumbnail: "/placeholder.svg?height=200&width=300",
      description: "Master advanced integration techniques including substitution and parts.",
      uploadDate: "2024-01-01",
      level: "Advanced",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 8,
      title: "Web Development with React",
      instructor: "Prof. Mike Chen",
      subject: "Programming",
      duration: "120 min",
      views: 1500,
      rating: 4.8,
      thumbnail: "/placeholder.svg?height=200&width=300",
      description: "Build modern web applications using React hooks and components.",
      uploadDate: "2023-12-28",
      level: "Intermediate",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const subjects = ["all", "Mathematics", "Programming", "English", "Chemistry", "Languages", "Business"]
  const durations = ["all", "Short (< 45 min)", "Medium (45-75 min)", "Long (> 75 min)"]
  const levels = ["all", "Beginner", "Intermediate", "Advanced"]

  const filteredLectures = lectures.filter((lecture) => {
    const matchesSearch =
      lecture.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lecture.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lecture.subject.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSubject = selectedFilter === "all" || lecture.subject === selectedFilter

    let matchesDuration = true
    if (selectedDuration === "Short (< 45 min)") {
      matchesDuration = Number.parseInt(lecture.duration) < 45
    } else if (selectedDuration === "Medium (45-75 min)") {
      const duration = Number.parseInt(lecture.duration)
      matchesDuration = duration >= 45 && duration <= 75
    } else if (selectedDuration === "Long (> 75 min)") {
      matchesDuration = Number.parseInt(lecture.duration) > 75
    }

    return matchesSearch && matchesSubject && matchesDuration
  })

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Recorded Lectures</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Access our extensive library of recorded lectures and learn at your own pace
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search lectures, instructors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Subject:</span>
                <div className="flex gap-2 flex-wrap">
                  {subjects.map((subject) => (
                    <Button
                      key={subject}
                      variant={selectedFilter === subject ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFilter(subject)}
                      className={selectedFilter === subject ? "bg-blue-600 hover:bg-blue-700" : "bg-transparent"}
                    >
                      {subject === "all" ? "All Subjects" : subject}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Duration:</span>
                <div className="flex gap-2 flex-wrap">
                  {durations.map((duration) => (
                    <Button
                      key={duration}
                      variant={selectedDuration === duration ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedDuration(duration)}
                      className={selectedDuration === duration ? "bg-green-600 hover:bg-green-700" : "bg-transparent"}
                    >
                      {duration === "all" ? "All Durations" : duration}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredLectures.length} of {lectures.length} lectures
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Button variant="outline" size="sm" className="bg-transparent">
            Most Recent
          </Button>
        </div>
      </div>

      {/* Lectures Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredLectures.map((lecture) => (
          <Card
            key={lecture.id}
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            onClick={() => onNavigate("lessons")}
          >
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={lecture.thumbnail || "/placeholder.svg"}
                alt={lecture.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="h-8 w-8 text-gray-900 ml-1" />
                </div>
              </div>

              {/* Duration Badge */}
              <Badge className="absolute top-3 right-3 bg-black/70 text-white hover:bg-black/70">
                {lecture.duration}
              </Badge>

              {/* Level Badge */}
              <Badge
                className={`absolute top-3 left-3 text-white hover:bg-current ${
                  lecture.level === "Beginner"
                    ? "bg-green-600"
                    : lecture.level === "Intermediate"
                      ? "bg-yellow-600"
                      : "bg-red-600"
                }`}
              >
                {lecture.level}
              </Badge>
            </div>

            <CardContent className="p-4 space-y-3">
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {lecture.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">{lecture.description}</p>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={lecture.avatar || "/placeholder.svg"} alt={lecture.instructor} />
                  <AvatarFallback className="text-xs">
                    {lecture.instructor
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">{lecture.instructor}</span>
              </div>

              {/* Subject Badge */}
              <Badge variant="secondary" className="text-xs">
                {lecture.subject}
              </Badge>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>{lecture.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{lecture.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(lecture.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredLectures.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <BookOpen className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No lectures found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
          <Button
            onClick={() => {
              setSearchQuery("")
              setSelectedFilter("all")
              setSelectedDuration("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Load More */}
      {filteredLectures.length > 0 && (
        <div className="text-center">
          <Button variant="outline" size="lg" className="bg-transparent">
            Load More Lectures
          </Button>
        </div>
      )}
    </div>
  )
}
