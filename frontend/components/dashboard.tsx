"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Clock,
  Trophy,
  TrendingUp,
  Play,
  ArrowRight,
  Target,
  Users,
  Video,
  CheckCircle2,
  Lock,
  Circle,
  Star,
  Calendar,
  BarChart3,
  Zap,
  Award,
  BookMarked,
} from "lucide-react";
import {
  getUser,
  listGoals,
  listAchievements,
  listAIChats,
  listVoiceTranscripts,
  User,
  Goal,
  Achievement,
  AIChat,
  VoiceTranscript,
  addAIChat,
  aiChat,
  suggestGoal,
  createGoal,
  addVoiceTranscript,
  transcribeVoice,
} from "@/app/lib/api";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

interface DashboardProps {
  userName: string;
  selectedSkills: string[];
  onNavigate: (page: any) => void;
}

export function Dashboard({
  userName,
  selectedSkills,
  onNavigate,
}: DashboardProps) {
  const { user } = useUser();
  const [userData, setUserData] = useState<User | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [aiChats, setAIChats] = useState<AIChat[]>([]);
  const [voiceTranscripts, setVoiceTranscripts] = useState<VoiceTranscript[]>([]);
  const [loading, setLoading] = useState(true);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [goalLoading, setGoalLoading] = useState(false);
  const [voiceLoading, setVoiceLoading] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const learningPath = [
    {
      id: 1,
      title: "Introduction to Python",
      description:
        "Master programming fundamentals with hands-on Python projects and real-world applications",
      progress: 60,
      status: "in-progress",
      estimatedTime: "3 weeks",
      skill: "Programming",
      lessons: 12,
      completedLessons: 7,
    },
    {
      id: 2,
      title: "Web Development with HTML & CSS",
      description:
        "Build responsive, modern websites from scratch using semantic HTML and advanced CSS",
      progress: 0,
      status: "upcoming",
      estimatedTime: "2 weeks",
      skill: "Web Development",
      lessons: 8,
      completedLessons: 0,
    },
    {
      id: 3,
      title: "React Fundamentals",
      description:
        "Create dynamic, interactive user interfaces with React.js and modern JavaScript",
      progress: 0,
      status: "locked",
      estimatedTime: "4 weeks",
      skill: "Frontend",
      lessons: 15,
      completedLessons: 0,
    },
  ];

  const recommendedLessons = [
    {
      id: 1,
      title: "Mastering Python Functions",
      instructor: "Prof. Mike Chen",
      duration: "60 min",
      thumbnail: "/placeholder.svg?height=120&width=200",
      skill: "Programming",
      rating: 4.8,
      students: 2341,
      difficulty: "Intermediate",
    },
    {
      id: 2,
      title: "Flexbox & Grid Essentials",
      instructor: "Ms. Anna Lee",
      duration: "45 min",
      thumbnail: "/placeholder.svg?height=120&width=200",
      skill: "Web Development",
      rating: 4.9,
      students: 1876,
      difficulty: "Beginner",
    },
    {
      id: 3,
      title: "Building Components in React",
      instructor: "Mr. John Smith",
      duration: "50 min",
      thumbnail: "/placeholder.svg?height=120&width=200",
      skill: "Frontend",
      rating: 4.7,
      students: 3142,
      difficulty: "Advanced",
    },
  ];

  const upcomingLectures = [
    {
      id: 1,
      title: "Live Workshop: Python Projects",
      instructor: "Prof. Mike Chen",
      time: "Today, 4:00 PM",
      attendees: 22,
      maxAttendees: 50,
      type: "Workshop",
    },
    {
      id: 2,
      title: "Live Coding: Responsive Layouts",
      instructor: "Ms. Anna Lee",
      time: "Tomorrow, 5:00 PM",
      attendees: 15,
      maxAttendees: 30,
      type: "Live Coding",
    },
  ];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        if (user?.id) {
          const userRes = await getUser(user.id);
          setUserData(userRes.user);
        }
        const goalsRes = await listGoals();
        setGoals(goalsRes.goals);
        const achievementsRes = await listAchievements();
        setAchievements(achievementsRes.achievements);
        const aiChatsRes = await listAIChats();
        setAIChats(aiChatsRes.chats);
        const transcriptsRes = await listVoiceTranscripts();
        setVoiceTranscripts(transcriptsRes.transcripts);
      } catch (err) {
        // Optionally handle error
      }
      setLoading(false);
    }
    fetchData();
  }, [user?.id]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-50 text-green-700 border-green-200";
      case "Intermediate":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Advanced":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  // AI Chat send handler
  const handleSendChat = async () => {
    if (!user?.id || !chatInput.trim()) return;
    setChatLoading(true);
    try {
      // Save user message
      await addAIChat(user.id, chatInput, "user");
      setAIChats((prev) => [...prev, { id: Date.now(), userId: user.id, message: chatInput, sender: "user" }]);
      setChatInput("");
      // Get AI response from MCP
      const aiRes = await aiChat(user.id, chatInput);
      // Save AI response
      await addAIChat(user.id, aiRes.response, "ai");
      setAIChats((prev) => [...prev, { id: Date.now() + 1, userId: user.id, message: aiRes.response, sender: "ai" }]);
    } catch (err) {
      // Optionally handle error
    }
    setChatLoading(false);
  };

  // AI Goal Suggestion handler
  const handleSuggestGoal = async () => {
    if (!user?.id) return;
    setGoalLoading(true);
    try {
      const suggestion = await suggestGoal(user.id, selectedSkills);
      await createGoal(user.id, suggestion.skillId, suggestion.targetDate);
      // Optionally refresh goals
      const goalsRes = await listGoals();
      setGoals(goalsRes.goals);
    } catch (err) {
      // Optionally handle error
    }
    setGoalLoading(false);
  };

  // Voice chat handlers
  const handleStartRecording = async () => {
    setAudioChunks([]);
    setRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => setAudioChunks((prev) => [...prev, e.data]);
    recorder.onstop = async () => {
      setVoiceLoading(true);
      const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
      try {
        // Transcribe
        const { transcript } = await transcribeVoice(audioBlob);
        setVoiceTranscript(transcript);
        if (user?.id) {
          // Save transcript
          await addVoiceTranscript(user.id, transcript);
          setVoiceTranscripts((prev) => [
            ...prev,
            { id: Date.now(), userId: user.id, transcript }
          ]);
          // Send to AI chat
          await addAIChat(user.id, transcript, "user");
          setAIChats((prev) => [
            ...prev,
            { id: Date.now(), userId: user.id, message: transcript, sender: "user" }
          ]);
        }
        if (user?.id) {
          const aiRes = await aiChat(user.id, transcript);
          await addAIChat(user.id, aiRes.response, "ai");
          setAIChats((prev) => [
            ...prev,
            { id: Date.now() + 1, userId: user.id, message: aiRes.response, sender: "ai" }
          ]);
        }
      } catch (err) {
        // Optionally handle error
      }
      setVoiceLoading(false);
    };
    setMediaRecorder(recorder);
    recorder.start();
  };

  const handleStopRecording = () => {
    setRecording(false);
    mediaRecorder?.stop();
  };

  return (
    <div className="min-h-screen mt-16 bg-slate-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full translate-y-24 -translate-x-24"></div>

          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-4xl font-bold text-gray-900">
                    Welcome back, {userName}!
                  </h1>
                  <div className="text-3xl">👋</div>
                </div>
                <p className="text-gray-600 text-lg mb-6 max-w-3xl leading-relaxed">
                  Ready to continue your learning journey? You're making
                  excellent progress and building valuable skills that will
                  advance your career.
                </p>
              </div>
              <div className="hidden lg:flex items-center gap-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    Level 3
                  </div>
                  <div className="text-sm text-gray-600">
                    Intermediate Learner
                  </div>
                </div>
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center">
                  <BookMarked className="h-8 w-8 text-indigo-600" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-indigo-900">5</div>
                    <div className="text-sm text-indigo-700">
                      Lessons This Week
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-green-900">4h</div>
                    <div className="text-sm text-green-700">Study Time</div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-purple-900">92%</div>
                    <div className="text-sm text-purple-700">Avg Score</div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-orange-900">7</div>
                    <div className="text-sm text-orange-700">Day Streak</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced Learning Path */}
            <Card className="shadow-sm border-gray-100 bg-white">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
                      <Target className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900">
                        Your Learning Path
                      </CardTitle>
                      <p className="text-gray-600 mt-1">
                        AI-curated curriculum based on your goals
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 px-3 py-1 font-medium">
                    AI Personalized
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {learningPath.map((module, index) => (
                  <div
                    key={module.id}
                    className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                      module.status === "in-progress"
                        ? "border-indigo-200 bg-indigo-50/30 hover:bg-indigo-50/50"
                        : module.status === "upcoming"
                        ? "border-gray-200 bg-white hover:border-indigo-200 hover:shadow-md cursor-pointer"
                        : "border-gray-100 bg-gray-50/50"
                    }`}
                  >
                    {/* Connection Line */}
                    {index < learningPath.length - 1 && (
                      <div className="absolute left-9 top-20 w-0.5 h-8 bg-gray-200"></div>
                    )}

                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0">
                        <div
                          className={`relative w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all ${
                            module.status === "in-progress"
                              ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/25"
                              : module.status === "upcoming"
                              ? "bg-white border-indigo-200 text-indigo-600 group-hover:border-indigo-400"
                              : "bg-gray-100 border-gray-200 text-gray-400"
                          }`}
                        >
                          {module.status === "in-progress" ? (
                            <CheckCircle2 className="h-6 w-6" />
                          ) : module.status === "upcoming" ? (
                            <span className="text-lg font-bold">
                              {index + 1}
                            </span>
                          ) : (
                            <Lock className="h-5 w-5" />
                          )}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge
                            variant="outline"
                            className="text-xs font-medium bg-white"
                          >
                            {module.skill}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="text-xs bg-gray-100 text-gray-600"
                          >
                            {module.estimatedTime}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="text-xs bg-gray-100 text-gray-600"
                          >
                            {module.lessons} lessons
                          </Badge>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                          {module.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {module.description}
                        </p>

                        {module.status === "in-progress" && (
                          <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-600 font-medium">
                                {module.completedLessons}/{module.lessons}{" "}
                                lessons completed
                              </span>
                              <span className="font-bold text-indigo-600">
                                {module.progress}%
                              </span>
                            </div>
                            <Progress
                              value={module.progress}
                              className="h-3 bg-indigo-100"
                            />
                          </div>
                        )}

                        {module.status === "upcoming" && (
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">
                              {module.lessons} lessons
                            </span>{" "}
                            • Unlocks after completing previous course
                          </div>
                        )}
                      </div>

                      <div className="flex-shrink-0">
                        {module.status === "in-progress" ? (
                          <Button
                            onClick={() => onNavigate("lessons")}
                            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 shadow-md hover:shadow-lg transition-all"
                          >
                            Continue Learning
                          </Button>
                        ) : module.status === "upcoming" ? (
                          <Button
                            variant="outline"
                            className="px-6 py-2 border-indigo-200 text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50"
                          >
                            Preview Course
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            disabled
                            className="px-6 py-2 text-gray-400"
                          >
                            Locked
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Enhanced Recommended Lessons */}
            <Card className="shadow-sm border-gray-100 bg-white">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900">
                        Recommended for You
                      </CardTitle>
                      <p className="text-gray-600 mt-1">
                        Curated lessons to accelerate your progress
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => onNavigate("recorded-lectures")}
                    className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-4 py-2"
                  >
                    View All <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {recommendedLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="group cursor-pointer rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 bg-white"
                    >
                      <div className="flex">
                        <div className="relative w-48 h-32 flex-shrink-0">
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <div className="text-gray-400 text-sm">
                              Video Preview
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <div className="w-12 h-12 bg-white/95 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="h-5 w-5 text-gray-900 ml-0.5" />
                            </div>
                          </div>
                          <Badge className="absolute top-3 right-3 bg-black/80 text-white text-xs font-medium">
                            {lesson.duration}
                          </Badge>
                        </div>

                        <div className="flex-1 p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors text-lg leading-tight">
                                {lesson.title}
                              </h3>
                              <p className="text-gray-600 text-sm mb-2">
                                {lesson.instructor}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 text-amber-500">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="text-sm font-medium text-gray-700">
                                {lesson.rating}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 mb-3">
                            <Badge
                              variant="outline"
                              className="text-xs font-medium"
                            >
                              {lesson.skill}
                            </Badge>
                            <Badge
                              className={`text-xs font-medium border ${getDifficultyColor(
                                lesson.difficulty
                              )}`}
                            >
                              {lesson.difficulty}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              {lesson.students.toLocaleString()} students
                            </span>
                            <Button
                              size="sm"
                              className="bg-indigo-600 hover:bg-indigo-700 px-4"
                            >
                              Start Learning
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card className="shadow-sm border-gray-100 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-gray-900">
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="p-3 rounded-xl border bg-yellow-50 border-opacity-50"
                  >
                    <div className="flex items-center gap-3">
                      <Trophy className="h-5 w-5 text-yellow-600" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-yellow-600">
                          {achievement.title}
                        </div>
                        <div className="text-xs text-gray-600">
                          {achievement.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Enhanced Live Lectures */}
            <Card className="shadow-sm border-gray-100 bg-white">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-orange-600" />
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900">
                      Live Sessions
                    </CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onNavigate("live-lectures")}
                    className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 text-sm"
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingLectures.map((lecture) => (
                  <div
                    key={lecture.id}
                    className="p-4 border border-gray-200 rounded-xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant="secondary"
                        className="text-xs bg-orange-100 text-orange-700"
                      >
                        {lecture.type}
                      </Badge>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-red-600 font-medium">
                        LIVE
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm leading-tight group-hover:text-indigo-600 transition-colors">
                      {lecture.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {lecture.instructor}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-orange-600 font-semibold">
                        {lecture.time}
                      </span>
                      <div className="text-xs text-gray-500">
                        {lecture.attendees}/{lecture.maxAttendees} joined
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress
                        value={(lecture.attendees / lecture.maxAttendees) * 100}
                        className="h-1"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Enhanced Quick Actions */}
            <Card className="shadow-sm border-gray-100 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-gray-900">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 transition-all group"
                  onClick={() => onNavigate("educators")}
                >
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-200 transition-colors">
                    <Users className="h-4 w-4 text-indigo-600" />
                  </div>
                  Browse Expert Educators
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 border-gray-200 hover:border-green-200 hover:bg-green-50 hover:text-green-700 transition-all group"
                  onClick={() => onNavigate("live-lectures")}
                >
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
                    <Video className="h-4 w-4 text-green-600" />
                  </div>
                  Join Live Session
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 border-gray-200 hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700 transition-all group"
                  onClick={() => onNavigate("progress")}
                >
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                  </div>
                  Detailed Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
