"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ToolDetailClientProps {
  resourceData: any
  resourceUrl: string
}

export default function ToolDetailClient({ resourceData, resourceUrl }: ToolDetailClientProps) {
  const { resource, stats, ratings, comments, userRating } = resourceData
  const { data: session } = useSession()

  const [showRatingForm, setShowRatingForm] = useState(false)
  const [userRatingValue, setUserRatingValue] = useState(5)
  const [userReview, setUserReview] = useState("")
  const [ratingMessage, setRatingMessage] = useState("")
  const [commentContent, setCommentContent] = useState("")
  const [commentMessage, setCommentMessage] = useState("")

  const handleSubmitRating = async () => {
    if (!session) {
      setRatingMessage("Please sign in to rate this resource")
      return
    }

    try {
      const response = await fetch('/api/resources/rating', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resourceType: 'TOOL',
          resourceUrl: resourceUrl,
          skillCode: resource.skillCode,
          rating: userRatingValue,
          review: userReview
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setRatingMessage(data.message || "Failed to submit rating")
        return
      }

      setRatingMessage("Thank you for your rating! ✓")
      setShowRatingForm(false)

      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      setRatingMessage("An error occurred. Please try again.")
    }
  }

  const handleSubmitComment = async () => {
    if (!session) {
      setCommentMessage("Please sign in to comment")
      return
    }

    if (!commentContent.trim()) {
      setCommentMessage("Please enter a comment")
      return
    }

    try {
      const response = await fetch('/api/resources/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resourceType: 'TOOL',
          resourceUrl: resourceUrl,
          skillCode: resource.skillCode,
          content: commentContent
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setCommentMessage(data.message || "Failed to post comment")
        return
      }

      setCommentMessage("Comment posted successfully! ✓")
      setCommentContent("")

      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      setCommentMessage("An error occurred. Please try again.")
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: resource.name,
          text: resource.description,
          url: window.location.href
        })
      } catch (error) {
        console.log('Share canceled')
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <>
      {/* Tool Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Tool Icon */}
          <div className="flex-shrink-0">
            <div className="w-48 h-48 bg-gradient-to-br from-[#C7826B] to-[#D4AF37] rounded-2xl shadow-xl flex items-center justify-center">
              <span className="text-white text-6xl">🛠️</span>
            </div>
          </div>

          {/* Tool Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-serif font-bold text-[#2D2D2D]">
                    {resource.name}
                  </h1>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-[#F3EFE9] text-[#2D2D2D] rounded-full text-sm font-medium">
                    {resource.type}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    resource.pricing === 'Free' ? 'bg-[#8DA399]/20 text-[#8DA399]' :
                    resource.pricing === 'Freemium' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' :
                    'bg-[#C7826B]/20 text-[#C7826B]'
                  }`}>
                    {resource.pricing}
                  </span>
                  {resource.popularity && (
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      🔥 {resource.popularity}% popular
                    </span>
                  )}
                </div>
              </div>
              <Button
                onClick={handleShare}
                variant="outline"
                className="border-[#E5E0D8] text-[#2D2D2D] hover:bg-[#F3EFE9]"
              >
                Share ↗
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl text-[#D4AF37]">⭐</span>
                <div>
                  <div className="text-2xl font-bold text-[#2D2D2D]">
                    {stats.averageRating}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stats.totalRatings} {stats.totalRatings === 1 ? 'rating' : 'ratings'}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              {resource.description}
            </p>

            {/* Why Recommended */}
            <div className="bg-[#F3EFE9] rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-[#2D2D2D] mb-2 flex items-center gap-2">
                <span>💡</span>
                <span>Why We Recommend It</span>
              </h3>
              <p className="text-gray-700">{resource.whyRecommended}</p>
            </div>

            {/* CTA */}
            <div className="flex gap-4">
              <Button
                asChild
                size="lg"
                className="flex-1 bg-[#8DA399] hover:bg-[#6B8379] text-white max-w-xs"
              >
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try {resource.type} →
                </a>
              </Button>
              {!userRating && (
                <Button
                  onClick={() => setShowRatingForm(!showRatingForm)}
                  variant="outline"
                  size="lg"
                  className="border-[#8DA399] text-[#8DA399] hover:bg-[#8DA399]/10"
                >
                  Rate This Tool
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rating Form */}
      {showRatingForm && (
        <Card className="mb-8 border-[#E5E0D8]">
          <CardHeader>
            <CardTitle>Rate This Tool</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Your Rating</Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setUserRatingValue(star)}
                      className={`text-3xl ${star <= userRatingValue ? 'text-[#D4AF37]' : 'text-gray-300'} hover:scale-110 transition-transform`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="review">Your Review (Optional)</Label>
                <Textarea
                  id="review"
                  placeholder="Share your experience with this tool..."
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                  className="mt-2"
                  rows={4}
                />
              </div>

              {ratingMessage && (
                <Alert className={ratingMessage.includes("✓") ? "border-green-200 bg-green-50" : "border-[#C7826B]/50 bg-[#C7826B]/10"}>
                  <AlertDescription className={ratingMessage.includes("✓") ? "text-green-800" : "text-[#C7826B]"}>
                    {ratingMessage}
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={handleSubmitRating}
                  className="bg-[#8DA399] hover:bg-[#6B8379] text-white"
                >
                  Submit Rating
                </Button>
                <Button
                  onClick={() => setShowRatingForm(false)}
                  variant="outline"
                  className="border-[#E5E0D8] text-[#2D2D2D] hover:bg-[#F3EFE9]"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* User Rating Display */}
      {userRating && (
        <Card className="mb-8 border-[#8DA399] bg-[#8DA399]/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div>
                <div className="text-sm text-gray-600">Your Rating</div>
                <div className="text-2xl font-bold text-[#8DA399]">
                  {'★'.repeat(userRating.rating)}{'☆'.repeat(5 - userRating.rating)}
                </div>
              </div>
              {userRating.review && (
                <div className="flex-1">
                  <p className="text-gray-700">{userRating.review}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comments Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-6">
          Community Discussion ({comments.length})
        </h2>

        {/* Add Comment */}
        <Card className="mb-6 border-[#E5E0D8]">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="comment">Add a Comment</Label>
                <Textarea
                  id="comment"
                  placeholder="How has this tool helped you? Share your experience..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  className="mt-2"
                  rows={3}
                />
              </div>

              {commentMessage && (
                <Alert className={commentMessage.includes("✓") ? "border-green-200 bg-green-50" : "border-[#C7826B]/50 bg-[#C7826B]/10"}>
                  <AlertDescription className={commentMessage.includes("✓") ? "text-green-800" : "text-[#C7826B]"}>
                    {commentMessage}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleSubmitComment}
                className="bg-[#8DA399] hover:bg-[#6B8379] text-white"
                disabled={!commentContent.trim()}
              >
                Post Comment
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <Card className="border-[#E5E0D8]">
              <CardContent className="p-8 text-center text-gray-500">
                No comments yet. Be the first to share your experience!
              </CardContent>
            </Card>
          ) : (
            comments.map((comment: any) => (
              <Card key={comment.id} className="border-[#E5E0D8]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#C7826B] rounded-full flex items-center justify-center text-white font-bold">
                        {comment.user.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-[#2D2D2D]">
                          {comment.user.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>

                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 space-y-3 pl-4 border-l-2 border-[#E5E0D8]">
                          {comment.replies.map((reply: any) => (
                            <div key={reply.id} className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-[#8DA399] to-[#6B8379] rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {reply.user.name?.charAt(0).toUpperCase() || 'U'}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-sm text-[#2D2D2D]">
                                    {reply.user.name}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {new Date(reply.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700">{reply.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  )
}
