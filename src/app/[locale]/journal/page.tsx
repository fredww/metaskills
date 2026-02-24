"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface JournalEntry {
  id: string
  title: string
  content: string
  mood?: number | null
  createdAt: string
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isWriting, setIsWriting] = useState(false)
  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    mood: 3
  })

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/journal')
      if (response.ok) {
        const data = await response.json()
        setEntries(data.entries || [])
      }
    } catch (error) {
      console.error('Failed to fetch journal entries:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEntry.title || !newEntry.content) return

    try {
      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry)
      })

      if (response.ok) {
        const data = await response.json()
        setEntries([data.entry, ...entries])
        setNewEntry({ title: "", content: "", mood: 3 })
        setIsWriting(false)
      }
    } catch (error) {
      console.error('Failed to save journal entry:', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2D2D2D] mb-4">
              Journal
            </h1>
            <p className="text-xl text-gray-600">
              Reflect on your growth journey
            </p>
          </div>
          <Button
            onClick={() => setIsWriting(!isWriting)}
            className="bg-[#8DA399] hover:bg-[#6B8379] text-white"
          >
            {isWriting ? "Cancel" : "+ New Entry"}
          </Button>
        </div>

        {/* New Entry Form */}
        {isWriting && (
          <Card className="mb-8 border-[#E5E0D8]">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-[#2D2D2D]">
                New Journal Entry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Today's reflection..."
                    value={newEntry.title}
                    onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                    className="bg-white"
                  />
                </div>

                <div>
                  <Label htmlFor="mood">Mood (1-10)</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <input
                      type="range"
                      id="mood"
                      min="1"
                      max="10"
                      value={newEntry.mood}
                      onChange={(e) => setNewEntry({ ...newEntry, mood: parseInt(e.target.value) })}
                      className="flex-1"
                    />
                    <span className="text-2xl font-bold text-[#8DA399] w-12 text-center">
                      {newEntry.mood}
                    </span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="content">Reflection</Label>
                  <Textarea
                    id="content"
                    placeholder="What did you learn today? How are you feeling about your progress?"
                    value={newEntry.content}
                    onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                    rows={6}
                    className="bg-white"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-[#8DA399] hover:bg-[#6B8379] text-white"
                  >
                    Save Entry
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsWriting(false)}
                    className="border-[#E5E0D8] text-[#2D2D2D] hover:bg-[#F3EFE9]"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Journal Entries */}
        {isLoading ? (
          <Card className="border-[#E5E0D8]">
            <CardContent className="p-12 text-center">
              <p className="text-gray-600">Loading journal entries...</p>
            </CardContent>
          </Card>
        ) : entries.length === 0 ? (
          <Card className="border-[#E5E0D8] bg-[#F3EFE9]">
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">📓</div>
              <h3 className="text-xl font-serif text-[#2D2D2D] mb-2">
                Start Your Journal
              </h3>
              <p className="text-gray-600 mb-6">
                Reflect on your meta-skills journey and track your growth over time
              </p>
              <Button
                onClick={() => setIsWriting(true)}
                className="bg-[#8DA399] hover:bg-[#6B8379] text-white"
              >
                Write First Entry
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {entries.map((entry) => (
              <Card key={entry.id} className="border-[#E5E0D8] hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-serif text-[#2D2D2D]">
                        {entry.title}
                      </CardTitle>
                      <CardDescription className="text-sm mt-1">
                        {new Date(entry.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </CardDescription>
                    </div>
                    {entry.mood && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Mood:</span>
                        <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                          entry.mood >= 8 ? "bg-[#8DA399]" :
                          entry.mood >= 6 ? "bg-[#D4AF37]" :
                          entry.mood >= 4 ? "bg-[#C7826B]" :
                          "bg-gray-400"
                        }`}>
                          {entry.mood}
                        </span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {entry.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {entries.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-500">
              🚧 Journal features coming soon: Skill tagging, search, and progress insights
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
