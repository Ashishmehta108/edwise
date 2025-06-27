"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sidebar } from "@/components/sidebar"
import { Send, Video, Phone, MoreVertical, Smile } from "lucide-react"

interface TeacherChatPageProps {
  onNavigate: (page: "dashboard" | "lessons" | "progress" | "messages") => void
}

export function TeacherChatPage({ onNavigate }: TeacherChatPageProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "teacher",
      content: "Hi Alex! How are you doing with the algebra lessons?",
      time: "10:30 AM",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      sender: "student",
      content: "Hi Ms. Johnson! I'm doing well, but I have a question about quadratic equations.",
      time: "10:32 AM",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      sender: "teacher",
      content: "Of course! I'd be happy to help. What specifically are you struggling with?",
      time: "10:33 AM",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      sender: "student",
      content: "I'm having trouble understanding how to factor quadratic expressions. Could you explain it again?",
      time: "10:35 AM",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      sender: "teacher",
      content: "Let me break it down step by step. First, let's look at the general form: ax² + bx + c",
      time: "10:36 AM",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "student" as const,
        content: message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        avatar: "/placeholder.svg?height=40&width=40",
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage="messages" onNavigate={onNavigate} />

      <main className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Ms. Johnson" />
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-gray-900">Ms. Johnson</h2>
                <p className="text-sm text-green-600">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Chat Messages */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === "student" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={msg.avatar || "/placeholder.svg"} alt={msg.sender} />
                    <AvatarFallback>{msg.sender === "teacher" ? "MJ" : "A"}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      msg.sender === "student"
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-gray-200 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.sender === "student" ? "text-blue-100" : "text-gray-500"}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                  <Smile className="h-4 w-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="pr-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Video Call Placeholder */}
          <div className="w-80 bg-white border-l border-gray-200 p-4">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Video Session</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <Video className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm opacity-75">Video call not active</p>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">Start Video Call</Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Schedule Session
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                  Share Screen
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                  Send File
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                  Schedule Homework Review
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
