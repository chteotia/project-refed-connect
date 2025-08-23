"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Users, Heart, Recycle } from "lucide-react"

interface AuthModalProps {
  mode: "login" | "signup"
  onClose: () => void
  onSwitchMode: (mode: "login" | "signup") => void
  onSuccess: (userData: { role: "donor" | "ngo" | "biogas"; name: string; email?: string; authMethod?: string }) => void
}

export function AuthModal({ mode, onClose, onSwitchMode, onSuccess }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState<"donor" | "ngo" | "biogas" | null>(null)
  const [step, setStep] = useState<"auth" | "role">(mode === "signup" ? "role" : "auth")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    try {
      console.log("[v0] Google authentication triggered with role:", selectedRole)

      if (mode === "signup" && !selectedRole) {
        alert("Please select your role first")
        setIsLoading(false)
        return
      }

      // For demo purposes, simulate proper Google OAuth flow
      console.log("[v0] Starting Google OAuth flow...")

      // Simulate Google OAuth redirect and callback
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockGoogleUsers = [
        { email: "sarah.johnson@gmail.com", name: "Sarah Johnson", picture: "https://via.placeholder.com/40" },
        { email: "mike.chen@gmail.com", name: "Mike Chen", picture: "https://via.placeholder.com/40" },
        { email: "priya.patel@gmail.com", name: "Priya Patel", picture: "https://via.placeholder.com/40" },
        { email: "alex.rodriguez@gmail.com", name: "Alex Rodriguez", picture: "https://via.placeholder.com/40" },
      ]
      const mockGoogleUser = mockGoogleUsers[Math.floor(Math.random() * mockGoogleUsers.length)]

      console.log("[v0] Google authentication successful:", mockGoogleUser)

      // For signup, create new account with selected role
      if (mode === "signup") {
        console.log("[v0] Creating new account with role:", selectedRole)
        const userData = {
          role: selectedRole!,
          name: mockGoogleUser.name, // Using realistic Google profile name
          email: mockGoogleUser.email,
          authMethod: "google",
        }
        console.log("[v0] New Google account created:", userData)
        onSuccess(userData)
      } else {
        // For login, authenticate existing user
        console.log("[v0] Logging in existing Google user")
        const userData = {
          role: "donor" as "donor" | "ngo" | "biogas", // Default role for existing users
          name: mockGoogleUser.name, // Using realistic Google profile name
          email: mockGoogleUser.email,
          authMethod: "google",
        }
        onSuccess(userData)
      }
    } catch (error) {
      console.error("[v0] Google authentication error:", error)
      alert("Google authentication failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      console.log("[v0] Email authentication triggered with role:", selectedRole)

      if (mode === "signup" && !selectedRole) {
        alert("Please select your role first")
        setIsLoading(false)
        return
      }

      if (mode === "signup") {
        if (!formData.name.trim()) {
          alert("Please enter your full name")
          setIsLoading(false)
          return
        }
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match")
          setIsLoading(false)
          return
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))

      let userName = formData.name.trim()
      if (mode === "login") {
        // For login, simulate looking up existing user name
        const existingUsers = ["Emma Wilson", "David Kumar", "Lisa Thompson", "James Park"]
        userName = existingUsers[Math.floor(Math.random() * existingUsers.length)]
      }

      const userData = {
        role: selectedRole || ("donor" as "donor" | "ngo" | "biogas"),
        name: userName, // Using real captured name
        email: formData.email,
        authMethod: "email",
      }
      console.log("[v0] Email authentication successful with real name:", userData)
      onSuccess(userData)
    } catch (error) {
      console.error("[v0] Authentication error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (mode === "signup" && step === "role") {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md">
          <CardHeader className="relative">
            <button onClick={onClose} className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full">
              <X className="h-4 w-4" />
            </button>
            <CardTitle className="text-2xl text-center">Choose Your Role</CardTitle>
            <p className="text-center text-gray-600 text-sm">Select how you'd like to contribute to RefedConnect</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <button
                onClick={() => setSelectedRole("donor")}
                className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                  selectedRole === "donor" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Donor</h3>
                    <p className="text-sm text-gray-600">Share excess food with those in need</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedRole("ngo")}
                className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                  selectedRole === "ngo" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Heart className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">NGO Agent</h3>
                    <p className="text-sm text-gray-600">Manage food distribution to communities</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedRole("biogas")}
                className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                  selectedRole === "biogas" ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Recycle className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Biogas Agent</h3>
                    <p className="text-sm text-gray-600">Convert organic waste into renewable energy</p>
                  </div>
                </div>
              </button>
            </div>

            <Button
              onClick={() => setStep("auth")}
              disabled={!selectedRole}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Continue
            </Button>

            <div className="text-center text-sm">
              <p>
                Already have an account?{" "}
                <button onClick={() => onSwitchMode("login")} className="text-green-600 hover:underline">
                  Sign in
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="relative">
          <button onClick={onClose} className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full">
            <X className="h-4 w-4" />
          </button>
          <CardTitle className="text-2xl text-center">
            {mode === "login" ? "Welcome Back" : "Join RefedConnect"}
          </CardTitle>
          {mode === "signup" && selectedRole && (
            <p className="text-center text-sm text-gray-600">
              Signing up as:{" "}
              <span className="font-semibold capitalize">
                {selectedRole === "ngo" ? "NGO Agent" : selectedRole === "biogas" ? "Biogas Agent" : "Donor"}
              </span>
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Google Authentication Button */}
          <Button
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {isLoading ? "Connecting..." : "Continue with Google"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>
            )}
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading ? "Processing..." : mode === "login" ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="text-center text-sm">
            {mode === "login" ? (
              <p>
                Don't have an account?{" "}
                <button onClick={() => onSwitchMode("signup")} className="text-green-600 hover:underline">
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button onClick={() => onSwitchMode("login")} className="text-green-600 hover:underline">
                  Sign in
                </button>
              </p>
            )}
          </div>

          {mode === "signup" && (
            <div className="text-center">
              <button onClick={() => setStep("role")} className="text-sm text-gray-600 hover:text-gray-800">
                ← Change role selection
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
