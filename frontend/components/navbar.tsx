"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookOpen,
  Search,
  Bell,
  User,
  Home,
  Users,
  Video,
  PlayCircle,
  TrendingUp,
} from "lucide-react";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: any) => void;
  userName: string;
}

export function Navbar({ currentPage, onNavigate, userName }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState([
    {
      id: 1,
      message: "New live lecture starting in 15 minutes",
      time: "5m ago",
    },
    { id: 2, message: "Assignment feedback available", time: "1h ago" },
    { id: 3, message: "Weekly progress report ready", time: "2h ago" },
  ]);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "educators", label: "Educators", icon: Users },
    { id: "live-lectures", label: "Live Lectures", icon: Video },
    { id: "recorded-lectures", label: "Recorded Lectures", icon: PlayCircle },
    { id: "progress", label: "Progress", icon: TrendingUp },
  ];

  return (
    <nav className="fixed top-0 left-0   right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-2 h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <BookOpen />
            <span className="text-xl font-bold text-gray-900">Edwise</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden  items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={`flex items-center space-x-2 px-4 py-2 ${
                  currentPage === item.id
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={() => onNavigate(item.id)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Button>
            ))}
          </div>

          {/* Search and User Actions */}
          <div className="hidden items-center space-x-4">
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search skills, educators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5 text-gray-600" />
                  {notifications.length > 0 && (
                    <Badge className="absolute -top-1 flex items-center justify-center -right-1 h-5 w-5 p-0 text-xs bg-red-500 hover:bg-red-500">
                      {notifications.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-3 border-b">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="p-3 cursor-pointer"
                  >
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm text-gray-900">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500">
                        {notification.time}
                      </p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden sm:block text-gray-700">
                    {userName}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button variant={"outline"} >
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
}
