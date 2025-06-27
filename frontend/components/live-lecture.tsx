"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Video, Mic, MicOff, VideoOff, Users, Send, Hand, Settings, Maximize, Clock, Calendar } from "lucide-react"

interface LiveLectureProps {
  onNavigate: (page: any) => void
}

export function LiveLecture({ onNavigate }: LiveLectureProps) {
  const [message, setMessage] = useState("")
  const [isMuted, setIsMuted] = useState(true)
  const [isVideoOff, setIsVideoOff] = useState(true)
  const [handRaised, setHandRaised] = useState(false)

  const [chatMessages] = useState([
    {
      id: 1,
      user: "Sarah M.",
      message: "Great explanation of quadratic equations!",
      time: "2:45 PM",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      user: "Mike R.",
      message: "Can you repeat the formula for the discriminant?",
      time: "2:46 PM",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      user: "Dr. Johnson",
      message: "Of course! The discriminant is b² - 4ac",
      time: "2:47 PM",
      avatar: "/placeholder.svg?height=32&width=32",
      isInstructor: true,
    },
    {
      id: 4,
      user: "Emma L.",
      message: "Thank you! That makes it much clearer",
      time: "2:48 PM",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ])

  const upcomingLectures = [
    {
      id: 1,
      title: "Python Workshop: Building Your First App",
      instructor: "Prof. Mike Chen",
      time: "Tomorrow, 2:00 PM",
      duration: "90 min",
      attendees: 18,
      subject: "Programming",
    },
    {
      id: 2,
      title: "Creative Writing: Character Development",
      instructor: "Ms. Emily Davis",
      time: "Friday, 1:00 PM",
      duration: "60 min",
      attendees: 12,
      subject: "English",
    },
    {
      id: 3,
      title: "Physics: Laws of Motion",
      instructor: "Dr. James Wilson",
      time: "Monday, 4:00 PM",
      duration: "75 min",
      attendees: 25,
      subject: "Physics",
    },
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message
      setMessage("")
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Live Lecture</h1>
        <p className="text-gray-600">Join interactive sessions with expert educators</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main Video Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Current Live Session */}
          <Card className="border-0 shadow-xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <Badge className="bg-red-500 hover:bg-red-500 text-white">LIVE</Badge>
                  </div>
                  <div>
                    <CardTitle className="text-xl">Advanced Algebra Q&A Session</CardTitle>
                    <p className="text-gray-600">with Dr. Sarah Johnson</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>24 participants</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Video Player */}
              <div className="relative bg-gray-900 rounded-xl aspect-video flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Video className="h-12 w-12" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Dr. Sarah Johnson</h3>
                  <p className="text-gray-300">Mathematics Professor</p>
                  <Badge className="mt-2 bg-green-600 hover:bg-green-600">Speaking</Badge>
                </div>

                {/* Video Controls Overlay */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center gap-2 bg-black/70 rounded-full px-4 py-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`text-white hover:bg-white/20 ${isMuted ? "bg-red-600 hover:bg-red-700" : ""}`}
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`text-white hover:bg-white/20 ${isVideoOff ? "bg-red-600 hover:bg-red-700" : ""}`}
                      onClick={() => setIsVideoOff(!isVideoOff)}
                    >
                      {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`text-white hover:bg-white/20 ${handRaised ? "bg-yellow-600 hover:bg-yellow-700" : ""}`}
                      onClick={() => setHandRaised(!handRaised)}
                    >
                      <Hand className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Maximize className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Session Info */}
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Started: 2:30 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Duration: 60 min</span>
                  </div>
                </div>
                <Button className="bg-red-600 hover:bg-red-700">Leave Session</Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Sessions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Upcoming Live Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingLectures.map((lecture) => (
                  <div
                    key={lecture.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{lecture.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{lecture.instructor}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{lecture.time}</span>
                        <span>{lecture.duration}</span>
                        <Badge variant="secondary" className="text-xs">
                          {lecture.subject}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-2">{lecture.attendees} registered</div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Join Session
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-lg h-[600px] flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Live Chat</CardTitle>
              <p className="text-sm text-gray-600">Ask questions and interact</p>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <ScrollArea className="flex-1 px-4">
                <div className="space-y-4">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="flex gap-3">
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarImage src={msg.avatar || "/placeholder.svg"} alt={msg.user} />
                        <AvatarFallback className="text-xs">
                          {msg.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-sm font-medium ${msg.isInstructor ? "text-blue-600" : "text-gray-900"}`}
                          >
                            {msg.user}
                          </span>
                          {msg.isInstructor && (
                            <Badge className="text-xs bg-blue-100 text-blue-800 hover:bg-blue-100">Instructor</Badge>
                          )}
                          <span className="text-xs text-gray-500">{msg.time}</span>
                        </div>
                        <p className="text-sm text-gray-700 break-words">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask a question..."
                    className="flex-1"
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
