"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Sidebar } from "@/components/sidebar"
import { Play, CheckCircle, Clock, BookOpen } from "lucide-react"

interface LessonPageProps {
  onNavigate: (page: "dashboard" | "lessons" | "progress" | "messages") => void
}

export function LessonPage({ onNavigate }: LessonPageProps) {
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const handleSubmitQuiz = () => {
    setShowResults(true)
  }

  const handleMarkComplete = () => {
    setIsCompleted(true)
  }

  const quizQuestions = [
    {
      question: "What is the value of x in the equation 2x + 5 = 13?",
      options: ["x = 3", "x = 4", "x = 5", "x = 6"],
      correct: "x = 4",
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage="lessons" onNavigate={onNavigate} />

      <main className="flex-1 p-6 lg:p-8">
        {/* Lesson Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <BookOpen className="h-4 w-4" />
            <span>Mathematics</span>
            <span>•</span>
            <span>Chapter 3</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Introduction to Algebra</h1>
          <p className="text-gray-600 text-lg">Learn the fundamentals of algebraic expressions and equations</p>

          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">45 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Progress: 75%</span>
              <Progress value={75} className="w-32 h-2" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Player */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="relative bg-gray-900 rounded-t-lg aspect-video flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-blue-700 transition-colors cursor-pointer">
                      <Play className="h-8 w-8 ml-1" />
                    </div>
                    <p className="text-lg">Algebraic Expressions - Part 1</p>
                    <p className="text-gray-300 text-sm">Click to play video</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Video Transcript</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    In this lesson, we'll explore the basics of algebraic expressions. An algebraic expression is a
                    mathematical phrase that contains numbers, variables, and operation symbols...
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Quiz */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Practice Quiz
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {quizQuestions.map((quiz, index) => (
                  <div key={index} className="space-y-4">
                    <h3 className="font-semibold text-gray-900">{quiz.question}</h3>
                    <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                      {quiz.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`option-${optionIndex}`} />
                          <Label
                            htmlFor={`option-${optionIndex}`}
                            className={`cursor-pointer ${
                              showResults && option === quiz.correct
                                ? "text-green-600 font-semibold"
                                : showResults && option === selectedAnswer && option !== quiz.correct
                                  ? "text-red-600"
                                  : ""
                            }`}
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>

                    {showResults && (
                      <div
                        className={`p-4 rounded-lg ${
                          selectedAnswer === quiz.correct
                            ? "bg-green-50 border border-green-200"
                            : "bg-red-50 border border-red-200"
                        }`}
                      >
                        <p
                          className={`font-semibold ${
                            selectedAnswer === quiz.correct ? "text-green-800" : "text-red-800"
                          }`}
                        >
                          {selectedAnswer === quiz.correct ? "Correct!" : "Incorrect"}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">The correct answer is: {quiz.correct}</p>
                      </div>
                    )}
                  </div>
                ))}

                {!showResults ? (
                  <Button
                    onClick={handleSubmitQuiz}
                    disabled={!selectedAnswer}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button
                    onClick={handleMarkComplete}
                    disabled={isCompleted}
                    className={`${isCompleted ? "bg-green-600 hover:bg-green-600" : "bg-blue-600 hover:bg-blue-700"}`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Lesson Completed
                      </>
                    ) : (
                      "Mark Complete"
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Lesson Sidebar */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Lesson Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">45 minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Difficulty</span>
                    <span className="font-medium">Beginner</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">75%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Learning Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Understand algebraic expressions
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Solve basic equations
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-4 w-4 border-2 border-gray-300 rounded-full mt-0.5 flex-shrink-0"></div>
                    Apply algebraic concepts
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent" onClick={() => onNavigate("messages")}>
                  Ask Your Teacher
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
