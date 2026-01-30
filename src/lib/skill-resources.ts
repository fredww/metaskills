// Resource recommendations for meta-skills
// Includes books, experts, and tools for each skill

export interface BookRecommendation {
  title: string
  author: string
  url: string
  coverUrl?: string
  description: string
  whyRecommended: string
  keyPoints: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  rating?: number
  readTime?: string
}

export interface ExpertEndorsement {
  name: string
  title: string
  organization: string
  quote: string
  avatarUrl?: string
  credentials: string[]
  relevantWork: string
}

export interface ToolRecommendation {
  name: string
  type: 'app' | 'website' | 'course' | 'framework'
  url: string
  description: string
  whyRecommended: string
  pricing: 'Free' | 'Freemium' | 'Paid'
  popularity?: number
}

export interface SkillResources {
  skillCode: string
  skillTitle: string
  books: BookRecommendation[]
  experts: ExpertEndorsement[]
  tools: ToolRecommendation[]
}

// Comprehensive resource database
export const skillResourcesDB: Record<string, SkillResources> = {
  'learning-to-learn': {
    skillCode: 'learning-to-learn',
    skillTitle: 'Learning to Learn',
    books: [
      {
        title: 'Make It Stick: The Science of Successful Learning',
        author: 'Peter C. Brown, Henry L. Roediger III, Mark A. McDaniel',
        url: 'https://www.amazon.com/Make-It-Stick-Science-Successful/dp/0674729013',
        description: 'This book challenges conventional wisdom about learning and presents evidence-based techniques for effective learning.',
        whyRecommended: 'Based on decades of cognitive psychology research, it debunks common learning myths and provides practical techniques that actually work.',
        keyPoints: [
          'Active retrieval is more effective than re-reading',
          'Spaced practice outperforms cramming',
          'Interleaving different topics improves long-term retention',
          'Effortful learning produces durable retention'
        ],
        difficulty: 'Beginner',
        rating: 4.7,
        readTime: '8 hours'
      },
      {
        title: 'Ultralearning: Master Hard Skills, Outsmart the Competition, and Future-Proof Your Career',
        author: 'Scott Young',
        url: 'https://www.amazon.com/Ultralearning-Master-Skills-Competition-Future-Proof/dp/0062866573',
        description: 'A practical guide to aggressive self-education based on the author\'s famous MIT challenge.',
        whyRecommended: 'Scott Young completed the entire 4-year MIT computer science curriculum in just 12 months using ultralearning principles.',
        keyPoints: [
          'Meta-learning: Draw a map before you build',
          'Focus: Sharpen your knife',
          'Directness: Go straight ahead',
          'Drill: Attack your weakest point',
          'Retrieval: Test to learn'
        ],
        difficulty: 'Intermediate',
        rating: 4.5,
        readTime: '7 hours'
      },
      {
        title: 'A Mind for Numbers: How to Excel at Math and Science',
        author: 'Barbara Oakley',
        url: 'https://www.amazon.com/Mind-Numbers-Excel-Math-Science/dp/039916524X',
        description: 'Learn powerful techniques for mastering difficult material, even if you think you\'re "bad at math".',
        whyRecommended: 'Barbara Oakley went from being a math-phobe to a engineering professor, proving anyone can learn quantitative subjects.',
        keyPoints: [
          'Use focused and diffuse modes of thinking',
          'Take breaks to let your brain consolidate learning',
          'Use memory techniques and visualization',
          'Embrace confusion and struggle as part of learning'
        ],
        difficulty: 'Beginner',
        rating: 4.6,
        readTime: '7 hours'
      }
    ],
    experts: [
      {
        name: 'Dr. Barbara Oakley',
        title: 'Professor of Engineering',
        organization: 'Oakland University',
        quote: 'Learning how to learn is the most critical skill you can acquire. It underpins everything else you want to master in life.',
        credentials: ['PhD in Systems Engineering', 'Creator of Learning How to Learn course', '2+ million students worldwide'],
        relevantWork: 'Created the world\'s most popular MOOC on Coursera'
      },
      {
        name: 'Dr. Henry Roediger',
        title: 'Professor of Psychology',
        organization: 'Washington University in St. Louis',
        quote: 'The science of learning shows us that the most effective techniques often feel least productive. We must trust the research over our intuition.',
        credentials: ['PhD in Psychology', 'Leading memory researcher', 'Author of 200+ papers'],
        relevantWork: 'Co-authored Make It Stick, seminal work on learning science'
      }
    ],
    tools: [
      {
        name: 'Anki',
        type: 'app',
        url: 'https://apps.ankiweb.net/',
        description: 'Powerful spaced repetition flashcard app that optimizes review timing.',
        whyRecommended: 'Uses scientifically proven spaced repetition algorithm to maximize long-term retention.',
        pricing: 'Free',
        popularity: 95
      },
      {
        name: 'Coursera - Learning How to Learn',
        type: 'course',
        url: 'https://www.coursera.org/learn/learning-how-to-learn',
        description: 'World\'s most popular online course about learning techniques.',
        whyRecommended: 'Over 2 million enrolled, taught by Dr. Barbara Oakley and Dr. Terrence Sejnowski.',
        pricing: 'Free',
        popularity: 98
      },
      {
        name: 'Notion',
        type: 'app',
        url: 'https://www.notion.so/',
        description: 'All-in-one workspace for note-taking, knowledge management, and project tracking.',
        whyRecommended: 'Build a personal knowledge base and implement active recall techniques.',
        pricing: 'Freemium',
        popularity: 92
      }
    ]
  },

  'critical-thinking': {
    skillCode: 'critical-thinking',
    skillTitle: 'Critical Thinking',
    books: [
      {
        title: 'Thinking, Fast and Slow',
        author: 'Daniel Kahneman',
        url: 'https://www.amazon.com/Thinking-Fast-Slow-Daniel-Kahneman/dp/0374533555',
        description: 'Nobel laureate Daniel Kahneman takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think.',
        whyRecommended: 'Foundational work that revolutionized our understanding of human decision-making and cognitive biases.',
        keyPoints: [
          'System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical',
          'We overconfidently trust our intuitions and are surprisingly susceptible to cognitive biases',
          'Understanding these systems helps us make better decisions and avoid common pitfalls',
          'Anchoring, availability heuristic, and loss aversion shape our judgments'
        ],
        difficulty: 'Intermediate',
        rating: 4.6,
        readTime: '11 hours'
      },
      {
        title: 'The Demon-Haunted World: Science as a Candle in the Dark',
        author: 'Carl Sagan',
        url: 'https://www.amazon.com/Demon-Haunted-World-Science-Candle-Dark/dp/0345409469',
        description: 'A passionate defense of critical thinking and the scientific method against superstition and pseudoscience.',
        whyRecommended: 'Sagan provides a toolkit for skeptical thinking and evaluating claims critically.',
        keyPoints: [
          'The scientific method as a tool for critical thinking',
          'How to detect baloney and fallacious reasoning',
          'The importance of skepticism in an age of information overload',
          'Understanding probability and coincidence'
        ],
        difficulty: 'Intermediate',
        rating: 4.7,
        readTime: '10 hours'
      },
      {
        title: 'Super Thinking: The Big Book of Mental Models',
        author: 'Gabriel Weinberg and Lauren McCann',
        url: 'https://www.amazon.com/Super-Thinking-Mental-Models-Improve/dp/1591847782',
        description: 'A collection of powerful mental models to improve your thinking and decision-making.',
        whyRecommended: 'Practical toolkit of mental models from various disciplines to upgrade your critical thinking.',
        keyPoints: [
          'First Principles thinking: Break down problems to fundamental truths',
          'Occam\'s Razor: The simplest explanation is usually best',
          'Inversion: Approach problems backwards',
          'Probabilistic thinking: Think in terms of probabilities, not certainties'
        ],
        difficulty: 'Beginner',
        rating: 4.5,
        readTime: '8 hours'
      }
    ],
    experts: [
      {
        name: 'Daniel Kahneman',
        title: 'Professor of Psychology',
        organization: 'Princeton University',
        quote: 'We are not thinking machines that feel, we are feeling machines that think. Recognizing this is the first step toward better thinking.',
        credentials: ['Nobel Prize in Economics', 'PhD in Psychology', 'Pioneer of behavioral economics'],
        relevantWork: 'Author of Thinking, Fast and Slow'
      },
      {
        name: 'Dr. Richard Paul',
        title: 'Director of Research',
        organization: 'Foundation for Critical Thinking',
        quote: 'Critical thinking is the intellectually disciplined process of actively and skillfully conceptualizing, applying, analyzing, and evaluating information.',
        credentials: ['PhD in Philosophy', 'Founder of critical thinking movement', 'Author of 8 books on critical thinking'],
        relevantWork: 'Developed the Paul-Elder framework for critical thinking'
      }
    ],
    tools: [
      {
        name: 'Kialo',
        type: 'website',
        url: 'https://www.kialo-edu.com/',
        description: 'Platform for structured debate and mapping arguments.',
        whyRecommended: 'Helps visualize argument structures and practice critical evaluation of claims.',
        pricing: 'Free',
        popularity: 78
      },
      {
        name: 'Bias Check',
        type: 'app',
        url: 'https://www.biascheck.org/',
        description: 'Tool to identify cognitive biases in decision-making.',
        whyRecommended: 'Provides frameworks to recognize and mitigate common thinking errors.',
        pricing: 'Free',
        popularity: 72
      },
      {
        name: 'roam research',
        type: 'app',
        url: 'https://roamresearch.com/',
        description: 'Note-taking tool for connecting ideas and building knowledge graphs.',
        whyRecommended: 'Excellent for exploring relationships between concepts and developing complex arguments.',
        pricing: 'Freemium',
        popularity: 88
      }
    ]
  },

  'self-awareness': {
    skillCode: 'self-awareness',
    skillTitle: 'Self-Awareness',
    books: [
      {
        title: 'Insight: The Surprising Truth About How Others See Us, How We See Ourselves, and Why the Answers Matter More Than We Think',
        author: 'Tasha Eurich',
        url: 'https://www.amazon.com/Insight-Surprising-Truth-Others-See-Us/dp/0544947426',
        description: 'Organizational psychologist Tasha Eurich reveals the secrets to self-awareness based on her research with thousands of people.',
        whyRecommended: 'Backed by rigorous research, this book provides practical strategies for developing true self-awareness.',
        keyPoints: [
          'Self-awareness is the meta-skill of the 21st century',
          'Internal vs. external self-awareness: knowing yourself vs. understanding how others see you',
          'The three pillars of self-awareness: individual, relational, and environmental',
          'Asking "what" instead of "why" leads to more productive self-reflection'
        ],
        difficulty: 'Beginner',
        rating: 4.5,
        readTime: '7 hours'
      },
      {
        title: 'The Road Less Traveled: A New Psychology of Love, Traditional Values, and Spiritual Growth',
        author: 'M. Scott Peck',
        url: 'https://www.amazon.com/Road-Less-Traveled-Psychology-Spiritual/dp/0743243153',
        description: 'A classic guide to personal growth and self-understanding that begins with the fundamental truth that life is difficult.',
        whyRecommended: 'This book has helped millions develop greater self-awareness and take responsibility for their personal growth.',
        keyPoints: [
          'Discipline is the essential tool for solving life\'s problems',
          'Accepting responsibility for our choices is crucial for growth',
          'Love is not a feeling but an action and an intention',
          'Spiritual growth requires dedication to truth and openness to challenge'
        ],
        difficulty: 'Intermediate',
        rating: 4.6,
        readTime: '9 hours'
      },
      {
        title: 'Daring Greatly: How the Courage to Be Vulnerable Transforms the Way We Live, Love, Parent, and Lead',
        author: 'Brené Brown',
        url: 'https://www.amazon.com/Daring-Greatly-Courage-Vulnerable-Transforms/dp/1592407331',
        description: 'Brené Brown challenges everything we think we know about vulnerability and shows how it\'s actually a strength, not a weakness.',
        whyRecommended: 'Brown\'s research reveals that vulnerability is the birthplace of innovation, creativity, and change.',
        keyPoints: [
          'Vulnerability is not weakness but the clearest path to courage and connection',
          'Shame resilience: recognizing shame and moving through it',
          'Perfectionism is a shield we use to protect ourselves',
          'Owning our story and loving ourselves through the process is the bravest thing we\'ll ever do'
        ],
        difficulty: 'Beginner',
        rating: 4.7,
        readTime: '7 hours'
      }
    ],
    experts: [
      {
        name: 'Dr. Tasha Eurich',
        title: 'Organizational Psychologist',
        organization: 'Eurich Group',
        quote: 'Self-awareness is the meta-skill of the 21st century. It\'s the foundation for emotional intelligence, leadership, and personal growth.',
        credentials: ['PhD in Industrial-Organizational Psychology', 'Researcher with 100+ publications', 'Speaker on TED stage'],
        relevantWork: 'Author of Insight and New York Times bestselling author'
      },
      {
        name: 'Dr. Brené Brown',
        title: 'Research Professor',
        organization: 'University of Houston',
        quote: 'Vulnerability is the birthplace of connection and the path to belonging—to joy, creativity, authenticity, and love.',
        credentials: ['PhD in Social Work', 'Five-time #1 New York Times bestselling author', 'TED speaker with 50M+ views'],
        relevantWork: 'Pioneering research on vulnerability, shame, and leadership'
      }
    ],
    tools: [
      {
        name: 'Reflect',
        type: 'app',
        url: 'https://reflect.app/',
        description: 'AI-powered journaling app that helps you discover patterns in your thinking.',
        whyRecommended: 'Provides insights and tracks your emotional patterns over time.',
        pricing: 'Freemium',
        popularity: 82
      },
      {
        name: '16Personalities',
        type: 'website',
        url: 'https://www.16personalities.com/',
        description: 'Free personality test based on Myers-Briggs and Big Five personality models.',
        whyRecommended: 'Comprehensive personality assessment to increase self-understanding.',
        pricing: 'Free',
        popularity: 95
      },
      {
        name: 'Moodnotes',
        type: 'app',
        url: 'https://moodnotesapp.com/',
        description: 'Journaling app to track and understand your emotional patterns.',
        whyRecommended: 'Combines journaling with cognitive behavioral therapy techniques.',
        pricing: 'Paid',
        popularity: 75
      }
    ]
  },

  'mindfulness': {
    skillCode: 'mindfulness',
    skillTitle: 'Mindfulness',
    books: [
      {
        title: 'Wherever You Go, There You Are: Mindfulness Meditation in Everyday Life',
        author: 'Jon Kabat-Zinn',
        url: 'https://www.amazon.com/Wherever-Go-There-Are-Mindfulness/dp/1401307787',
        description: 'The classic book that introduced mindfulness meditation to mainstream Western audience.',
        whyRecommended: 'Jon Kabat-Zinn is the father of secular mindfulness in the West. This book makes mindfulness accessible to everyone.',
        keyPoints: [
          'Mindfulness is about being fully present in each moment',
          'Meditation is not about emptying the mind but about paying attention',
          'Non-judgmental awareness of the present moment',
          'Bringing mindfulness to everyday activities like eating, walking, and listening'
        ],
        difficulty: 'Beginner',
        rating: 4.6,
        readTime: '6 hours'
      },
      {
        title: 'The Miracle of Mindfulness: An Introduction to the Practice of Meditation',
        author: 'Thich Nhat Hanh',
        url: 'https://www.amazon.com/Miracle-Mindfulness-Introduction-Practice-Meditation/dp/0394746885',
        description: 'A beautiful and practical guide to mindfulness by one of the most respected teachers in the world.',
        whyRecommended: 'Thich Nhat Hanh\'s gentle approach makes mindfulness feel natural and achievable.',
        keyPoints: [
          'Mindfulness can be practiced in every action of daily life',
          'Conscious breathing is the anchor for mindfulness practice',
          'The connection between mindfulness and compassion',
          'Finding peace and joy in simple, ordinary activities'
        ],
        difficulty: 'Beginner',
        rating: 4.8,
        readTime: '5 hours'
      },
      {
        title: 'Real Happiness: The Power of Meditation: A 28-Day Program',
        author: 'Sharon Salzberg',
        url: 'https://www.amazon.com/Real-Happiness-Power-Meditation-Program/dp/1406536387',
        description: 'A practical 28-day program to establish a daily meditation practice.',
        whyRecommended: 'Provides a structured approach with guided meditations and troubleshooting common obstacles.',
        keyPoints: [
          'Concentration meditation: Focusing on a single object',
          'Mindfulness meditation: Observing thoughts and feelings without judgment',
          'Loving-kindness meditation: Cultivating compassion for oneself and others',
          'Working with obstacles like distraction, sleepiness, and doubt'
        ],
        difficulty: 'Beginner',
        rating: 4.5,
        readTime: '6 hours'
      }
    ],
    experts: [
      {
        name: 'Jon Kabat-Zinn',
        title: 'Professor of Medicine',
        organization: 'University of Massachusetts Medical School',
        quote: 'Mindfulness means paying attention in a particular way: on purpose, in the present moment, and nonjudgmentally.',
        credentials: ['PhD in Molecular Biology', 'Founder of MBSR (Mindfulness-Based Stress Reduction)', 'Author of 10+ books'],
        relevantWork: 'Pioneered mindfulness-based interventions in medicine'
      },
      {
        name: 'Thich Nhat Hanh',
        title: 'Zen Master',
        organization: 'Plum Village Monastery',
        quote: 'Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.',
        credentials: ['Vietnamese Buddhist monk', 'Nominated for Nobel Peace Prize by MLK Jr.', 'Author of 100+ books'],
        relevantWork: 'Key figure in bringing mindfulness to the West'
      }
    ],
    tools: [
      {
        name: 'Headspace',
        type: 'app',
        url: 'https://www.headspace.com/',
        description: 'Guided meditation and mindfulness app with courses for beginners.',
        whyRecommended: 'User-friendly interface with structured meditation programs.',
        pricing: 'Freemium',
        popularity: 92
      },
      {
        name: 'Calm',
        type: 'app',
        url: 'https://www.calm.com/',
        description: 'Meditation and sleep app with guided sessions and relaxing content.',
        whyRecommended: 'Offers diverse content including sleep stories, breathing exercises, and nature sounds.',
        pricing: 'Freemium',
        popularity: 90
      },
      {
        name: 'Insight Timer',
        type: 'app',
        url: 'https://insighttimer.com/',
        description: 'Free meditation app with thousands of guided meditations from teachers worldwide.',
        whyRecommended: 'Largest free meditation library with community features.',
        pricing: 'Free',
        popularity: 88
      }
    ]
  },

  'resilience': {
    skillCode: 'resilience',
    skillTitle: 'Resilience',
    books: [
      {
        title: 'Grit: The Power of Passion and Perseverance',
        author: 'Angela Duckworth',
        url: 'https://www.amazon.com/Grit-Power-Passion-Perseverance/dp/1501111105',
        description: 'Pioneering psychologist Angela Duckworth shows that the secret to outstanding achievement is not talent but a special blend of passion and persistence she calls "grit".',
        whyRecommended: 'Backed by extensive research, this book revolutionized our understanding of success and achievement.',
        keyPoints: [
          'Grit is passion and perseverance for long-term goals',
          'Effort counts twice: talent × effort = skill, skill × effort = achievement',
          'Grit can be developed through deliberate practice and purpose-driven work',
          'The four components of grit: interest, practice, purpose, and hope'
        ],
        difficulty: 'Beginner',
        rating: 4.6,
        readTime: '7 hours'
      },
      {
        title: 'Option B: Facing Adversity, Building Resilience, and Finding Joy',
        author: 'Sheryl Sandberg and Adam Grant',
        url: 'https://www.amazon.com/Option-B-Facing-Adversity-Resilience/dp/0399180855',
        description: 'A powerful exploration of resilience in the face of adversity and loss.',
        whyRecommended: 'Combines personal experience with psychological research on how to build resilience.',
        keyPoints: [
          'Resilience is a muscle we can build',
          'The three Ps: personalization, pervasiveness, and permanence affect how we respond to trauma',
          'Finding meaning in adversity can help us recover and grow',
          'Supporting others helps us heal ourselves'
        ],
        difficulty: 'Beginner',
        rating: 4.7,
        readTime: '6 hours'
      },
      {
        title: 'Rising Strong: How the Ability to Reset Transforms the Way We Live, Love, Parent, and Lead',
        author: 'Brené Brown',
        url: 'https://www.amazon.com/Rising-Strong-Transform-Love-Parent/dp/081299580X',
        description: 'Brown explains how to get up from a fall and come back stronger than before.',
        whyRecommended: 'Provides a framework for reckoning with emotion and turning failure into growth.',
        keyPoints: [
          'The process of rising strong: the reckoning, the rumble, and the revolution',
          'Emotional connection to our stories gives us the power to change them',
          'Curiosity and courage are essential for resilience',
          'Owning our stories of failure is essential to living bravely'
        ],
        difficulty: 'Intermediate',
        rating: 4.5,
        readTime: '7 hours'
      }
    ],
    experts: [
      {
        name: 'Dr. Angela Duckworth',
        title: 'Professor of Psychology',
        organization: 'University of Pennsylvania',
        quote: 'Enthusiasm is common. Endurance is rare. Our potential is one thing. What we do with it is quite another.',
        credentials: ['PhD in Psychology', 'MacArthur Fellowship "Genius Grant" recipient', 'Founder of Character Lab'],
        relevantWork: 'Pioneering research on grit and achievement'
      },
      {
        name: 'Dr. Adam Grant',
        title: 'Professor of Psychology',
        organization: 'University of Pennsylvania',
        quote: 'Resilience is not about bouncing back to where you were before. It\'s about using adversity as a catalyst for growth.',
        credentials: ['PhD in Organizational Psychology', 'New York Times bestselling author', 'TED speaker'],
        relevantWork: 'Research on resilience, motivation, and meaningful work'
      }
    ],
    tools: [
      {
        name: 'Happify',
        type: 'app',
        url: 'https://www.happify.com/',
        description: 'Science-based activities and games to build resilience and overcome negative thoughts.',
        whyRecommended: 'Based on positive psychology research with effective resilience-building exercises.',
        pricing: 'Freemium',
        popularity: 80
      },
      {
        name: 'Woebot',
        type: 'app',
        url: 'https://woebothealth.com/',
        description: 'AI-powered chatbot that uses cognitive behavioral therapy techniques.',
        whyRecommended: 'Provides 24/7 support for building mental resilience and managing stress.',
        pricing: 'Free',
        popularity: 78
      },
      {
        name: 'Sanity & Self',
        type: 'app',
        url: 'https://www.sanityandself.com/',
        description: 'Self-care and mental wellness app with personalized tracks.',
        whyRecommended: 'Focuses on building resilience through self-awareness and self-compassion.',
        pricing: 'Freemium',
        popularity: 72
      }
    ]
  },

  'communication': {
    skillCode: 'communication',
    skillTitle: 'Communication',
    books: [
      {
        title: 'Crucial Conversations: Tools for Talking When Stakes Are High',
        author: 'Kerry Patterson, Joseph Grenny, Ron McMillan, Al Switzler',
        url: 'https://www.amazon.com/Crucial-Conversations-Tools-Talking-Stakes/dp/1469251223',
        description: 'A practical guide to handling high-stakes conversations with skill and confidence.',
        whyRecommended: 'Used by millions to transform difficult conversations into opportunities for dialogue and problem-solving.',
        keyPoints: [
          'Start with Heart: know what you really want',
          'Learn to Look: notice when safety is at risk',
          'Make it Safe: create mutual purpose and respect',
          'Master My Stories: understand your emotional narratives',
          'STATE your path: Share facts, tell your story, ask for others\' paths'
        ],
        difficulty: 'Intermediate',
        rating: 4.7,
        readTime: '8 hours'
      },
      {
        title: 'Never Split the Difference: Negotiating As If Your Life Depended On It',
        author: 'Chris Voss',
        url: 'https://www.amazon.com/Never-Split-Difference-Negotiating-As-If/dp/0062407805',
        description: 'A former FBI hostage negotiator reveals his field-tested techniques for high-stakes communication.',
        whyRecommended: 'Voss\'s counterintuitive strategies work in any situation where communication matters.',
        keyPoints: [
          'Tactical empathy: understanding the other person\'s feelings and mindset',
          'Mirroring: repeating key words to build rapport',
          'Labeling: calling out emotions to de-escalate tension',
          'Calibrated questions: open-ended "how" and "what" questions',
          'The power of "no" vs. "yes"'
        ],
        difficulty: 'Intermediate',
        rating: 4.8,
        readTime: '7 hours'
      },
      {
        title: 'Influence: The Psychology of Persuasion',
        author: 'Robert Cialdini',
        url: 'https://www.amazon.com/Influence-Psychology-Persuasion-Robert-Cialdini/dp/0061241895',
        description: 'The seminal book on the psychology of why people say "yes" and how to apply these understandings.',
        whyRecommended: 'Cialdini\'s six principles of influence are foundational for understanding persuasive communication.',
        keyPoints: [
          'Reciprocity: people feel obliged to return favors',
          'Commitment and Consistency: people want their actions to match their words',
          'Social Proof: people look to others\' behavior to guide their own',
          'Authority: people defer to experts',
          'Liking: people say yes to those they like',
          'Scarcity: people value what\'s rare'
        ],
        difficulty: 'Beginner',
        rating: 4.6,
        readTime: '9 hours'
      }
    ],
    experts: [
      {
        name: 'Chris Voss',
        title: 'Former FBI Hostage Negotiator',
        organization: 'The Black Swan Group',
        quote: 'Negotiation is not an act of battle; it\'s a process of discovery. The goal is to uncover as much information as possible.',
        credentials: ['Former Lead International Kidnapping Negotiator for FBI', 'Author of Never Split the Difference', 'CEO of Black Swan Group'],
        relevantWork: 'Developed tactical empathy approach to negotiation'
      },
      {
        name: 'Dr. Albert Mehrabian',
        title: 'Professor Emeritus of Psychology',
        organization: 'UCLA',
        quote: 'Communication is much more than words. When signals disagree, we believe the nonverbal over the verbal.',
        credentials: ['PhD in Psychology', 'Pioneer of nonverbal communication research', 'Author of Silent Messages'],
        relevantWork: 'Famous 7-38-55 rule of communication'
      }
    ],
    tools: [
      {
        name: 'Toastmasters Pathways',
        type: 'framework',
        url: 'https://www.toastmasters.org/education/pathways',
        description: 'Structured program for developing public speaking and communication skills.',
        whyRecommended: 'Proven framework with peer feedback and progressive skill development.',
        pricing: 'Paid',
        popularity: 90
      },
      {
        name: 'Orai',
        type: 'app',
        url: 'https://www.orai.com/',
        description: 'AI-powered app that provides instant feedback on your speaking.',
        whyRecommended: 'Uses AI to analyze speech patterns, pacing, and filler words.',
        pricing: 'Freemium',
        popularity: 75
      },
      {
        name: 'VirtualSpeech',
        type: 'app',
        url: 'https://virtualspeech.com/',
        description: 'VR and online training for public speaking and communication skills.',
        whyRecommended: 'Practice in realistic scenarios with AI feedback and performance analytics.',
        pricing: 'Freemium',
        popularity: 78
      }
    ]
  },

  'emotional-intelligence': {
    skillCode: 'emotional-intelligence',
    skillTitle: 'Emotional Intelligence',
    books: [
      {
        title: 'Emotional Intelligence: Why It Can Matter More Than IQ',
        author: 'Daniel Goleman',
        url: 'https://www.amazon.com/Emotional-Intelligence-Matter-More-Than/dp/0553375069',
        description: 'The groundbreaking book that introduced emotional intelligence to the world.',
        whyRecommended: 'Goleman\'s work revolutionized how we understand success and human potential.',
        keyPoints: [
          'EQ can be more important than IQ for life success',
          'The five components of EI: self-awareness, self-regulation, motivation, empathy, social skill',
          'Emotional intelligence can be learned and developed',
          'The amygdala hijack: why emotions sometimes override reason'
        ],
        difficulty: 'Beginner',
        rating: 4.5,
        readTime: '10 hours'
      },
      {
        title: 'Emotional Intelligence 2.0',
        author: 'Travis Bradberry and Jean Greaves',
        description: 'A practical guide to improving your emotional intelligence with step-by-step strategies.',
        url: 'https://www.amazon.com/Emotional-Intelligence-2-0-Travis-Bradberry/dp/0974320625',
        whyRecommended: 'Includes an online assessment test and 66 strategies for improving each EI skill.',
        keyPoints: [
          'Self-awareness: accurately perceiving your emotions',
          'Self-management: effectively using awareness of your emotions',
          'Social awareness: accurately picking up on emotions in others',
          'Relationship management: using awareness of emotions to manage interactions'
        ],
        difficulty: 'Beginner',
        rating: 4.6,
        readTime: '6 hours'
      },
      {
        title: 'Permission to Feel: Unlocking the Power of Emotions to Help Our Kids, Ourselves, and Our Society Thrive',
        author: 'Marc Brackett',
        url: 'https://www.amazon.com/Permission-Feel-Unlocking-Emotions-Children/dp/1250212841',
        description: 'A roadmap to understanding emotions and using them effectively rather than being controlled by them.',
        whyRecommended: 'Brackett\'s RULER method is used in thousands of schools worldwide with proven results.',
        keyPoints: [
          'RULER: Recognizing, Understanding, Labeling, Expressing, and Regulating emotions',
          'Emotions are information, not instructions',
          'We are all emotion scientists, whether we know it or not',
          'The myth of "good" and "bad" emotions'
        ],
        difficulty: 'Beginner',
        rating: 4.7,
        readTime: '7 hours'
      }
    ],
    experts: [
      {
        name: 'Dr. Daniel Goleman',
        title: 'Psychologist and Science Journalist',
        organization: 'Rutgers University',
        quote: 'In a very real sense we have two minds, one that thinks and one that feels. Emotional intelligence is the ability to integrate these two.',
        credentials: ['PhD in Clinical Psychology', 'Former New York Times science journalist', 'Author of 13+ books'],
        relevantWork: 'Pioneered emotional intelligence research and application'
      },
      {
        name: 'Dr. Marc Brackett',
        title: 'Professor and Director',
        organization: 'Yale Center for Emotional Intelligence',
        quote: 'If we want our children to thrive, we must help them develop emotional intelligence. It begins with us.',
        credentials: ['PhD in Psychology', 'Creator of RULER approach', 'Author of Permission to Feel'],
        relevantWork: 'Developed evidence-based emotional intelligence programs used worldwide'
      }
    ],
    tools: [
      {
        name: 'MoodMeter',
        type: 'app',
        url: 'https://moodmeterapp.com/',
        description: 'App to track and understand your emotions based on the mood meter framework.',
        whyRecommended: 'Developed by Yale researchers, helps build emotional awareness and vocabulary.',
        pricing: 'Paid',
        popularity: 82
      },
      {
        name: 'HowWeFeel',
        type: 'app',
        url: 'https://www.howwefeel.org/',
        description: 'Free app to help build emotional intelligence through daily check-ins.',
        whyRecommended: 'Created by Dr. Marc Brackett, based on decades of research.',
        pricing: 'Free',
        popularity: 78
      },
      {
        name: 'Moodfit',
        type: 'app',
        url: 'https://www.getmoodfit.com/',
        description: 'Mental fitness app with tools for emotional intelligence and CBT techniques.',
        whyRecommended: 'Comprehensive toolkit for understanding and managing emotions effectively.',
        pricing: 'Freemium',
        popularity: 75
      }
    ]
  },

  'empathy': {
    skillCode: 'empathy',
    skillTitle: 'Empathy',
    books: [
      {
        title: 'Empathy: Why It Matters, and How to Get It',
        author: 'Roman Krznaric',
        url: 'https://www.amazon.com/Empathy-Why-Matters-How-There/dp/1845906551',
        description: 'A practical guide to developing empathy and its transformative power in our lives.',
        whyRecommended: 'Krznaric combines history, science, and practical exercises to show how empathy can be learned.',
        keyPoints: [
          'Empathy is not just a trait but a skill that can be developed',
          'The six habits of highly empathic people',
          'Empathic imagination: stepping into other people\'s shoes',
          'Empathy as a force for social change'
        ],
        difficulty: 'Beginner',
        rating: 4.5,
        readTime: '7 hours'
      },
      {
        title: 'The Empathy Effect: Seven Neuroscience-Based Keys for Transforming the Way We Live, Love, Work, and Connect Across Differences',
        author: 'Helen Riess and Liz Neporent',
        url: 'https://www.amazon.com/Empathy-Effect-Transforming-Differences/dp/1538717616',
        description: 'A Harvard neuroscientist reveals the science of empathy and how to strengthen it.',
        whyRecommended: 'Based on groundbreaking research and Dr. Riess\'s EMPATHICS program used in medical training.',
        keyPoints: [
          'Empathy is hardwired into our brains and can be measured',
          'E.M.P.A.T.H.Y. approach to empathic communication',
          'The neuroscience behind why empathy matters',
          'Practical exercises for building empathic skills'
        ],
        difficulty: 'Intermediate',
        rating: 4.6,
        readTime: '8 hours'
      },
      {
        title: 'The Art of Empathy: A Complete Guide to Life\'s Most Essential Skill',
        author: 'Karla McLaren',
        url: 'https://www.amazon.com/Art-Empathy-Complete-Guides-Essential/dp/1591797699',
        description: 'A comprehensive guide to understanding and developing empathic abilities.',
        whyRecommended: 'McLaren provides a unique approach to emotions and empathy with practical techniques.',
        keyPoints: [
          'Empathy involves both emotion and insight',
          'The six essential aspects of empathy',
          'Working with your own emotions to understand others',
          'Empathy as a tool for healing and connection'
        ],
        difficulty: 'Intermediate',
        rating: 4.5,
        readTime: '8 hours'
      }
    ],
    experts: [
      {
        name: 'Dr. Helen Riess',
        title: 'Associate Professor of Psychiatry',
        organization: 'Harvard Medical School',
        quote: 'Empathy is not just a nice-to-have soft skill. It\'s a measurable, trainable capacity that transforms healthcare and human connection.',
        credentials: ['MD and Psychiatrist', 'Director of Empathy Research at Harvard', 'Founder of Empathetics'],
        relevantWork: 'Developed the EMPATHICS approach to training empathy'
      },
      {
        name: 'Dr. Simon Baron-Cohen',
        title: 'Professor of Psychology',
        organization: 'University of Cambridge',
        quote: 'Empathy is our most universal human quality. It\'s what makes us human.',
        credentials: ['PhD in Psychology', 'Director of Autism Research Centre', 'Author of Zero Degrees of Empathy'],
        relevantWork: 'Leading researcher on empathy and the science of human understanding'
      }
    ],
    tools: [
      {
        name: 'Greater Good Science Center',
        type: 'website',
        url: 'https://greatergood.berkeley.edu/',
        description: 'Research-based resources for building empathy and other social emotional skills.',
        whyRecommended: 'Science-based tools and practices from UC Berkeley.',
        pricing: 'Free',
        popularity: 85
      },
      {
        name: 'Character Lab',
        type: 'website',
        url: 'https://www.characterlab.org/',
        description: 'Research and practical tools for developing character strengths including empathy.',
        whyRecommended: 'Connects researchers with educators to develop evidence-based practices.',
        pricing: 'Free',
        popularity: 78
      },
      {
        name: 'Random Acts of Kindness Foundation',
        type: 'website',
        url: 'https://www.randomactsofkindness.org/',
        description: 'Resources and ideas for practicing kindness and building empathy.',
        whyRecommended: 'Practical ideas for building empathy through action.',
        pricing: 'Free',
        popularity: 80
      }
    ]
  }
}

// Helper functions
export function getResourcesBySkill(skillCode: string): SkillResources | undefined {
  return skillResourcesDB[skillCode]
}

export function getAllSkillCodes(): string[] {
  return Object.keys(skillResourcesDB)
}

export function getBookRecommendations(skillCode: string): BookRecommendation[] {
  return skillResourcesDB[skillCode]?.books || []
}

export function getExpertEndorsements(skillCode: string): ExpertEndorsement[] {
  return skillResourcesDB[skillCode]?.experts || []
}

export function getToolRecommendations(skillCode: string): ToolRecommendation[] {
  return skillResourcesDB[skillCode]?.tools || []
}

/**
 * Find a book by its URL across all skills
 */
export function findBookByUrl(url: string): { book: BookRecommendation; skillCode: string } | undefined {
  for (const skillCode of getAllSkillCodes()) {
    const resources = skillResourcesDB[skillCode]
    if (resources) {
      const book = resources.books.find(b => b.url === url)
      if (book) {
        return { book, skillCode }
      }
    }
  }
  return undefined
}

/**
 * Find a tool by its URL across all skills
 */
export function findToolByUrl(url: string): { tool: ToolRecommendation; skillCode: string } | undefined {
  for (const skillCode of getAllSkillCodes()) {
    const resources = skillResourcesDB[skillCode]
    if (resources) {
      const tool = resources.tools.find(t => t.url === url)
      if (tool) {
        return { tool, skillCode }
      }
    }
  }
  return undefined
}
