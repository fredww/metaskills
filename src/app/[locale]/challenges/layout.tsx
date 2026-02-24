import { Metadata } from "next"
import ChallengesClient from "./challenges-client"

export const metadata: Metadata = {
  title: "Learning Challenges - MetaSkills",
  description: "Take on learning challenges to master meta-skills. Join reading challenges, skill mastery quests, tool exploration expeditions, and maintain learning streaks.",
  keywords: [
    "learning challenges",
    "reading challenges",
    "skill mastery",
    "personal development",
    "meta-skills",
    "goal setting",
    "motivation",
    "learning streaks"
  ],
  openGraph: {
    title: "Learning Challenges - MetaSkills",
    description: "Take on learning challenges to master meta-skills. Earn badges, track progress, and stay motivated on your learning journey.",
    type: "website",
    url: "/challenges",
    images: [
      {
        url: "/og-images/challenges.png",
        width: 1200,
        height: 630,
        alt: "MetaSkills Learning Challenges",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learning Challenges - MetaSkills",
    description: "Take on learning challenges to master meta-skills. Earn badges, track progress, and stay motivated.",
    images: ["/og-images/challenges.png"],
  },
  alternates: {
    canonical: "/challenges",
  },
}

export default function ChallengesPage() {
  return <ChallengesClient />
}
