"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BookOpen,
  ArrowLeft,
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  CheckCircle,
} from "lucide-react";

interface SignupPageProps {
  onSignup: (name: string) => void;
  onBackToLogin: () => void;
}

export function SignupPage({ onSignup, onBackToLogin }: SignupPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handlePasswordChange = (password: string) => {
    setFormData({ ...formData, password });
    setPasswordStrength(calculatePasswordStrength(password));
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-400";
    if (passwordStrength <= 3) return "bg-yellow-400";
    return "bg-green-400";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 3) return "Medium";
    return "Strong";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.email &&
      formData.password === formData.confirmPassword &&
      passwordStrength >= 3
    ) {
      onSignup(formData.name);
    }
  };

  const isPasswordMatch =
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        {/* Header Section */}
        <div className="flex-1 max-w-lg text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
            <div className="p-3 bg-indigo-600 rounded-xl shadow-lg">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <span className="text-3xl font-bold text-indigo-600">EdWise</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Create Your Account
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Start your personalized learning journey today and join thousands of
            learners worldwide
          </p>

          {/* Features list */}
          <div className="hidden lg:block space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-indigo-600" />
              <span className="text-gray-700">Personalized learning paths</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-indigo-600" />
              <span className="text-gray-700">Expert-curated content</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-indigo-600" />
              <span className="text-gray-700">
                Progress tracking & analytics
              </span>
            </div>
          </div>
        </div>

        {/* Signup Form */}
        <div className="flex-1 w-full max-w-md">
          <Card className="border shadow-xl bg-white hover:shadow-2xl transition-all duration-300">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl text-center text-gray-800">
                Sign Up
              </CardTitle>
              <p className="text-sm text-gray-500 text-center">
                Join thousands of learners worldwide
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="h-12 pl-10 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 rounded-lg"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="h-12 pl-10 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 rounded-lg"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      className="h-12 pl-10 pr-10 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 rounded-lg"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                            style={{
                              width: `${(passwordStrength / 5) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span
                          className={`text-xs font-semibold ${
                            passwordStrength <= 2
                              ? "text-red-500"
                              : passwordStrength <= 3
                              ? "text-yellow-500"
                              : "text-green-500"
                          }`}
                        >
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className={`h-12 pl-10 pr-10 border-2 transition-all duration-200 rounded-lg ${
                        formData.confirmPassword
                          ? isPasswordMatch
                            ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                            : "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-200"
                      }`}
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      {formData.confirmPassword && isPasswordMatch && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  {formData.confirmPassword && !isPasswordMatch && (
                    <p className="text-sm text-red-500">
                      Passwords do not match
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                  disabled={
                    !formData.name ||
                    !formData.email ||
                    !isPasswordMatch ||
                    passwordStrength < 3
                  }
                >
                  Create Account
                </Button>
              </form>

              {/* Back to Login */}
              <div className="mt-6 text-center border-t pt-6">
                <Button
                  variant="ghost"
                  onClick={onBackToLogin}
                  className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-semibold transition-all duration-200 rounded-lg px-6 py-2"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </Button>
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                By creating an account, you agree to our{" "}
                <span className="text-indigo-600 hover:text-indigo-700 cursor-pointer font-semibold">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-indigo-600 hover:text-indigo-700 cursor-pointer font-semibold">
                  Privacy Policy
                </span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
