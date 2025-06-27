"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LayoutDashboard, BookOpen, TrendingUp, MessageCircle, BookIcon } from "lucide-react"

interface SidebarProps {
  currentPage: "dashboard" | "lessons" | "progress" | "messages"
  onNavigate: (page: "dashboard" | "lessons" | "progress" | "messages") => void
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    {
      id: "dashboard" as const,
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "lessons" as const,
      label: "Lessons",
      icon: BookOpen,
    },
    {
      id: "progress" as const,
      label: "Progress",
      icon: TrendingUp,
    },
    {
      id: "messages" as const,
      label: "Messages",
      icon: MessageCircle,
    },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <BookIcon className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">LearnHub</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-normal",
                currentPage === item.id
                  ? "bg-blue-50 text-blue-700 hover:bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
              )}
              onClick={() => onNavigate(item.id)}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Alex Student</p>
            <p className="text-xs text-gray-500 truncate">Grade 10</p>
          </div>
        </div>
      </div>
    </div>
  )
}
