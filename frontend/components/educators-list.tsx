"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Search, Video, PlayCircle, Users, Clock, Filter } from "lucide-react"

interface EducatorsListProps {
  onNavigate: (page: any) => void
}

export function EducatorsList({ onNavigate }: EducatorsListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const educators = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Mathematics Professor",
      bio: "PhD in Mathematics with 15+ years of teaching experience. Specializes in algebra, calculus, and statistics.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.9,
      students: 1250,
      subjects: ["Mathematics", "Statistics", "Calculus"],
      experience: "15+ years",
      nextLecture: "Today, 3:00 PM",
      isLive: true,
      recordedLectures: 45,
    },
    {
      id: 2,
      name: "Prof. Mike Chen",
      title: "Computer Science Expert",
      bio: "Senior Software Engineer turned educator. Expert in Python, JavaScript, and web development.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.8,
      students: 980,
      subjects: ["Programming", "Web Development", "Python"],
      experience: "12+ years",
      nextLecture: "Tomorrow, 2:00 PM",
      isLive: false,
      recordedLectures: 38,
    },
    {
      id: 3,
      name: "Ms. Emily Davis",
      title: "English Literature Specialist",
      bio: "Master's in English Literature. Passionate about creative writing and literary analysis.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.7,
      students: 750,
      subjects: ["English", "Literature", "Creative Writing"],
      experience: "8+ years",
      nextLecture: "Friday, 1:00 PM",
      isLive: false,
      recordedLectures: 32,
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      title: "Physics & Chemistry Expert",
      bio: "PhD in Physics with extensive research background. Makes complex concepts easy to understand.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.9,
      students: 1100,
      subjects: ["Physics", "Chemistry", "Science"],
      experience: "20+ years",
      nextLecture: "Monday, 4:00 PM",
      isLive: false,
      recordedLectures: 52,
    },
    {
      id: 5,
      name: "Prof. Maria Garcia",
      title: "Language Learning Expert",
      bio: "Polyglot and language pedagogy specialist. Fluent in 6 languages with innovative teaching methods.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.8,
      students: 890,
      subjects: ["Spanish", "French", "Languages"],
      experience: "10+ years",
      nextLecture: "Wednesday, 11:00 AM",
      isLive: false,
      recordedLectures: 28,
    },
    {
      id: 6,
      name: "Dr. Robert Kim",
      title: "Business & Economics",
      bio: "Former Wall Street analyst with MBA from Harvard. Expert in finance, economics, and business strategy.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.6,
      students: 650,
      subjects: ["Business", "Economics", "Finance"],
      experience: "14+ years",
      nextLecture: "Thursday, 5:00 PM",
      isLive: false,
      recordedLectures: 35,
    },
  ]

  const subjects = ["all", "Mathematics", "Programming", "English", "Science", "Languages", "Business"]

  const filteredEducators = educators.filter((educator) => {
    const matchesSearch =
      educator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      educator.subjects.some((subject) => subject.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesFilter = selectedFilter === "all" || educator.subjects.includes(selectedFilter)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Meet Our Expert Educators</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn from world-class instructors who are passionate about helping you succeed
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search educators or subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
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
          </div>
        </CardContent>
      </Card>

      {/* Educators Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEducators.map((educator) => (
          <Card key={educator.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardHeader className="text-center pb-4">
              <div className="relative mx-auto mb-4">
                <Avatar className="w-20 h-20 mx-auto">
                  <AvatarImage src={educator.avatar || "/placeholder.svg"} alt={educator.name} />
                  <AvatarFallback className="text-lg font-semibold">
                    {educator.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {educator.isLive && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
              <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{educator.name}</CardTitle>
              <p className="text-blue-600 font-medium">{educator.title}</p>

              {/* Rating and Stats */}
              <div className="flex items-center justify-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{educator.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{educator.students} students</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">{educator.bio}</p>

              {/* Subjects */}
              <div className="flex flex-wrap gap-2">
                {educator.subjects.map((subject) => (
                  <Badge key={subject} variant="secondary" className="text-xs">
                    {subject}
                  </Badge>
                ))}
              </div>

              {/* Experience and Lectures */}
              <div className="flex justify-between text-sm text-gray-600">
                <span>{educator.experience} experience</span>
                <span>{educator.recordedLectures} recorded lectures</span>
              </div>

              {/* Next Lecture */}
              {educator.isLive ? (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-700">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="font-medium text-sm">Live Now!</span>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium text-sm">Next: {educator.nextLecture}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  className={`flex-1 ${
                    educator.isLive ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  onClick={() => onNavigate("live-lectures")}
                >
                  <Video className="h-4 w-4 mr-2" />
                  {educator.isLive ? "Join Live" : "Schedule"}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => onNavigate("recorded-lectures")}
                >
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Recordings
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEducators.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Users className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No educators found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}
