"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ProfilePage() {
  const { data: session, update } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage(data.message || "Failed to update profile")
        setIsLoading(false)
        return
      }

      // Update session
      await update({
        ...session,
        user: {
          ...session?.user,
          name: formData.name
        }
      })

      setMessage("Profile updated successfully!")
      setIsEditing(false)
    } catch (error) {
      setMessage("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2D2D2D] mb-4">
            Your Profile
          </h1>
          <p className="text-xl text-gray-600">
            Manage your account settings
          </p>
        </div>

        {/* Profile Form */}
        <Card className="border-[#E5E0D8]">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[#2D2D2D]">
              Personal Information
            </CardTitle>
            <CardDescription>
              Update your personal details
            </CardDescription>
          </CardHeader>
          <CardContent>
            {message && (
              <Alert className={`mb-6 ${message.includes("success") ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
                <AlertDescription className={message.includes("success") ? "text-green-800" : "text-red-800"}>
                  {message}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label htmlFor="name" className="text-base">Name</Label>
                  {!isEditing && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="text-[#8DA399] hover:text-[#6B8379]"
                    >
                      Edit
                    </Button>
                  )}
                </div>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing || isLoading}
                  className="bg-white"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-base">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="bg-gray-50 mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed
                </p>
              </div>

              {isEditing && (
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-[#8DA399] hover:bg-[#6B8379] text-white"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false)
                      setFormData({
                        name: session?.user?.name || "",
                        email: session?.user?.email || ""
                      })
                      setMessage("")
                    }}
                    className="border-[#E5E0D8] text-[#2D2D2D] hover:bg-[#F3EFE9]"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Account Stats */}
        <Card className="mt-8 border-[#E5E0D8]">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[#2D2D2D]">
              Account Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-[#8DA399] mb-1">
                  Active
                </p>
                <p className="text-sm text-gray-600">Account Status</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-[#C7826B] mb-1">
                  Member
                </p>
                <p className="text-sm text-gray-600">Account Type</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-[#D4AF37] mb-1">
                  All
                </p>
                <p className="text-sm text-gray-600">Features Access</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="mt-8 border-[#C7826B] bg-[#C7826B]/5">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-[#C7826B]">
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button
              variant="outline"
              className="border-[#C7826B] text-[#C7826B] hover:bg-[#C7826B] hover:text-white"
              onClick={() => alert("Account deletion is not implemented yet. Please contact support.")}
            >
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
